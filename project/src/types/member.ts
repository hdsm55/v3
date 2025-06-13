export type MemberStatus = 'pending' | 'approved' | 'rejected';

export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  motivation?: string;
  status: MemberStatus;
  created_at: string;
}

export interface CreateMemberDTO {
  name: string;
  email: string;
  phone?: string;
  motivation?: string;
}

export interface UpdateMemberDTO {
  status?: MemberStatus;
  name?: string;
  email?: string;
  phone?: string;
  motivation?: string;
}