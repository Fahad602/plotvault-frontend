'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  DollarSign,
  Plus,
  Building,
  Truck,
  Users,
  FileText,
  Calendar,
  TrendingUp,
} from 'lucide-react';

export default function CompanyExpensesPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/dashboard/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Company Expenses</h1>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </button>
      </div>

      {/* Expense Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Construction</p>
              <p className="text-2xl font-bold text-gray-900">₨0</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <Building className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Marketing</p>
              <p className="text-2xl font-bold text-gray-900">₨0</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Administrative</p>
              <p className="text-2xl font-bold text-gray-900">₨0</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Operations</p>
              <p className="text-2xl font-bold text-gray-900">₨0</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <Truck className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Company Expense Management</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Track and manage all company expenses including construction costs, marketing spend, 
            administrative expenses, and operational costs. Get detailed insights into spending patterns 
            and budget utilization.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <Building className="h-8 w-8 text-orange-500 mb-2" />
              <h4 className="font-medium text-gray-900">Construction Expenses</h4>
              <p className="text-sm text-gray-600">Material costs, labor, equipment, and contractor payments</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <TrendingUp className="h-8 w-8 text-blue-500 mb-2" />
              <h4 className="font-medium text-gray-900">Marketing & Sales</h4>
              <p className="text-sm text-gray-600">Advertising, promotions, sales commissions, and events</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <Users className="h-8 w-8 text-green-500 mb-2" />
              <h4 className="font-medium text-gray-900">Administrative</h4>
              <p className="text-sm text-gray-600">Office rent, utilities, salaries, and general expenses</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6">This feature will be available in the next update</p>
        </div>
      </div>
    </div>
  );
}
