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
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      ilike: vi.fn().mockReturnThis(),
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

describe('Events API', () => {
  beforeAll(() => {
    // Setup mocks
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/events', () => {
    it('should return all events', async () => {
      // Mock the Supabase response
      const mockEvents = [
        {
          id: 'event-1',
          title: 'Event 1',
          description: 'Description 1',
          start_date: '2023-01-01T00:00:00.000Z',
          end_date: '2023-01-02T00:00:00.000Z',
          location: 'Location 1',
          capacity: 100,
          created_at: '2022-12-01T00:00:00.000Z'
        },
        {
          id: 'event-2',
          title: 'Event 2',
          description: 'Description 2',
          start_date: '2023-02-01T00:00:00.000Z',
          end_date: '2023-02-02T00:00:00.000Z',
          location: 'Location 2',
          capacity: 200,
          created_at: '2022-12-15T00:00:00.000Z'
        }
      ];
      
      (supabaseAdmin.from('events').select().order as any).mockResolvedValue({
        data: mockEvents,
        error: null
      });

      const response = await request(app).get('/api/events');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvents);
      expect(supabaseAdmin.from).toHaveBeenCalledWith('events');
      expect(supabaseAdmin.from().select).toHaveBeenCalledWith('*');
      expect(supabaseAdmin.from().select().order).toHaveBeenCalledWith('start_date', { ascending: true });
    });

    it('should handle filtering by date range and location', async () => {
      // Reset mock to track new calls
      vi.clearAllMocks();
      
      // Setup mock chain
      const mockGte = vi.fn().mockReturnThis();
      const mockLte = vi.fn().mockReturnThis();
      const mockIlike = vi.fn().mockReturnThis();
      
      (supabaseAdmin.from as any).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        gte: mockGte,
        lte: mockLte,
        ilike: mockIlike
      });
      
      // Mock the final response
      (supabaseAdmin.from().select().order().gte().lte().ilike as any).mockResolvedValue({
        data: [],
        error: null
      });

      const response = await request(app)
        .get('/api/events?start_date=2023-01-01&end_date=2023-12-31&location=New York');

      expect(response.status).toBe(200);
      expect(mockGte).toHaveBeenCalledWith('start_date', '2023-01-01');
      expect(mockLte).toHaveBeenCalledWith('end_date', '2023-12-31');
      expect(mockIlike).toHaveBeenCalledWith('location', '%New York%');
    });
  });

  describe('GET /api/events/:id', () => {
    it('should return an event by ID', async () => {
      const mockEvent = {
        id: 'event-1',
        title: 'Event 1',
        description: 'Description 1',
        start_date: '2023-01-01T00:00:00.000Z',
        end_date: '2023-01-02T00:00:00.000Z',
        location: 'Location 1',
        capacity: 100,
        created_at: '2022-12-01T00:00:00.000Z'
      };
      
      (supabaseAdmin.from('events').select().eq().single as any).mockResolvedValue({
        data: mockEvent,
        error: null
      });

      const response = await request(app).get('/api/events/event-1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvent);
      expect(supabaseAdmin.from).toHaveBeenCalledWith('events');
      expect(supabaseAdmin.from().select).toHaveBeenCalledWith('*');
      expect(supabaseAdmin.from().select().eq).toHaveBeenCalledWith('id', 'event-1');
    });

    it('should return 404 if event not found', async () => {
      (supabaseAdmin.from('events').select().eq().single as any).mockResolvedValue({
        data: null,
        error: { code: 'PGRST116', message: 'Not found' }
      });

      const response = await request(app).get('/api/events/non-existent');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Event not found');
    });
  });

  describe('GET /api/events/:id/registrations/count', () => {
    it('should return the registration count for an event', async () => {
      (supabaseAdmin.from('event_registrations').select as any).mockResolvedValue({
        count: 42,
        error: null
      });

      const response = await request(app).get('/api/events/event-1/registrations/count');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ count: 42 });
      expect(supabaseAdmin.from).toHaveBeenCalledWith('event_registrations');
      expect(supabaseAdmin.from().select).toHaveBeenCalledWith('*', { count: 'exact', head: true });
    });
  });
});