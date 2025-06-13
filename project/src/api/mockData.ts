// Mock data for API endpoints when backend is not available
// This helps avoid ECONNREFUSED errors during development

export const mockProjects = [
  {
    id: 'youth-leadership',
    title: 'Youth Leadership Academy',
    description: 'A comprehensive program developing leadership skills in young people through workshops and mentorship.',
    category: 'education',
    status: 'active',
    image_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    year: '2023'
  },
  {
    id: 'community-health',
    title: 'Community Health Initiative',
    description: 'Empowering youth to lead health education and awareness campaigns in their communities.',
    category: 'health',
    status: 'active',
    image_url: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
    year: '2023'
  },
  {
    id: 'green-schools',
    title: 'Green Schools Project',
    description: 'Student-led environmental sustainability projects in schools across the region.',
    category: 'environment',
    status: 'completed',
    image_url: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg',
    year: '2022'
  },
  {
    id: 'digital-training',
    title: 'Digital Training Program',
    description: 'Teaching essential digital skills to underprivileged youth for better career opportunities.',
    category: 'technology',
    status: 'active',
    image_url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    year: '2023'
  },
  {
    id: 'mental-health',
    title: 'Mental Health Program',
    description: 'Supporting youth mental health through peer counseling and professional guidance.',
    category: 'health',
    status: 'active',
    image_url: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg',
    year: '2023'
  },
  {
    id: 'recycling-education',
    title: 'Recycling Education Campaign',
    description: 'Youth-led initiative to promote recycling awareness and sustainable practices.',
    category: 'environment',
    status: 'completed',
    image_url: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
    year: '2022'
  }
];

export const mockEvents = [
  {
    id: 'tech-conference',
    title: 'Tech Innovation Conference',
    description: 'Join us for a day of innovation, inspiration, and networking with tech leaders from around the world.',
    date: '2024-06-15',
    time: '09:00',
    location: 'Dubai, UAE',
    participants: 450,
    maxParticipants: 500,
    category: 'conference',
    featured: true,
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
    price: 0,
    organizer: 'Global Youth Organization'
  },
  {
    id: 'leadership-workshop',
    title: 'Youth Leadership Workshop',
    description: 'Learn essential leadership skills and strategies to make a positive impact in your community.',
    date: '2024-06-20',
    time: '14:00',
    location: 'Online',
    participants: 85,
    maxParticipants: 100,
    category: 'workshop',
    featured: false,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    price: 25,
    organizer: 'Leadership Academy'
  },
  {
    id: 'environmental-camp',
    title: 'Environmental Volunteer Camp',
    description: 'Join us for a weekend of environmental conservation activities, including beach cleanups and tree planting.',
    date: '2024-06-25',
    time: '07:00',
    location: 'Coastal Area, Qatar',
    participants: 120,
    maxParticipants: 150,
    category: 'social',
    featured: true,
    image: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg',
    price: 0,
    organizer: 'Environmental Society'
  }
];

export const mockPrograms = [
  {
    id: 'youth-leadership',
    title: 'Youth Leadership Academy',
    description: 'A comprehensive program developing leadership skills in young people through workshops and mentorship.',
    goal_amount: 50000,
    current_amount: 37500,
    image_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    category: 'education',
    status: 'active'
  },
  {
    id: 'community-health',
    title: 'Community Health Initiative',
    description: 'Empowering youth to lead health education and awareness campaigns in their communities.',
    goal_amount: 75000,
    current_amount: 45000,
    image_url: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
    category: 'health',
    status: 'active'
  },
  {
    id: 'green-schools',
    title: 'Green Schools Project',
    description: 'Student-led environmental sustainability projects in schools across the region.',
    goal_amount: 30000,
    current_amount: 30000,
    image_url: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg',
    category: 'environment',
    status: 'completed'
  }
];

export const mockMembers = [
  {
    id: 'member-1',
    name: 'Ahmed Mohammed',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    motivation: 'I want to contribute to youth development in my community and gain leadership experience.',
    status: 'approved',
    created_at: '2023-12-15T08:30:00Z'
  },
  {
    id: 'member-2',
    name: 'Sarah Abdullah',
    email: 'sarah@example.com',
    phone: '+966 55 987 6543',
    motivation: 'I am passionate about environmental issues and want to work with like-minded youth.',
    status: 'pending',
    created_at: '2024-01-10T14:45:00Z'
  },
  {
    id: 'member-3',
    name: 'Mohammed Ali',
    email: 'mohammed@example.com',
    phone: '+966 54 567 8901',
    motivation: 'I have experience in digital marketing and want to help promote youth initiatives.',
    status: 'approved',
    created_at: '2023-11-20T10:15:00Z'
  }
];

// Mock API response function
export const mockApiResponse = (data: any, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, delay);
  });
};