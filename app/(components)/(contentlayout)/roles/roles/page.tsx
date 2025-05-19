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

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  isActive: boolean;
}

const Roles = () => {
  const router = useRouter();
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [updatingPermissions, setUpdatingPermissions] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0
  });

  useEffect(() => {
    fetchRoles();
  }, [pagination.page]);

  const fetchPermissions = async () => {
    try {
      setLoadingPermissions(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}permissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPermissions(response.data.results);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    } finally {
      setLoadingPermissions(false);
    }
  };

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
      
      setPagination({
        page,
        limit,
        totalPages,
        totalResults
      });

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
        permissionManager: (
          <button
            onClick={() => openPermissionModal(role)}
            className="ti-btn ti-btn-primary !py-1 !px-2 !text-[0.75rem]"
          >
            <i className="ri-settings-4-line font-semibold align-middle mr-1"></i>
            Manage Permissions
          </button>
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

  const openPermissionModal = async (role: any) => {
    setSelectedRole(role);
    setShowPermissionModal(true);
    try {
      // First fetch the role's current permissions
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}role-permissions/roles/${role.id}/permissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Extract just the IDs from the permission objects
      const currentPermissions = response?.data?.map((permission: any) => permission.id) || [];
      console.log('Current permission IDs:', currentPermissions); // For debugging
      setSelectedPermissions(currentPermissions);
      
      // Then fetch all available permissions
      await fetchPermissions();
    } catch (error) {
      console.error('Error fetching role permissions:', error);
      // If there's an error, still fetch available permissions
      await fetchPermissions();
    }
  };

  const handlePermissionUpdate = async () => {
    if (!selectedRole) return;
    
    setUpdatingPermissions(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${Base_url}role-permissions/roles/${selectedRole.id}/permissions`, {
        permissionIds: selectedPermissions
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data) {
        setShowPermissionModal(false);
        fetchRoles(); // Refresh the roles list
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
    } finally {
      setUpdatingPermissions(false);
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
    { key: "permissionManager", label: "Permission Manager", sortable: false },
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Role"
        message="Are you sure you want to delete this role? This action cannot be undone."
        loading={deleteLoading}
      />

      {/* Permission Management Modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${showPermissionModal ? '' : 'hidden'}`}>
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Manage Permissions - {selectedRole?.name}
            </h3>
            <button
              onClick={() => setShowPermissionModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto">
            {loadingPermissions ? (
              <div className="text-center py-4">Loading permissions...</div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {permissions.map((permission) => (
                  <div key={permission.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`perm-${permission.id}`}
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={(e) => {
                        const newPermissions = e.target.checked
                          ? [...selectedPermissions, permission.id]
                          : selectedPermissions.filter(v => v !== permission.id);
                        setSelectedPermissions(newPermissions);
                      }}
                      className="form-checkbox"
                    />
                    <label htmlFor={`perm-${permission.id}`} className="ml-2">
                      {permission.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              className="ti-btn ti-btn-light"
              onClick={() => setShowPermissionModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="ti-btn ti-btn-primary"
              onClick={handlePermissionUpdate}
              disabled={updatingPermissions}
            >
              {updatingPermissions ? 'Updating...' : 'Update Permissions'}
            </button>
          </div>
        </div>
      </div>
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