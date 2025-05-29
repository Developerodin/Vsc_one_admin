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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [rawLeads, setRawLeads] = useState<RawLead[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

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
    }, []);

    // Update formatted leads whenever raw leads change
    useEffect(() => {
        if (rawLeads.length > 0) {
            formatLeadsData();
        }
    }, [rawLeads]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}users`, {
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
            const response = await axios.get(`${Base_url}products`, {
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
            const response = await axios.get(`${Base_url}leads`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Leads data:', response.data.results);
            setRawLeads(response.data.results);
        } catch (err) {
            console.error('Error fetching leads:', err);
            throw err;
        }
    };

    const formatLeadsData = () => {
        const formattedData = rawLeads.map((lead: any, index: number) => {
            // Get agent name from the agent object (which is now a full object, not just an ID)
            const agentName = lead.agent?.name || lead.agent?.email || '--';
            
            // Get product name from the nested products structure
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

    const headers = [
        { key: 'agentName', label: 'Agent Name' , sortable: true},
        { key: 'status', label: 'Status' , sortable: false},
        { key: 'product', label: 'Product' , sortable: false},
        { key: 'leadTracking', label: 'Lead Tracking' , sortable: false},
        { key: 'actions', label: 'Actions' , sortable: false}
    ];

    const handleExport = () => {
        // Prepare data for export
        const exportData = leads.map(lead => ({
            'Sr No': lead.srNo,
            'Agent Name': lead.agentName,
            'Status': lead.status,
            'Product': lead.product
        }));

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Leads');

        // Generate Excel file
        XLSX.writeFile(wb, 'leads_export.xlsx');
    };

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
                                    onClick={handleExport}
                                >
                                    <i className="ri-file-excel-line font-semibold align-middle mr-1"></i> Export
                                </button>
                                {/* <Link href="/leads/create" className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]">
                                    <i className="ri-add-line font-semibold align-middle"></i> Create Lead
                                </Link> */}
                            </div>
                        </div>
                        <div className="box-body">
                            {loading ? (
                                <div className="text-center py-4">Loading leads...</div>
                            ) : error ? (
                                <div className="text-center py-4 text-danger">{error}</div>
                            ) : (
                                <DataTable headers={headers} data={leads} />
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
