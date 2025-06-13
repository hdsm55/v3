import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { logger } from '../utils/logger';
import type { Member, CreateMemberDTO, UpdateMemberDTO, MemberStatus } from '../types/member';

// Fetch all members
export const useMembers = (options?: { 
  status?: MemberStatus, 
  search?: string,
  limit?: number,
  page?: number
}) => {
  const { status, search, limit = 10, page = 1 } = options || {};
  
  return useQuery({
    queryKey: ['members', { status, search, limit, page }],
    queryFn: async () => {
      try {
        // Build query params
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (search) params.append('search', search);
        if (limit) params.append('limit', limit.toString());
        if (page) params.append('page', page.toString());
        
        const queryString = params.toString();
        const url = `/api/members${queryString ? `?${queryString}` : ''}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        logger.info('Members fetched successfully', {
          tags: ['members', 'query'],
          metadata: { count: data?.count || 0, filters: { status, search } }
        });
        
        return data;
      } catch (error) {
        logger.error('Failed to fetch members', {
          tags: ['members', 'query', 'error'],
          metadata: { error }
        });
        throw error;
      }
    },
  });
};

// Get a single member by ID
export const useMember = (id: string) => {
  return useQuery({
    queryKey: ['members', id],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/members/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        logger.info('Member fetched successfully', {
          tags: ['members', 'query'],
          metadata: { memberId: id }
        });
        
        return data as Member;
      } catch (error) {
        logger.error('Failed to fetch member', {
          tags: ['members', 'query', 'error'],
          metadata: { memberId: id, error }
        });
        throw error;
      }
    },
    enabled: !!id,
  });
};

// Create a new member
export const useCreateMember = () => {
  return useMutation({
    mutationFn: async (data: CreateMemberDTO) => {
      try {
        const response = await fetch('/api/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }
        
        const member = await response.json();
        
        logger.info('Member created successfully', {
          tags: ['members', 'mutation', 'create'],
          metadata: { memberId: member.id }
        });
        
        return member as Member;
      } catch (error) {
        logger.error('Failed to create member', {
          tags: ['members', 'mutation', 'create', 'error'],
          metadata: { error, data }
        });
        throw error;
      }
    }
  });
};

// Update a member
export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateMemberDTO }) => {
      try {
        const response = await fetch(`/api/members/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }
        
        const updatedMember = await response.json();
        
        logger.info('Member updated successfully', {
          tags: ['members', 'mutation', 'update'],
          metadata: { memberId: id, updates: data }
        });
        
        return updatedMember as Member;
      } catch (error) {
        logger.error('Failed to update member', {
          tags: ['members', 'mutation', 'update', 'error'],
          metadata: { memberId: id, data, error }
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['members', data.id] });
    }
  });
};

// Delete a member
export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await fetch(`/api/members/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }
        
        logger.info('Member deleted successfully', {
          tags: ['members', 'mutation', 'delete'],
          metadata: { memberId: id }
        });
        
        return id;
      } catch (error) {
        logger.error('Failed to delete member', {
          tags: ['members', 'mutation', 'delete', 'error'],
          metadata: { memberId: id, error }
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    }
  });
};

// Update member status
export const useUpdateMemberStatus = () => {
  const updateMember = useUpdateMember();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: MemberStatus }) => {
      return updateMember.mutateAsync({ id, data: { status } });
    }
  });
};