'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  Users,
  UserPlus,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Target,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  FileText,
  Plus,
  Eye,
  Edit,
  Search,
  Filter,
} from 'lucide-react';
import { formatPKR } from '@/utils/currency';

interface SalesStats {
  totalLeads: number;
  convertedLeads: number;
  totalCustomers: number;
  totalBookings: number;
  totalRevenue: number;
  pendingFollowUps: number;
  callsMade: number;
  emailsSent: number;
  meetingsScheduled: number;
  conversionRate: number;
}

interface RecentActivity {
  id: string;
  type: 'lead_created' | 'lead_converted' | 'customer_created' | 'booking_created' | 'call_made' | 'email_sent';
  description: string;
  timestamp: Date;
  entityId?: string;
  potentialValue?: number;
}

interface QuickAction {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

export default function SalesDashboard() {
  const { user, isAuthenticated, isLoading, canAccessCRM, isSalesPerson } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<SalesStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const quickActions: QuickAction[] = [
    {
      label: 'Add New Lead',
      href: '/dashboard/customers/leads/new',
      icon: UserPlus,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Add a new sales lead'
    },
    {
      label: 'Add Customer',
      href: '/dashboard/customers/add',
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Register a new customer'
    },
    {
      label: 'Create Booking',
      href: '/dashboard/bookings/new',
      icon: Calendar,
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'Create a new booking'
    },
    {
      label: 'View Customers',
      href: '/dashboard/customers',
      icon: Users,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'View all customers'
    },
    {
      label: 'View Leads',
      href: '/dashboard/customers/leads',
      icon: Target,
      color: 'bg-teal-600 hover:bg-teal-700',
      description: 'Manage your leads'
    },
    {
      label: 'My Performance',
      href: '/dashboard/sales/performance',
      icon: BarChart3,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      description: 'View your sales metrics'
    }
  ];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!isLoading && !canAccessCRM()) {
      router.push('/dashboard');
      return;
    }

    if (isAuthenticated && canAccessCRM()) {
      fetchSalesData();
    }
  }, [isAuthenticated, isLoading, canAccessCRM, router]);

  const fetchSalesData = async () => {
    try {
      setIsLoadingStats(true);
      
      // Fetch sales statistics
      const token = localStorage.getItem('access_token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Fetch stats and activities in parallel
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const [statsResponse, activitiesResponse] = await Promise.all([
        fetch(`${apiUrl}/sales-activities/my-stats`, { headers }),
        fetch(`${apiUrl}/sales-activities/my-activities?limit=10`, { headers })
      ]);

      if (statsResponse.ok && activitiesResponse.ok) {
        const statsData = await statsResponse.json();
        const activitiesData = await activitiesResponse.json();
        
        // Transform backend stats to frontend format
        const transformedStats: SalesStats = {
          totalLeads: statsData.leadsCreated || 0,
          convertedLeads: statsData.leadsConverted || 0,
          totalCustomers: statsData.customersCreated || 0,
          totalBookings: statsData.bookingsCreated || 0,
          totalRevenue: statsData.totalPotentialValue || 0,
          pendingFollowUps: 0, // This would need a separate API call
          callsMade: statsData.callsMade || 0,
          emailsSent: statsData.emailsSent || 0,
          meetingsScheduled: statsData.meetingsHeld || 0,
          conversionRate: statsData.leadsCreated > 0 ? (statsData.leadsConverted / statsData.leadsCreated) * 100 : 0,
        };

        setStats(transformedStats);
        setRecentActivities(activitiesData.map((activity: any) => ({
          ...activity,
          timestamp: new Date(activity.createdAt)
        })));
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
      // Set default stats to prevent UI breaking
      setStats({
        totalLeads: 0,
        convertedLeads: 0,
        totalCustomers: 0,
        totalBookings: 0,
        totalRevenue: 0,
        pendingFollowUps: 0,
        callsMade: 0,
        emailsSent: 0,
        meetingsScheduled: 0,
        conversionRate: 0,
      });
    } finally {
      setIsLoadingStats(false);
    }
  };

  if (isLoading || isLoadingStats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your sales dashboard...</p>
        </div>
      </div>
    );
  }

  if (!canAccessCRM()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access the sales dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.fullName}!
            </h1>
            <p className="text-gray-600 mt-1">
              {isSalesPerson() 
                ? "Here's your assigned leads and sales performance overview"
                : "Here's your sales performance overview"
              }
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Quick Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalLeads || 0}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">
              {stats?.convertedLeads || 0} converted ({(stats?.conversionRate || 0).toFixed(1)}%)
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customers</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalCustomers || 0}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600">
              +{stats?.totalCustomers || 0} this month
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalBookings || 0}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-purple-600">
              {stats?.pendingFollowUps || 0} pending follow-ups
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Potential Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatPKR(stats?.totalRevenue || 0)}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-yellow-600">
              From active leads
            </span>
          </div>
        </div>
      </div>

      {/* Activity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Calls Made</h3>
            <Phone className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats?.callsMade || 0}</p>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Emails Sent</h3>
            <Mail className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{stats?.emailsSent || 0}</p>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Meetings</h3>
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{stats?.meetingsScheduled || 0}</p>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className={`${action.color} text-white p-4 rounded-lg hover:shadow-lg transition-all duration-200 block`}
            >
              <div className="flex items-center space-x-3">
                <action.icon className="h-6 w-6" />
                <div>
                  <h4 className="font-semibold">{action.label}</h4>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          <a href="/dashboard/sales/activities" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </a>
        </div>
        <div className="space-y-4">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'lead_created' && <Target className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'lead_converted' && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {activity.type === 'customer_created' && <Users className="h-5 w-5 text-purple-600" />}
                  {activity.type === 'booking_created' && <Calendar className="h-5 w-5 text-orange-600" />}
                  {activity.type === 'call_made' && <Phone className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'email_sent' && <Mail className="h-5 w-5 text-green-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {activity.potentialValue && (
                  <div className="text-sm font-medium text-green-600">
                    {formatPKR(activity.potentialValue)}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No recent activities</p>
              <p className="text-sm">Start by adding a new lead or customer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
