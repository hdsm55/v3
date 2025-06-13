import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase-admin';
import { validateToken, isAdmin } from '../middleware/auth';

const router = Router();

// Register for an event (authenticated users)
router.post('/', validateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { event_id } = req.body;
    
    // Validate input
    if (!event_id) {
      return res.status(400).json({ error: 'Event ID is required' });
    }
    
    // Check if event exists
    const { data: eventData, error: eventError } = await supabaseAdmin
      .from('events')
      .select('id, capacity')
      .eq('id', event_id)
      .single();
      
    if (eventError) {
      if (eventError.code === 'PGRST116') {
        return res.status(404).json({ error: 'Event not found' });
      }
      throw eventError;
    }
    
    // Check if event is at capacity
    if (eventData.capacity) {
      const { count, error: countError } = await supabaseAdmin
        .from('event_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', event_id);
        
      if (countError) throw countError;
      
      if (count && count >= eventData.capacity) {
        return res.status(400).json({ error: 'Event is at capacity' });
      }
    }
    
    // Check if user is already registered
    const { data: existingReg, error: existingError } = await supabaseAdmin
      .from('event_registrations')
      .select('id')
      .eq('event_id', event_id)
      .eq('profile_id', userId)
      .maybeSingle();
      
    if (existingError) throw existingError;
    
    if (existingReg) {
      return res.status(400).json({ error: 'You are already registered for this event' });
    }
    
    // Create registration
    const { data, error } = await supabaseAdmin
      .from('event_registrations')
      .insert([{ 
        event_id, 
        profile_id: userId,
        registered_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return res.status(201).json(data);
  } catch (error: any) {
    console.error('Error registering for event:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get user's event registrations
router.get('/me', validateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('event_registrations')
      .select('*, events(*)')
      .eq('profile_id', userId)
      .order('registered_at', { ascending: false });
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching registrations:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Cancel registration (user can cancel their own registration)
router.delete('/:id', validateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Check if registration exists and belongs to user
    const { data: regData, error: regError } = await supabaseAdmin
      .from('event_registrations')
      .select('profile_id')
      .eq('id', id)
      .single();
      
    if (regError) {
      if (regError.code === 'PGRST116') {
        return res.status(404).json({ error: 'Registration not found' });
      }
      throw regError;
    }
    
    // Check if registration belongs to user or user is admin
    const isUserReg = regData.profile_id === userId;
    const isUserAdmin = req.user?.isAdmin;
    
    if (!isUserReg && !isUserAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Delete registration
    const { error } = await supabaseAdmin
      .from('event_registrations')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return res.status(204).send();
  } catch (error: any) {
    console.error('Error canceling registration:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Admin routes

// Get all registrations (admin only)
router.get('/', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { event_id } = req.query;
    
    let query = supabaseAdmin
      .from('event_registrations')
      .select('*, events(title), profiles(full_name, email, avatar_url)')
      .order('registered_at', { ascending: false });
    
    // Filter by event if provided
    if (event_id) {
      query = query.eq('event_id', event_id);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching registrations:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get registration by ID (admin only)
router.get('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabaseAdmin
      .from('event_registrations')
      .select('*, events(*), profiles(*)')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Registration not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching registration:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

export default router;