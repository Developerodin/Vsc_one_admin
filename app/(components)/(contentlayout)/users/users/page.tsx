"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import DataTable from "@/shared/components/DataTable";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import ConfirmModal from "@/app/shared/components/ConfirmModal";
import * as XLSX from 'xlsx';

const Users = () => {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteSelectedLoading, setDeleteSelectedLoading] = useState(false);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRole, setSelectedRole] = useState('user');
  const [showFilters, setShowFilters] = useState(false);

  const roleFilterOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'superAdmin', label: 'Super Admin' }
  ];

  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage, selectedRole]);

  // Reset to first page when search query changes
  useEffect(() => {
    if (searchQuery !== '') {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        limit: itemsPerPage.toString(),
        page: currentPage.toString()
      });

      // Add search parameter if search query exists
      if (searchQuery.trim()) {
        queryParams.append('search', searchQuery.trim());
      }

      // Add role filter
      if (selectedRole) {
        queryParams.append('role', selectedRole);
      }

      const response = await axios.get(`${Base_url}users?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedData = response.data.results.map((user: any) => ({
        profile: (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <i className="ri-user-line text-xl text-primary"></i>
              )}
            </div>
          </div>
        ),
        name: (
          <div className="flex items-center gap-2">
            <span>{user.name || "--"}</span>
            {user.kycStatus === "verified" && (
              <i className="ri-checkbox-circle-fill text-success text-lg"></i>
            )}
          </div>
        ),
        contact: (
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.mobileNumber || "--"}</span>
            <span className="text-xs text-gray-500">{user.email || "--"}</span>
          </div>
        ),
        address: user.address?.country || "--",
        createdDate: new Date(user.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        userId: user.id,
        actions: [
          {
            icon: "ri-eye-line",
            className: "ti-btn-primary",
            onClick: () => viewUserProfile(user.id),
          },
          {
            icon: "ri-edit-line",
            className: "ti-btn-info",
            onClick: () => openUpdateModal(user.id),
          },
          {
            icon: "ri-delete-bin-line",
            className: "ti-btn-danger",
            onClick: () => openDeleteModal(user.id),
          },
        ],
      }));

      setUsers(formattedData);
      setFilteredUsers(formattedData);
      setTotalPages(response.data.totalPages || 1);
      setTotalResults(response.data.totalResults || formattedData.length);
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewUserProfile = (userId: string) => {
    router.push(`/profile/profile?id=${userId}`);
  };

  const openUpdateModal = (userId: string) => {
    router.push(`/users/edit?id=${userId}`);
  };

  const createUser = async () => {
    router.push("/users/create");
  }

  const handleDelete = async () => {
    if (!userToDelete) return;
    
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${Base_url}users/${userToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers(); // Refresh the users list
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDeleteModal = (userId: string) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    
    try {
      setDeleteSelectedLoading(true);
      const token = localStorage.getItem("token");
      console.log("selectedIds",selectedIds);
      
      // await Promise.all(
      //   selectedIds.map(id =>
      //     axios.delete(`${Base_url}users/${id}`, {
      //       headers: {
      //         Authorization: `Bearer ${token}`
      //       }
      //     })
      //   )
      // );
      
      // await fetchUsers();
      setSelectedIds([]);
    } catch (error) {
      console.error("Error deleting selected users:", error);
    } finally {
      setDeleteSelectedLoading(false);
    }
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
    
    const sortedData = [...filteredUsers].sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      // Handle JSX elements (for name and contact)
      if (React.isValidElement(valueA)) {
        const element = valueA as React.ReactElement;
        valueA = element.props.children[0].props.children;
      }
      if (React.isValidElement(valueB)) {
        const element = valueB as React.ReactElement;
        valueB = element.props.children[0].props.children;
      }

      // Handle date strings
      if (key === 'createdDate') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      // Handle string comparison
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Handle number comparison
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 'asc' 
          ? valueA - valueB
          : valueB - valueA;
      }

      return 0;
    });

    setFilteredUsers(sortedData);
  };

  const handleExport = () => {
    // Filter data based on selected IDs
    const dataToExport = selectedIds.length > 0
      ? users.filter(user => selectedIds.includes(user.userId))
      : users;

    // Create a new array without the actions column
    const exportData = dataToExport.map(user => ({
      'Name': user.name.props.children[0].props.children,
      'Mobile Number': user.contact.props.children[0].props.children,
      'Email': user.contact.props.children[1].props.children,
      'Address': user.address,
      'Created Date': user.createdDate
    }));

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    // Generate Excel file
    XLSX.writeFile(wb, 'users.xlsx');
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const clearFilters = () => {
    setSelectedRole('user');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== undefined) {
        fetchUsers();
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const headers = [
    { key: "profile", label: "Profile", sortable: false },
    { key: "name", label: "Name", sortable: true },
    { key: "contact", label: "Contact", sortable: false },
    { key: "address", label: "Address", sortable: false },
    { key: "createdDate", label: "Created Date", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
  ];

  return (
    <Fragment>
      <Seo title={"Users"} />
      <Pageheader currentpage="Users" activepage="Users" mainpage="Users" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Users List</h5>
              <div className="flex space-x-2">
                {/* <button 
                  type="button" 
                  className="ti-btn ti-btn-secondary !py-1 !px-2 !text-[0.75rem]"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <i className="ri-filter-line font-semibold align-middle"></i> Filters
                </button> */}
                {!(selectedIds.length === 0 || deleteSelectedLoading) ? <button 
                  type="button" 
                  className="ti-btn ti-btn-danger "
                  onClick={handleDeleteSelected}
                  disabled={selectedIds.length === 0 || deleteSelectedLoading}
                >
                  <i className="ri-delete-bin-line me-2"></i>{" "}
                  {deleteSelectedLoading ? "Deleting..." : "Delete Selected" + ` (${selectedIds.length})`}
                </button> : null}
                <button 
                  type="button" 
                  className="ti-btn ti-btn-primary"
                  onClick={handleExport}
                  disabled={selectedIds.length === 0}
                >
                  <i className="ri-download-2-line me-2"></i> Export
                </button>
                <button
                  type="button"
                  className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                  onClick={() => createUser()}
                >
                  <i className="ri-add-line font-semibold align-middle"></i> Create User
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
                    <select
                      value={selectedRole}
                      onChange={(e) => {
                        setSelectedRole(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="form-control"
                    >
                      {roleFilterOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
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
                  data={filteredUsers}
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
                  showCheckbox={true}
                  selectedIds={selectedIds}
                  onSelectionChange={setSelectedIds}
                  idField="userId"
                  onSort={handleSort}
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        loading={deleteLoading}
      />
    </Fragment>
  );
};

export default function ProtectedUsers() {
  return (
    <ProtectedRoute>
      <Users />
    </ProtectedRoute>
  );
}
