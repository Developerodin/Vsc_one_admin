"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import Select from 'react-select';
import { Base_url } from '@/app/api/config/BaseUrl';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  type: string;
  status: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  products: string[];
  navigation: {
    sidebar: string[];
    theme: string;
  };
}

const EditAdminUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  
  console.log('Edit page - userId from URL:', userId);
  
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: 'admin',
    products: [],
    navigation: {
      sidebar: ['dashboard'],
      theme: 'light'
    }
  });

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'superAdmin', label: 'Super Admin' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
  ];

  const sidebarOptions = [
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'category', label: 'Category' },
    { value: 'products', label: 'Products' },
    { value: 'roles', label: 'Roles' },
    { value: 'admin-users', label: 'Admin Users' },
    { value: 'users', label: 'Users' },
    { value: 'transactions', label: 'Transactions' },
    { value: 'leads', label: 'Leads' },
    { value: 'leadsFields', label: 'Leads Fields' },
    { value: 'commissions', label: 'Commissions' },
    { value: 'withdrawal', label: 'Withdrawals' }
  ];

  useEffect(() => {
    if (userId && userId !== 'undefined' && userId !== 'null') {
      fetchAdminUserData();
      fetchProducts();
    } else {
      console.error('Invalid userId:', userId);
      alert('Invalid user ID. Please check the URL.');
      router.push('/admin-users/admin-users');
    }
  }, [userId, router]);

  // Debug formData changes
  useEffect(() => {
    console.log('Form data updated:', formData);
  }, [formData]);

  const fetchAdminUserData = async () => {
    if (!userId || userId === 'undefined' || userId === 'null') {
      console.error('Invalid userId for fetchAdminUserData:', userId);
      return;
    }
    
    try {
      setLoadingData(true);
      const token = localStorage.getItem("token");
      console.log('Fetching admin user data for userId:', userId);
      const response = await axios.get(`${Base_url}admin-users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      console.log('User data received:', userData);
      console.log('Products data:', userData.products);
      
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        password: '', // Don't pre-fill password
        role: userData.role || 'admin',
        products: userData.products?.map((p: any) => p.id || p._id) || [],
        navigation: userData.navigation || {
          sidebar: ['dashboard'],
          theme: 'light'
        }
      });
    } catch (error) {
      console.error('Error fetching admin user data:', error);
      alert('Failed to load admin user data');
    } finally {
      setLoadingData(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}products?limit=100&status=active`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const productsData = response.data.results.map((product: any) => ({
        _id: product.id,
        name: product.name,
        type: product.type,
        status: product.status
      }));
      
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (selectedOption: any, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: selectedOption?.value || ''
    }));
  };

  const handleMultiSelectChange = (selectedOptions: any, field: string) => {
    const values = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleNavigationChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      navigation: {
        ...prev.navigation,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId || userId === 'undefined' || userId === 'null') {
      alert('Invalid user ID. Please check the URL.');
      return;
    }
    
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.password && formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log('Updating admin user with userId:', userId);
      
      // Prepare update data - only include password if it's provided
      const updateData: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        products: formData.products,
        navigation: formData.navigation
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await axios.put(`${Base_url}admin-users/${userId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.data) {
        alert('Admin user updated successfully!');
        router.push('/admin-users/admin-users');
      }
    } catch (error: any) {
      console.error('Error updating admin user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update admin user';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    if (userId) {
      fetchAdminUserData();
    }
  };

  const productOptions = products.map(product => ({
    value: product._id,
    label: `${product.name} (${product.type})`
  }));

  console.log('Available products:', products);
  console.log('Product options:', productOptions);
  console.log('Form data products:', formData.products);
  console.log('Selected products for display:', productOptions.filter(option => formData.products.includes(option.value)));

  // Check if userId is valid
  if (!userId || userId === 'undefined' || userId === 'null') {
    return (
      <Fragment>
        <Seo title={"Edit Admin User"} />
        <Pageheader currentpage="Edit Admin User" activepage="Admin Users" mainpage="Admin Users" />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <div className="box">
              <div className="box-body text-center py-8">
                <i className="ri-error-warning-line text-6xl text-danger mb-4"></i>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Invalid User ID</h4>
                <p className="text-gray-600 mb-4">The user ID in the URL is invalid or missing.</p>
                <button
                  onClick={() => router.push('/admin-users/admin-users')}
                  className="ti-btn ti-btn-primary"
                >
                  <i className="ri-arrow-left-line mr-2"></i> Back to Admin Users
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  if (loadingData) {
    return (
      <Fragment>
        <Seo title={"Edit Admin User"} />
        <Pageheader currentpage="Edit Admin User" activepage="Admin Users" mainpage="Admin Users" />
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

  return (
    <Fragment>
      <Seo title={"Edit Admin User"} />
      <Pageheader currentpage="Edit Admin User" activepage="Admin Users" mainpage="Admin Users" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Edit Admin User</h5>
            </div>
            <div className="box-body">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter admin user name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter new password (leave blank to keep current)"
                      minLength={8}
                    />
                    <small className="text-gray-500">Leave blank to keep current password</small>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <Select
                      options={roleOptions}
                      value={roleOptions.find(option => option.value === formData.role)}
                      onChange={(selectedOption) => handleSelectChange(selectedOption, 'role')}
                      placeholder="Select Role"
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>

                {/* Products Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Products
                  </label>
                  {loadingProducts ? (
                    <div className="text-center py-4">Loading products...</div>
                  ) : (
                    <Select
                      isMulti
                      options={productOptions}
                      value={productOptions.filter(option => formData.products.includes(option.value))}
                      onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'products')}
                      placeholder="Select products (optional)"
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  )}
                </div>

                {/* Navigation Settings */}
                <div className="border-t pt-6">
                  <h6 className="text-lg font-semibold mb-4">Navigation Settings</h6>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sidebar Items
                      </label>
                      <Select
                        isMulti
                        options={sidebarOptions}
                        value={sidebarOptions.filter(option => formData.navigation.sidebar.includes(option.value))}
                        onChange={(selectedOptions) => {
                          const values = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
                          handleNavigationChange('sidebar', values);
                        }}
                        placeholder="Select sidebar items"
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Theme
                      </label>
                      <Select
                        options={themeOptions}
                        value={themeOptions.find(option => option.value === formData.navigation.theme)}
                        onChange={(selectedOption) => handleNavigationChange('theme', selectedOption?.value || 'light')}
                        placeholder="Select theme"
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="ti-btn ti-btn-light"
                  >
                    <i className="ri-refresh-line font-semibold align-middle mr-1"></i> Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/admin-users/admin-users')}
                    className="ti-btn ti-btn-secondary"
                  >
                    <i className="ri-arrow-left-line font-semibold align-middle mr-1"></i> Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="ti-btn ti-btn-primary"
                  >
                    {loading ? (
                      <>
                        <i className="ri-loader-4-line font-semibold align-middle mr-1 animate-spin"></i> Updating...
                      </>
                    ) : (
                      <>
                        <i className="ri-save-line font-semibold align-middle mr-1"></i> Update Admin User
                      </>
                    )}
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

export default function ProtectedEditAdminUser() {
  return (
    <ProtectedRoute>
      <EditAdminUser />
    </ProtectedRoute>
  );
}
