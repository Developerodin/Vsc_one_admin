"use client";
import React, { Fragment, useEffect, useState } from 'react';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import Link from 'next/link';
import DataTable from '@/shared/components/DataTable';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


interface BankAccount {
  status: string;
  isDefault: boolean;
  documents: any[];
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  agent: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Agent {
  name: string;
  email: string;
  mobileNumber: string;
  status: string;
  kycStatus: string;
  profilePicture?: string;
  bankAccounts: BankAccount[];
  id: string;
}

interface Product {
  commission: {
    minAmount: number;
    bonus: number;
    percentage: number;
    maxAmount: number;
  };
  pricing: {
    currency: string;
    basePrice: number;
    discounts: any[];
  };
  loanAmount: {
    min: number;
    max: number;
  };
  tenure: {
    min: number;
    max: number;
  };
  categories: string[];
  features: string[];
  terms: string[];
  status: string;
  documents: any[];
  name: string;
  type: string;
  description: string;
  eligibility: string;
  interestRate: number;
  images: any[];
  metadata: any;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Commission {
  bonus: number;
  status: string;
  product: Product;
  lead: string;
  amount: number;
  percentage: number;
  baseAmount: number;
  agent: Agent;
  createdAt: string;
  updatedAt: string;
  id: string;
}

const Commissions = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCommission, setEditingCommission] = useState<Commission | null>(null);
  const [editPercentage, setEditPercentage] = useState('');
  const [showBankDetailsModal, setShowBankDetailsModal] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);

  useEffect(() => {
    fetchCommissions();
  }, [currentPage, itemsPerPage, selectedStatus, startDate, endDate]);

  // Separate useEffect for search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== undefined) {
        fetchCommissions();
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const fetchCommissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('limit', itemsPerPage.toString());
      params.append('page', currentPage.toString());
      
      if (selectedStatus) {
        params.append('status', selectedStatus);
      }
      
      if (startDate) {
        params.append('startDate', startDate.toISOString().split('T')[0]);
      }
      
      if (endDate) {
        params.append('endDate', endDate.toISOString().split('T')[0]);
      }
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      const apiUrl = `${Base_url}commissions?${params.toString()}`;
      console.log('Commissions API URL:', apiUrl);
      console.log('Search Query:', searchQuery);
      
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('Commissions API Response:', response.data);
      console.log('Commissions Data Structure:', JSON.stringify(response.data, null, 2));

      const commissionsData = Array.isArray(response.data) ? response.data : response.data.results;
      
      // Ensure commissionsData is always an array and filter out invalid entries
      const validCommissions = Array.isArray(commissionsData) 
        ? commissionsData.filter(commission => 
            commission && 
            typeof commission === 'object' && 
            commission.id
          )
        : [];
      
      if (!Array.isArray(response.data)) {
        setTotalPages(response.data.totalPages || 1);
        setTotalResults(response.data.totalResults || validCommissions.length);
      } else {
        setTotalPages(1);
        setTotalResults(validCommissions.length);
      }

      setCommissions(validCommissions);
    } catch (error) {
      console.error("Error fetching commissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (commissionId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${Base_url}commissions/${commissionId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCommissions();
    } catch (error) {
      console.error("Error updating commission status:", error);
    }
  };

  const handleEditCommission = (commission: Commission) => {
    setEditingCommission(commission);
    setEditPercentage(commission.percentage.toString());
    setShowEditModal(true);
  };

  const handleUpdateCommission = async () => {
    if (!editingCommission || !editPercentage) return;
    
    try {
      const token = localStorage.getItem("token");
      const newPercentage = parseFloat(editPercentage);
      
      if (isNaN(newPercentage) || newPercentage < 0 || newPercentage > 100) {
        alert('Please enter a valid percentage between 0 and 100');
        return;
      }

      await axios.patch(
        `${Base_url}commissions/${editingCommission.id}`,
        { percentage: newPercentage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setShowEditModal(false);
      setEditingCommission(null);
      setEditPercentage('');
      fetchCommissions(); // Refresh the data
    } catch (error) {
      console.error("Error updating commission percentage:", error);
      alert('Failed to update commission percentage');
    }
  };

  const handleShowBankDetails = (commission: Commission) => {
    setSelectedCommission(commission);
    setShowBankDetailsModal(true);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-warning text-white';
      case 'approved':
        return 'bg-success text-white';
      case 'paid':
        return 'bg-info text-white';
      case 'cancelled':
        return 'bg-danger text-white';
      default:
        return 'bg-primary text-white';
    }
  };

  const tableHeaders = [
    { key: 'product', label: 'Product', sortable: false },
    { key: 'agent', label: 'Agent', sortable: false },
    { key: 'baseAmount', label: 'Base Amount', sortable: false },
    { key: 'percentage', label: 'Commission %', sortable: false },
    { key: 'amount', label: 'Commission Amount', sortable: false },
    { key: 'status', label: 'Status', sortable: false },
    { key: 'createdAt', label: 'Created At', sortable: false },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  const tableData = commissions.map(commission => ({
    product: commission.product ? (
      <Link href={`/products/products?id=${commission.product.id || ''}`} className="text-primary hover:underline">
        {commission.product.name || 'N/A'}
      </Link>
    ) : (
      <span className="text-muted">No Product</span>
    ),
    agent: commission.agent && typeof commission.agent === 'object' ? (
      <div>
        <div className="font-medium">{commission.agent.name || 'N/A'}</div>
        <div className="text-sm text-muted">{commission.agent.email || 'N/A'}</div>
      </div>
    ) : (
      <span className="text-muted">No Agent</span>
    ),
    baseAmount: `₹${commission.baseAmount || 0}`,
    percentage: (
      <div className="flex items-center gap-2">
        <span>{commission.percentage || 0}%</span>
        <button
          onClick={() => handleEditCommission(commission)}
          className="ti-btn ti-btn-sm ti-btn-outline-primary"
          title="Edit Commission Percentage"
        >
          <i className="ri-edit-line"></i>
        </button>
      </div>
    ),
    amount: `₹${commission.amount || 0}`,
    status: (
      <span className={`badge ${getStatusBadgeClass(commission.status || 'pending')}`}>
        {commission.status || 'pending'}
      </span>
    ),
    createdAt: commission.createdAt 
      ? new Date(commission.createdAt).toLocaleDateString() 
      : 'N/A',
    actions: [
      {
        icon: 'ri-bank-line',
        className: 'ti-btn-info',
        onClick: () => handleShowBankDetails(commission),
        title: 'View Bank Details'
      },
      ...(commission.status === 'pending' ? [
        {
          icon: 'ri-check-line',
          className: 'ti-btn-success',
          onClick: () => handleStatusChange(commission.id, 'approved'),
          title: 'Approve'
        }
      ] : []),
      ...(commission.status === 'approved' ? [
        {
          icon: 'ri-money-dollar-line',
          className: 'ti-btn-info',
          onClick: () => handleStatusChange(commission.id, 'paid'),
          title: 'Mark as Paid'
        }
      ] : []),
      ...(commission.status !== 'cancelled' ? [
        {
          icon: 'ri-close-line',
          className: 'ti-btn-danger',
          onClick: () => handleStatusChange(commission.id, 'cancelled'),
          title: 'Cancel'
        }
      ] : [])
    ]
  }));

  const statusFilterOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'paid', label: 'Paid' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const clearFilters = () => {
    setSelectedStatus('');
    setStartDate(null);
    setEndDate(null);
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <Fragment>
      <Seo title={"Commissions"} />
      <Pageheader currentpage="Commissions" activepage="Pages" mainpage="Commissions" />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Commissions List</h5>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="ti-btn ti-btn-secondary !py-1 !px-2 !text-[0.75rem]"
                >
                  <i className="ri-filter-line font-semibold align-middle"></i> Filters
                </button>
              </div>
            </div>
            
            {/* Filters Section */}
            {showFilters && (
              <div className="box-body border-b">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <Select
                      value={statusFilterOptions.find(option => option.value === selectedStatus)}
                      onChange={(selectedOption) => setSelectedStatus(selectedOption?.value || '')}
                      options={statusFilterOptions}
                      placeholder="Select Status"
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select Start Date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      maxDate={endDate || new Date()}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select End Date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      minDate={startDate || undefined}
                      maxDate={new Date()}
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="ti-btn ti-btn-outline-secondary !py-2 !px-4 !text-[0.75rem] w-full"
                    >
                      <i className="ri-refresh-line font-semibold align-middle"></i> Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="box-body">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <DataTable
                  headers={tableHeaders}
                  data={tableData}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                  }}
                  totalItems={totalResults}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={(size) => {
                    setItemsPerPage(size);
                    setCurrentPage(1); // Reset to first page when changing page size
                  }}
                  onSearch={handleSearch}
                  searchQuery={searchQuery}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Commission Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Edit Commission Percentage</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCommission(null);
                  setEditPercentage('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commission Percentage (%)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={editPercentage}
                  onChange={(e) => setEditPercentage(e.target.value)}
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="Enter percentage (0-100)"
                />
              </div>
              
              {editingCommission && (
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600">
                    <strong>Product:</strong> {editingCommission.product?.name}<br/>
                    <strong>Agent:</strong> {editingCommission.agent?.name}<br/>
                    <strong>Current Percentage:</strong> {editingCommission.percentage}%<br/>
                    <strong>Base Amount:</strong> ₹{editingCommission.baseAmount}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCommission(null);
                  setEditPercentage('');
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCommission}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Update Commission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bank Details Modal */}
      {showBankDetailsModal && selectedCommission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Bank Details & Commission Info</h3>
              <button
                onClick={() => {
                  setShowBankDetailsModal(false);
                  setSelectedCommission(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="p-4 space-y-6">
              {/* Commission Details */}
              <div>
                <h4 className="text-md font-semibold mb-3 text-gray-800">Commission Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Product</label>
                    <p className="text-sm text-gray-800">{selectedCommission.product?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Agent</label>
                    <p className="text-sm text-gray-800">{selectedCommission.agent?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Base Amount</label>
                    <p className="text-sm text-gray-800">₹{selectedCommission.baseAmount || 0}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Commission Percentage</label>
                    <p className="text-sm text-gray-800">{selectedCommission.percentage || 0}%</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Commission Amount</label>
                    <p className="text-sm text-gray-800">₹{selectedCommission.amount || 0}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Status</label>
                    <span className={`badge ${getStatusBadgeClass(selectedCommission.status || 'pending')}`}>
                      {selectedCommission.status || 'pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bank Account Details */}
              <div>
                <h4 className="text-md font-semibold mb-3 text-gray-800">Bank Account Details</h4>
                {selectedCommission.agent?.bankAccounts && selectedCommission.agent.bankAccounts.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCommission.agent.bankAccounts.map((bankAccount: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3 bg-gray-50">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <label className="font-medium text-gray-600">Bank Name</label>
                            <p className="text-gray-800">{bankAccount.bankName || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="font-medium text-gray-600">Account Holder</label>
                            <p className="text-gray-800">{bankAccount.accountHolderName || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="font-medium text-gray-600">Account Number</label>
                            <p className="text-gray-800">{bankAccount.accountNumber || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="font-medium text-gray-600">IFSC Code</label>
                            <p className="text-gray-800">{bankAccount.ifscCode || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="font-medium text-gray-600">Status</label>
                            <span className={`badge ${bankAccount.status === 'active' ? 'bg-success text-white' : 'bg-warning text-white'}`}>
                              {bankAccount.status || 'N/A'}
                            </span>
                          </div>
                          <div>
                            <label className="font-medium text-gray-600">Default Account</label>
                            <span className={`badge ${bankAccount.isDefault ? 'bg-info text-white' : 'bg-gray-500 text-white'}`}>
                              {bankAccount.isDefault ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <i className="ri-bank-line text-3xl mb-2"></i>
                    <p>No bank accounts found for this agent</p>
                  </div>
                )}
              </div>

              {/* Status Change Section */}
              <div>
                <h4 className="text-md font-semibold mb-3 text-gray-800">Change Status</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCommission.status !== 'pending' && (
                    <button
                      onClick={() => {
                        handleStatusChange(selectedCommission.id, 'pending');
                        setShowBankDetailsModal(false);
                        setSelectedCommission(null);
                      }}
                      className="px-3 py-2 bg-warning text-white rounded-md hover:bg-warning-dark text-sm"
                    >
                      <i className="ri-time-line mr-1"></i> Mark as Pending
                    </button>
                  )}
                  {selectedCommission.status !== 'approved' && (
                    <button
                      onClick={() => {
                        handleStatusChange(selectedCommission.id, 'approved');
                        setShowBankDetailsModal(false);
                        setSelectedCommission(null);
                      }}
                      className="px-3 py-2 bg-success text-white rounded-md hover:bg-success-dark text-sm"
                    >
                      <i className="ri-check-line mr-1"></i> Approve
                    </button>
                  )}
                  {selectedCommission.status !== 'paid' && (
                    <button
                      onClick={() => {
                        handleStatusChange(selectedCommission.id, 'paid');
                        setShowBankDetailsModal(false);
                        setSelectedCommission(null);
                      }}
                      className="px-3 py-2 bg-info text-white rounded-md hover:bg-info-dark text-sm"
                    >
                      <i className="ri-money-dollar-line mr-1"></i> Mark as Paid
                    </button>
                  )}
                  {selectedCommission.status !== 'cancelled' && (
                    <button
                      onClick={() => {
                        handleStatusChange(selectedCommission.id, 'cancelled');
                        setShowBankDetailsModal(false);
                        setSelectedCommission(null);
                      }}
                      className="px-3 py-2 bg-danger text-white rounded-md hover:bg-danger-dark text-sm"
                    >
                      <i className="ri-close-line mr-1"></i> Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default function ProtectedCommissions() {
  return (
    <ProtectedRoute>
      <Commissions />
    </ProtectedRoute>
  );
} 