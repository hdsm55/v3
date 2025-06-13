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
      single: vi.fn(),
      update: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
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

describe('Profiles API', () => {
  beforeAll(() => {
    // Setup mocks
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/profiles/me', () => {
    it('should return the current user profile', async () => {
      // Mock the Supabase response
      const mockProfile = {
        id: 'test-user-id',
        full_name: 'Test User',
        avatar_url: null,
        role: 'user',
        created_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-01T00:00:00.000Z'
      };
      
      (supabaseAdmin.from('profiles').select().eq().single as any).mockResolvedValue({
        data: mockProfile,
        error: null
      });

      const response = await request(app).get('/api/profiles/me');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProfile);
      expect(supabaseAdmin.from).toHaveBeenCalledWith('profiles');
      expect(supabaseAdmin.from().select).toHaveBeenCalledWith('*');
      expect(supabaseAdmin.from().select().eq).toHaveBeenCalledWith('id', 'test-user-id');
    });

    it('should handle errors from Supabase', async () => {
      // Mock a Supabase error
      (supabaseAdmin.from('profiles').select().eq().single as any).mockResolvedValue({
        data: null,
        error: { message: 'Database error' }
      });

      const response = await request(app).get('/api/profiles/me');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/profiles/me', () => {
    it('should update the current user profile', async () => {
      const updateData = {
        full_name: 'Updated Name',
        avatar_url: 'https://example.com/avatar.jpg'
      };
      
      const mockUpdatedProfile = {
        id: 'test-user-id',
        ...updateData,
        role: 'user',
        created_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-02T00:00:00.000Z'
      };
      
      (supabaseAdmin.from('profiles').update().eq().select().single as any).mockResolvedValue({
        data: mockUpdatedProfile,
        error: null
      });

      const response = await request(app)
        .put('/api/profiles/me')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedProfile);
      expect(supabaseAdmin.from).toHaveBeenCalledWith('profiles');
      expect(supabaseAdmin.from().update).toHaveBeenCalled();
      expect(supabaseAdmin.from().update().eq).toHaveBeenCalledWith('id', 'test-user-id');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .put('/api/profiles/me')
        .send({ avatar_url: 'https://example.com/avatar.jpg' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Full name is required');
    });
  });
});