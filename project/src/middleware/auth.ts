import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../lib/supabase-admin';

// Extend Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        isAdmin: boolean;
      };
    }
  }
}

// Validate JWT token and extract user info
export const validateToken = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify the JWT token with Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    // Check if user has a profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
      
    if (profileError && profileError.code !== 'PGRST116') {
      throw profileError;
    }
    
    // Set user info in request object
    req.user = {
      id: user.id,
      email: user.email,
      isAdmin: profile?.role === 'admin'
    };
    
    next();
  } catch (error: any) {
    console.error('Auth middleware error:', error.message);
    return res.status(500).json({ error: 'Authentication error' });
  }
};

// Optional token validation - doesn't require authentication but will use it if provided
export const optionalToken = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided, continue without user info
      return next();
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify the JWT token with Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    
    if (error || !user) {
      // Invalid token, but we'll continue without user info
      return next();
    }
    
    // Check if user has a profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
      
    if (profileError && profileError.code !== 'PGRST116') {
      throw profileError;
    }
    
    // Set user info in request object
    req.user = {
      id: user.id,
      email: user.email,
      isAdmin: profile?.role === 'admin'
    };
    
    next();
  } catch (error: any) {
    console.error('Optional auth middleware error:', error.message);
    // Continue without user info on error
    next();
  }
};

// Check if user is an admin
export const isAdmin = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden - Admin access required' });
  }
  
  next();
};