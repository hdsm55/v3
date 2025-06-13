// Placeholder for API functions

interface ApiResponse<T = any> {
  data: T;
  status?: number;
  message?: string;
}

export const api = {
  get: async <T = any>(url: string): Promise<ApiResponse<T>> => {
    console.log(`GET request to: ${url}`);
    // Simulate API call
    return Promise.resolve({
      data: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'admin',
          status: 'active',
          createdAt: '2024-01-01',
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'user',
          status: 'active',
          createdAt: '2024-01-02',
        },
      ] as T,
    });
  },
  post: async <T = any>(url: string, data: any, config?: { headers?: Record<string, string> }): Promise<ApiResponse<T>> => {
    console.log(`POST request to: ${url}`, data, config);
    // Simulate API call
    return Promise.resolve({ data: data as T });
  },
  patch: async <T = any>(url: string, data: any): Promise<ApiResponse<T>> => {
    console.log(`PATCH request to: ${url}`, data);
    // Simulate API call
    return Promise.resolve({ data: data as T });
  },
  delete: async <T = any>(url: string): Promise<ApiResponse<T>> => {
    console.log(`DELETE request to: ${url}`);
    // Simulate API call
    return Promise.resolve({ data: {} as T });
  },
};