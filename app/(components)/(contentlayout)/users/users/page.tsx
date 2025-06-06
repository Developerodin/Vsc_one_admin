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

  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}users?limit=${itemsPerPage}&page=${currentPage}`, {
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
        totalCommission: user.totalCommission || "--",
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
      setTotalPages(response.data.totalPages);
      setTotalResults(response.data.totalResults);
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

  const handleExport = () => {
    const exportData = users.map(user => ({
      'Name': user.name.props.children[0].props.children,
      'Mobile Number': user.contact.props.children[0].props.children,
      'Email': user.contact.props.children[1].props.children,
      'Total Commission': user.totalCommission,
      'Address': user.address
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'users.xlsx');
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // You can implement search functionality here if needed
  };

  const headers = [
    { key: "profile", label: "Profile" },
    { key: "name", label: "Name" },
    { key: "contact", label: "Contact" },
    { key: "totalCommission", label: "Total Commission" },
    { key: "address", label: "Address" },
    { key: "createdDate", label: "Created Date" },
    { key: "actions", label: "Actions" },
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
                  onClick={() => createUser()}
                >
                  <i className="ri-add-line font-semibold align-middle"></i> Create User
                </button>
              </div>
            </div>
            <div className="box-body">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : error ? (
                <div className="text-center text-danger">{error}</div>
              ) : (
                <DataTable 
                  headers={headers} 
                  data={users}
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
