"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import { Base_url } from '@/app/api/config/BaseUrl';
import axios from 'axios';

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isEmailVerified: boolean;
  products: Array<{
    _id: string;
    name: string;
    type: string;
    status: string;
  }>;
  navigation: {
    sidebar: string[];
    theme: string;
  };
  createdAt: string;
  updatedAt: string;
}

const ViewAdminUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchAdminUserData();
    }
  }, [userId]);

  const fetchAdminUserData = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}admin-users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdminUser(response.data);
    } catch (error) {
      console.error('Error fetching admin user data:', error);
      setError('Failed to load admin user data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: '!bg-success/10 !text-success',
      inactive: '!bg-danger/10 !text-danger',
      pending: '!bg-warning/10 !text-warning'
    };
    
    return (
      <span className={`badge ${statusClasses[status as keyof typeof statusClasses] || '!bg-gray/10 !text-gray'}`}>
        {status || 'Unknown'}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleClasses = {
      admin: '!bg-primary/10 !text-primary',
      superAdmin: '!bg-warning/10 !text-warning'
    };
    
    return (
      <span className={`badge ${roleClasses[role as keyof typeof roleClasses] || '!bg-gray/10 !text-gray'}`}>
        {role || 'Unknown'}
      </span>
    );
  };

  if (loading) {
    return (
      <Fragment>
        <Seo title={"View Admin User"} />
        <Pageheader currentpage="View Admin User" activepage="Admin Users" mainpage="Admin Users" />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <div className="box">
              <div className="box-body text-center py-8">
                <i className="ri-loader-4-line text-2xl animate-spin"></i>
                <p className="mt-2">Loading admin user data...</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  if (error || !adminUser) {
    return (
      <Fragment>
        <Seo title={"View Admin User"} />
        <Pageheader currentpage="View Admin User" activepage="Admin Users" mainpage="Admin Users" />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <div className="box">
              <div className="box-body text-center py-8">
                <i className="ri-error-warning-line text-2xl text-danger"></i>
                <p className="mt-2 text-danger">{error || 'Admin user not found'}</p>
                <button
                  onClick={() => router.push('/admin-users/admin-users')}
                  className="ti-btn ti-btn-primary mt-4"
                >
                  <i className="ri-arrow-left-line font-semibold align-middle mr-1"></i> Back to Admin Users
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Seo title={"View Admin User"} />
      <Pageheader currentpage="View Admin User" activepage="Admin Users" mainpage="Admin Users" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Admin User Details</h5>
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push(`/admin-users/edit?id=${adminUser._id}`)}
                  className="ti-btn ti-btn-warning !py-1 !px-2 !text-[0.75rem]"
                >
                  <i className="ri-edit-line font-semibold align-middle mr-1"></i> Edit
                </button>
                <button
                  onClick={() => router.push('/admin-users/admin-users')}
                  className="ti-btn ti-btn-secondary !py-1 !px-2 !text-[0.75rem]"
                >
                  <i className="ri-arrow-left-line font-semibold align-middle mr-1"></i> Back
                </button>
              </div>
            </div>
            <div className="box-body">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h6 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h6>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                      <p className="text-gray-900 font-medium">{adminUser.name}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                      <p className="text-gray-900">{adminUser.email}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                      <div className="mt-1">
                        {getRoleBadge(adminUser.role)}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                      <div className="mt-1">
                        {getStatusBadge(adminUser.status)}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Email Verified</label>
                      <div className="mt-1">
                        {adminUser.isEmailVerified ? (
                          <span className="badge !bg-success/10 !text-success">Verified</span>
                        ) : (
                          <span className="badge !bg-warning/10 !text-warning">Not Verified</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products & Navigation */}
                <div className="space-y-6">
                  {/* Products */}
                  <div>
                    <h6 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Assigned Products</h6>
                    {adminUser.products && adminUser.products.length > 0 ? (
                      <div className="space-y-2">
                        {adminUser.products.map((product, index) => (
                          <div key={product._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.type}</p>
                            </div>
                            <span className={`badge ${product.status === 'active' ? '!bg-success/10 !text-success' : '!bg-warning/10 !text-warning'}`}>
                              {product.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No products assigned</p>
                    )}
                  </div>

                  {/* Navigation Settings */}
                  <div>
                    <h6 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Navigation Settings</h6>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Sidebar Items</label>
                        <div className="flex flex-wrap gap-2">
                          {adminUser.navigation?.sidebar?.map((item, index) => (
                            <span key={index} className="badge !bg-primary/10 !text-primary">
                              {item}
                            </span>
                          )) || <span className="text-gray-500 italic">No sidebar items configured</span>}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Theme</label>
                        <span className={`badge ${adminUser.navigation?.theme === 'dark' ? '!bg-gray/10 !text-gray' : '!bg-yellow/10 !text-yellow'}`}>
                          {adminUser.navigation?.theme || 'light'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="mt-8 pt-6 border-t">
                <h6 className="text-lg font-semibold text-gray-800 mb-4">Timestamps</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Created At</label>
                    <p className="text-gray-900">
                      {adminUser.createdAt ? new Date(adminUser.createdAt).toLocaleString() : '--'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Updated At</label>
                    <p className="text-gray-900">
                      {adminUser.updatedAt ? new Date(adminUser.updatedAt).toLocaleString() : '--'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default function ProtectedViewAdminUser() {
  return (
    <ProtectedRoute>
      <ViewAdminUser />
    </ProtectedRoute>
  );
}
