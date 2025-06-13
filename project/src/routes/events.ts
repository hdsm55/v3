import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase-admin';
import { validateToken, isAdmin } from '../middleware/auth';

const router = Router();

// Get all events (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    // Support filtering by date range
    const { start_date, end_date, location } = req.query;
    
    let query = supabaseAdmin
      .from('events')
      .select('*')
      .order('start_date', { ascending: true });
    
    // Apply filters if provided
    if (start_date) {
      query = query.gte('start_date', start_date);
    }
    
    if (end_date) {
      query = query.lte('end_date', end_date);
    }
    
    if (location) {
      query = query.ilike('location', `%${location}%`);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching events:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get event by ID (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Event not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching event:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get event registrations count
router.get('/:id/registrations/count', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { count, error } = await supabaseAdmin
      .from('event_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', id);
      
    if (error) throw error;
    
    return res.status(200).json({ count });
  } catch (error: any) {
    console.error('Error counting registrations:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Admin routes

// Create a new event (admin only)
router.post('/', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { 
      title, 
      description, 
      start_date, 
      end_date, 
      location, 
      capacity 
    } = req.body;
    
    // Validate input
    if (!title || !start_date) {
      return res.status(400).json({ error: 'Title and start date are required' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('events')
      .insert([{ 
        title, 
        description, 
        start_date, 
        end_date, 
        location, 
        capacity,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return res.status(201).json(data);
  } catch (error: any) {
    console.error('Error creating event:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Update event (admin only)
router.put('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      start_date, 
      end_date, 
      location, 
      capacity 
    } = req.body;
    
    // Validate input
    if (!title || !start_date) {
      return res.status(400).json({ error: 'Title and start date are required' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('events')
      .update({ 
        title, 
        description, 
        start_date, 
        end_date, 
        location, 
        capacity,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Event not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error updating event:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Delete event (admin only)
router.delete('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // First delete all registrations for this event
    const { error: regError } = await supabaseAdmin
      .from('event_registrations')
      .delete()
      .eq('event_id', id);
      
    if (regError) throw regError;
    
    // Then delete the event
    const { error } = await supabaseAdmin
      .from('events')
      .delete()
      .eq('id', id);
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Event not found' });
      }
      throw error;
    }
    
    return res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting event:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get all registrations for an event (admin only)
router.get('/:id/registrations', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabaseAdmin
      .from('event_registrations')
      .select('*, profiles(full_name, email, avatar_url)')
      .eq('event_id', id)
      .order('registered_at', { ascending: false });
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching event registrations:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

export default router;