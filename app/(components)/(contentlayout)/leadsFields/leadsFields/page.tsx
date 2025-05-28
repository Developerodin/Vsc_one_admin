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
}

const LeadsFields = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductData[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Fetch leads fields data from the new endpoint
            const response = await axios.get(`${Base_url}leadsfields`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Format the data according to table headers
            const formattedData: ProductData[] = [];
            
            response.data.results.forEach((leadField: any, index: number) => {
                formattedData.push({
                    srNo: index + 1,
                    name: leadField.product?.name || 'Unknown Product',
                    category: leadField.category?.name || 'Unknown Category',
                    availableFields: leadField.fields?.length?.toString() || "0",
                    actions: [
                        {
                            icon: 'ri-eye-line',
                            className: 'ti-btn-primary',
                            href: '#'
                        },
                        {
                            icon: 'ri-edit-line',
                            className: 'ti-btn-info',
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
        } catch (error) {
            console.error('Error fetching leads fields:', error);
        }
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

    const handleExport = () => {
        // Create a new array without the actions column
        const exportData = products.map(product => ({
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
        { key: 'name', label: 'Name' ,sortable: false},
        { key: 'category', label: 'Category' ,sortable: false},
        { key: 'availableFields', label: 'Available Fields' ,sortable: false},
        { key: 'actions', label: 'Actions' ,sortable: false}
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
                                    onClick={handleExport}
                                >
                                    <i className="ri-file-excel-line font-semibold align-middle mr-1"></i> Export
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
                            <DataTable headers={headers} data={products} />
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
