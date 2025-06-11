"use client"
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import DataTable from '@/shared/components/DataTable'
import React, { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css"
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from 'axios';
import ConfirmModal from "@/app/shared/components/ConfirmModal";
import * as XLSX from 'xlsx';

import { Base_url } from '@/app/api/config/BaseUrl'

interface Lead {
    id: string;
    srNo: number;
    agentName: string;
    status: string;
    product: string;
    leadTracking: JSX.Element;
    actions: Array<{
        icon: string;
        className: string;
        href?: string;
        onClick?: () => void;
    }>;
    [key: string]: any; // Add index signature to allow string indexing
}

interface RawLead {
    id: string;
    agent: string;
    customerName: string;
    status: string;
    products: Array<{
        id: string;
        name?: string;
    }>;
    // ... other fields
}

const Leads = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [leads, setLeads] = useState<Lead[]>([]);
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [users, setUsers] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [rawLeads, setRawLeads] = useState<RawLead[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteSelectedLoading, setDeleteSelectedLoading] = useState(false);
    const [sortKey, setSortKey] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                await fetchRawLeads();
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [currentPage, itemsPerPage]);

    // Update formatted leads whenever raw leads change
    useEffect(() => {
        if (rawLeads.length > 0) {
            formatLeadsData();
        }
    }, [rawLeads]);

    // Add search effect
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredLeads(leads);
            setTotalResults(leads.length);
            setTotalPages(Math.ceil(leads.length / itemsPerPage));
        } else {
            const filtered = leads.filter(lead => {
                const agentName = lead.agentName.toLowerCase();
                const searchLower = searchQuery.toLowerCase();
                return agentName.includes(searchLower);
            });
            setFilteredLeads(filtered);
            setTotalResults(filtered.length);
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        }
        setCurrentPage(1);
    }, [searchQuery, leads, itemsPerPage]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}users?limit=100`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Users data:', response.data.results);
            setUsers(response.data.results);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}products?limit=100`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Products data:', response.data.results);
            setProducts(response.data.results);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    const fetchRawLeads = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}leads?limit=${itemsPerPage}&page=${currentPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Leads data:', response.data.results);
            setRawLeads(response.data.results);
            setTotalPages(response.data.totalPages);
            setTotalResults(response.data.totalResults);
        } catch (err) {
            console.error('Error fetching leads:', err);
            throw err;
        }
    };

    const formatLeadsData = () => {
        const formattedData = rawLeads.map((lead: any, index: number) => {
            const agentName = lead.agent?.name || lead.agent?.email || '--';
            let productName = '--';
            if (lead.products && lead.products.length > 0) {
                productName = lead.products[0]?.product?.name || '--';
            }

            return {
                id: lead.id,
                srNo: index + 1,
                agentName: agentName,
                status: lead.status || '--',
                product: productName,
                leadTracking: <Link href={`/leads/timeline?id=${lead.id}`} className="text-primary hover:text-primary-dark">View Timeline</Link>,
                actions: [
                    {
                        icon: 'ri-eye-line',
                        className: 'ti-btn-primary',
                        href: `/leads/view?id=${lead.id}`
                    },
                    {
                        icon: 'ri-edit-line',
                        className: 'ti-btn-info',
                        href: `/leads/edit?id=${lead.id}`
                    },
                    {
                        icon: 'ri-delete-bin-line',
                        className: 'ti-btn-danger',
                        onClick: () => handleDelete(lead.id)
                    }
                ]
            };
        });

        setLeads(formattedData);
        setFilteredLeads(formattedData);
    };

    const handleDelete = async (id: string) => {
        setSelectedLeadId(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedLeadId) return;
        
        try {
            setDeleteLoading(true);
            const token = localStorage.getItem('token');
            await axios.delete(`${Base_url}leads/${selectedLeadId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Refresh the leads list after deletion
            await fetchRawLeads();
            setDeleteModalOpen(false);
            setSelectedLeadId(null);
        } catch (error) {
            console.error('Error deleting lead:', error);
            setError('Failed to delete lead');
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setSelectedLeadId(null);
    };

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const StatusOptions = [
        { value: 'new', label: 'New' },
        { value: 'contacted', label: 'Contacted' },
        { value: 'interested', label: 'Interested' },
        { value: 'followUp', label: 'Follow Up' },
        { value: 'qualified', label: 'Qualified' },
        { value: 'proposal', label: 'Proposal' },
        { value: 'negotiation', label: 'Negotiation' },
        { value: 'closed', label: 'Closed' }
    ];

    const ProductOptions = [
        { value: 'term-life', label: 'Term Life Insurance' },
        { value: 'health-shield', label: 'Health Shield Plus' },
        { value: 'auto-secure', label: 'Auto Secure' },
        { value: 'home-shield', label: 'Home Shield' },
        { value: 'car-loan', label: 'Car Loan Prime' },
        { value: 'home-loan', label: 'Home Loan Plus' },
        { value: 'business-loan', label: 'Business Growth Loan' },
        { value: 'msme-loan', label: 'MSME Support' }
    ];

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) return;
        
        try {
            setDeleteSelectedLoading(true);
            const token = localStorage.getItem('token');
            console.log("selectedIds",selectedIds);
            
            // await Promise.all(
            //     selectedIds.map(id =>
            //         axios.delete(`${Base_url}leads/${id}`, {
            //             headers: {
            //                 Authorization: `Bearer ${token}`
            //             }
            //         })
            //     )
            // );
            
            // await fetchRawLeads();
            setSelectedIds([]);
        } catch (error) {
            console.error('Error deleting selected leads:', error);
            setError('Failed to delete selected leads');
        } finally {
            setDeleteSelectedLoading(false);
        }
    };

    const handleSort = (key: string, direction: 'asc' | 'desc') => {
        setSortKey(key);
        setSortDirection(direction);
        
        const sortedData = [...filteredLeads].sort((a, b) => {
            let valueA = a[key];
            let valueB = b[key];

            // Handle JSX elements (for leadTracking)
            if (React.isValidElement(valueA)) {
                const element = valueA as React.ReactElement;
                valueA = element.props.children;
            }
            if (React.isValidElement(valueB)) {
                const element = valueB as React.ReactElement;
                valueB = element.props.children;
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

        setFilteredLeads(sortedData);
    };

    const handleExport = () => {
        // Filter data based on selected IDs
        const dataToExport = selectedIds.length > 0
            ? leads.filter(lead => selectedIds.includes(lead.id))
            : leads;

        // Create a new array without the actions column
        const exportData = dataToExport.map(lead => ({
            'Sr No': lead.srNo,
            'Agent Name': lead.agentName,
            'Status': lead.status,
            'Product': lead.product
        }));

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Leads');

        // Generate Excel file
        XLSX.writeFile(wb, 'leads_export.xlsx');
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const headers = [
        { key: 'agentName', label: 'Agent Name', sortable: true },
        { key: 'status', label: 'Status', sortable: false },
        { key: 'product', label: 'Product', sortable: true },
        { key: 'leadTracking', label: 'Lead Tracking', sortable: false },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    return (
        <Fragment>
            <Seo title={"Leads"} />
            <Pageheader currentpage="Leads" activepage="Leads" mainpage="Leads" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Leads List</h5>
                            <div className="flex gap-2">
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
                            </div>
                        </div>
                        <div className="box-body">
                            {loading ? (
                                <div className="text-center py-4">Loading leads...</div>
                            ) : error ? (
                                <div className="text-center py-4 text-danger">{error}</div>
                            ) : (
                                <DataTable 
                                    headers={headers} 
                                    data={filteredLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
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
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                title="Delete Lead"
                message="Are you sure you want to delete this lead? This action cannot be undone."
                loading={deleteLoading}
            />
        </Fragment>
    )
}

export default function ProtectedLeads() {
    return (
        <ProtectedRoute>
            <Leads />
        </ProtectedRoute>
    )
}
