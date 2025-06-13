import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import app from '../app';
import { supabaseAdmin } from '../lib/supabase-admin';

// Mock the supabaseAdmin client
vi.mock('../lib/supabase-admin', () => {
  return {
    supabaseAdmin: {
      auth: {
        getUser: vi.fn()
      },
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis()
    }
  };
});

// Mock middleware
vi.mock('../middleware/auth', () => {
  return {
    validateToken: (req: any, res: any, next: any) => {
      req.user = {
        id: 'test-user-id',
        email: 'test@example.com',
        isAdmin: false
      };
      next();
    },
    isAdmin: (req: any, res: any, next: any) => {
      if (req.user?.isAdmin) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden - Admin access required' });
      }
    },
    optionalToken: (req: any, res: any, next: any) => {
      next();
    }
  };
});

describe('Projects API', () => {
  beforeAll(() => {
    // Setup mocks
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/projects', () => {
    it('should return all projects', async () => {
      // Mock the Supabase response
      const mockProjects = [
        {
          id: 'project-1',
          title: 'Project 1',
          description: 'Description 1',
          category: 'education',
          status: 'active',
          created_at: '2023-01-01T00:00:00.000Z'
        },
        {
          id: 'project-2',
          title: 'Project 2',
          description: 'Description 2',
          category: 'health',
          status: 'completed',
          created_at: '2023-01-02T00:00:00.000Z'
        }
      ];
      
      (supabaseAdmin.from('projects').select().order as any).mockResolvedValue({
        data: mockProjects,
        error: null
      });

      const response = await request(app).get('/api/projects');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProjects);
      expect(supabaseAdmin.from).toHaveBeenCalledWith('projects');
      expect(supabaseAdmin.from().select).toHaveBeenCalledWith('*');
      expect(supabaseAdmin.from().select().order).toHaveBeenCalledWith('created_at', { ascending: false });
    });

    it('should handle filtering by category and status', async () => {
      // Mock the Supabase response
      const mockProjects = [
        {
          id: 'project-1',
          title: 'Project 1',
          description: 'Description 1',
          category: 'education',
          status: 'active',
          created_at: '2023-01-01T00:00:00.000Z'
        }
      ];
      
      // Reset mock to track new calls
      vi.clearAllMocks();
      
      // Mock the eq method
      const mockEq = vi.fn().mockReturnThis();
      (supabaseAdmin.from as any).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        eq: mockEq
      });
      
      // Mock the final response
      (supabaseAdmin.from().select().order().eq as any).mockResolvedValue({
        data: mockProjects,
        error: null
      });

      const response = await request(app)
        .get('/api/projects?category=education&status=active');

      expect(response.status).toBe(200);
      expect(mockEq).toHaveBeenCalledWith('category', 'education');
      expect(mockEq).toHaveBeenCalledWith('status', 'active');
    });

    it('should handle errors from Supabase', async () => {
      // Mock a Supabase error
      (supabaseAdmin.from('projects').select().order as any).mockResolvedValue({
        data: null,
        error: { message: 'Database error' }
      });

      const response = await request(app).get('/api/projects');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should return a project by ID', async () => {
      const mockProject = {
        id: 'project-1',
        title: 'Project 1',
        description: 'Description 1',
        category: 'education',
        status: 'active',
        created_at: '2023-01-01T00:00:00.000Z'
      };
      
      (supabaseAdmin.from('projects').select().eq().single as any).mockResolvedValue({
        data: mockProject,
        error: null
      });

      const response = await request(app).get('/api/projects/project-1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProject);
      expect(supabaseAdmin.from).toHaveBeenCalledWith('projects');
      expect(supabaseAdmin.from().select).toHaveBeenCalledWith('*');
      expect(supabaseAdmin.from().select().eq).toHaveBeenCalledWith('id', 'project-1');
    });

    it('should return 404 if project not found', async () => {
      (supabaseAdmin.from('projects').select().eq().single as any).mockResolvedValue({
        data: null,
        error: { code: 'PGRST116', message: 'Not found' }
      });

      const response = await request(app).get('/api/projects/non-existent');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Project not found');
    });
  });
});