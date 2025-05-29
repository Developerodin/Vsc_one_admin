"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";

const ViewLead = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const leadId = searchParams.get('id');
    const [leadData, setLeadData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (leadId) {
            fetchLeadDetails();
        } else {
            router.push('/leads/leads');
        }
    }, [leadId]);

    const fetchLeadDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}leads/${leadId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setLeadData(response.data);
        } catch (error) {
            console.error('Error fetching lead details:', error);
            setError('Failed to load lead details');
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !leadData) {
        return (
            <Fragment>
                <Seo title="Lead Details" />
                <Pageheader currentpage="Lead Details" activepage="Leads" mainpage="Leads" />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <i className="ri-error-warning-line text-6xl text-red-500 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Error Loading Lead</h3>
                        <p className="text-gray-500 mb-4">{error || 'Lead not found'}</p>
                        <button 
                            onClick={() => router.push('/leads/leads')}
                            className="ti-btn ti-btn-primary"
                        >
                            Back to Leads
                        </button>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Seo title="Lead Details" />
            <Pageheader currentpage="Lead Details" activepage="Leads" mainpage="Leads" />
            
            <div className="grid grid-cols-12 gap-6">
                {/* Lead Overview */}
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="flex items-center justify-between w-full">
                                <h5 className="box-title">Lead Overview</h5>
                                <div className="flex items-center gap-3">
                                    <span className={`badge ${getStatusBadgeColor(leadData.status)} text-white px-3 py-1`}>
                                        {leadData.status || '--'}
                                    </span>
                                    <button
                                        onClick={() => router.push('/leads/leads')}
                                        className="ti-btn ti-btn-light"
                                    >
                                        <i className="ri-arrow-left-line mr-2"></i>
                                        Back to Leads
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 gap-4">
                                {/* Basic Info */}
                                <div className="col-span-12 md:col-span-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Source</label>
                                            <p className="text-sm font-semibold capitalize">{leadData.source || '--'}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Agent</label>
                                            <p className="text-sm font-semibold">{leadData.agent?.name || leadData.agent?.email || '--'}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Dates */}
                                <div className="col-span-12 md:col-span-6">
                                    <div className="space-y-4">
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
                    </div>
                </div>

                {/* Customer Information */}
                <div className="col-span-12 lg:col-span-6">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Customer Information</h5>
                        </div>
                        <div className="box-body">
                            {leadData.fieldsData && Object.keys(leadData.fieldsData).length > 0 ? (
                                <div className="space-y-3">
                                    {Object.entries(leadData.fieldsData).map(([key, value]: [string, any]) => (
                                        <div key={key} className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">{key}:</span>
                                            <span className="text-sm font-semibold">{value || '--'}</span>
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
                    </div>
                </div>

                {/* Product Information */}
                <div className="col-span-12 lg:col-span-6">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Product Information</h5>
                        </div>
                        <div className="box-body">
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
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-600">Type:</span>
                                                    <span className="text-sm font-medium capitalize">{productItem.product?.type || '--'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-600">Base Price:</span>
                                                    <span className="text-sm font-medium">₹{productItem.product?.pricing?.basePrice?.toLocaleString() || '--'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-600">Commission:</span>
                                                    <span className="text-sm font-medium">{productItem.product?.commission?.percentage || '--'}%</span>
                                                </div>
                                                {productItem.product?.description && (
                                                    <div>
                                                        <span className="text-sm text-gray-600">Description:</span>
                                                        <p className="text-sm font-medium mt-1">{productItem.product.description}</p>
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
                    </div>
                </div>

                {/* Category Information */}
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Category & Subcategory</h5>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 md:col-span-6">
                                    <div className="border rounded-lg p-4">
                                        <h6 className="font-semibold mb-3">Category</h6>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Name:</span>
                                                <span className="text-sm font-medium">{leadData.category?.name || '--'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Type:</span>
                                                <span className="text-sm font-medium capitalize">{leadData.category?.type || '--'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Status:</span>
                                                <span className={`badge ${leadData.category?.status === 'active' ? 'bg-primary' : 'bg-primary'} text-white`}>
                                                    {leadData.category?.status || '--'}
                                                </span>
                                            </div>
                                            {leadData.category?.description && (
                                                <div>
                                                    <span className="text-sm text-gray-600">Description:</span>
                                                    <p className="text-sm font-medium mt-1">{leadData.category.description}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-span-12 md:col-span-6">
                                    <div className="border rounded-lg p-4">
                                        <h6 className="font-semibold mb-3">Subcategory</h6>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Name:</span>
                                                <span className="text-sm font-medium">{leadData.subcategory?.name || '--'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Status:</span>
                                                <span className={`badge ${leadData.subcategory?.status === 'active' ? 'bg-primary' : 'bg-primary'} text-white`}>
                                                    {leadData.subcategory?.status || '--'}
                                                </span>
                                            </div>
                                            {leadData.subcategory?.description && (
                                                <div>
                                                    <span className="text-sm text-gray-600">Description:</span>
                                                    <p className="text-sm font-medium mt-1">{leadData.subcategory.description}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default function ProtectedViewLead() {
    return (
        <ProtectedRoute>
            <ViewLead />
        </ProtectedRoute>
    );
} 