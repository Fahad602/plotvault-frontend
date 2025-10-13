'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface CSVUploadProps {
  onUploadComplete?: (result: any) => void;
}

export default function CSVUpload({ onUploadComplete }: CSVUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        setError('Please select a CSV file');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size too large. Maximum 5MB allowed');
        return;
      }
      setFile(selectedFile);
      setError(null);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    const token = localStorage.getItem('access_token');
    if (!file || !token) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:3001/api/v1/leads/import/csv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        if (onUploadComplete) {
          onUploadComplete(data);
        }
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (err) {
      setError('Network error. Please check if the backend server is running.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const validateFile = async () => {
    const token = localStorage.getItem('access_token');
    if (!file || !token) return;

    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:3001/api/v1/leads/import/validate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ validation: data });
      } else {
        setError(data.message || 'Validation failed');
      }
    } catch (err) {
      setError('Network error during validation');
      console.error('Validation error:', err);
    }
  };

  // Check if user has permission to upload CSV
  const canUpload = user && (user.role === 'admin' || user.role === 'sales_manager');

  if (!canUpload) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">You don't have permission to upload CSV files.</p>
        <p className="text-red-500 text-sm">Only Sales Managers and Admins can upload leads.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Import Leads from CSV</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="csv-file" className="block text-sm font-medium text-gray-700 mb-2">
            Select CSV File
          </label>
          <input
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            Maximum file size: 5MB. Required columns: fullName, email, phone, source
          </p>
        </div>

        {file && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-medium">Selected file:</p>
            <p className="text-sm text-gray-600">{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            {result.validation ? (
              <div>
                <p className="text-green-600 font-medium">Validation Successful</p>
                <p className="text-green-600 text-sm">
                  File is valid. {result.validation.data.totalRows} rows found.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-green-600 font-medium">Import Successful</p>
                <p className="text-green-600 text-sm">
                  Imported {result.data.successfulImports} out of {result.data.totalRows} leads
                </p>
                {result.data.failedImports > 0 && (
                  <p className="text-yellow-600 text-sm">
                    {result.data.failedImports} leads failed to import
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={validateFile}
            disabled={!file || uploading}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Validate File
          </button>
          
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Import Leads'}
          </button>
        </div>

        {result?.data?.errors && result.data.errors.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-600 font-medium">Import Errors:</p>
            <ul className="text-yellow-600 text-sm list-disc list-inside">
              {result.data.errors.slice(0, 5).map((error: string, index: number) => (
                <li key={index}>{error}</li>
              ))}
              {result.data.errors.length > 5 && (
                <li>... and {result.data.errors.length - 5} more errors</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
