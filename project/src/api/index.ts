// API client for making requests to the backend
// With fallback to mock data when backend is not available

import { mockProjects, mockEvents, mockPrograms, mockMembers, mockApiResponse } from './mockData';

// Base URL for API requests
const API_BASE_URL = '/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }
  return response.json();
};

// Generic fetch function with error handling and timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return await handleResponse(response);
  } catch (error) {
    clearTimeout(timeoutId);
    
    // If the error is due to the server not being available, use mock data
    if (error instanceof Error && 
        (error.message.includes('Failed to fetch') || 
         error.message.includes('NetworkError') ||
         error.message.includes('ECONNREFUSED'))) {
      console.warn('API server not available, using mock data');
      
      // Determine which mock data to return based on the URL
      if (url.includes('/projects')) {
        return mockApiResponse(mockProjects);
      } else if (url.includes('/events')) {
        return mockApiResponse(mockEvents);
      } else if (url.includes('/programs')) {
        return mockApiResponse(mockPrograms);
      } else if (url.includes('/members')) {
        return mockApiResponse(mockMembers);
      }
      
      // Default empty response
      return mockApiResponse([]);
    }
    
    throw error;
  }
};

// API client
export const api = {
  // Projects
  projects: {
    getAll: async () => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/projects`);
      } catch (error) {
        console.error('Error fetching projects:', error);
        return { data: mockProjects };
      }
    },
    
    getById: async (id: string) => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/projects/${id}`);
      } catch (error) {
        console.error(`Error fetching project ${id}:`, error);
        const project = mockProjects.find(p => p.id === id);
        return { data: project };
      }
    },
    
    create: async (data: any) => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (error) {
        console.error('Error creating project:', error);
        return { data: { ...data, id: `new-${Date.now()}` } };
      }
    },
    
    update: async (id: string, data: any) => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/projects/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (error) {
        console.error(`Error updating project ${id}:`, error);
        return { data: { ...data, id } };
      }
    },
    
    delete: async (id: string) => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/projects/${id}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.error(`Error deleting project ${id}:`, error);
        return { success: true };
      }
    }
  },
  
  // Events
  events: {
    getAll: async () => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/events`);
      } catch (error) {
        console.error('Error fetching events:', error);
        return { data: mockEvents };
      }
    },
    
    getById: async (id: string) => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/events/${id}`);
      } catch (error) {
        console.error(`Error fetching event ${id}:`, error);
        const event = mockEvents.find(e => e.id === id);
        return { data: event };
      }
    }
  },
  
  // Programs
  programs: {
    getAll: async () => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/programs`);
      } catch (error) {
        console.error('Error fetching programs:', error);
        return { data: mockPrograms };
      }
    },
    
    getById: async (id: string) => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/programs/${id}`);
      } catch (error) {
        console.error(`Error fetching program ${id}:`, error);
        const program = mockPrograms.find(p => p.id === id);
        return { data: program };
      }
    }
  },
  
  // Members
  members: {
    getAll: async (filters = {}) => {
      try {
        const queryParams = new URLSearchParams(filters as Record<string, string>).toString();
        const url = `${API_BASE_URL}/members${queryParams ? `?${queryParams}` : ''}`;
        return await fetchWithTimeout(url);
      } catch (error) {
        console.error('Error fetching members:', error);
        return { data: mockMembers };
      }
    },
    
    getById: async (id: string) => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/members/${id}`);
      } catch (error) {
        console.error(`Error fetching member ${id}:`, error);
        const member = mockMembers.find(m => m.id === id);
        return { data: member };
      }
    },
    
    create: async (data: any) => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/members`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (error) {
        console.error('Error creating member:', error);
        return { 
          data: { 
            ...data, 
            id: `new-${Date.now()}`,
            status: 'pending',
            created_at: new Date().toISOString()
          } 
        };
      }
    },
    
    updateStatus: async (id: string, status: string) => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/members/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
      } catch (error) {
        console.error(`Error updating member ${id} status:`, error);
        return { data: { id, status } };
      }
    }
  },
  
  // Contact form
  contact: {
    send: async (data: any) => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, type: 'contact' })
        });
      } catch (error) {
        console.error('Error sending contact message:', error);
        return { success: true };
      }
    }
  },
  
  // Donations
  donations: {
    process: async (data: any) => {
      try {
        return await fetchWithTimeout(`${API_BASE_URL}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, type: 'donation' })
        });
      } catch (error) {
        console.error('Error processing donation:', error);
        return { success: true };
      }
    }
  }
};

export default api;