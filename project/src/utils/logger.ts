// Simple logger utility for application-wide logging
// This provides consistent logging with additional context and metadata

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogOptions {
  tags?: string[];
  metadata?: Record<string, any>;
}

class Logger {
  private isProduction: boolean;

  constructor() {
    this.isProduction = import.meta.env.PROD || false;
  }

  /**
   * Log informational messages
   */
  info(message: string, options?: LogOptions): void {
    this.log('info', message, options);
  }

  /**
   * Log warning messages
   */
  warn(message: string, options?: LogOptions): void {
    this.log('warn', message, options);
  }

  /**
   * Log error messages
   */
  error(message: string, options?: LogOptions): void {
    this.log('error', message, options);
  }

  /**
   * Log debug messages (only in development)
   */
  debug(message: string, options?: LogOptions): void {
    if (!this.isProduction) {
      this.log('debug', message, options);
    }
  }

  /**
   * Internal logging method
   */
  private log(level: LogLevel, message: string, options?: LogOptions): void {
    const { tags = [], metadata = {} } = options || {};
    
    // In production, we might want to send logs to a service
    if (this.isProduction) {
      // Here we could implement production logging to a service
      // For now, we'll just use console with minimal output
      console[level](`[${level.toUpperCase()}] ${message}`);
      return;
    }

    // In development, provide more detailed logs
    const tagString = tags.length ? `[${tags.join(', ')}]` : '';
    const timestamp = new Date().toISOString();
    
    // Format the log message
    console[level](
      `%c${timestamp} %c${level.toUpperCase()} %c${tagString} %c${message}`,
      'color: gray', 
      this.getLevelColor(level),
      'color: teal',
      'color: black; font-weight: normal'
    );
    
    // Log metadata if present
    if (Object.keys(metadata).length) {
      console.groupCollapsed('Metadata');
      console.table(metadata);
      console.groupEnd();
    }
  }

  /**
   * Get color for log level
   */
  private getLevelColor(level: LogLevel): string {
    switch (level) {
      case 'info':
        return 'color: blue; font-weight: bold';
      case 'warn':
        return 'color: orange; font-weight: bold';
      case 'error':
        return 'color: red; font-weight: bold';
      case 'debug':
        return 'color: purple; font-weight: bold';
      default:
        return 'color: black; font-weight: bold';
    }
  }
}

// Export a singleton instance
export const logger = new Logger();