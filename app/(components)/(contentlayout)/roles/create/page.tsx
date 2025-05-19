"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from 'axios';
import { Base_url } from '@/app/api/config/BaseUrl';

interface FormData {
  name: string;
  description: string;
  navigationAccess: string[];
  permissions: string[];
  status: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  isActive: boolean;
}

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

const CreateRole = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    navigationAccess: [],
    permissions: [],
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loadingPermissions, setLoadingPermissions] = useState(true);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      setLoadingPermissions(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}permissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPermissions(response.data.results);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    } finally {
      setLoadingPermissions(false);
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
      const token = localStorage.getItem("token");
      // Only send the required fields to the API
      const apiData = {
        name: formData.name,
        description: formData.description,
        isActive: formData.status === 'active'
      };

      await axios.post(`${Base_url}roles`, apiData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push('/roles/roles');
    } catch (error) {
      console.error('Error creating role:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Seo title={"Create Role"} />
      <Pageheader currentpage="Create Role" activepage="Roles" mainpage="Roles" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Create New Role</h5>
            </div>
            <div className="box-body">
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
                    activeTab === 'general'
                      ? 'bg-primary text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('general')}
                >
                  General Information
                </button>
                {/* <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
                    activeTab === 'access'
                      ? 'bg-primary text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('access')}
                >
                  Access Control
                </button> */}
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
                      <label className="form-label">Permissions</label>
                      {loadingPermissions ? (
                        <div className="text-center py-4">Loading permissions...</div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          {permissions.map((permission) => (
                            <div key={permission.id} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`perm-${permission.id}`}
                                checked={formData.permissions.includes(permission.id)}
                                onChange={(e) => {
                                  const newPermissions = e.target.checked
                                    ? [...formData.permissions, permission.id]
                                    : formData.permissions.filter(v => v !== permission.id);
                                  setFormData(prev => ({
                                    ...prev,
                                    permissions: newPermissions
                                  }));
                                }}
                                className="form-checkbox"
                              />
                              <label htmlFor={`perm-${permission.id}`} className="ml-2">
                                {permission.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
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
                    {loading ? 'Creating...' : 'Create Role'}
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

export default function ProtectedCreateRole() {
  return (
    <ProtectedRoute>
      <CreateRole />
    </ProtectedRoute>
  );
} 