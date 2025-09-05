"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import DataTable from "@/shared/components/DataTable";
import ConfirmModal from "@/app/shared/components/ConfirmModal";
import Select from 'react-select';
import * as XLSX from 'xlsx';
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
  }>;
  navigation: any;
  createdAt: string;
  updatedAt: string;
}

const AdminUsers = () => {
  const router = useRouter();
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const roleFilterOptions = [
    { value: '', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'superAdmin', label: 'Super Admin' }
  ];

  const statusFilterOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  useEffect(() => {
    fetchAdminUsers();
  }, [currentPage, itemsPerPage, selectedRole, selectedStatus, searchQuery]);

  const fetchAdminUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        limit: itemsPerPage.toString(),
        page: currentPage.toString()
      });

      if (searchQuery) {
        queryParams.append('search', searchQuery);
      }
      if (selectedRole) {
        queryParams.append('role', selectedRole);
      }
      if (selectedStatus) {
        queryParams.append('status', selectedStatus);
      }

      const response = await axios.get(`${Base_url}admin-users?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Admin Users API Response:', response.data);

      const formattedData = response.data.results.map((user: AdminUser, index: number) => ({
        srNo: (currentPage - 1) * itemsPerPage + index + 1,
        name: user.name || "--",
        email: user.email || "--",
        role: user.role || "--",
        status: (
          <span className={`badge ${user.status === 'active' ? '!bg-success/10 !text-success' : 
            user.status === 'inactive' ? '!bg-danger/10 !text-danger' : 
            '!bg-warning/10 !text-warning'}`}>
            {user.status || '--'}
          </span>
        ),
        emailVerified: user.isEmailVerified ? (
          <span className="badge !bg-success/10 !text-success">Verified</span>
        ) : (
          <span className="badge !bg-warning/10 !text-warning">Not Verified</span>
        ),
        products: user.products?.length > 0 ? user.products.map((p: any) => p.name).join(', ') : 'No Products',
        createdAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '--',
        actions: [
          {
            icon: "ri-eye-line",
            className: "ti-btn-primary",
            onClick: () => viewUser(user._id),
          },
          {
            icon: "ri-edit-line",
            className: "ti-btn-warning",
            onClick: () => editUser(user._id),
          },
          {
            icon: "ri-delete-bin-line",
            className: "ti-btn-danger",
            onClick: () => openDeleteModal(user._id),
          },
        ],
      }));

      setAdminUsers(formattedData);
      setTotalPages(response.data.totalPages || 1);
      setTotalResults(response.data.totalResults || 0);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      setError("Failed to fetch admin users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedRole('');
    setSelectedStatus('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const viewUser = (userId: string) => {
    router.push(`/admin-users/view?id=${userId}`);
  };

  const editUser = (userId: string) => {
    router.push(`/admin-users/edit?id=${userId}`);
  };

  const createUser = () => {
    router.push("/admin-users/create");
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${Base_url}admin-users/${userToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      fetchAdminUsers(); // Refresh the users list
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting admin user:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDeleteModal = (userId: string) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleExport = () => {
    const exportData = adminUsers.map(user => ({
      'Name': user.name,
      'Email': user.email,
      'Role': user.role,
      'Status': user.status.props.children,
      'Email Verified': user.emailVerified.props.children,
      'Products': user.products,
      'Created At': user.createdAt
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Admin Users');
    XLSX.writeFile(wb, 'admin-users.xlsx');
  };

  const headers = [
    { key: "srNo", label: "Sr. No", sortable: false },
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "emailVerified", label: "Email Verified", sortable: false },
    { key: "products", label: "Products", sortable: false },
    { key: "createdAt", label: "Created At", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
  ];

  return (
    <Fragment>
      <Seo title={"Admin Users"} />
      <Pageheader currentpage="Admin Users" activepage="Admin Users" mainpage="Admin Users" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Admin Users List</h5>
              <div className="flex space-x-2">
                <button 
                  type="button" 
                  className="ti-btn ti-btn-secondary !py-1 !px-2 !text-[0.75rem]"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <i className="ri-filter-line font-semibold align-middle"></i> Filters
                </button>
                <button 
                  type="button" 
                  className="ti-btn ti-btn-danger-full !py-1 !px-2 !text-[0.75rem]"
                  onClick={handleExport}
                >
                  <i className="ri-file-excel-line font-semibold align-middle mr-1"></i> Export
                </button>
                <button
                  type="button"
                  className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                  onClick={createUser}
                >
                  <i className="ri-add-line font-semibold align-middle"></i> Create Admin User
                </button>
              </div>
            </div>
            
            {/* Filters Section */}
            {showFilters && (
              <div className="box-body border-b border-gray-200 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <Select
                      options={roleFilterOptions}
                      value={roleFilterOptions.find(option => option.value === selectedRole)}
                      onChange={(selectedOption: any) => {
                        setSelectedRole(selectedOption?.value || '');
                        setCurrentPage(1);
                      }}
                      placeholder="Select Role"
                      isClearable
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <Select
                      options={statusFilterOptions}
                      value={statusFilterOptions.find(option => option.value === selectedStatus)}
                      onChange={(selectedOption: any) => {
                        setSelectedStatus(selectedOption?.value || '');
                        setCurrentPage(1);
                      }}
                      placeholder="Select Status"
                      isClearable
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="ti-btn ti-btn-light !py-1 !px-2 !text-[0.75rem]"
                    >
                      <i className="ri-refresh-line font-semibold align-middle mr-1"></i> Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="box-body">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : error ? (
                <div className="text-center text-danger">{error}</div>
              ) : (
                <DataTable 
                  headers={headers} 
                  data={adminUsers}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                  }}
                  totalItems={totalResults}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={(size) => {
                    setItemsPerPage(size);
                    setCurrentPage(1);
                  }}
                  onSearch={handleSearch}
                  searchQuery={searchQuery}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Admin User"
        message="Are you sure you want to delete this admin user? This action cannot be undone."
        loading={deleteLoading}
      />
    </Fragment>
  );
};

export default function ProtectedAdminUsers() {
  return (
    <ProtectedRoute>
      <AdminUsers />
    </ProtectedRoute>
  );
}
