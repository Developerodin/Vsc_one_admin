"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link';

interface FormData {
    name: string;
    type: 'insurance' | 'banking' | 'project funding' | 'it sector' | 'capital market';
    categories: string[];
    description: string;
    features: string[];
    terms: string[];
    eligibility: string;
    commission: {
        percentage: number;
        minAmount: number;
        maxAmount: number;
        bonus: number;
    };
    pricing: {
        basePrice: number;
        currency: string;
        discounts: Array<{
            type: 'percentage' | 'fixed';
            value: number;
            validUntil: Date | null;
        }>;
    };
    interestRate: number;
    loanAmount: {
        min: number;
        max: number;
    };
    tenure: {
        min: number;
        max: number;
    };
    coverage: string;
    duration: string;
    status: 'active' | 'inactive' | 'draft';
    documents: Array<{
        name: string;
        url: string;
        type: string;
    }>;
    images: Array<{
        url: string;
        alt: string;
    }>;
    metadata: {
        [key: string]: any;
    };
}

const CreateProduct = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        type: "insurance",
        categories: [],
        description: "",
        features: [""],
        terms: [""],
        eligibility: "",
        commission: {
            percentage: 0,
            minAmount: 0,
            maxAmount: 0,
            bonus: 0
        },
        pricing: {
            basePrice: 0,
            currency: "INR",
            discounts: []
        },
        coverage: "",
        duration: "",
        interestRate: 0,
        loanAmount: {
            min: 0,
            max: 0
        },
        tenure: {
            min: 0,
            max: 0
        },
        status: "active",
        documents: [],
        images: [],
        metadata: {}
    });

    const tabs = [
        { name: 'General Information', icon: 'ri-information-line' },
        { name: 'Features and Terms', icon: 'ri-list-check' },
        { name: 'Pricing', icon: 'ri-price-tag-3-line' },
        { name: 'Insurance Details', icon: 'ri-shield-check-line' },
        { name: 'Banking Details', icon: 'ri-bank-line' },
        { name: 'Media', icon: 'ri-image-line' },
        { name: 'Metadata', icon: 'ri-settings-4-line' }
    ];

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}categories?limit=100`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const categoryOptions = response.data.results.map((category: any) => ({
                value: category.id,
                label: category.name
            }));
            setCategories(categoryOptions);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const TypeOptions = [
        { value: 'insurance', label: 'Insurance' },
        { value: 'banking', label: 'Banking' },
        { value: 'project funding', label: 'Project Funding' },
        { value: 'it sector', label: 'IT Sector' },
        { value: 'capital market', label: 'Capital Market' }
    ];

    const StatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'draft', label: 'Draft' }
    ];

    const CurrencyOptions = [
        { value: 'INR', label: 'INR' },
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' }
    ];

    const DiscountTypeOptions = [
        { value: 'percentage', label: 'Percentage' },
        { value: 'fixed', label: 'Fixed' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof typeof prev] as any),
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

    const handleSelectChange = (name: string, selectedOption: any) => {
        if (name === 'categories') {
            setFormData(prev => ({
                ...prev,
                categories: selectedOption.map((option: any) => option.value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: selectedOption.value
            }));
        }
    };

    const handleArrayInputChange = (index: number, value: string, field: 'features' | 'terms') => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (field: 'features' | 'terms') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (index: number, field: 'features' | 'terms') => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            await axios.post(`${Base_url}products`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            router.push('/products/products');
        } catch (error) {
            console.error('Error creating product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Seo title={"Create Product"} />
            <Pageheader currentpage="Create Product" activepage="Products" mainpage="Create Product" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Create New Product</h5>
                            <Link href="/products/products" className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]">
                                <i className="ri-arrow-left-line font-semibold align-middle me-1"></i> Back to Products
                            </Link>
                        </div>
                        <div className="box-body">
                            <div className="flex space-x-2 border-b border-gray-200">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
                                            activeTab === index
                                                ? 'bg-primary text-white'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                        onClick={() => setActiveTab(index)}
                                    >
                                        <i className={`${tab.icon} mr-2`}></i>
                                        {tab.name}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4">
                                {activeTab === 0 && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">Product Name *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter Product Name"
                                                required
                                            />
                                        </div>
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
                                        <div className="col-span-12">
                                            <label className="form-label">Categories *</label>
                                            <Select
                                                options={categories}
                                                value={categories.filter((option: any) => formData.categories.includes(option.value))}
                                                onChange={(option) => handleSelectChange('categories', option)}
                                                placeholder="Select Categories"
                                                isMulti
                                                required
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Description *</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                placeholder="Enter Description"
                                                rows={4}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Status</label>
                                            <Select
                                                options={StatusOptions}
                                                value={StatusOptions.find(option => option.value === formData.status)}
                                                onChange={(option) => handleSelectChange('status', option)}
                                                placeholder="Select Status"
                                                defaultValue={StatusOptions[0]}
                                            />
                                        </div>
                                    </div>
                                )}
                                {activeTab === 1 && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">Features</label>
                                            {formData.features.map((feature, index) => (
                                                <div key={index} className="flex gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={feature}
                                                        onChange={(e) => handleArrayInputChange(index, e.target.value, 'features')}
                                                        placeholder="Enter Feature"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="ti-btn ti-btn-danger"
                                                        onClick={() => removeArrayItem(index, 'features')}
                                                    >
                                                        <i className="ri-delete-bin-line"></i>
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="ti-btn ti-btn-light"
                                                onClick={() => addArrayItem('features')}
                                            >
                                                Add Feature
                                            </button>
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Terms</label>
                                            {formData.terms.map((term, index) => (
                                                <div key={index} className="flex gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={term}
                                                        onChange={(e) => handleArrayInputChange(index, e.target.value, 'terms')}
                                                        placeholder="Enter Term"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="ti-btn ti-btn-danger"
                                                        onClick={() => removeArrayItem(index, 'terms')}
                                                    >
                                                        <i className="ri-delete-bin-line"></i>
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="ti-btn ti-btn-light"
                                                onClick={() => addArrayItem('terms')}
                                            >
                                                Add Term
                                            </button>
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Eligibility</label>
                                            <textarea
                                                className="form-control"
                                                name="eligibility"
                                                value={formData.eligibility}
                                                onChange={handleInputChange}
                                                placeholder="Enter Eligibility Criteria"
                                                rows={4}
                                            />
                                        </div>
                                    </div>
                                )}
                                {activeTab === 2 && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">Base Price *</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="pricing.basePrice"
                                                value={formData.pricing.basePrice}
                                                onChange={handleInputChange}
                                                placeholder="Enter Base Price"
                                                min="0"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Currency</label>
                                            <Select
                                                options={CurrencyOptions}
                                                value={CurrencyOptions.find(option => option.value === formData.pricing.currency)}
                                                onChange={(option) => handleSelectChange('pricing.currency', option)}
                                                placeholder="Select Currency"
                                                defaultValue={CurrencyOptions[0]}
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Discounts</label>
                                            <div className="space-y-4">
                                                {formData.pricing.discounts.map((discount, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Select
                                                            options={DiscountTypeOptions}
                                                            value={DiscountTypeOptions.find(option => option.value === discount.type)}
                                                            onChange={(option) => {
                                                                if (option) {
                                                                    const newDiscounts = [...formData.pricing.discounts];
                                                                    newDiscounts[index] = { ...discount, type: option.value as 'percentage' | 'fixed' };
                                                                    setFormData(prev => ({
                                                                        ...prev,
                                                                        pricing: { ...prev.pricing, discounts: newDiscounts }
                                                                    }));
                                                                }
                                                            }}
                                                            placeholder="Select Type"
                                                        />
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="Value"
                                                            value={discount.value}
                                                            onChange={(e) => {
                                                                const newDiscounts = [...formData.pricing.discounts];
                                                                newDiscounts[index] = { ...discount, value: Number(e.target.value) };
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    pricing: { ...prev.pricing, discounts: newDiscounts }
                                                                }));
                                                            }}
                                                            min="0"
                                                        />
                                                        <DatePicker
                                                            selected={discount.validUntil}
                                                            onChange={(date) => {
                                                                const newDiscounts = [...formData.pricing.discounts];
                                                                newDiscounts[index] = { ...discount, validUntil: date };
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    pricing: { ...prev.pricing, discounts: newDiscounts }
                                                                }));
                                                            }}
                                                            placeholderText="Valid Until"
                                                            className="form-control"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="ti-btn ti-btn-danger"
                                                            onClick={() => {
                                                                const newDiscounts = formData.pricing.discounts.filter((_, i) => i !== index);
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    pricing: { ...prev.pricing, discounts: newDiscounts }
                                                                }));
                                                            }}
                                                        >
                                                            <i className="ri-delete-bin-line"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="ti-btn ti-btn-light"
                                                    onClick={() => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            pricing: {
                                                                ...prev.pricing,
                                                                discounts: [...prev.pricing.discounts, { type: 'percentage', value: 0, validUntil: null }]
                                                            }
                                                        }));
                                                    }}
                                                >
                                                    Add Discount
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 3 && formData.type === 'insurance' && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">Coverage</label>
                                            <textarea
                                                className="form-control"
                                                name="coverage"
                                                value={formData.coverage}
                                                onChange={handleInputChange}
                                                placeholder="Enter Coverage Details"
                                                rows={4}
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Duration</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="duration"
                                                value={formData.duration}
                                                onChange={handleInputChange}
                                                placeholder="Enter Duration"
                                            />
                                        </div>
                                    </div>
                                )}
                                {activeTab === 4 && formData.type === 'banking' && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">Interest Rate</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="interestRate"
                                                value={formData.interestRate}
                                                onChange={handleInputChange}
                                                placeholder="Enter Interest Rate"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>
                                        <div className="col-span-6">
                                            <label className="form-label">Minimum Loan Amount</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="loanAmount.min"
                                                value={formData.loanAmount.min}
                                                onChange={handleInputChange}
                                                placeholder="Enter Minimum Amount"
                                                min="0"
                                            />
                                        </div>
                                        <div className="col-span-6">
                                            <label className="form-label">Maximum Loan Amount</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="loanAmount.max"
                                                value={formData.loanAmount.max}
                                                onChange={handleInputChange}
                                                placeholder="Enter Maximum Amount"
                                                min="0"
                                            />
                                        </div>
                                        <div className="col-span-6">
                                            <label className="form-label">Minimum Tenure</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="tenure.min"
                                                value={formData.tenure.min}
                                                onChange={handleInputChange}
                                                placeholder="Enter Minimum Tenure"
                                                min="0"
                                            />
                                        </div>
                                        <div className="col-span-6">
                                            <label className="form-label">Maximum Tenure</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="tenure.max"
                                                value={formData.tenure.max}
                                                onChange={handleInputChange}
                                                placeholder="Enter Maximum Tenure"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                )}
                                {activeTab === 5 && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">Documents</label>
                                            <div className="space-y-4">
                                                {formData.documents.map((doc, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Document Name"
                                                            value={doc.name}
                                                            onChange={(e) => {
                                                                const newDocs = [...formData.documents];
                                                                newDocs[index] = { ...doc, name: e.target.value };
                                                                setFormData(prev => ({ ...prev, documents: newDocs }));
                                                            }}
                                                        />
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Document URL"
                                                            value={doc.url}
                                                            onChange={(e) => {
                                                                const newDocs = [...formData.documents];
                                                                newDocs[index] = { ...doc, url: e.target.value };
                                                                setFormData(prev => ({ ...prev, documents: newDocs }));
                                                            }}
                                                        />
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Document Type"
                                                            value={doc.type}
                                                            onChange={(e) => {
                                                                const newDocs = [...formData.documents];
                                                                newDocs[index] = { ...doc, type: e.target.value };
                                                                setFormData(prev => ({ ...prev, documents: newDocs }));
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="ti-btn ti-btn-danger"
                                                            onClick={() => {
                                                                const newDocs = formData.documents.filter((_, i) => i !== index);
                                                                setFormData(prev => ({ ...prev, documents: newDocs }));
                                                            }}
                                                        >
                                                            <i className="ri-delete-bin-line"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="ti-btn ti-btn-light"
                                                    onClick={() => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            documents: [...prev.documents, { name: '', url: '', type: '' }]
                                                        }));
                                                    }}
                                                >
                                                    Add Document
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Images</label>
                                            <div className="space-y-4">
                                                {formData.images.map((image, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Image URL"
                                                            value={image.url}
                                                            onChange={(e) => {
                                                                const newImages = [...formData.images];
                                                                newImages[index] = { ...image, url: e.target.value };
                                                                setFormData(prev => ({ ...prev, images: newImages }));
                                                            }}
                                                        />
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Alt Text"
                                                            value={image.alt}
                                                            onChange={(e) => {
                                                                const newImages = [...formData.images];
                                                                newImages[index] = { ...image, alt: e.target.value };
                                                                setFormData(prev => ({ ...prev, images: newImages }));
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="ti-btn ti-btn-danger"
                                                            onClick={() => {
                                                                const newImages = formData.images.filter((_, i) => i !== index);
                                                                setFormData(prev => ({ ...prev, images: newImages }));
                                                            }}
                                                        >
                                                            <i className="ri-delete-bin-line"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="ti-btn ti-btn-light"
                                                    onClick={() => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            images: [...prev.images, { url: '', alt: '' }]
                                                        }));
                                                    }}
                                                >
                                                    Add Image
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 6 && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">Additional Notes</label>
                                            <textarea
                                                className="form-control"
                                                name="metadata.notes"
                                                value={formData.metadata.notes || ''}
                                                onChange={handleInputChange}
                                                placeholder="Enter Additional Notes"
                                                rows={4}
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                name="metadata.description"
                                                value={formData.metadata.description || ''}
                                                onChange={handleInputChange}
                                                placeholder="Enter Description"
                                                rows={4}
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Custom Fields</label>
                                            <div className="space-y-4">
                                                {Object.entries(formData.metadata)
                                                    .filter(([key]) => !['notes', 'description'].includes(key))
                                                    .map(([key, value], index) => (
                                                        <div key={index} className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Key"
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
                                                            />
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Value"
                                                                value={value}
                                                                onChange={(e) => {
                                                                    setFormData(prev => ({
                                                                        ...prev,
                                                                        metadata: { ...prev.metadata, [key]: e.target.value }
                                                                    }));
                                                                }}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="ti-btn ti-btn-danger"
                                                                onClick={() => {
                                                                    const newMetadata = { ...formData.metadata };
                                                                    delete newMetadata[key];
                                                                    setFormData(prev => ({
                                                                        ...prev,
                                                                        metadata: newMetadata
                                                                    }));
                                                                }}
                                                            >
                                                                <i className="ri-delete-bin-line"></i>
                                                            </button>
                                                        </div>
                                                    ))}
                                                <button
                                                    type="button"
                                                    className="ti-btn ti-btn-light"
                                                    onClick={() => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            metadata: { ...prev.metadata, [`custom_${Object.keys(prev.metadata).length}`]: '' }
                                                        }));
                                                    }}
                                                >
                                                    Add Custom Field
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end mt-4 space-x-2">
                                <button
                                    type="button"
                                    className="ti-btn ti-btn-light"
                                    onClick={() => router.back()}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="ti-btn ti-btn-primary-full"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? "Creating..." : "Create Product"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default function ProtectedCreateProduct() {
    return (
        <ProtectedRoute>
            <CreateProduct />
        </ProtectedRoute>
    );
} 