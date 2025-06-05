"use client";
import React, { Fragment, useEffect, useState } from 'react';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import Link from 'next/link';
import DataTable from '@/shared/components/DataTable';

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

interface PaymentDetails {
  bankAccount: BankAccount;
  paymentMethod: string;
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
  paymentDetails: PaymentDetails;
  bonus: number;
  status: string;
  product: Product;
  lead: string;
  amount: number;
  percentage: number;
  baseAmount: number;
  agent: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

const Commissions = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchCommissions();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchCommissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}commissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data);
      setCommissions(response.data.results || []);

    
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

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-warning text-white';
      case 'approved':
        return 'bg-success text-white';
      case 'rejected':
        return 'bg-danger text-white';
      default:
        return 'bg-primary text-white';
    }
  };

  const tableHeaders = [
    { key: 'product', label: 'Product', sortable: false },
    { key: 'percentage', label: 'Commission %', sortable: false },
    { key: 'paymentMethod', label: 'Payment Method', sortable: false },
    { key: 'status', label: 'Status', sortable: false },
    { key: 'createdAt', label: 'Created At', sortable: false },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  const tableData = commissions.map(commission => ({
    product: (
      <Link href={`/products/products?id=${commission.product.id}`} className="text-primary hover:underline">
        {commission.product.name}
      </Link>
    ),
    percentage: `${commission.percentage}%`,
    paymentMethod: commission.paymentDetails.paymentMethod.replace('_', ' '),
    status: (
      <span className={`badge ${getStatusBadgeClass(commission.status)}`}>
        {commission.status}
      </span>
    ),
    createdAt: new Date(commission.createdAt).toLocaleDateString(),
    actions: commission.status === 'pending' ? [
      {
        icon: 'ri-check-line',
        className: 'ti-btn-success',
        onClick: () => handleStatusChange(commission.id, 'approved')
      },
      {
        icon: 'ri-close-line',
        className: 'ti-btn-danger',
        onClick: () => handleStatusChange(commission.id, 'rejected')
      }
    ] : []
  }));

  const customFilters = [
    { label: 'Status', value: 'status' }
  ];

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'status') {
      setStatusFilter(value);
    }
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
            </div>
            <div className="box-body">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <DataTable
                  headers={tableHeaders}
                  data={tableData}
                  customFilters={customFilters}
                  onFilterChange={handleFilterChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
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