"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import DataTable from "@/shared/components/DataTable";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import Select from "react-select";
import ConfirmModal from "@/app/shared/components/ConfirmModal";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  totalCommission: number;
  totalLeads: number;
  lastLogin: string;
}

const Users = () => {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Format the data according to table headers
      const formattedData = response.data.results.map((user: any) => ({
        profile: (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <i className="ri-user-line text-xl text-primary"></i>
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
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const openUserModal = (userId: string) => {
    router.push(`/profile/profile?id=${userId}`);
  };

  const viewUserProfile = (userId: string) => {
    router.push(`/profile/profile?id=${userId}`);
  };

  const openUpdateModal = (userId: string) => {
    router.push(`/users/edit/${userId}`);
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

  const headers = [
    { key: "profile", label: "Profile", sortable: false },
    { key: "name", label: "Name", sortable: true },
    { key: "contact", label: "Contact", sortable: false },
    { key: "totalCommission", label: "Total Commission", sortable: true },
    { key: "address", label: "Address", sortable: false },
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
              <div className="box-tools">
                <button
                  type="button"
                  className="hs-dropdown-toggle ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                  onClick={() => createUser()}
                >
                   <i className="ri-add-line font-semibold align-middle"></i>{" "}
                  Create User
                </button>
              </div>
            </div>
            <div className="box-body">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : error ? (
                <div className="text-center text-danger">{error}</div>
              ) : (
                <DataTable headers={headers} data={users} />
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
