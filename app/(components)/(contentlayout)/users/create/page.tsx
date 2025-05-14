"use client";
import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import Select from "react-select";

interface FormData {
  // General Information
  name: string;
  email: string;
  mobileNumber: string;
  role: string;
  status: string;
  profilePicture: File | null;
  
  // Address
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  
  // KYC Details
  kycDetails: {
    aadhaarNumber: string;
    panNumber: string;
    kycStatus: string;
    documents: Array<{
      type: string;
      url: string;
      verified: boolean;
    }>;
  };
  
  // Bank Details
  bankAccounts: string[];
  
  // Statistics
  totalCommission: number;
  totalLeads: number;
  totalSales: number;
  lastLogin: Date | null;
  
  // Verification
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  emailVerification: {
    token: string;
    expiresAt: Date | null;
    verified: boolean;
  };
  mobileVerification: {
    token: string;
    expiresAt: Date | null;
    verified: boolean;
  };
  
  // Metadata
  metadata: Record<string, any>;
}

const CreateUser = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobileNumber: "",
    role: "user",
    status: "pending",
    profilePicture: null,
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India"
    },
    kycDetails: {
      aadhaarNumber: "",
      panNumber: "",
      kycStatus: "pending",
      documents: []
    },
    bankAccounts: [],
    totalCommission: 0,
    totalLeads: 0,
    totalSales: 0,
    lastLogin: null,
    isEmailVerified: false,
    isMobileVerified: false,
    emailVerification: {
      token: "",
      expiresAt: null,
      verified: false
    },
    mobileVerification: {
      token: "",
      expiresAt: null,
      verified: false
    },
    metadata: {}
  });

  const tabs = [
    { name: 'General Information', icon: 'ri-user-line' },
    { name: 'Address', icon: 'ri-map-pin-line' },
    { name: 'KYC Details', icon: 'ri-file-list-3-line' },
    { name: 'Bank Details', icon: 'ri-bank-line' },
    { name: 'Statistics', icon: 'ri-line-chart-line' },
    { name: 'Verification', icon: 'ri-shield-check-line' },
    { name: 'Metadata', icon: 'ri-settings-4-line' }
  ];

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(`${Base_url}users`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push('/users');
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Seo title={"Create User"} />
      <Pageheader currentpage="Create User" activepage="Users" mainpage="Create User" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Create New User</h5>
            </div>
            <div className="box-body">
              <div className="flex space-x-2 border-b border-gray-200">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
                      activeTab === index
                        ? 'bg-primary text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    <i className={`${tab.icon} mr-2`}></i>
                    {tab.name}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                {activeTab === 0 && (
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="form-label">Mobile Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="form-label">Role</label>
                      <Select
                        options={[
                          { value: 'user', label: 'User' },
                          { value: 'admin', label: 'Admin' }
                        ]}
                        value={{ value: formData.role, label: formData.role.charAt(0).toUpperCase() + formData.role.slice(1) }}
                        onChange={(option) => setFormData({...formData, role: option?.value || 'user'})}
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="form-label">Status</label>
                      <Select
                        options={[
                          { value: 'pending', label: 'Pending' },
                          { value: 'active', label: 'Active' },
                          { value: 'inactive', label: 'Inactive' }
                        ]}
                        value={{ value: formData.status, label: formData.status.charAt(0).toUpperCase() + formData.status.slice(1) }}
                        onChange={(option) => setFormData({...formData, status: option?.value || 'pending'})}
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="form-label">Profile Picture</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFormData({...formData, profilePicture: e.target.files?.[0] || null})}
                      />
                    </div>
                  </div>
                )}
                {activeTab === 1 && (
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <label className="form-label">Street</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.address.street}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: {...formData.address, street: e.target.value}
                        })}
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.address.city}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: {...formData.address, city: e.target.value}
                        })}
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.address.state}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: {...formData.address, state: e.target.value}
                        })}
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="form-label">Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.address.pincode}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: {...formData.address, pincode: e.target.value}
                        })}
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="form-label">Country</label>
                      <Select
                        options={[
                          { value: 'India', label: 'India' },
                          { value: 'USA', label: 'USA' },
                          { value: 'UK', label: 'UK' }
                        ]}
                        value={{ value: formData.address.country, label: formData.address.country }}
                        onChange={(option) => setFormData({
                          ...formData,
                          address: {...formData.address, country: option?.value || 'India'}
                        })}
                      />
                    </div>
                  </div>
                )}
                {/* Add other tab content */}
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  className="ti-btn ti-btn-light"
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="ti-btn ti-btn-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default function ProtectedCreateUser() {
  return (
    <ProtectedRoute>
      <CreateUser />
    </ProtectedRoute>
  );
} 