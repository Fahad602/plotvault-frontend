'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Map,
  Users,
  FileText,
  DollarSign,
  BarChart3,
  Settings,
  Calendar,
  Building,
  CreditCard,
  PieChart,
  TrendingUp,
  Shield,
  ChevronDown,
  ChevronRight,
  Hammer,
  FileImage,
  MessageSquare,
  ClipboardList,
  Search,
  UserCheck,
  Archive,
  Activity,
  Database,
  Globe,
  MapPin,
  Home,
  Wrench,
  Briefcase,
  Target,
  Clock,
  UserPlus,
} from 'lucide-react';

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
  roles?: UserRole[];
  excludeRoles?: UserRole[];
}

// Define menu items based on roles
const getMenuItemsForRole = (role: UserRole): MenuItem[] => {
  const commonItems: MenuItem[] = [
    {
      label: 'Dashboard',
      href: role === 'sales_person' ? '/dashboard/sales' : '/dashboard',
      icon: LayoutDashboard,
    },
  ];

  const salesPersonItems: MenuItem[] = [
    {
      label: 'CRM Dashboard',
      href: '/dashboard/sales',
      icon: Target,
    },
    {
      label: 'My Leads',
      href: '/dashboard/customers/leads',
      icon: Search,
    },
    {
      label: 'Customer Management',
      href: '/dashboard/customers',
      icon: Users,
      children: [
        { label: 'All Customers', href: '/dashboard/customers', icon: Users },
        { label: 'Add Customer', href: '/dashboard/customers/add', icon: Users },
        { label: 'Interactions', href: '/dashboard/customers/interactions', icon: MessageSquare },
      ],
    },
    {
      label: 'Bookings',
      href: '/dashboard/bookings',
      icon: Calendar,
      children: [
        { label: 'All Bookings', href: '/dashboard/bookings', icon: Calendar },
        { label: 'New Booking', href: '/dashboard/bookings/new', icon: Calendar },
        { label: 'My Bookings', href: '/dashboard/bookings?created_by=me', icon: UserCheck },
      ],
    },
    {
      label: 'Plot Information',
      href: '/dashboard/plots',
      icon: Map,
      children: [
        { label: 'Available Plots', href: '/dashboard/plots?status=available', icon: Map },
        { label: 'Plot Map', href: '/dashboard/plots/map', icon: MapPin },
        { label: 'Plot Pricing', href: '/dashboard/plots/pricing', icon: DollarSign },
      ],
    },
    {
      label: 'Documents',
      href: '/dashboard/documents',
      icon: FileImage,
      children: [
        { label: 'Customer Documents', href: '/dashboard/documents?type=customer', icon: FileImage },
        { label: 'Upload Document', href: '/dashboard/documents/upload', icon: FileText },
      ],
    },
    {
      label: 'Sales Analytics',
      href: '/dashboard/sales/performance',
      icon: BarChart3,
      children: [
        { label: 'My Performance', href: '/dashboard/sales/performance', icon: Activity },
        { label: 'Lead Analytics', href: '/dashboard/analytics/leads', icon: TrendingUp },
      ],
    },
  ];

  const salesManagerItems: MenuItem[] = [
    {
      label: 'Team Management',
      href: '/dashboard/team',
      icon: Users,
      children: [
        { label: 'Team Members', href: '/dashboard/team', icon: Users },
        { label: 'Add Team Member', href: '/dashboard/team/add', icon: UserPlus },
        { label: 'Team Performance', href: '/dashboard/team/performance', icon: BarChart3 },
        { label: 'Team Activities', href: '/dashboard/team/activities', icon: Activity },
      ],
    },
    {
      label: 'Leads Management',
      href: '/dashboard/customers/leads',
      icon: Search,
      children: [
        { label: 'All Leads', href: '/dashboard/customers/leads', icon: Search },
        { label: 'Assign Leads', href: '/dashboard/customers/leads/assign', icon: UserCheck },
      ],
    },
    {
      label: 'Customer Management',
      href: '/dashboard/customers',
      icon: Users,
      children: [
        { label: 'All Customers', href: '/dashboard/customers', icon: Users },
        { label: 'Add Customer', href: '/dashboard/customers/add', icon: Users },
        { label: 'Interactions', href: '/dashboard/customers/interactions', icon: MessageSquare },
      ],
    },
    {
      label: 'Bookings',
      href: '/dashboard/bookings',
      icon: Calendar,
      children: [
        { label: 'All Bookings', href: '/dashboard/bookings', icon: Calendar },
        { label: 'New Booking', href: '/dashboard/bookings/new', icon: Calendar },
      ],
    },
    {
      label: 'Sales Analytics',
      href: '/dashboard/analytics/sales',
      icon: BarChart3,
      children: [
        { label: 'Sales Overview', href: '/dashboard/analytics/sales', icon: BarChart3 },
        { label: 'Team Performance', href: '/dashboard/analytics/team', icon: TrendingUp },
        { label: 'Lead Analytics', href: '/dashboard/analytics/leads', icon: Target },
      ],
    },
  ];

  const adminItems: MenuItem[] = [
    {
      label: 'Plot Management',
      href: '/dashboard/plots',
      icon: Map,
      children: [
        { label: 'All Plots', href: '/dashboard/plots', icon: Map },
        { label: 'Add Plot', href: '/dashboard/plots/add', icon: Building },
        { label: 'Plot Map', href: '/dashboard/plots/map', icon: Map },
        { label: 'Plot Pricing', href: '/dashboard/plots/pricing', icon: DollarSign },
      ],
    },
    {
      label: 'Customer Management',
      href: '/dashboard/customers',
      icon: Users,
      children: [
        { label: 'All Customers', href: '/dashboard/customers', icon: Users },
        { label: 'Add Customer', href: '/dashboard/customers/add', icon: Users },
        { label: 'Leads', href: '/dashboard/customers/leads', icon: Search },
        { label: 'Interactions', href: '/dashboard/customers/interactions', icon: MessageSquare },
      ],
    },
    {
      label: 'Bookings',
      href: '/dashboard/bookings',
      icon: Calendar,
      children: [
        { label: 'All Bookings', href: '/dashboard/bookings', icon: Calendar },
        { label: 'New Booking', href: '/dashboard/bookings/new', icon: Calendar },
      ],
    },
    {
      label: 'Payments',
      href: '/dashboard/payments',
      icon: CreditCard,
      children: [
        { label: 'All Payments', href: '/dashboard/payments', icon: CreditCard },
        { label: 'Payment Plans', href: '/dashboard/payment-plans', icon: DollarSign },
      ],
    },
    {
      label: 'Finance Management',
      href: '/dashboard/finance',
      icon: DollarSign,
      children: [
        { label: 'Finance Dashboard', href: '/dashboard/finance', icon: DollarSign },
        { label: 'Company Expenses', href: '/dashboard/finance/expenses', icon: CreditCard },
        { label: 'Revenue Reports', href: '/dashboard/finance/reports', icon: BarChart3 },
      ],
    },
    {
      label: 'Construction',
      href: '/dashboard/construction',
      icon: Hammer,
      children: [
        { label: 'Projects', href: '/dashboard/construction/projects', icon: Building },
        { label: 'Phases', href: '/dashboard/construction/phases', icon: ClipboardList },
        { label: 'Tasks', href: '/dashboard/construction/tasks', icon: Target },
        { label: 'Expenses', href: '/dashboard/construction/expenses', icon: DollarSign },
        { label: 'Documents', href: '/dashboard/construction/documents', icon: FileImage },
      ],
    },
    {
      label: 'Documents',
      href: '/dashboard/documents',
      icon: FileImage,
      children: [
        { label: 'All Documents', href: '/dashboard/documents', icon: FileImage },
        { label: 'Upload Document', href: '/dashboard/documents/upload', icon: FileText },
        { label: 'Document Types', href: '/dashboard/documents/types', icon: Archive },
        { label: 'Approvals', href: '/dashboard/documents/approvals', icon: UserCheck },
      ],
    },
    {
      label: 'Sales Team Management',
      href: '/dashboard/sales-team',
      icon: Briefcase,
      children: [
        { label: 'Team Overview', href: '/dashboard/sales-team', icon: Users },
        { label: 'Performance Reports', href: '/dashboard/sales-team/performance', icon: BarChart3 },
        { label: 'Activity Tracking', href: '/dashboard/sales-team/activities', icon: Activity },
        { label: 'Lead Automation', href: '/dashboard/lead-automation', icon: Target },
      ],
    },
    {
      label: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      children: [
        { label: 'Sales Analytics', href: '/dashboard/analytics/sales', icon: TrendingUp },
        { label: 'Financial Analytics', href: '/dashboard/analytics/financial', icon: PieChart },
        { label: 'Customer Analytics', href: '/dashboard/analytics/customers', icon: Users },
        { label: 'Construction Analytics', href: '/dashboard/analytics/construction', icon: Hammer },
        { label: 'Performance Metrics', href: '/dashboard/analytics/performance', icon: Activity },
      ],
    },
    {
      label: 'User Management',
      href: '/dashboard/settings/users',
      icon: Users,
      children: [
        { label: 'All Users', href: '/dashboard/settings/users', icon: Users },
        { label: 'Add User', href: '/dashboard/settings/users/add', icon: UserCheck },
        { label: 'Roles & Permissions', href: '/dashboard/settings/roles', icon: Shield },
      ],
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      children: [
        { label: 'General', href: '/dashboard/settings', icon: Settings },
        { label: 'System Configuration', href: '/dashboard/settings/system', icon: Wrench },
        { label: 'Backup & Restore', href: '/dashboard/settings/backup', icon: Database },
      ],
    },
  ];

  const accountantItems: MenuItem[] = [
    {
      label: 'Finance Dashboard',
      href: '/dashboard/finance',
      icon: DollarSign,
    },
    {
      label: 'Payments',
      href: '/dashboard/payments',
      icon: CreditCard,
      children: [
        { label: 'All Payments', href: '/dashboard/payments', icon: CreditCard },
        { label: 'Payment Plans', href: '/dashboard/payment-plans', icon: DollarSign },
        { label: 'Pending Approvals', href: '/dashboard/payments?status=pending', icon: Clock },
      ],
    },
    {
      label: 'Finance Management',
      href: '/dashboard/finance',
      icon: DollarSign,
      children: [
        { label: 'Finance Dashboard', href: '/dashboard/finance', icon: DollarSign },
        { label: 'Company Expenses', href: '/dashboard/finance/expenses', icon: CreditCard },
        { label: 'Revenue Reports', href: '/dashboard/finance/reports', icon: BarChart3 },
      ],
    },
    {
      label: 'Financial Analytics',
      href: '/dashboard/analytics/financial',
      icon: PieChart,
      children: [
        { label: 'Financial Analytics', href: '/dashboard/analytics/financial', icon: PieChart },
        { label: 'Revenue Analytics', href: '/dashboard/analytics/revenue', icon: TrendingUp },
      ],
    },
  ];

  // Return appropriate menu items based on role
  switch (role) {
    case 'admin':
      return [...commonItems, ...adminItems];
    case 'sales_manager':
      return [...commonItems, ...salesManagerItems];
    case 'sales_person':
      return [...salesPersonItems];
    case 'accountant':
      return [...commonItems, ...accountantItems];
    default:
      return commonItems;
  }
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isExpanded = (label: string) => expandedItems.includes(label);

  // Get menu items based on user role
  const menuItems = user?.role ? getMenuItemsForRole(user.role) : [];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isItemActive = isActive(item.href) || (hasChildren && item.children?.some(child => isActive(child.href)));

            return (
              <li key={item.label}>
                {hasChildren ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isItemActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </div>
                      {isExpanded(item.label) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {isExpanded(item.label) && (
                      <ul className="mt-2 ml-6 space-y-1">
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                                isActive(child.href)
                                  ? 'bg-primary-50 text-primary-700'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <child.icon className="h-4 w-4" />
                              <span>{child.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
} 