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
      maybeSingle: vi.fn(),
      insert: vi.fn().mockReturnThis(),
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

describe('Event Registrations API', () => {
  beforeAll(() => {
    // Setup mocks
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/event-registrations', () => {
    it('should register a user for an event', async () => {
      // Mock event check
      (supabaseAdmin.from('events').select().eq().single as any).mockResolvedValue({
        data: { id: 'event-1', capacity: 100 },
        error: null
      });
      
      // Mock registration count check
      (supabaseAdmin.from('event_registrations').select as any).mockResolvedValue({
        count: 50,
        error: null
      });
      
      // Mock existing registration check
      (supabaseAdmin.from('event_registrations').select().eq().eq().maybeSingle as any).mockResolvedValue({
        data: null,
        error: null
      });
      
      // Mock registration creation
      const mockRegistration = {
        id: 'reg-1',
        event_id: 'event-1',
        profile_id: 'test-user-id',
        registered_at: '2023-01-01T00:00:00.000Z'
      };
      
      (supabaseAdmin.from('event_registrations').insert().select().single as any).mockResolvedValue({
        data: mockRegistration,
        error: null
      });

      const response = await request(app)
        .post('/api/event-registrations')
        .send({ event_id: 'event-1' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockRegistration);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/event-registrations')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Event ID is required');
    });

    it('should check if event exists', async () => {
      (supabaseAdmin.from('events').select().eq().single as any).mockResolvedValue({
        data: null,
        error: { code: 'PGRST116', message: 'Not found' }
      });

      const response = await request(app)
        .post('/api/event-registrations')
        .send({ event_id: 'non-existent' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Event not found');
    });

    it('should check if event is at capacity', async () => {
      // Mock event check
      (supabaseAdmin.from('events').select().eq().single as any).mockResolvedValue({
        data: { id: 'event-1', capacity: 50 },
        error: null
      });
      
      // Mock registration count check - at capacity
      (supabaseAdmin.from('event_registrations').select as any).mockResolvedValue({
        count: 50,
        error: null
      });

      const response = await request(app)
        .post('/api/event-registrations')
        .send({ event_id: 'event-1' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Event is at capacity');
    });

    it('should check if user is already registered', async () => {
      // Mock event check
      (supabaseAdmin.from('events').select().eq().single as any).mockResolvedValue({
        data: { id: 'event-1', capacity: 100 },
        error: null
      });
      
      // Mock registration count check
      (supabaseAdmin.from('event_registrations').select as any).mockResolvedValue({
        count: 50,
        error: null
      });
      
      // Mock existing registration check - already registered
      (supabaseAdmin.from('event_registrations').select().eq().eq().maybeSingle as any).mockResolvedValue({
        data: { id: 'existing-reg' },
        error: null
      });

      const response = await request(app)
        .post('/api/event-registrations')
        .send({ event_id: 'event-1' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'You are already registered for this event');
    });
  });

  describe('GET /api/event-registrations/me', () => {
    it('should return user\'s event registrations', async () => {
      const mockRegistrations = [
        {
          id: 'reg-1',
          event_id: 'event-1',
          profile_id: 'test-user-id',
          registered_at: '2023-01-01T00:00:00.000Z',
          events: {
            id: 'event-1',
            title: 'Event 1',
            start_date: '2023-02-01T00:00:00.000Z'
          }
        },
        {
          id: 'reg-2',
          event_id: 'event-2',
          profile_id: 'test-user-id',
          registered_at: '2023-01-02T00:00:00.000Z',
          events: {
            id: 'event-2',
            title: 'Event 2',
            start_date: '2023-03-01T00:00:00.000Z'
          }
        }
      ];
      
      (supabaseAdmin.from('event_registrations').select().eq().order as any).mockResolvedValue({
        data: mockRegistrations,
        error: null
      });

      const response = await request(app).get('/api/event-registrations/me');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockRegistrations);
      expect(supabaseAdmin.from).toHaveBeenCalledWith('event_registrations');
      expect(supabaseAdmin.from().select).toHaveBeenCalledWith('*, events(*)');
      expect(supabaseAdmin.from().select().eq).toHaveBeenCalledWith('profile_id', 'test-user-id');
    });
  });
});