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
      // Simulate no user for this test
      next();
    }
  };
});

describe('Volunteers API', () => {
  beforeAll(() => {
    // Setup mocks
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/volunteers', () => {
    it('should submit a volunteer application for anonymous user', async () => {
      const volunteerData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        resume_url: 'https://example.com/resume.pdf'
      };
      
      const mockApplication = {
        id: 'volunteer-1',
        ...volunteerData,
        profile_id: null,
        status: 'pending',
        applied_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-01T00:00:00.000Z'
      };
      
      (supabaseAdmin.from('volunteers').insert().select().single as any).mockResolvedValue({
        data: mockApplication,
        error: null
      });

      const response = await request(app)
        .post('/api/volunteers')
        .send(volunteerData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockApplication);
      expect(supabaseAdmin.from).toHaveBeenCalledWith('volunteers');
      expect(supabaseAdmin.from().insert).toHaveBeenCalled();
      
      // Verify the inserted data has profile_id as null
      const insertCall = (supabaseAdmin.from().insert as any).mock.calls[0][0];
      expect(insertCall[0].profile_id).toBeNull();
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/volunteers')
        .send({ 
          name: 'John Doe',
          email: 'john@example.com'
          // Missing phone
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Name, email, and phone are required');
    });

    it('should validate email format', async () => {
      const response = await request(app)
        .post('/api/volunteers')
        .send({ 
          name: 'John Doe',
          email: 'invalid-email',
          phone: '123-456-7890'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid email format');
    });
  });

  describe('GET /api/volunteers/me', () => {
    it('should return user\'s volunteer applications', async () => {
      const mockApplications = [
        {
          id: 'volunteer-1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          profile_id: 'test-user-id',
          status: 'pending',
          applied_at: '2023-01-01T00:00:00.000Z'
        },
        {
          id: 'volunteer-2',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          profile_id: 'test-user-id',
          status: 'approved',
          applied_at: '2023-01-02T00:00:00.000Z'
        }
      ];
      
      (supabaseAdmin.from('volunteers').select().eq().order as any).mockResolvedValue({
        data: mockApplications,
        error: null
      });

      const response = await request(app).get('/api/volunteers/me');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockApplications);
      expect(supabaseAdmin.from).toHaveBeenCalledWith('volunteers');
      expect(supabaseAdmin.from().select).toHaveBeenCalledWith('*');
      expect(supabaseAdmin.from().select().eq).toHaveBeenCalledWith('profile_id', 'test-user-id');
    });
  });
});