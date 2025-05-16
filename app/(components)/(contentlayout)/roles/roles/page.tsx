"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import DataTable from "@/shared/components/DataTable";
import ConfirmModal from "@/app/shared/components/ConfirmModal";
import * as XLSX from 'xlsx';

// Mock data for roles
const mockRoles = [
  {
    id: "1",
    name: "Admin",
    description: "Full access to all modules and functionalities",
    navigationAccess: ["dashboard", "leads", "users", "roles", "transactions", "reports", "settings"],
    departmentAccess: ["health", "vehicle", "life", "property", "travel"],
    status: "active",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "2",
    name: "Sales Executive - Health",
    description: "Access to health insurance leads and transactions",
    navigationAccess: ["dashboard", "leads", "transactions"],
    departmentAccess: ["health"],
    status: "active",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "3",
    name: "Sales Executive - Vehicle",
    description: "Access to vehicle insurance leads and transactions",
    navigationAccess: ["dashboard", "leads", "transactions"],
    departmentAccess: ["vehicle"],
    status: "active",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "4",
    name: "Support Staff",
    description: "Access to user management and support features",
    navigationAccess: ["dashboard", "users", "leads"],
    departmentAccess: ["health", "vehicle", "life", "property", "travel"],
    status: "active",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  }
];

// Navigation and department labels mapping
const navigationLabels: { [key: string]: string } = {
  dashboard: "Dashboard",
  leads: "Leads",
  users: "Users",
  roles: "Roles",
  transactions: "Transactions",
  reports: "Reports",
  settings: "Settings"
};

const departmentLabels: { [key: string]: string } = {
  health: "Health Insurance",
  vehicle: "Vehicle Insurance",
  life: "Life Insurance",
  property: "Property Insurance",
  travel: "Travel Insurance"
};

const Roles = () => {
  const router = useRouter();
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      fetchRoles();
    }, 500);
  }, []);

  const fetchRoles = () => {
    try {
      setLoading(true);
      // Format the mock data according to table headers
      const formattedData = mockRoles.map((role) => ({
        name: (
          <div className="flex items-center gap-2">
            <span>{role.name || "--"}</span>
          </div>
        ),
        description: role.description || "--",
        navigationAccess: (
          <div className="flex flex-wrap gap-1">
            {role.navigationAccess?.map((access: string) => (
              <span key={access} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                {navigationLabels[access] || access}
              </span>
            ))}
          </div>
        ),
        departmentAccess: (
          <div className="flex flex-wrap gap-1">
            {role.departmentAccess?.map((dept: string) => (
              <span key={dept} className="px-2 py-1 text-xs bg-success/10 text-success rounded-full">
                {departmentLabels[dept] || dept}
              </span>
            ))}
          </div>
        ),
        status: (
          <span className={`px-2 py-1 text-xs rounded-full ${
            role.status === 'active' 
              ? 'bg-success/10 text-success' 
              : 'bg-danger/10 text-danger'
          }`}>
            {role.status || '--'}
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
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove the role from mock data
      const updatedRoles = mockRoles.filter(role => role.id !== roleToDelete);
      mockRoles.length = 0;
      mockRoles.push(...updatedRoles);
      
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
    const exportData = mockRoles.map(role => ({
      'Name': role.name,
      'Description': role.description,
      'Navigation Access': role.navigationAccess.map(access => navigationLabels[access] || access).join(', '),
      'Department Access': role.departmentAccess.map(dept => departmentLabels[dept] || dept).join(', '),
      'Status': role.status
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
    { key: "navigationAccess", label: "Navigation Access", sortable: false },
    { key: "departmentAccess", label: "Department Access", sortable: false },
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
                <DataTable headers={headers} data={roles} />
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