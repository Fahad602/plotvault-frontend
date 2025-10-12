'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Edit,
} from 'lucide-react';
import CustomerBookings from '@/components/CustomerBookings';

interface Customer {
  id: string;
  cnic: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  bookingsCount: number;
  totalInvested: number;
}

export default function ViewCustomerPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const customerId = params.id as string;
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/dashboard/login');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated && customerId) {
      fetchCustomer();
    }
  }, [isAuthenticated, customerId]);

  const fetchCustomer = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${apiUrl}/api/v1/customers/${customerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCustomer(data);
      } else {
        console.error('Failed to fetch customer');
        router.push('/dashboard/customers');
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      router.push('/dashboard/customers');
    } finally {
      setIsLoadingCustomer(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
    }).format(amount);
  };

  const formatCNIC = (cnic: string) => {
    if (cnic.length === 13) {
      return `${cnic.slice(0, 5)}-${cnic.slice(5, 12)}-${cnic.slice(12)}`;
    }
    return cnic;
  };

  if (isLoading || isLoadingCustomer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !customer) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/dashboard/customers')}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Details</h1>
            <p className="text-gray-600">View customer information and history</p>
          </div>
        </div>
        <button
          onClick={() => router.push(`/dashboard/customers/edit/${customer.id}`)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <Edit className="-ml-1 mr-2 h-5 w-5" />
          Edit Customer
        </button>
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
              <Users className="h-10 w-10 text-primary-600" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{customer.fullName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{customer.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{customer.email}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{formatCNIC(customer.cnic)}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{customer.address}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">
                    Joined {new Date(customer.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Bookings:</span>
              <span className="font-medium text-gray-900">{customer.bookingsCount} bookings</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Invested:</span>
              <span className="font-medium text-gray-900">{formatCurrency(customer.totalInvested)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Customer ID:</span>
              <span className="font-medium text-gray-900">{customer.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated:</span>
              <span className="font-medium text-gray-900">
                {new Date(customer.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Bookings */}
      <CustomerBookings customerId={customerId} />
    </div>
  );
}
