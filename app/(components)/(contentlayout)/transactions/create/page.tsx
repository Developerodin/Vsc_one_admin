"use client"
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Base_url } from "@/app/api/config/BaseUrl";

interface FormData {
    type: 'commission' | 'payout' | 'refund';
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    paymentMethod: string;
    description: string;
    reference: {
        id: string;
        model: string;
    };
    bankAccount: string;
    notes: Array<{
        content: string;
        createdBy: string;
        createdAt: Date;
    }>;
    documents: Array<{
        name: string;
        url: string;
        type: string;
    }>;
    processing: {
        processedBy: string;
        processedAt: Date;
        error?: {
            code: string;
            message: string;
            details: string;
        };
    };
    metadata: {
        [key: string]: any;
    };
}

const CreateTransaction = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [users, setUsers] = useState<any[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
        type: 'commission',
        amount: 0,
        currency: 'INR',
        status: 'pending',
        paymentMethod: '',
        description: '',
        reference: {
            id: '',
            model: ''
        },
        bankAccount: '',
        notes: [],
        documents: [],
        processing: {
            processedBy: '',
            processedAt: new Date()
        },
        metadata: {}
    });

    useEffect(() => {
        fetchUsers();
        // Get current user ID from localStorage or context
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setCurrentUserId(user.id || '');
    }, []);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Validate required fields
            if (!formData.type || !formData.amount || !formData.currency || !formData.status || !formData.paymentMethod) {
                alert('Please fill in all required fields');
                setLoading(false);
                return;
            }

            const token = localStorage.getItem('token');
            await axios.post(`${Base_url}transactions`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            router.push('/transactions/transactions');
        } catch (error: any) {
            console.error('Error creating transaction:', error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert('Error creating transaction. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const TypeOptions = [
        { value: 'commission', label: 'Commission' },
        { value: 'payout', label: 'Payout' },
        { value: 'refund', label: 'Refund' }
    ];

    const StatusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
        { value: 'failed', label: 'Failed' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const CurrencyOptions = [
        { value: 'INR', label: 'INR' },
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' }
    ];

    const PaymentMethodOptions = [
        { value: 'bank_transfer', label: 'Bank Transfer' },
        { value: 'credit_card', label: 'Credit Card' },
        { value: 'debit_card', label: 'Debit Card' },
        { value: 'upi', label: 'UPI' },
        { value: 'cash', label: 'Cash' }
    ];

    const tabs = [
        { id: 0, label: 'Basic Info' },
        { id: 1, label: 'Reference' },
        { id: 2, label: 'Notes' },
        { id: 3, label: 'Documents' },
        { id: 4, label: 'Processing' },
        { id: 5, label: 'Metadata' }
    ];

    return (
        <Fragment>
            <Seo title="Create Transaction" />
            <Pageheader currentpage="Create Transaction" activepage="Transactions" mainpage="Transactions" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Create Transaction</h5>
                        </div>
                        <div className="box-body">
                            <form onSubmit={handleSubmit}>
                                <div className="flex border-b border-gray-200">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
                                                activeTab === tab.id
                                                    ? 'bg-primary text-white'
                                                    : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                            onClick={() => setActiveTab(tab.id)}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    {activeTab === 0 && (
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <label className="form-label">Type *</label>
                                                <Select
                                                    options={TypeOptions}
                                                    value={TypeOptions.find(option => option.value === formData.type)}
                                                    onChange={(option) => handleSelectChange('type', option)}
                                                    placeholder="Select Type"
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="form-label">Amount *</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="amount"
                                                    value={formData.amount}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter Amount"
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="form-label">Currency *</label>
                                                <Select
                                                    options={CurrencyOptions}
                                                    value={CurrencyOptions.find(option => option.value === formData.currency)}
                                                    onChange={(option) => handleSelectChange('currency', option)}
                                                    placeholder="Select Currency"
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="form-label">Status *</label>
                                                <Select
                                                    options={StatusOptions}
                                                    value={StatusOptions.find(option => option.value === formData.status)}
                                                    onChange={(option) => handleSelectChange('status', option)}
                                                    placeholder="Select Status"
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="form-label">Payment Method *</label>
                                                <Select
                                                    options={PaymentMethodOptions}
                                                    value={PaymentMethodOptions.find(option => option.value === formData.paymentMethod)}
                                                    onChange={(option) => handleSelectChange('paymentMethod', option)}
                                                    placeholder="Select Payment Method"
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-12">
                                                <label className="form-label">Description</label>
                                                <textarea
                                                    className="form-control"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter Description"
                                                    rows={4}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 1 && (
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-6">
                                                <label className="form-label">Reference ID</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="reference.id"
                                                    value={formData.reference.id}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter Reference ID"
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="form-label">Reference Model</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="reference.model"
                                                    value={formData.reference.model}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter Reference Model"
                                                />
                                            </div>
                                            <div className="col-span-12">
                                                <label className="form-label">Bank Account</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="bankAccount"
                                                    value={formData.bankAccount}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter Bank Account"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 2 && (
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <button
                                                    type="button"
                                                    className="ti-btn ti-btn-primary"
                                                    onClick={() => {
                                                        if (!currentUserId) {
                                                            alert('User ID not found. Please log in again.');
                                                            return;
                                                        }
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            notes: [
                                                                ...prev.notes,
                                                                {
                                                                    content: '',
                                                                    createdBy: currentUserId,
                                                                    createdAt: new Date()
                                                                }
                                                            ]
                                                        }));
                                                    }}
                                                >
                                                    Add Note
                                                </button>
                                            </div>
                                            {formData.notes.map((note, index) => (
                                                <div key={index} className="col-span-12">
                                                    <label className="form-label">Note Content</label>
                                                    <textarea
                                                        className="form-control"
                                                        value={note.content}
                                                        onChange={(e) => {
                                                            const newNotes = [...formData.notes];
                                                            newNotes[index] = {
                                                                ...newNotes[index],
                                                                content: e.target.value,
                                                                createdBy: currentUserId,
                                                                createdAt: new Date()
                                                            };
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                notes: newNotes
                                                            }));
                                                        }}
                                                        placeholder="Enter Note Content"
                                                        rows={3}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 3 && (
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <button
                                                    type="button"
                                                    className="ti-btn ti-btn-primary"
                                                    onClick={() => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            documents: [
                                                                ...prev.documents,
                                                                {
                                                                    name: '',
                                                                    url: '',
                                                                    type: ''
                                                                }
                                                            ]
                                                        }));
                                                    }}
                                                >
                                                    Add Document
                                                </button>
                                            </div>
                                            {formData.documents.map((document, index) => (
                                                <div key={index} className="col-span-12 grid grid-cols-12 gap-4">
                                                    <div className="col-span-4">
                                                        <label className="form-label">Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={document.name}
                                                            onChange={(e) => {
                                                                const newDocuments = [...formData.documents];
                                                                newDocuments[index].name = e.target.value;
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    documents: newDocuments
                                                                }));
                                                            }}
                                                            placeholder="Enter Name"
                                                        />
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label className="form-label">URL</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={document.url}
                                                            onChange={(e) => {
                                                                const newDocuments = [...formData.documents];
                                                                newDocuments[index].url = e.target.value;
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    documents: newDocuments
                                                                }));
                                                            }}
                                                            placeholder="Enter URL"
                                                        />
                                                    </div>
                                                    <div className="col-span-4">
                                                        <label className="form-label">Type</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={document.type}
                                                            onChange={(e) => {
                                                                const newDocuments = [...formData.documents];
                                                                newDocuments[index].type = e.target.value;
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    documents: newDocuments
                                                                }));
                                                            }}
                                                            placeholder="Enter Type"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 4 && (
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-6">
                                                <label className="form-label">Processed By</label>
                                                <Select
                                                    options={users.map(user => ({ value: user.id, label: user.name }))}
                                                    value={users.find(user => user.id === formData.processing.processedBy) ? 
                                                        { value: formData.processing.processedBy, label: users.find(user => user.id === formData.processing.processedBy)?.name } : 
                                                        null}
                                                    onChange={(option) => {
                                                        if (option) {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                processing: {
                                                                    ...prev.processing,
                                                                    processedBy: option.value
                                                                }
                                                            }));
                                                        }
                                                    }}
                                                    placeholder="Select User"
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="form-label">Processed At</label>
                                                <DatePicker
                                                    selected={formData.processing.processedAt}
                                                    onChange={(date) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            processing: {
                                                                ...prev.processing,
                                                                processedAt: date || new Date()
                                                            }
                                                        }));
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-span-12">
                                                <label className="form-label">Error Code</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={formData.processing.error?.code || ''}
                                                    onChange={(e) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            processing: {
                                                                ...prev.processing,
                                                                error: {
                                                                    ...prev.processing.error,
                                                                    code: e.target.value
                                                                }
                                                            }
                                                        }));
                                                    }}
                                                    placeholder="Enter Error Code"
                                                />
                                            </div>
                                            <div className="col-span-12">
                                                <label className="form-label">Error Message</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={formData.processing.error?.message || ''}
                                                    onChange={(e) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            processing: {
                                                                ...prev.processing,
                                                                error: {
                                                                    ...prev.processing.error,
                                                                    message: e.target.value
                                                                }
                                                            }
                                                        }));
                                                    }}
                                                    placeholder="Enter Error Message"
                                                />
                                            </div>
                                            <div className="col-span-12">
                                                <label className="form-label">Error Details</label>
                                                <textarea
                                                    className="form-control"
                                                    value={formData.processing.error?.details || ''}
                                                    onChange={(e) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            processing: {
                                                                ...prev.processing,
                                                                error: {
                                                                    ...prev.processing.error,
                                                                    details: e.target.value
                                                                }
                                                            }
                                                        }));
                                                    }}
                                                    placeholder="Enter Error Details"
                                                    rows={4}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 5 && (
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <button
                                                    type="button"
                                                    className="ti-btn ti-btn-primary"
                                                    onClick={() => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            metadata: {
                                                                ...prev.metadata,
                                                                '': ''
                                                            }
                                                        }));
                                                    }}
                                                >
                                                    Add Metadata
                                                </button>
                                            </div>
                                            {Object.entries(formData.metadata).map(([key, value], index) => (
                                                <div key={index} className="col-span-12 grid grid-cols-12 gap-4">
                                                    <div className="col-span-6">
                                                        <label className="form-label">Key</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={key}
                                                            onChange={(e) => {
                                                                const newMetadata = { ...formData.metadata };
                                                                delete newMetadata[key];
                                                                newMetadata[e.target.value] = value;
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    metadata: newMetadata
                                                                }));
                                                            }}
                                                            placeholder="Enter Key"
                                                        />
                                                    </div>
                                                    <div className="col-span-6">
                                                        <label className="form-label">Value</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={value}
                                                            onChange={(e) => {
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    metadata: {
                                                                        ...prev.metadata,
                                                                        [key]: e.target.value
                                                                    }
                                                                }));
                                                            }}
                                                            placeholder="Enter Value"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="ti-btn ti-btn-light hover:bg-gray-100"
                                        onClick={() => router.push('/transactions/transactions')}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="ti-btn ti-btn-primary-full"
                                        disabled={loading}
                                    >
                                        {loading ? 'Creating...' : 'Create Transaction'}
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

export default function ProtectedCreateTransaction() {
    return (
        <ProtectedRoute>
            <CreateTransaction />
        </ProtectedRoute>
    );
} 