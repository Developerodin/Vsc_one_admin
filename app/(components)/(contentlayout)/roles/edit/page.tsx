"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";

interface FormData {
  name: string;
  description: string;
  navigationAccess: string[];
  departmentAccess: string[];
  status: string;
}

// Mock data for roles
const mockRoles = [
  {
    id: "1",
    name: "Admin",
    description: "Full access to all modules and functionalities",
    navigationAccess: ["dashboard", "leads", "users", "roles", "transactions", "reports", "settings"],
    departmentAccess: ["health", "vehicle", "life", "property", "travel"],
    status: "active",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "2",
    name: "Sales Executive - Health",
    description: "Access to health insurance leads and transactions",
    navigationAccess: ["dashboard", "leads", "transactions"],
    departmentAccess: ["health"],
    status: "active",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "3",
    name: "Sales Executive - Vehicle",
    description: "Access to vehicle insurance leads and transactions",
    navigationAccess: ["dashboard", "leads", "transactions"],
    departmentAccess: ["vehicle"],
    status: "active",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "4",
    name: "Support Staff",
    description: "Access to user management and support features",
    navigationAccess: ["dashboard", "users", "leads"],
    departmentAccess: ["health", "vehicle", "life", "property", "travel"],
    status: "active",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  }
];

// Navigation menu options
const navigationOptions = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'leads', label: 'Leads' },
  { value: 'users', label: 'Users' },
  { value: 'roles', label: 'Roles' },
  { value: 'transactions', label: 'Transactions' },
  { value: 'reports', label: 'Reports' },
  { value: 'settings', label: 'Settings' }
];

// Department options
const departmentOptions = [
  { value: 'health', label: 'Health Insurance' },
  { value: 'vehicle', label: 'Vehicle Insurance' },
  { value: 'life', label: 'Life Insurance' },
  { value: 'property', label: 'Property Insurance' },
  { value: 'travel', label: 'Travel Insurance' }
];

const EditRole = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleId = searchParams.get('id');
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    navigationAccess: [],
    departmentAccess: [],
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!roleId) {
      router.push('/roles/roles');
      return;
    }
    fetchRoleData();
  }, [roleId]);

  const fetchRoleData = async () => {
    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find the role in mock data
      const roleData = mockRoles.find(role => role.id === roleId);
      
      if (roleData) {
        setFormData({
          name: roleData.name || '',
          description: roleData.description || '',
          navigationAccess: roleData.navigationAccess || [],
          departmentAccess: roleData.departmentAccess || [],
          status: roleData.status || 'active'
        });
      } else {
        console.error('Role not found');
        router.push('/roles/roles');
      }
    } catch (error) {
      console.error('Error fetching role:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, this would be an API call
      console.log('Updating role:', formData);
      
      // For now, just redirect back to the roles list
      router.push('/roles/roles');
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Fragment>
      <Seo title={"Edit Role"} />
      <Pageheader currentpage="Edit Role" activepage="Roles" mainpage="Roles" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Edit Role</h5>
            </div>
            <div className="box-body">
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'general'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('general')}
                >
                  General Information
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'access'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('access')}
                >
                  Access Control
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {activeTab === 'general' && (
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Role Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter role name"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="form-control"
                        rows={3}
                        placeholder="Enter role description"
                      />
                    </div>
                    <div>
                      <label className="form-label">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === 'access' && (
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Navigation Access</label>
                      <div className="grid grid-cols-2 gap-4">
                        {navigationOptions.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`nav-${option.value}`}
                              checked={formData.navigationAccess.includes(option.value)}
                              onChange={(e) => {
                                const newAccess = e.target.checked
                                  ? [...formData.navigationAccess, option.value]
                                  : formData.navigationAccess.filter(v => v !== option.value);
                                setFormData(prev => ({
                                  ...prev,
                                  navigationAccess: newAccess
                                }));
                              }}
                              className="form-checkbox"
                            />
                            <label htmlFor={`nav-${option.value}`} className="ml-2">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Department Access</label>
                      <div className="grid grid-cols-2 gap-4">
                        {departmentOptions.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`dept-${option.value}`}
                              checked={formData.departmentAccess.includes(option.value)}
                              onChange={(e) => {
                                const newAccess = e.target.checked
                                  ? [...formData.departmentAccess, option.value]
                                  : formData.departmentAccess.filter(v => v !== option.value);
                                setFormData(prev => ({
                                  ...prev,
                                  departmentAccess: newAccess
                                }));
                              }}
                              className="form-checkbox"
                            />
                            <label htmlFor={`dept-${option.value}`} className="ml-2">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    className="ti-btn ti-btn-light"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ti-btn ti-btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Role'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default function ProtectedEditRole() {
  return (
    <ProtectedRoute>
      <EditRole />
    </ProtectedRoute>
  );
} 