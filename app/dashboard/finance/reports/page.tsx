'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  PieChart,
  FileText,
  Filter,
} from 'lucide-react';

export default function FinancialReportsPage() {
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
        <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Revenue Reports</h3>
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Plot sales, payment collections, and revenue trends
          </p>
          <button className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
            View Revenue Reports
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Expense Reports</h3>
            <PieChart className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Construction, marketing, and operational expenses
          </p>
          <button className="w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100">
            View Expense Reports
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Profit & Loss</h3>
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Monthly and yearly P&L statements
          </p>
          <button className="w-full px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
            View P&L Reports
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Cash Flow</h3>
            <DollarSign className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Cash inflows, outflows, and balance tracking
          </p>
          <button className="w-full px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
            View Cash Flow
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Tax Reports</h3>
            <FileText className="h-6 w-6 text-orange-600" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Tax calculations and compliance reports
          </p>
          <button className="w-full px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100">
            View Tax Reports
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Custom Reports</h3>
            <BarChart3 className="h-6 w-6 text-gray-600" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Build custom financial reports and analytics
          </p>
          <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100">
            Create Custom Report
          </button>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Comprehensive Financial Reporting</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Generate detailed financial reports including revenue analysis, expense breakdowns, 
            profit & loss statements, cash flow reports, and tax documentation. Export reports 
            in multiple formats for accounting and compliance purposes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-3">Automated Reports</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Monthly revenue and collection reports</li>
                <li>• Expense categorization and analysis</li>
                <li>• Profit margin and ROI calculations</li>
                <li>• Cash flow projections</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-3">Export & Integration</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• PDF, Excel, and CSV export formats</li>
                <li>• Integration with accounting software</li>
                <li>• Scheduled report delivery</li>
                <li>• Tax compliance documentation</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6">Advanced reporting features coming soon</p>
        </div>
      </div>
    </div>
  );
}
