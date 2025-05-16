"use client"
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
    agent: string;
    customerName: string;
    email: string;
    mobileNumber: string;
    status: 'new' | 'contacted' | 'interested' | 'followUp' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost';
    source: 'direct' | 'referral' | 'website' | 'social' | 'other';
    products: Array<{
        product: string;
        status: 'interested' | 'proposed' | 'sold' | 'rejected';
        notes: string;
    }>;
    requirements: string;
    budget: {
        amount: number;
        currency: string;
    };
    followUps: Array<{
        date: Date;
        notes: string;
        status: 'pending' | 'completed' | 'cancelled';
        agent: string;
    }>;
    documents: Array<{
        name: string;
        url: string;
        type: string;
        uploadedAt: Date;
    }>;
    notes: Array<{
        content: string;
        createdBy: string;
        createdAt: Date;
    }>;
    lastContact?: Date;
    nextFollowUp?: Date;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: string;
        country: string;
    };
    tags: string[];
    metadata: {
        [key: string]: any;
    };
}

const EditLead = () => {
    const router = useRouter();
    const params = useParams();
    const leadId = params.id as string;
    
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [users, setUsers] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
        agent: '',
        customerName: '',
        email: '',
        mobileNumber: '',
        status: 'new',
        source: 'direct',
        products: [],
        requirements: '',
        budget: {
            amount: 0,
            currency: 'INR'
        },
        followUps: [],
        documents: [],
        notes: [],
        lastContact: new Date(),
        nextFollowUp: new Date(),
        address: {
            street: '',
            city: '',
            state: '',
            pincode: '',
            country: 'India'
        },
        tags: [],
        metadata: {}
    });

    useEffect(() => {
        if (leadId) {
            fetchLeadData();
        } else {
            router.push('/leads/leads');
        }
        fetchUsers();
        fetchProducts();
        // Get current user ID from localStorage or context
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setCurrentUserId(user.id || '');
    }, [leadId]);

    const fetchLeadData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}leads/${leadId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const leadData = response.data;
            
            // Format dates from strings to Date objects
            const formattedData = {
                ...leadData,
                lastContact: leadData.lastContact ? new Date(leadData.lastContact) : undefined,
                nextFollowUp: leadData.nextFollowUp ? new Date(leadData.nextFollowUp) : undefined,
                followUps: leadData.followUps.map((f: any) => ({
                    ...f,
                    date: new Date(f.date)
                })),
                documents: leadData.documents.map((d: any) => ({
                    ...d,
                    uploadedAt: new Date(d.uploadedAt)
                })),
                notes: leadData.notes.map((n: any) => ({
                    ...n,
                    createdAt: new Date(n.createdAt)
                }))
            };
            
            setFormData(formattedData);
        } catch (error) {
            console.error('Error fetching lead:', error);
        } finally {
            setInitialLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data.results);
        } catch (error) {
            console.error('Error fetching users:', error);
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
            setProducts(response.data.results);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof typeof prev],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSelectChange = (name: string, option: any) => {
        if (option) {
            setFormData(prev => ({
                ...prev,
                [name]: option.value
            }));
        }
    };

    const handleMultiSelectChange = (name: string, options: any[]) => {
        if (options) {
            setFormData(prev => ({
                ...prev,
                [name]: options.map(option => option.value)
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Validate required fields
            if (!formData.agent || !formData.customerName || !formData.mobileNumber || !formData.source) {
                alert('Please fill in all required fields');
                setLoading(false);
                return;
            }

            // Validate email format if provided
            if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                alert('Please enter a valid email address');
                setLoading(false);
                return;
            }

            // Format the data to match the API structure
            const formattedData = {
                agent: formData.agent,
                customerName: formData.customerName,
                email: formData.email,
                mobileNumber: formData.mobileNumber,
                status: formData.status,
                source: formData.source,
                products: formData.products.map(p => ({
                    product: p.product,
                    status: p.status,
                    notes: p.notes
                })),
                requirements: formData.requirements,
                budget: {
                    amount: Number(formData.budget.amount),
                    currency: formData.budget.currency
                },
                followUps: formData.followUps.map(f => ({
                    date: f.date.toISOString(),
                    notes: f.notes,
                    status: f.status,
                    agent: f.agent
                })),
                documents: formData.documents.map(d => ({
                    name: d.name,
                    url: d.url,
                    type: d.type,
                    uploadedAt: d.uploadedAt.toISOString()
                })),
                notes: formData.notes.map(n => ({
                    content: n.content,
                    createdBy: n.createdBy,
                    createdAt: n.createdAt.toISOString()
                })),
                lastContact: formData.lastContact?.toISOString(),
                nextFollowUp: formData.nextFollowUp?.toISOString(),
                address: {
                    street: formData.address.street,
                    city: formData.address.city,
                    state: formData.address.state,
                    pincode: formData.address.pincode,
                    country: formData.address.country
                },
                tags: formData.tags,
                metadata: formData.metadata
            };

            const token = localStorage.getItem('token');
            await axios.put(`${Base_url}leads/${leadId}`, formattedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            router.push('/leads/leads');
        } catch (error: any) {
            console.error('Error updating lead:', error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert('Error updating lead. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // ... Rest of the component code (StatusOptions, SourceOptions, etc.) remains the same as create page ...

    if (initialLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <Fragment>
            <Seo title="Edit Lead" />
            <Pageheader currentpage="Edit Lead" activepage="Leads" mainpage="Leads" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Edit Lead</h5>
                        </div>
                        <div className="box-body">
                            <form onSubmit={handleSubmit}>
                                {/* ... keep all form content ... */}
                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="ti-btn ti-btn-light hover:bg-gray-100"
                                        onClick={() => router.push('/leads/leads')}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="ti-btn ti-btn-primary-full"
                                        disabled={loading}
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