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

describe('Messages API', () => {
  beforeAll(() => {
    // Setup mocks
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/messages', () => {
    it('should create a new message for anonymous user', async () => {
      const messageData = {
        type: 'contact',
        subject: 'Test Subject',
        content: 'Test message content'
      };
      
      const mockCreatedMessage = {
        id: 'message-1',
        ...messageData,
        profile_id: null,
        is_read: false,
        created_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-01T00:00:00.000Z'
      };
      
      (supabaseAdmin.from('messages').insert().select().single as any).mockResolvedValue({
        data: mockCreatedMessage,
        error: null
      });

      const response = await request(app)
        .post('/api/messages')
        .send(messageData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCreatedMessage);
      expect(supabaseAdmin.from).toHaveBeenCalledWith('messages');
      expect(supabaseAdmin.from().insert).toHaveBeenCalled();
      
      // Verify the inserted data has profile_id as null
      const insertCall = (supabaseAdmin.from().insert as any).mock.calls[0][0];
      expect(insertCall[0].profile_id).toBeNull();
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/messages')
        .send({ subject: 'Test Subject' }); // Missing type and content

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Type and content are required');
    });

    it('should validate message type', async () => {
      const response = await request(app)
        .post('/api/messages')
        .send({ 
          type: 'invalid-type', 
          subject: 'Test Subject',
          content: 'Test content'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Type must be one of: contact, donation, volunteer');
    });
  });

  describe('GET /api/messages/me', () => {
    it('should return user\'s messages', async () => {
      const mockMessages = [
        {
          id: 'message-1',
          type: 'contact',
          subject: 'Test Subject 1',
          content: 'Test content 1',
          profile_id: 'test-user-id',
          is_read: false,
          created_at: '2023-01-01T00:00:00.000Z'
        },
        {
          id: 'message-2',
          type: 'donation',
          subject: 'Test Subject 2',
          content: 'Test content 2',
          profile_id: 'test-user-id',
          is_read: true,
          created_at: '2023-01-02T00:00:00.000Z'
        }
      ];
      
      (supabaseAdmin.from('messages').select().eq().order as any).mockResolvedValue({
        data: mockMessages,
        error: null
      });

      const response = await request(app).get('/api/messages/me');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMessages);
      expect(supabaseAdmin.from).toHaveBeenCalledWith('messages');
      expect(supabaseAdmin.from().select).toHaveBeenCalledWith('*');
      expect(supabaseAdmin.from().select().eq).toHaveBeenCalledWith('profile_id', 'test-user-id');
    });
  });
});