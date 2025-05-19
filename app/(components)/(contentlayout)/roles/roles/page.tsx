"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import DataTable from "@/shared/components/DataTable";
import ConfirmModal from "@/app/shared/components/ConfirmModal";
import * as XLSX from 'xlsx';
import { Base_url } from '@/app/api/config/BaseUrl';
import axios from 'axios';

const Roles = () => {
  const router = useRouter();
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0
  });

  useEffect(() => {
    fetchRoles();
  }, [pagination.page]);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { results, page, limit, totalPages, totalResults } = response.data;
      
      // Update pagination state
      setPagination({
        page,
        limit,
        totalPages,
        totalResults
      });

      // Format the data according to table headers
      const formattedData = results.map((role: any) => ({
        name: (
          <div className="flex items-center gap-2">
            <span>{role.name || "--"}</span>
          </div>
        ),
        description: role.description || "--",
        status: (
          <span className={`px-2 py-1 text-xs rounded-full ${
            role.isActive 
              ? 'bg-success/10 text-success' 
              : 'bg-danger/10 text-danger'
          }`}>
            {role.isActive ? 'Active' : 'Inactive'}
          </span>
        ),
        actions: [
          {
            icon: "ri-eye-line",
            className: "ti-btn-primary",
            onClick: () => viewRole(role.id),
          },
          {
            icon: "ri-edit-line",
            className: "ti-btn-info",
            onClick: () => editRole(role.id),
          },
          {
            icon: "ri-delete-bin-line",
            className: "ti-btn-danger",
            onClick: () => openDeleteModal(role.id),
          },
        ],
      }));

      setRoles(formattedData);
    } catch (error) {
      setError("Failed to fetch roles");
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewRole = (roleId: string) => {
    router.push(`/roles/view?id=${roleId}`);
  };

  const editRole = (roleId: string) => {
    router.push(`/roles/edit?id=${roleId}`);
  };

  const createRole = () => {
    router.push("/roles/create");
  };

  const handleDelete = async () => {
    if (!roleToDelete) return;
    
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${Base_url}roles/${roleToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      fetchRoles(); // Refresh the roles list
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting role:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDeleteModal = (roleId: string) => {
    setRoleToDelete(roleId);
    setShowDeleteModal(true);
  };

  const handleExport = () => {
    // Create a new array without the actions column
    const exportData = roles.map(role => ({
      'Name': role.name.props.children[0].props.children,
      'Description': role.description,
      'Status': role.status.props.children
    }));

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Roles');

    // Generate Excel file
    XLSX.writeFile(wb, 'roles.xlsx');
  };

  const headers = [
    { key: "name", label: "Role Name", sortable: true },
    { key: "description", label: "Description", sortable: false },
    { key: "status", label: "Status", sortable: false },
    { key: "actions", label: "Actions", sortable: false },
  ];

  return (
    <Fragment>
      <Seo title={"Roles"} />
      <Pageheader currentpage="Roles" activepage="Roles" mainpage="Roles" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Roles List</h5>
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
                  onClick={createRole}
                >
                  <i className="ri-add-line font-semibold align-middle"></i> Create Role
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
                  data={roles}
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
        title="Delete Role"
        message="Are you sure you want to delete this role? This action cannot be undone."
        loading={deleteLoading}
      />
    </Fragment>
  );
};

export default function ProtectedRoles() {
  return (
    <ProtectedRoute>
      <Roles />
    </ProtectedRoute>
  );
} 