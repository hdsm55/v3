import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Users,
  FolderOpen,
  Calendar,
  Eye,
  TrendingUp,
  UserPlus,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { Loader } from '../components/ui/Loader';
import { Alert } from '../components/ui/Alert';
import Sidebar from '../components/layout/Sidebar';

interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  totalEvents: number;
  totalViews: number;
  monthlyGrowth: number;
  activeProjects: number;
  pendingRegistrations: number;
  totalDownloads: number;
}

interface ChartData {
  name: string;
  visitors: number;
  projects: number;
}

interface RecentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
}

interface RecentEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: number;
}

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, this would be API calls
        // const statsResponse = await fetch('/api/admin/stats');
        // const statsData = await statsResponse.json();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setStats({
          totalUsers: 1847,
          totalProjects: 23,
          totalEvents: 12,
          totalViews: 45672,
          monthlyGrowth: 12.5,
          activeProjects: 8,
          pendingRegistrations: 5,
          totalDownloads: 2341,
        });
        
        setChartData([
          { name: 'Jan', visitors: 4000, projects: 4 },
          { name: 'Feb', visitors: 3000, projects: 3 },
          { name: 'Mar', visitors: 2000, projects: 5 },
          { name: 'Apr', visitors: 2780, projects: 2 },
          { name: 'May', visitors: 1890, projects: 3 },
          { name: 'Jun', visitors: 2390, projects: 1 },
        ]);
        
        setRecentUsers([
          { id: '1', name: 'John Doe', email: 'john@example.com', role: 'User', joinDate: '2023-05-15' },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', joinDate: '2023-05-14' },
          { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', joinDate: '2023-05-13' },
          { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'User', joinDate: '2023-05-12' },
          { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', joinDate: '2023-05-11' },
        ]);
        
        setRecentEvents([
          { id: '1', title: 'Tech Conference', date: '2023-06-15', location: 'New York', participants: 120 },
          { id: '2', title: 'Leadership Workshop', date: '2023-06-20', location: 'Online', participants: 45 },
          { id: '3', title: 'Community Service Day', date: '2023-06-25', location: 'Chicago', participants: 78 },
          { id: '4', title: 'Youth Summit', date: '2023-07-01', location: 'Los Angeles', participants: 200 },
          { id: '5', title: 'Coding Bootcamp', date: '2023-07-10', location: 'Online', participants: 35 },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Pie chart data
  const pieData = [
    { name: 'Education', value: 35, color: '#3B82F6' },
    { name: 'Health', value: 25, color: '#10B981' },
    { name: 'Environment', value: 20, color: '#F59E0B' },
    { name: 'Technology', value: 20, color: '#EF4444' },
  ];

  // Stat cards data
  const statCards = stats
    ? [
        {
          title: t('admin.dashboard.totalUsers'),
          value: stats.totalUsers.toLocaleString(),
          icon: Users,
          change: '+12%',
          positive: true,
          color: 'from-blue-500 to-blue-600',
        },
        {
          title: t('admin.dashboard.activeProjects'),
          value: stats.activeProjects,
          icon: FolderOpen,
          change: '+5%',
          positive: true,
          color: 'from-green-500 to-green-600',
        },
        {
          title: t('admin.dashboard.events'),
          value: stats.totalEvents,
          icon: Calendar,
          change: '+8%',
          positive: true,
          color: 'from-purple-500 to-purple-600',
        },
        {
          title: t('admin.dashboard.pendingRegistrations'),
          value: stats.pendingRegistrations,
          icon: UserPlus,
          change: stats.pendingRegistrations > 0 ? `${stats.pendingRegistrations} new` : '0 new',
          positive: stats.pendingRegistrations > 0,
          color: 'from-amber-500 to-amber-600',
        },
      ]
    : [];

  // User columns for DataTable
  const userColumns = [
    {
      id: 'name',
      header: t('admin.users.name'),
      accessor: (row: RecentUser) => row.name,
      sortable: true,
    },
    {
      id: 'email',
      header: t('admin.users.email'),
      accessor: (row: RecentUser) => row.email,
      sortable: true,
    },
    {
      id: 'role',
      header: t('admin.users.role'),
      accessor: (row: RecentUser) => row.role,
      cell: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </span>
      ),
      sortable: true,
    },
    {
      id: 'joinDate',
      header: t('admin.users.joinDate'),
      accessor: (row: RecentUser) => row.joinDate,
      cell: (value: string) => new Date(value).toLocaleDateString(),
      sortable: true,
    },
    {
      id: 'actions',
      header: t('admin.users.actions'),
      accessor: (row: RecentUser) => row.id,
      cell: (value: string) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => console.log('View user', value)}
          >
            {t('admin.view')}
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => console.log('Edit user', value)}
          >
            {t('admin.edit')}
          </Button>
        </div>
      ),
    },
  ];

  // Event columns for DataTable
  const eventColumns = [
    {
      id: 'title',
      header: t('admin.events.title'),
      accessor: (row: RecentEvent) => row.title,
      sortable: true,
    },
    {
      id: 'date',
      header: t('admin.events.date'),
      accessor: (row: RecentEvent) => row.date,
      cell: (value: string) => new Date(value).toLocaleDateString(),
      sortable: true,
    },
    {
      id: 'location',
      header: t('admin.events.location'),
      accessor: (row: RecentEvent) => row.location,
      sortable: true,
    },
    {
      id: 'participants',
      header: t('admin.events.participants'),
      accessor: (row: RecentEvent) => row.participants,
      sortable: true,
    },
    {
      id: 'actions',
      header: t('admin.events.actions'),
      accessor: (row: RecentEvent) => row.id,
      cell: (value: string) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => console.log('View event', value)}
          >
            {t('admin.view')}
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => console.log('Edit event', value)}
          >
            {t('admin.edit')}
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text={t('common.loading')} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert
          status="error"
          title={t('common.error')}
          className="max-w-md"
        >
          {error.message}
          <div className="mt-4">
            <Button onClick={() => window.location.reload()}>
              {t('common.retry')}
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        user={{
          name: 'Admin User',
          role: 'Administrator',
        }}
        onLogout={() => console.log('Logout')}
      />
      
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-tajawal">
              {t('admin.dashboard.title')}
            </h1>
            <p className="text-gray-600 font-almarai">
              {t('admin.dashboard.welcome')}
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <Card key={card.title} className="hover:shadow-md transition-shadow">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1 font-almarai">
                        {card.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 font-tajawal">
                        {card.value}
                      </p>
                      <div
                        className={`flex items-center mt-2 ${
                          card.positive ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {card.positive ? (
                          <ArrowUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 mr-1" />
                        )}
                        <span className="text-sm font-medium font-almarai">{card.change}</span>
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-r ${card.color}`}
                    >
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Visitors Chart */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 font-tajawal">
                  {t('admin.dashboard.visitorStats')}
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="visitors" fill="#3B82F6" name={t('admin.dashboard.visitors')} />
                      <Bar dataKey="projects" fill="#10B981" name={t('admin.dashboard.projects')} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Project Categories */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 font-tajawal">
                  {t('admin.dashboard.projectCategories')}
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Users */}
          <Card className="mb-8 hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 font-tajawal">
                  {t('admin.dashboard.recentUsers')}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log('View all users')}
                >
                  {t('admin.viewAll')}
                </Button>
              </div>
              
              <DataTable
                data={recentUsers}
                columns={userColumns}
                searchable={false}
                pagination={false}
                bordered={false}
                striped={true}
                hover={true}
                compact={true}
              />
            </CardContent>
          </Card>
          
          {/* Recent Events */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 font-tajawal">
                  {t('admin.dashboard.upcomingEvents')}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log('View all events')}
                >
                  {t('admin.viewAll')}
                </Button>
              </div>
              
              <DataTable
                data={recentEvents}
                columns={eventColumns}
                searchable={false}
                pagination={false}
                bordered={false}
                striped={true}
                hover={true}
                compact={true}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;