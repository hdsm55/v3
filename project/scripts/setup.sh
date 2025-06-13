#!/bin/bash

# Enable strict mode
set -e  # Exit immediately if a command exits with a non-zero status
set -u  # Treat unset variables as an error

# Color codes for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status messages
print_step() {
  local step=$1
  local total=$2
  local message=$3
  echo -e "${BLUE}[Step ${step}/${total}] ${message}...${NC}"
}

# Function to print success messages
print_success() {
  local message=$1
  echo -e "${GREEN}✓ ${message}${NC}"
}

# Function to print error messages and exit
print_error() {
  local message=$1
  echo -e "${RED}✗ Error: ${message}${NC}" >&2
  exit 1
}

# Function to print warning messages
print_warning() {
  local message=$1
  echo -e "${YELLOW}⚠ Warning: ${message}${NC}" >&2
}

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
  print_step 1 7 "Checking prerequisites"
  
  # Check Node.js
  if ! command_exists node; then
    print_error "Node.js is not installed. Please install Node.js (v18 or later) and try again."
  fi
  
  NODE_VERSION=$(node -v | cut -d 'v' -f 2)
  if [[ $(echo "$NODE_VERSION 18.0.0" | awk '{print ($1 < $2)}') -eq 1 ]]; then
    print_warning "Node.js version $NODE_VERSION is below recommended version 18.0.0"
  fi
  
  # Check npm
  if ! command_exists npm; then
    print_error "npm is not installed. Please install npm and try again."
  fi
  
  # Check Supabase CLI (optional)
  if ! command_exists supabase; then
    print_warning "Supabase CLI is not installed. Some features may not work correctly."
    print_warning "To install Supabase CLI, follow the instructions at: https://supabase.com/docs/guides/cli"
  fi
  
  print_success "All required prerequisites are installed"
}

# Function to load environment variables
load_env() {
  print_step 2 7 "Loading environment variables"
  
  # Check if .env file exists
  if [[ ! -f .env ]]; then
    # If .env doesn't exist but .env.example does, create .env from .env.example
    if [[ -f .env.example ]]; then
      cp .env.example .env
      print_warning "Created .env file from .env.example. Please update it with your actual values."
    else
      print_error ".env file not found and no .env.example to create it from."
    fi
  fi
  
  # Source the .env file
  set -a
  source .env
  set +a
  
  # Validate required environment variables
  if [[ -z "${SUPABASE_URL:-}" || -z "${SUPABASE_ANON_KEY:-}" || -z "${SUPABASE_SERVICE_ROLE_KEY:-}" ]]; then
    print_error "Required Supabase environment variables are missing in .env file."
  fi
  
  print_success "Environment loaded successfully"
}

# Function to install dependencies
install_dependencies() {
  print_step 3 7 "Installing dependencies"
  
  npm ci || npm install
  
  print_success "Dependencies installed"
}

# Function to start local Supabase
start_supabase() {
  print_step 4 7 "Starting local Supabase"
  
  if command_exists supabase; then
    # Check if Supabase is already running
    if supabase status &>/dev/null; then
      print_warning "Supabase is already running"
    else
      supabase start
    fi
  else
    print_warning "Skipping local Supabase start (CLI not installed)"
    print_warning "If you're using a remote Supabase instance, make sure it's properly configured in .env"
  fi
  
  print_success "Supabase is available"
}

# Function to run migrations
run_migrations() {
  print_step 5 7 "Running database migrations"
  
  if command_exists supabase; then
    # Run migrations using Supabase CLI
    supabase migration up
  else
    print_warning "Skipping migrations (Supabase CLI not installed)"
    print_warning "If you're using a remote Supabase instance, ensure migrations are applied manually"
  fi
  
  print_success "Database migrations applied"
}

# Function to seed test data
seed_data() {
  print_step 6 7 "Seeding test data"
  
  # Run the seed script
  npm run seed
  
  print_success "Test data seeded successfully"
}

# Function to start the development server
start_server() {
  print_step 7 7 "Starting development server"
  
  # Start the development server in the background
  npm run dev &
  DEV_SERVER_PID=$!
  
  # Wait for the server to start
  echo "Waiting for server to start..."
  sleep 5
  
  # Check if server is running
  if kill -0 $DEV_SERVER_PID 2>/dev/null; then
    print_success "Development server started successfully"
    echo -e "${GREEN}Server is running at: http://localhost:5173${NC}"
    
    # Keep the script running until Ctrl+C
    echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
    wait $DEV_SERVER_PID
  else
    print_error "Failed to start development server"
  fi
}

# Main function to run the setup
main() {
  echo -e "${BLUE}=== Global Youth Organization - Development Setup ===${NC}"
  echo "This script will set up your local development environment."
  echo ""
  
  # Run all setup steps
  check_prerequisites
  load_env
  install_dependencies
  start_supabase
  run_migrations
  seed_data
  start_server
}

# Run the main function
main