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

    useEffect(() => {
        fetchProducts();
    }, [currentPage, itemsPerPage]);

    // Add search effect
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(products);
            setTotalResults(products.length);
            setTotalPages(Math.ceil(products.length / itemsPerPage));
        } else {
            const filtered = products.filter(product => {
                const productName = product.name.toLowerCase();
                const searchLower = searchQuery.toLowerCase();
                return productName.includes(searchLower);
            });
            setFilteredProducts(filtered);
            setTotalResults(filtered.length);
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        }
        setCurrentPage(1);
    }, [searchQuery, products, itemsPerPage]);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Fetch leads fields data from the new endpoint
            const response = await axios.get(`${Base_url}leadsfields?limit=${itemsPerPage}&page=${currentPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Format the data according to table headers
            const formattedData: ProductData[] = [];
            
            response.data.results.forEach((leadField: any, index: number) => {
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

            setProducts(formattedData);
            setFilteredProducts(formattedData);
            setTotalPages(response.data.totalPages);
            setTotalResults(response.data.totalResults);
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
            
            await Promise.all(
                selectedIds.map(id =>
                    axios.delete(`${Base_url}leadsfields/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                )
            );
            
            await fetchProducts();
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
                                <button 
                                    type="button" 
                                    className="ti-btn ti-btn-danger-full !py-1 !px-2 !text-[0.75rem]"
                                    onClick={handleDeleteSelected}
                                    disabled={selectedIds.length === 0 || deleteSelectedLoading}
                                >
                                    <i className="ri-delete-bin-line font-semibold align-middle mr-1"></i>{" "}
                                    {deleteSelectedLoading ? "Deleting..." : "Delete Selected"}
                                </button>
                                <button 
                                    type="button" 
                                    className="ti-btn ti-btn-danger-full !py-1 !px-2 !text-[0.75rem]"
                                    onClick={handleExport}
                                    disabled={selectedIds.length === 0}
                                >
                                    <i className="ri-file-excel-line font-semibold align-middle mr-1"></i>{" "}
                                    Export Selected
                                </button>
                                <button 
                                    type="button" 
                                    className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                                    onClick={() => router.push('/leadsFields/create')}
                                >
                                    <i className="ri-add-line font-semibold align-middle"></i> Add Field
                                </button>
                            </div>
                        </div>
                        <div className="box-body">
                            <DataTable 
                                headers={headers} 
                                data={filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
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
