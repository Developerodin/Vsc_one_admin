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

interface Product {
  id: string;
  name: string;
  type: string;
  status: string;
  categories: string[];
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchRoles();
  }, [currentPage]);

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

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}products?limit=100&status=active`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const productsData = response.data.results.map((product: any) => ({
        id: product.id,
        name: product.name,
        type: product.type,
        status: product.status,
        categories: product.categories || []
      }));
      
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}roles?limit=10&page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Roles API Response:', response.data); // Debug log

      // Check if response.data is an array or has a results property
      const rolesData = Array.isArray(response.data) ? response.data : response.data.results;
      
      // Set pagination data if available
      if (!Array.isArray(response.data)) {
        setTotalPages(response.data.totalPages || 1);
        setTotalResults(response.data.totalResults || rolesData.length);
      } else {
        setTotalPages(1);
        setTotalResults(rolesData.length);
      }

      const formattedData = rolesData.map((role: any) => ({
        name: role.name || "--",
        description: role.description || "--",
        status: role.isActive ? 'Active' : 'Inactive',
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
            onClick: () => editRole(role.id),
          },
          {
            icon: "ri-delete-bin-line",
            className: "ti-btn-danger",
            onClick: () => openDeleteModal(role.id),
          },
        ],
      }));

      console.log('Formatted Roles Data:', formattedData); // Debug log
      setRoles(formattedData);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setError("Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const openPermissionModal = async (role: any) => {
    setSelectedRole(role);
    setShowPermissionModal(true);
    
    // Clear any existing null values from state
    setSelectedPermissions(prev => prev.filter(id => id !== null && id !== undefined && id !== ''));
    setSelectedProducts(prev => prev.filter(id => id !== null && id !== undefined && id !== ''));
    
    try {
      const token = localStorage.getItem("token");
      
      // Fetch the role's current permissions
      const permissionsResponse = await axios.get(`${Base_url}role-permissions/roles/${role.id}/permissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Extract just the IDs from the permission objects and filter out null/undefined values
      const currentPermissions = permissionsResponse?.data?.map((permission: any) => permission.id).filter((id: any) => id !== null && id !== undefined && id !== '') || [];
      console.log('Current permission IDs:', currentPermissions);
      setSelectedPermissions(currentPermissions);
      
      // Fetch the role's current products
      try {
        const productsResponse = await axios.get(`${Base_url}role-permissions/roles/${role.id}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const currentProducts = productsResponse?.data?.map((product: any) => product.id).filter((id: any) => id !== null && id !== undefined && id !== '') || [];
        console.log('Current product IDs:', currentProducts);
        setSelectedProducts(currentProducts);
      } catch (productError) {
        console.error('Error fetching role products:', productError);
        setSelectedProducts([]);
      }
      
      // Fetch all available permissions and products
      await Promise.all([fetchPermissions(), fetchProducts()]);
    } catch (error) {
      console.error('Error fetching role permissions:', error);
      // If there's an error, still fetch available permissions and products
      await Promise.all([fetchPermissions(), fetchProducts()]);
    }
  };

  const handlePermissionUpdate = async () => {
    if (!selectedRole) return;
    
    setUpdatingPermissions(true);
    try {
      const token = localStorage.getItem("token");
      
      // Filter out null values from both arrays
      const validPermissionIds = selectedPermissions.filter(id => id !== null && id !== undefined && id !== '');
      const validProductIds = selectedProducts.filter(id => id !== null && id !== undefined && id !== '');
      
      console.log('Sending permission update:', {
        permissionIds: validPermissionIds,
        productIds: validProductIds,
        originalSelectedPermissions: selectedPermissions,
        originalSelectedProducts: selectedProducts
      });
      
      const response = await axios.post(`${Base_url}role-permissions/roles/${selectedRole.id}/permissions`, {
        permissionIds: validPermissionIds,
        productIds: validProductIds
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
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                  }}
                  totalItems={totalResults}
                  itemsPerPage={10}
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
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Manage Permissions & Products - {selectedRole?.name}
            </h3>
            <button
              onClick={() => setShowPermissionModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          
          <div className="max-h-[70vh] overflow-y-auto">
            {/* Permissions Section */}
            <div className="mb-6">
              <h4 className="text-md font-semibold mb-3 text-gray-700">Permissions</h4>
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
                          if (e.target.checked) {
                            // Only add if permission.id is valid
                            if (permission.id && permission.id !== null && permission.id !== undefined) {
                              const newPermissions = [...selectedPermissions, permission.id];
                              setSelectedPermissions(newPermissions);
                            }
                          } else {
                            const newPermissions = selectedPermissions.filter(v => v !== permission.id);
                            setSelectedPermissions(newPermissions);
                          }
                        }}
                        className="form-checkbox"
                      />
                      <label htmlFor={`perm-${permission.id}`} className="ml-2 text-sm">
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Products Section */}
            <div className="mb-6">
              <h4 className="text-md font-semibold mb-3 text-gray-700">Products</h4>
              {loadingProducts ? (
                <div className="text-center py-4">Loading products...</div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`prod-${product.id}`}
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            // Only add if product.id is valid
                            if (product.id && product.id !== null && product.id !== undefined) {
                              const newProducts = [...selectedProducts, product.id];
                              setSelectedProducts(newProducts);
                            }
                          } else {
                            const newProducts = selectedProducts.filter(v => v !== product.id);
                            setSelectedProducts(newProducts);
                          }
                        }}
                        className="form-checkbox"
                      />
                      <label htmlFor={`prod-${product.id}`} className="ml-2 text-sm">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.type}</div>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
              {updatingPermissions ? 'Updating...' : 'Update Permissions & Products'}
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