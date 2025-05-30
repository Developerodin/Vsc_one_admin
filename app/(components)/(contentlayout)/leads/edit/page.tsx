"use client"
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import Select from "react-select";

const EditLead = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const leadId = searchParams.get('id');
    const [leadData, setLeadData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [users, setUsers] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('overview');
    
    // Editable fields
    const [selectedAgent, setSelectedAgent] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    useEffect(() => {
        if (leadId) {
            fetchLeadDetails();
            fetchUsers();
        } else {
            router.push('/leads/leads');
        }
    }, [leadId]);

    const fetchLeadDetails = async () => {
        try {
            setInitialLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}leads/${leadId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data;
            setLeadData(data);
            setSelectedAgent(data.agent?.id || '');
            setSelectedStatus(data.status || '');
        } catch (error) {
            console.error('Error fetching lead details:', error);
            setError('Failed to load lead details');
        } finally {
            setInitialLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}users?limit=100`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data.results || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAgent || !selectedStatus) {
            alert('Please select both agent and status');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`${Base_url}leads/${leadId}`, {
                agent: selectedAgent,
                status: selectedStatus
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            router.push('/leads/leads');
        } catch (error: any) {
            console.error('Error updating lead:', error);
            alert(error.response?.data?.message || 'Error updating lead. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '--';
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'new': return 'bg-primary';
            case 'contacted': return 'bg-primary';
            case 'interested': return 'bg-primary';
            case 'qualified': return 'bg-primary';
            case 'closed': return 'bg-primary';
            default: return 'bg-gray-400';
        }
    };

    const StatusOptions = [
        { value: 'new', label: 'New' },
        { value: 'contacted', label: 'Contacted' },
        { value: 'interested', label: 'Interested' },
        { value: 'followUp', label: 'Follow Up' },
        { value: 'qualified', label: 'Qualified' },
        { value: 'proposal', label: 'Proposal' },
        { value: 'negotiation', label: 'Negotiation' },
        { value: 'closed', label: 'Closed' },
        { value: 'lost', label: 'Lost' }
    ];

    const tabs = [
        { id: 'overview', label: 'Lead Overview', icon: 'ri-file-list-3-line' },
        { id: 'customer', label: 'Customer Information', icon: 'ri-user-line' },
        { id: 'product', label: 'Product Information', icon: 'ri-product-hunt-line' },
        { id: 'category', label: 'Category & Subcategory', icon: 'ri-folder-line' }
    ];

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !leadData) {
        return (
            <Fragment>
                <Seo title="Edit Lead" />
                <Pageheader currentpage="Edit Lead" activepage="Leads" mainpage="Leads" />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <i className="ri-error-warning-line text-6xl text-red-500 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Error Loading Lead</h3>
                        <p className="text-gray-500 mb-4">{error || 'Lead not found'}</p>
                        <button 
                            onClick={() => router.push('/leads/leads')}
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors flex items-center gap-2"
                        >
                            <i className="ri-arrow-left-line"></i>
                            Back to Leads
                        </button>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Seo title="Edit Lead" />
            <Pageheader currentpage="Edit Lead" activepage="Leads" mainpage="Leads" />
            
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="flex items-center justify-between w-full">
                                <h5 className="box-title">Edit Lead</h5>
                                <div className="flex items-center gap-3">
                                    <span className={`badge ${getStatusBadgeColor(selectedStatus)} text-white px-3 py-1`}>
                                        {selectedStatus || '--'}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => router.push('/leads/leads')}
                                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors flex items-center gap-2"
                                    >
                                        <i className="ri-arrow-left-line"></i>
                                        Back to Leads
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            {/* Tab Navigation */}
                            <div className="border-b border-gray-200 mb-6">
                                <nav className="-mb-px flex space-x-2">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`py-2 px-4 rounded-t-lg font-medium text-sm flex items-center gap-2 transition-colors ${
                                                activeTab === tab.id
                                                    ? 'bg-primary text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                                            }`}
                                        >
                                            <i className={tab.icon}></i>
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Lead Overview Tab */}
                                {activeTab === 'overview' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-12 gap-4">
                                            {/* Basic Info */}
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-600">Source</label>
                                                        <p className="text-sm font-semibold capitalize">{leadData.source || '--'}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-600">Agent *</label>
                                                        <Select
                                                            options={users.map(user => ({ value: user.id, label: user.name || user.email }))}
                                                            value={users.find(user => user.id === selectedAgent) ? 
                                                                { value: selectedAgent, label: users.find(user => user.id === selectedAgent)?.name || users.find(user => user.id === selectedAgent)?.email } : 
                                                                null}
                                                            onChange={(option) => setSelectedAgent(option?.value || '')}
                                                            placeholder="Select Agent"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Dates and Status */}
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-600">Status *</label>
                                                        <Select
                                                            options={StatusOptions}
                                                            value={StatusOptions.find(option => option.value === selectedStatus)}
                                                            onChange={(option) => setSelectedStatus(option?.value || '')}
                                                            placeholder="Select Status"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-600">Last Contact</label>
                                                        <p className="text-sm font-semibold">{formatDate(leadData.lastContact)}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-600">Next Follow Up</label>
                                                        <p className="text-sm font-semibold">{formatDate(leadData.nextFollowUp)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Customer Information Tab */}
                                {activeTab === 'customer' && (
                                    <div className="space-y-6">
                                        {leadData.fieldsData && Object.keys(leadData.fieldsData).length > 0 ? (
                                            <div className="grid grid-cols-12 gap-4">
                                                {Object.entries(leadData.fieldsData).map(([key, value]: [string, any]) => (
                                                    <div key={key} className="col-span-12 md:col-span-6">
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-600">{key}</label>
                                                            <p className="text-sm font-semibold p-2 bg-gray-50 rounded border">{value || '--'}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <i className="ri-user-line text-4xl text-gray-400 mb-4"></i>
                                                <p className="text-gray-500">No customer information available</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Product Information Tab */}
                                {activeTab === 'product' && (
                                    <div className="space-y-6">
                                        {leadData.products && leadData.products.length > 0 ? (
                                            <div className="space-y-4">
                                                {leadData.products.map((productItem: any, index: number) => (
                                                    <div key={index} className="border rounded-lg p-4">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <h6 className="font-semibold">{productItem.product?.name || 'Product'}</h6>
                                                            <span className={`badge ${getStatusBadgeColor(productItem.status)} text-white`}>
                                                                {productItem.status || '--'}
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-12 gap-4">
                                                            <div className="col-span-12 md:col-span-6">
                                                                <div className="space-y-2">
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm text-gray-600">Type:</span>
                                                                        <span className="text-sm font-medium capitalize">{productItem.product?.type || '--'}</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm text-gray-600">Base Price:</span>
                                                                        <span className="text-sm font-medium">₹{productItem.product?.pricing?.basePrice?.toLocaleString() || '--'}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 md:col-span-6">
                                                                <div className="space-y-2">
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm text-gray-600">Commission:</span>
                                                                        <span className="text-sm font-medium">{productItem.product?.commission?.percentage || '--'}%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {productItem.product?.description && (
                                                                <div className="col-span-12">
                                                                    <div>
                                                                        <span className="text-sm text-gray-600">Description:</span>
                                                                        <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded border">{productItem.product.description}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <i className="ri-product-hunt-line text-4xl text-gray-400 mb-4"></i>
                                                <p className="text-gray-500">No product information available</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Category Information Tab */}
                                {activeTab === 'category' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="border rounded-lg p-4">
                                                    <h6 className="font-semibold mb-3 flex items-center gap-2">
                                                        <i className="ri-folder-line"></i>
                                                        Category
                                                    </h6>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-600">Name</label>
                                                            <p className="text-sm font-semibold p-2 bg-gray-50 rounded border">{leadData.category?.name || '--'}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-600">Type</label>
                                                            <p className="text-sm font-semibold p-2 bg-gray-50 rounded border capitalize">{leadData.category?.type || '--'}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-600">Status</label>
                                                            <div className="mt-1">
                                                                <span className={`badge ${leadData.category?.status === 'active' ? 'bg-primary' : 'bg-primary'} text-white`}>
                                                                    {leadData.category?.status || '--'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {leadData.category?.description && (
                                                            <div>
                                                                <label className="text-sm font-medium text-gray-600">Description</label>
                                                                <p className="text-sm font-medium p-2 bg-gray-50 rounded border mt-1">{leadData.category.description}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="border rounded-lg p-4">
                                                    <h6 className="font-semibold mb-3 flex items-center gap-2">
                                                        <i className="ri-folder-open-line"></i>
                                                        Subcategory
                                                    </h6>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-600">Name</label>
                                                            <p className="text-sm font-semibold p-2 bg-gray-50 rounded border">{leadData.subcategory?.name || '--'}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-600">Status</label>
                                                            <div className="mt-1">
                                                                <span className={`badge ${leadData.subcategory?.status === 'active' ? 'bg-primary' : 'bg-primary'} text-white`}>
                                                                    {leadData.subcategory?.status || '--'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {leadData.subcategory?.description && (
                                                            <div>
                                                                <label className="text-sm font-medium text-gray-600">Description</label>
                                                                <p className="text-sm font-medium p-2 bg-gray-50 rounded border mt-1">{leadData.subcategory.description}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons - Show on all tabs */}
                                <div className="flex justify-end gap-2 pt-6 border-t">
                                    <button
                                        type="button"
                                        onClick={() => router.push('/leads/leads')}
                                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {loading ? 'Updating...' : 'Update Lead'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default function ProtectedEditLead() {
    return (
        <ProtectedRoute>
            <EditLead />
        </ProtectedRoute>
    );
} 