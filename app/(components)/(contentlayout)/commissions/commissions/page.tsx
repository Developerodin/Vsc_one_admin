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
import * as XLSX from "xlsx";


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

interface PaymentDetails {
  bankAccount?: string;
  transactionId?: string;
  paymentDate?: string;
  paymentMethod?: 'bank_transfer' | 'upi' | 'cheque' | 'other';
}

interface BankAccount {
  id: string;
  agent: string;
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  branchName?: string;
  ifscCode: string;
  accountType: string;
  status: string;
  isDefault: boolean;
  documents: any[];
  verificationDetails?: any;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

interface Commission {
  bonus: number;
  status: string;
  product: Product;
  lead: string;
  amount: number;
  baseAmount: number;
  tdsPercentage?: number;
  paymentDetails?: PaymentDetails;
  agent: Agent;
  createdAt: string;
  updatedAt: string;
  id: string;
}

const Commissions = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [filteredCommissions, setFilteredCommissions] = useState<Commission[]>([]);
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
  const [editBaseAmount, setEditBaseAmount] = useState('');
  const [editTdsPercentage, setEditTdsPercentage] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [showBankDetailsModal, setShowBankDetailsModal] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);
  const [showBankAccountModal, setShowBankAccountModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loadingBankAccounts, setLoadingBankAccounts] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState<BankAccount | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentFormData, setPaymentFormData] = useState<{
    transactionId: string;
    paymentDate: string;
    paymentMethod: 'bank_transfer' | 'upi' | 'cheque' | 'other';
  }>({
    transactionId: '',
    paymentDate: '',
    paymentMethod: 'bank_transfer'
  });
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportStartDate, setExportStartDate] = useState<Date | null>(null);
  const [exportEndDate, setExportEndDate] = useState<Date | null>(null);
  const [exportLoading, setExportLoading] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const [userProducts, setUserProducts] = useState<string[]>([]);
  const [hasAccess, setHasAccess] = useState<boolean>(true);

  // Custom input component for DatePicker to ensure calendar opens on click
  const CustomDateInput = ({ value, onClick, placeholder }: any) => (
    <input
      value={value}
      onClick={(e) => {
        console.log('CustomDateInput clicked:', { value, placeholder, event: e });
        onClick(e);
      }}
      placeholder={placeholder}
      readOnly
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
    />
  );

  // Function to check user access based on role and products
  const checkUserAccess = () => {
    try {
      const userDataString = localStorage.getItem('user');
      if (!userDataString) {
        console.error('No user data found in localStorage');
        setHasAccess(false);
        return;
      }

      const userData = JSON.parse(userDataString);
      console.log('User data from localStorage:', userData);

      const role = userData.role || '';
      const products = userData.products || [];

      setUserRole(role);
      setUserProducts(products);

      // Check if user has access
      if (role === 'superAdmin') {
        // Super admin has access to all commissions
        setHasAccess(true);
        console.log('Super admin access granted - all commissions');
      } else if (role === 'admin') {
        // Admin has access only to commissions with assigned products
        if (products && products.length > 0) {
          setHasAccess(true);
          console.log('Admin access granted for products:', products);
        } else {
          setHasAccess(false);
          console.log('Admin has no products assigned');
        }
      } else {
        // Other roles have no access
        setHasAccess(false);
        console.log('No access for role:', role);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      setHasAccess(false);
    }
  };

  useEffect(() => {
    checkUserAccess();
  }, []);

  // Fetch data when user access is determined
  useEffect(() => {
    if (hasAccess && userRole && (userRole === 'superAdmin' || (userRole === 'admin' && userProducts.length > 0))) {
      fetchCommissions();
    }
  }, [hasAccess, userRole, userProducts]);

  // Handle pagination and filtering
  useEffect(() => {
    let filtered = commissions;
    
    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filtered.slice(startIndex, endIndex);
    
    setFilteredCommissions(paginatedData);
    setTotalResults(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [commissions, currentPage, itemsPerPage]);

  // Separate useEffect for search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== undefined && hasAccess && userRole && (userRole === 'superAdmin' || (userRole === 'admin' && userProducts.length > 0))) {
        fetchCommissions();
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, hasAccess, userRole, userProducts]);

  const fetchCommissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // First, fetch ALL commissions to get complete data for filtering
      const params = new URLSearchParams();
      params.append('limit', '1000'); // Fetch more records for frontend filtering
      params.append('page', '1');
      
      if (selectedStatus) {
        params.append('status', selectedStatus);
      }
      
      if (startDate) {
        params.append('startDate', formatDateForAPI(startDate));
      }
      
      if (endDate) {
        params.append('endDate', formatDateForAPI(endDate));
      }
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      const apiUrl = `${Base_url}commissions?${params.toString()}`;
      console.log('Commissions API URL:', apiUrl);
      console.log('Search Query:', searchQuery);
      console.log('User Role:', userRole);
      console.log('User Products:', userProducts);
      
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('Commissions API Response:', response.data);
      console.log('Commissions Data Structure:', JSON.stringify(response.data, null, 2));

      const commissionsData = Array.isArray(response.data) ? response.data : response.data.results;
      
      // Ensure commissionsData is always an array and filter out invalid entries
      let validCommissions = Array.isArray(commissionsData) 
        ? commissionsData.filter(commission => 
            commission && 
            typeof commission === 'object' && 
            commission.id
          )
        : [];

      // Apply role-based filtering
      if (userRole === 'admin' && userProducts.length > 0) {
        // Filter commissions to only show those with assigned products
        validCommissions = validCommissions.filter(commission => {
          if (commission.product && commission.product.id) {
            const hasAccess = userProducts.includes(commission.product.id);
            console.log('Commission product ID:', commission.product.id, 'Has access:', hasAccess);
            return hasAccess;
          }
          console.log('Commission has no product ID');
          return false;
        });
        console.log('Filtered commissions for admin:', validCommissions.length, 'out of', commissionsData.length);
      } else if (userRole === 'superAdmin') {
        // Super admin sees all commissions
        console.log('Super admin sees all commissions:', validCommissions.length);
      } else {
        // No access - show empty results
        validCommissions = [];
        console.log('No access - showing empty commissions results');
      }

      console.log('All valid commissions after filtering:', validCommissions.length);
      setCommissions(validCommissions);
      // Pagination will be handled by useEffect
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
    setEditBaseAmount(commission.baseAmount.toString());
    setEditTdsPercentage(commission.tdsPercentage?.toString() || '0');
    setEditStatus(commission.status);
    setShowEditModal(true);
  };

  const handleUpdateCommission = async () => {
    if (!editingCommission || !editBaseAmount || !editStatus) return;
    
    try {
      const token = localStorage.getItem("token");
      const newBaseAmount = parseFloat(editBaseAmount);
      const newTdsPercentage = parseFloat(editTdsPercentage);
      
      // Validation
      if (isNaN(newBaseAmount) || newBaseAmount < 0) {
        alert('Please enter a valid base amount');
        return;
      }
      
      if (isNaN(newTdsPercentage) || newTdsPercentage < 0 || newTdsPercentage > 100) {
        alert('Please enter a valid TDS percentage between 0 and 100');
        return;
      }

      const updateData = {
        baseAmount: newBaseAmount,
        tdsPercentage: newTdsPercentage,
        status: editStatus
      };

      await axios.patch(
        `${Base_url}commissions/${editingCommission.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setShowEditModal(false);
      setEditingCommission(null);
      setEditBaseAmount('');
      setEditTdsPercentage('');
      setEditStatus('');
      fetchCommissions(); // Refresh the data
    } catch (error) {
      console.error("Error updating commission:", error);
      alert('Failed to update commission');
    }
  };

  const handleShowBankDetails = (commission: Commission) => {
    setSelectedCommission(commission);
    setShowBankDetailsModal(true);
  };

  const fetchBankAccounts = async (userId: string) => {
    try {
      setLoadingBankAccounts(true);
      const token = localStorage.getItem("token");
      
      const response = await axios.get(`${Base_url}users/${userId}/bank-accounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      console.log('Bank Accounts API Response:', response.data);
      const accounts = response.data.results || [];
      setBankAccounts(accounts);
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
      setBankAccounts([]);
    } finally {
      setLoadingBankAccounts(false);
    }
  };

  const handleSelectBankAccount = (commission: Commission) => {
    setSelectedCommission(commission);
    setShowBankAccountModal(true);
    
    // Pre-populate payment form with existing data if available
    if (commission.paymentDetails) {
      // Convert date to YYYY-MM-DD format for HTML date input
      let formattedDate = '';
      if (commission.paymentDetails.paymentDate) {
        console.log('Original payment date:', commission.paymentDetails.paymentDate);
        const date = new Date(commission.paymentDetails.paymentDate);
        if (!isNaN(date.getTime())) {
          formattedDate = date.toISOString().split('T')[0];
          console.log('Formatted date for input:', formattedDate);
        }
      }
      
      setPaymentFormData({
        transactionId: commission.paymentDetails.transactionId || '',
        paymentDate: formattedDate,
        paymentMethod: commission.paymentDetails.paymentMethod || 'bank_transfer'
      });
    } else {
      setPaymentFormData({
        transactionId: '',
        paymentDate: '',
        paymentMethod: 'bank_transfer'
      });
    }
    
    if (commission.agent && typeof commission.agent === 'object' && commission.agent.id) {
      fetchBankAccounts(commission.agent.id);
    }
  };

  const handleBankAccountSelection = (bankAccount: BankAccount) => {
    setSelectedBankAccount(bankAccount);
    setShowPaymentForm(true);
    
    // Convert date to YYYY-MM-DD format for HTML date input
    let formattedDate = '';
    if (selectedCommission?.paymentDetails?.paymentDate) {
      const date = new Date(selectedCommission.paymentDetails.paymentDate);
      if (!isNaN(date.getTime())) {
        formattedDate = date.toISOString().split('T')[0];
      }
    }
    
    setPaymentFormData({
      transactionId: selectedCommission?.paymentDetails?.transactionId || '',
      paymentDate: formattedDate,
      paymentMethod: selectedCommission?.paymentDetails?.paymentMethod || 'bank_transfer'
    });
  };

  const handleUpdatePaymentDetails = async () => {
    if (!selectedCommission) return;
    
    // For new payments, require bank account selection
    if (!selectedCommission.paymentDetails && !selectedBankAccount) {
      alert('Please select a bank account');
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      
      const updateData = {
        paymentDetails: {
          bankAccount: selectedBankAccount?.id || selectedCommission.paymentDetails?.bankAccount,
          transactionId: paymentFormData.transactionId,
          paymentDate: paymentFormData.paymentDate,
          paymentMethod: paymentFormData.paymentMethod
        }
      };

      await axios.patch(
        `${Base_url}commissions/${selectedCommission.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Close modals and refresh data
      setShowBankAccountModal(false);
      setShowPaymentForm(false);
      setSelectedCommission(null);
      setSelectedBankAccount(null);
      fetchCommissions();
    } catch (error) {
      console.error("Error updating payment details:", error);
      alert('Failed to update payment details');
    }
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

  const formatDateForAPI = (date: Date): string => {
    console.log('Original date object:', date);
    console.log('Date toString:', date.toString());
    console.log('Date.getTime():', date.getTime());
    console.log('Date.getTimezoneOffset():', date.getTimezoneOffset());
    
    // Use the date as-is from the picker, since it should already be in local time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    console.log('Final formatted date for API:', formattedDate);
    return formattedDate;
  };

  const calculateTotals = () => {
    const totals = commissions.reduce((acc, commission) => {
      acc.totalBaseAmount += commission.baseAmount || 0;
      acc.totalCommissionAmount += commission.amount || 0;
      acc.totalTdsAmount += ((commission.baseAmount || 0) * (commission.tdsPercentage || 0)) / 100;
      return acc;
    }, {
      totalBaseAmount: 0,
      totalCommissionAmount: 0,
      totalTdsAmount: 0
    });

    return totals;
  };

  const tableHeaders = [
    { key: 'product', label: 'Product', sortable: false },
    { key: 'agent', label: 'Agent', sortable: false },
    { key: 'baseAmount', label: 'Base Amount', sortable: false },
    { key: 'tdsPercentage', label: 'TDS %', sortable: false },
    { key: 'amount', label: 'Commission Amount', sortable: false },
    { key: 'status', label: 'Status', sortable: false },
    { key: 'createdAt', label: 'Created At', sortable: false },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  const tableData = filteredCommissions.map(commission => ({
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
    tdsPercentage: `${commission.tdsPercentage || 0}%`,
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
        icon: 'ri-edit-line',
        className: 'ti-btn-primary',
        onClick: () => handleEditCommission(commission),
        title: 'Edit Commission'
      },
      {
        icon: 'ri-bank-line',
          className: 'ti-btn-info',
        onClick: () => handleSelectBankAccount(commission),
        title: 'Select Bank Account'
      }
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

  const handleExport = async () => {
    try {
      setExportLoading(true);
      const token = localStorage.getItem("token");
      
      // Build query parameters for export
      const params = new URLSearchParams();
      params.append('limit', '1000'); // Export more records
      params.append('page', '1');
      
      // Apply current filters
      if (selectedStatus) {
        params.append('status', selectedStatus);
      }
      
      if (startDate) {
        params.append('startDate', formatDateForAPI(startDate));
      }
      
      if (endDate) {
        params.append('endDate', formatDateForAPI(endDate));
      }
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      // Apply export date filters if provided (override current filters)
      if (exportStartDate) {
        // Remove existing startDate if any
        params.delete('startDate');
        params.append('startDate', formatDateForAPI(exportStartDate));
      }
      
      if (exportEndDate) {
        // Remove existing endDate if any
        params.delete('endDate');
        params.append('endDate', formatDateForAPI(exportEndDate));
      }
      
      const apiUrl = `${Base_url}commissions?${params.toString()}`;
      console.log('Export API URL:', apiUrl);
      
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      const commissionsData = Array.isArray(response.data) ? response.data : response.data.results;
      let validCommissions = Array.isArray(commissionsData) 
        ? commissionsData.filter(commission => 
            commission && 
            typeof commission === 'object' && 
            commission.id
          )
        : [];

      // Apply role-based filtering for export
      if (userRole === 'admin' && userProducts.length > 0) {
        validCommissions = validCommissions.filter(commission => {
          if (commission.product && commission.product.id) {
            return userProducts.includes(commission.product.id);
          }
          return false;
        });
      } else if (userRole !== 'superAdmin') {
        validCommissions = [];
      }
      
      // Prepare data for Excel export
      const exportData = validCommissions.map((commission, index) => {
        const baseAmount = commission.baseAmount || 0;
        const tdsPercentage = commission.tdsPercentage || 0;
        const tdsAmount = (baseAmount * tdsPercentage) / 100;
        
        return {
          'S.No': index + 1,
          'Product': commission.product?.name || 'N/A',
          'Agent Name': commission.agent?.name || 'N/A',
          'Agent PAN Number': commission.agent?.kycDetails?.panNumber || 'N/A',
          'Base Amount': baseAmount,
          'TDS %': tdsPercentage,
          'TDS Amount': tdsAmount,
          'Commission Amount': commission.amount || 0
        };
      });
      
      // Create a worksheet
      const ws = XLSX.utils.json_to_sheet(exportData);
      
      // Set column widths
      const colWidths = [
        { wch: 8 },   // S.No
        { wch: 25 },  // Product
        { wch: 20 },  // Agent Name
        { wch: 15 },  // Agent PAN Number
        { wch: 15 },  // Base Amount
        { wch: 10 },  // TDS %
        { wch: 15 },  // TDS Amount
        { wch: 18 }   // Commission Amount
      ];
      ws['!cols'] = colWidths;
      
      // Create a workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Commissions');
      
      // Generate filename with date range
      const startDateStr = exportStartDate ? formatDateForAPI(exportStartDate) : 'all';
      const endDateStr = exportEndDate ? formatDateForAPI(exportEndDate) : 'all';
      const filename = `commissions_${startDateStr}_to_${endDateStr}.xlsx`;
      
      // Generate Excel file
      XLSX.writeFile(wb, filename);
      
      // Close modal and reset form
      setShowExportModal(false);
      setExportStartDate(null);
      setExportEndDate(null);
      
    } catch (error) {
      console.error("Error exporting commissions:", error);
      alert('Failed to export commissions data');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <Fragment>
      <Seo title={"Commissions"} />
      <Pageheader currentpage="Commissions" activepage="Pages" mainpage="Commissions" />

      <div className="grid grid-cols-12 gap-6">
        {/* Summary Cards */}
        <div className="col-span-12">
          {(selectedStatus || startDate || endDate || searchQuery.trim()) && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <i className="ri-information-line mr-2"></i>
                Showing totals for filtered results. Clear filters to see all data.
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {(() => {
              const totals = calculateTotals();
              return [
                {
                  title: 'Total Base Amount',
                  value: `₹${totals.totalBaseAmount.toLocaleString()}`,
                  icon: 'ri-money-rupee-circle-line',
                  bgColor: 'bg-blue-500',
                  textColor: 'text-blue-600'
                },
                {
                  title: 'Total Commission Amount',
                  value: `₹${totals.totalCommissionAmount.toLocaleString()}`,
                  icon: 'ri-hand-coin-line',
                  bgColor: 'bg-green-500',
                  textColor: 'text-green-600'
                },
                {
                  title: 'Total TDS Amount',
                  value: `₹${totals.totalTdsAmount.toLocaleString()}`,
                  icon: 'ri-calculator-line',
                  bgColor: 'bg-orange-500',
                  textColor: 'text-orange-600'
                }
              ].map((card, index) => (
                <div key={index} className="box">
                  <div className="box-body">
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center w-12 h-12 ${card.bgColor} bg-opacity-10 rounded-lg mr-4`}>
                        <i className={`${card.icon} text-2xl ${card.textColor}`}></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                        <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>

        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Commissions List</h5>
              <div className="flex gap-2">
                {hasAccess && (
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="ti-btn ti-btn-secondary !py-1 !px-2 !text-[0.75rem]"
                  >
                    <i className="ri-filter-line font-semibold align-middle"></i> Filters
                  </button>
                )}
                {hasAccess && (
                  <button
                    onClick={() => {
                      console.log('📤 EXPORT BUTTON clicked - opening modal');
                      console.log('Current export dates - Start:', exportStartDate, 'End:', exportEndDate);
                      setShowExportModal(true);
                    }}
                    className="ti-btn ti-btn-primary !py-1 !px-2 !text-[0.75rem]"
                  >
                    <i className="ri-download-2-line font-semibold align-middle"></i> Export
                  </button>
                )}
            </div>
            </div>
            
            {/* Filters Section */}
            {hasAccess && showFilters && (
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
                      onChange={(date) => {
                        console.log('Start date selected:', date);
                        if (date) {
                          // Set time to noon to avoid timezone issues
                          const adjustedDate = new Date(date);
                          adjustedDate.setHours(12, 0, 0, 0);
                          console.log('Adjusted start date:', adjustedDate);
                          setStartDate(adjustedDate);
                        } else {
                          setStartDate(date);
                        }
                      }}
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
                      onChange={(date) => {
                        console.log('End date selected:', date);
                        if (date) {
                          // Set time to noon to avoid timezone issues
                          const adjustedDate = new Date(date);
                          adjustedDate.setHours(12, 0, 0, 0);
                          console.log('Adjusted end date:', adjustedDate);
                          setEndDate(adjustedDate);
                        } else {
                          setEndDate(date);
                        }
                      }}
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
              {!hasAccess ? (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <i className="ri-shield-cross-line text-6xl text-danger"></i>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Access Denied</h4>
                  <p className="text-gray-600 mb-4">
                    You don't have permission to view commissions. Please contact your administrator.
                  </p>
                  <div className="text-sm text-gray-500">
                    <p><strong>Your Role:</strong> {userRole || 'Unknown'}</p>
                    <p><strong>Assigned Products:</strong> {userProducts.length > 0 ? userProducts.join(', ') : 'None'}</p>
                  </div>
                </div>
              ) : loading ? (
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
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Edit Commission Details</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCommission(null);
                  setEditBaseAmount('');
                  setEditTdsPercentage('');
                  setEditStatus('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Amount (₹)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={editBaseAmount}
                    onChange={(e) => setEditBaseAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter base amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TDS Percentage (%)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={editTdsPercentage}
                    onChange={(e) => setEditTdsPercentage(e.target.value)}
                  min="0"
                  max="100"
                  step="0.01"
                    placeholder="Enter TDS percentage (0-100)"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="paid">Paid</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              {editingCommission && (
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600">
                    <strong>Product:</strong> {editingCommission.product?.name}<br/>
                    <strong>Agent:</strong> {editingCommission.agent?.name}<br/>
                    <strong>Current Amount:</strong> ₹{editingCommission.amount}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCommission(null);
                  setEditBaseAmount('');
                  setEditTdsPercentage('');
                  setEditStatus('');
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
                    <label className="block text-sm font-medium text-gray-600">TDS Percentage</label>
                    <p className="text-sm text-gray-800">{selectedCommission.tdsPercentage || 0}%</p>
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

      {/* Bank Account Selection Modal */}
      {showBankAccountModal && selectedCommission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Select Bank Account</h3>
              <button
                onClick={() => {
                  setShowBankAccountModal(false);
                  setSelectedCommission(null);
                  setBankAccounts([]);
                  setSelectedBankAccount(null);
                  setShowPaymentForm(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="p-4">
              {/* Commission Info */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-semibold mb-2 text-gray-800">Commission Details</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Product:</span>
                    <p className="text-gray-800">{selectedCommission.product?.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Agent:</span>
                    <p className="text-gray-800">{selectedCommission.agent?.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Amount:</span>
                    <p className="text-gray-800">₹{selectedCommission.amount}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Status:</span>
                    <span className={`badge ${getStatusBadgeClass(selectedCommission.status)}`}>
                      {selectedCommission.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Existing Payment Details */}
              {selectedCommission.paymentDetails && (
                <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="text-md font-semibold mb-3 text-blue-800">Current Payment Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {selectedCommission.paymentDetails.transactionId && (
                      <div>
                        <span className="font-medium text-blue-600">Transaction ID:</span>
                        <p className="text-blue-800">{selectedCommission.paymentDetails.transactionId}</p>
                      </div>
                    )}
                    {selectedCommission.paymentDetails.paymentDate && (
                      <div>
                        <span className="font-medium text-blue-600">Payment Date:</span>
                        <p className="text-blue-800">
                          {new Date(selectedCommission.paymentDetails.paymentDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit', 
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                    {selectedCommission.paymentDetails.paymentMethod && (
                      <div>
                        <span className="font-medium text-blue-600">Payment Method:</span>
                        <p className="text-blue-800 capitalize">
                          {selectedCommission.paymentDetails.paymentMethod.replace('_', ' ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bank Accounts */}
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-4 text-gray-800">
                  {selectedCommission.paymentDetails ? 'Change Bank Account' : 'Select Bank Account'}
                </h4>
                {loadingBankAccounts ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : bankAccounts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bankAccounts.map((account) => {
                      const isActiveAccount = selectedCommission.paymentDetails?.bankAccount === account.id;
                      const isSelectedAccount = selectedBankAccount?.id === account.id;
                      
                      return (
                        <div
                          key={account.id}
                          onClick={() => handleBankAccountSelection(account)}
                          className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                            isActiveAccount 
                              ? 'border-green-500 bg-green-50' 
                              : isSelectedAccount
                              ? 'border-primary bg-primary-50' 
                              : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="font-semibold text-gray-800">{account.bankName}</h5>
                            <p className="text-sm text-gray-600">{account.accountHolderName}</p>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {isActiveAccount && (
                              <span className="badge bg-green-600 text-white text-xs">Active</span>
                            )}
                            {account.isDefault && (
                              <span className="badge bg-info text-white text-xs">Default</span>
                            )}
                            <span className={`badge text-xs ${
                              account.status === 'verified' 
                                ? 'bg-success text-white' 
                                : account.status === 'pending'
                                ? 'bg-warning text-white'
                                : 'bg-danger text-white'
                            }`}>
                              {account.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Account Number:</span>
                            <span className="text-gray-800">{account.accountNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">IFSC Code:</span>
                            <span className="text-gray-800">{account.ifscCode}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Account Type:</span>
                            <span className="text-gray-800 capitalize">{account.accountType}</span>
                          </div>
                          {account.branchName && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Branch:</span>
                              <span className="text-gray-800">{account.branchName}</span>
                            </div>
                          )}
                        </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <i className="ri-bank-line text-4xl mb-2"></i>
                    <p>No bank accounts found for this agent</p>
                  </div>
                )}
              </div>

              {/* Payment Details Form */}
              {((showPaymentForm && selectedBankAccount) || selectedCommission.paymentDetails) && (
                <div className="border-t pt-6">
                  <h4 className="text-md font-semibold mb-4 text-gray-800">
                    {selectedCommission.paymentDetails ? 'Update Payment Details' : 'Add Payment Details'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={paymentFormData.transactionId}
                        onChange={(e) => setPaymentFormData({...paymentFormData, transactionId: e.target.value})}
                        placeholder="Enter transaction ID"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={paymentFormData.paymentDate}
                        onChange={(e) => setPaymentFormData({...paymentFormData, paymentDate: e.target.value})}
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={paymentFormData.paymentMethod}
                        onChange={(e) => setPaymentFormData({...paymentFormData, paymentMethod: e.target.value as 'bank_transfer' | 'upi' | 'cheque' | 'other'})}
                      >
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="upi">UPI</option>
                        <option value="cheque">Cheque</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => {
                        setShowPaymentForm(false);
                        setSelectedBankAccount(null);
                      }}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdatePaymentDetails}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                      disabled={!selectedBankAccount && !selectedCommission.paymentDetails}
                    >
                      {selectedCommission.paymentDetails ? 'Update Payment Details' : 'Add Payment Details'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Export Commissions</h3>
              <button
                onClick={() => {
                  console.log('❌ MODAL CLOSE (X) clicked - closing modal and clearing dates');
                  console.log('Before close - Start:', exportStartDate, 'End:', exportEndDate);
                  setShowExportModal(false);
                  setExportStartDate(null);
                  setExportEndDate(null);
                  console.log('After close - modal closed and dates cleared');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                <p>Select date range for export. Leave empty to export all data.</p>
                {selectedStatus || startDate || endDate || searchQuery.trim() ? (
                  <p className="text-blue-600 mt-2">
                    <i className="ri-information-line mr-1"></i>
                    Current filters will be applied to the export.
                  </p>
                ) : null}
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date (Optional)
                  </label>
                  <DatePicker
                    selected={exportStartDate}
                    onChange={(date) => {
                      console.log('🚀 START DATE onChange triggered:', {
                        date,
                        dateType: typeof date,
                        isDate: date instanceof Date,
                        timestamp: date ? date.getTime() : null,
                        formatted: date ? date.toISOString() : null,
                        currentExportStartDate: exportStartDate,
                        currentExportEndDate: exportEndDate
                      });
                      setExportStartDate(date);
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select Start Date"
                    customInput={<CustomDateInput placeholder="Select Start Date" />}
                    maxDate={exportEndDate || new Date()}
                    isClearable
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    autoComplete="off"
                    onSelect={(date) => {
                      console.log('🎯 START DATE onSelect triggered:', {
                        date,
                        dateType: typeof date,
                        isDate: date instanceof Date,
                        timestamp: date ? date.getTime() : null,
                        formatted: date ? date.toISOString() : null
                      });
                      setExportStartDate(date);
                    }}
                    onCalendarOpen={() => {
                      console.log('📅 START DATE calendar opened');
                    }}
                    onCalendarClose={() => {
                      console.log('📅 START DATE calendar closed');
                    }}
                    onFocus={(e) => {
                      console.log('👆 START DATE onFocus:', e);
                    }}
                    onBlur={(e) => {
                      console.log('👆 START DATE onBlur:', e);
                    }}
                    onClickOutside={() => {
                      console.log('👆 START DATE clicked outside');
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date (Optional)
                  </label>
                  <DatePicker
                    selected={exportEndDate}
                    onChange={(date) => {
                      console.log('🚀 END DATE onChange triggered:', {
                        date,
                        dateType: typeof date,
                        isDate: date instanceof Date,
                        timestamp: date ? date.getTime() : null,
                        formatted: date ? date.toISOString() : null,
                        currentExportStartDate: exportStartDate,
                        currentExportEndDate: exportEndDate
                      });
                      setExportEndDate(date);
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select End Date"
                    customInput={<CustomDateInput placeholder="Select End Date" />}
                    minDate={exportStartDate || undefined}
                    maxDate={new Date()}
                    isClearable
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    autoComplete="off"
                    onSelect={(date) => {
                      console.log('🎯 END DATE onSelect triggered:', {
                        date,
                        dateType: typeof date,
                        isDate: date instanceof Date,
                        timestamp: date ? date.getTime() : null,
                        formatted: date ? date.toISOString() : null
                      });
                      setExportEndDate(date);
                    }}
                    onCalendarOpen={() => {
                      console.log('📅 END DATE calendar opened');
                    }}
                    onCalendarClose={() => {
                      console.log('📅 END DATE calendar closed');
                    }}
                    onFocus={(e) => {
                      console.log('👆 END DATE onFocus:', e);
                    }}
                    onBlur={(e) => {
                      console.log('👆 END DATE onBlur:', e);
                    }}
                    onClickOutside={() => {
                      console.log('👆 END DATE clicked outside');
                    }}
                  />
                </div>
                
                {(exportStartDate || exportEndDate) && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        console.log('🧹 CLEAR DATES clicked - clearing both dates');
                        console.log('Before clear - Start:', exportStartDate, 'End:', exportEndDate);
                        setExportStartDate(null);
                        setExportEndDate(null);
                        console.log('After clear - both dates set to null');
                      }}
                      className="text-sm text-primary hover:text-primary-dark flex items-center"
                    >
                      <i className="ri-refresh-line mr-1"></i>
                      Clear Dates
                    </button>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded text-sm">
                <p className="font-medium text-gray-700 mb-2">Export will include:</p>
                <ul className="text-gray-600 space-y-1">
                  <li>• Product Name</li>
                  <li>• Agent Name</li>
                  <li>• Agent PAN Number</li>
                  <li>• Base Amount</li>
                  <li>• TDS Percentage</li>
                  <li>• TDS Amount (Calculated)</li>
                  <li>• Commission Amount</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={() => {
                  console.log('❌ CANCEL BUTTON clicked - closing modal and clearing dates');
                  console.log('Before cancel - Start:', exportStartDate, 'End:', exportEndDate);
                  setShowExportModal(false);
                  setExportStartDate(null);
                  setExportEndDate(null);
                  console.log('After cancel - modal closed and dates cleared');
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={exportLoading}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exportLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Exporting...
                  </>
                ) : (
                  <>
                    <i className="ri-download-2-line mr-2"></i>
                    Export Excel
                  </>
                )}
              </button>
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