"use client"
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import DataTable from '@/shared/components/DataTable'
import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { Base_url } from '@/app/api/config/BaseUrl'
import { useRouter } from 'next/navigation'
import ConfirmModal from "@/app/shared/components/ConfirmModal";
import * as XLSX from 'xlsx'
import ProtectedRoute from "@/shared/components/ProtectedRoute";

interface ProductData {
    id: string;
    srNo: number;
    name: string;
    category: string;
    availableFields: string;
    actions: Array<{
        icon: string;
        className: string;
        href?: string;
        onClick?: () => void;
    }>;
    [key: string]: any; // Add index signature to allow string indexing
}

const LeadsFields = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductData[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteSelectedLoading, setDeleteSelectedLoading] = useState(false);
    const [sortKey, setSortKey] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [userRole, setUserRole] = useState<string>('');
    const [userProducts, setUserProducts] = useState<string[]>([]);
    const [hasAccess, setHasAccess] = useState<boolean>(true);

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
                // Super admin has access to all lead fields
                setHasAccess(true);
                console.log('Super admin access granted - all lead fields');
            } else if (role === 'admin') {
                // Admin has access only to lead fields with assigned products
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
            fetchProducts();
        }
    }, [hasAccess, userRole, userProducts]);

    // Handle pagination changes
    useEffect(() => {
        if (hasAccess && userRole && (userRole === 'superAdmin' || (userRole === 'admin' && userProducts.length > 0))) {
            // For pagination, we'll handle it in the frontend since we're fetching all data
            // This effect is mainly for when itemsPerPage changes
        }
    }, [currentPage, itemsPerPage]);

    // Handle search and pagination
    useEffect(() => {
        let filtered = products;
        
        // Apply search filter
        if (searchQuery.trim() !== '') {
            filtered = products.filter(product => {
                const productName = product.name.toLowerCase();
                const searchLower = searchQuery.toLowerCase();
                return productName.includes(searchLower);
            });
        }
        
        // Apply pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = filtered.slice(startIndex, endIndex);
        
        setFilteredProducts(paginatedData);
        setTotalResults(filtered.length);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    }, [products, searchQuery, currentPage, itemsPerPage]);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // First, fetch ALL leads fields to get complete data for filtering
            const response = await axios.get(`${Base_url}leadsfields?limit=1000&page=1`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('All leads fields from API:', response.data.results);
            console.log('User products:', userProducts);
            console.log('User role:', userRole);

            // Filter leads fields based on user access
            let leadsFieldsToProcess = response.data.results || [];

            if (userRole === 'admin' && userProducts.length > 0) {
                // Filter lead fields to only show those with assigned products
                leadsFieldsToProcess = response.data.results.filter((leadField: any) => {
                    console.log('Checking lead field:', leadField);
                    console.log('Lead field product ID:', leadField.product?.id);
                    console.log('Lead field product:', leadField.product);
                    
                    if (leadField.product && leadField.product.id) {
                        const hasAccess = userProducts.includes(leadField.product.id);
                        console.log('Has access to this lead field:', hasAccess);
                        return hasAccess;
                    }
                    console.log('No product ID found for this lead field');
                    return false;
                });
                console.log('Filtered lead fields for admin:', leadsFieldsToProcess.length, 'out of', response.data.results.length);
            } else if (userRole === 'superAdmin') {
                // Super admin sees all lead fields
                console.log('Super admin sees all lead fields:', response.data.results.length);
            } else {
                // No access - show empty results
                leadsFieldsToProcess = [];
                console.log('No access - showing empty lead fields results');
            }

            // Format the data according to table headers
            const formattedData: ProductData[] = [];
            
            leadsFieldsToProcess.forEach((leadField: any, index: number) => {
                formattedData.push({
                    id: leadField.id,
                    srNo: index + 1,
                    name: leadField.product?.name || 'Unknown Product',
                    category: leadField.category?.name || 'Unknown Category',
                    availableFields: leadField.fields?.length?.toString() || "0",
                    actions: [
                        {
                            icon: 'ri-eye-line',
                            className: 'ti-btn-primary',
                            href: `/leadsFields/edit?id=${leadField.id}`
                        },
                        {
                            icon: 'ri-delete-bin-line',
                            className: 'ti-btn-danger',
                            onClick: () => handleDelete(leadField.id)
                        }
                    ]
                });
            });

            console.log('Formatted data for display:', formattedData);

            setProducts(formattedData);
            // Pagination will be handled by the useEffect
        } catch (error) {
            console.error('Error fetching leads fields:', error);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleDelete = async (productId: string) => {
        setSelectedProductId(productId);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedProductId) return;
        
        try {
            setDeleteLoading(true);
            const token = localStorage.getItem('token');
            await axios.delete(`${Base_url}leadsfields/${selectedProductId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Refresh the leads fields list
            fetchProducts();
            setDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting lead field:', error);
        } finally {
            setDeleteLoading(false);
            setSelectedProductId(null);
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) return;
        
        try {
            setDeleteSelectedLoading(true);
            const token = localStorage.getItem('token');
            console.log("selectedIds",selectedIds);
            
            // await Promise.all(
            //     selectedIds.map(id =>
            //         axios.delete(`${Base_url}leadsfields/${id}`, {
            //             headers: {
            //                 Authorization: `Bearer ${token}`
            //             }
            //         })
            //     )
            // );
            
            // await fetchProducts();
            setSelectedIds([]);
        } catch (error) {
            console.error('Error deleting selected lead fields:', error);
        } finally {
            setDeleteSelectedLoading(false);
        }
    };

    const handleSort = (key: string, direction: 'asc' | 'desc') => {
        setSortKey(key);
        setSortDirection(direction);
        
        const sortedData = [...filteredProducts].sort((a, b) => {
            let valueA = a[key];
            let valueB = b[key];

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

        setFilteredProducts(sortedData);
    };

    const handleExport = () => {
        // Filter data based on selected IDs
        const dataToExport = selectedIds.length > 0
            ? products.filter(product => selectedIds.includes(product.id))
            : products;

        // Create a new array without the actions column
        const exportData = dataToExport.map(product => ({
            'Sr. No.': product.srNo,
            'Name': product.name,
            'Category': product.category,
            'Available Fields': product.availableFields
        }));

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Leads Fields');

        // Generate Excel file
        XLSX.writeFile(wb, 'leads-fields.xlsx');
    };

    const headers = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'availableFields', label: 'Available Fields', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    return (
        <Fragment>
            <Seo title={"Leads Fields"} />
            <Pageheader currentpage="Leads Fields" activepage="Leads Fields" mainpage="Leads Fields" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Leads Fields List</h5>
                            <div className="flex space-x-2">
                                {hasAccess && !(selectedIds.length === 0 || deleteSelectedLoading) ? <button 
                                    type="button" 
                                    className="ti-btn ti-btn-danger "
                                    onClick={handleDeleteSelected}
                                    disabled={selectedIds.length === 0 || deleteSelectedLoading}
                                >
                                    <i className="ri-delete-bin-line me-2"></i>{" "}
                                    {deleteSelectedLoading ? "Deleting..." : "Delete Selected" + ` (${selectedIds.length})`}
                                </button> : null}
                                {hasAccess && (
                                    <button 
                                        type="button" 
                                        className="ti-btn ti-btn-primary"
                                        onClick={handleExport}
                                        disabled={selectedIds.length === 0}
                                    >
                                        <i className="ri-download-2-line me-2"></i> Export
                                    </button>
                                )}
                                {hasAccess && (
                                    <button 
                                        type="button" 
                                        className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                                        onClick={() => router.push('/leadsFields/create')}
                                    >
                                        <i className="ri-add-line font-semibold align-middle"></i> Add Field
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="box-body">
                            {!hasAccess ? (
                                <div className="text-center py-8">
                                    <div className="mb-4">
                                        <i className="ri-shield-cross-line text-6xl text-danger"></i>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Access Denied</h4>
                                    <p className="text-gray-600 mb-4">
                                        You don't have permission to view lead fields. Please contact your administrator.
                                    </p>
                                    <div className="text-sm text-gray-500">
                                        <p><strong>Your Role:</strong> {userRole || 'Unknown'}</p>
                                        <p><strong>Assigned Products:</strong> {userProducts.length > 0 ? userProducts.join(', ') : 'None'}</p>
                                    </div>
                                </div>
                            ) : (
                                <DataTable 
                                    headers={headers} 
                                    data={filteredProducts}
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
                                    idField="id"
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
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Lead Field Configuration"
                message="Are you sure you want to delete this lead field configuration? This action cannot be undone."
                loading={deleteLoading}
            />
        </Fragment>
    )
}

export default function ProtectedLeadsFields() {
    return (
        <ProtectedRoute>
            <LeadsFields />
        </ProtectedRoute>
    )
}
