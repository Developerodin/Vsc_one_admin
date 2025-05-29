"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import Select from "react-select";

interface FormData {
    product: string; // This will store the product ID
    category: string; // This will store the category ID
    customFields: Array<{
        name: string;
        type: string;
    }>;
}

// JavaScript field types for the dropdown
const fieldTypes = [
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'date', label: 'Date' },
    { value: 'email', label: 'Email' },
    { value: 'url', label: 'URL' },
    { value: 'phone', label: 'Phone' },
    { value: 'password', label: 'Password' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'select', label: 'Select' },
    { value: 'multiselect', label: 'Multi Select' },
    { value: 'radio', label: 'Radio' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'file', label: 'File' },
    { value: 'array', label: 'Array' },
    { value: 'object', label: 'Object' }
];

// Field definitions based on the Excel sheet
const fieldMappings = {
    "Life Insurance": [
        "Full Name", "DOB", "Gender", "Mobile Number", "Email", "Address", 
        "Sum Assured", "Policy Term", "Occupation", "Annual Income", 
        "Nominee Details", "PAN Number"
    ],
    "Health Insurance": [
        "Full Name", "DOB", "Gender", "Mobile Number", "Email", "Address", 
        "Pre-existing Diseases", "Coverage Amount", "Number of Members", 
        "Nominee Details", "PAN Number"
    ],
    "Motor Insurance": [
        "Owner Name", "Contact Number", "Email", "Vehicle Type", 
        "Vehicle Registration Number", "Make & Model", "Year of Manufacture", 
        "Policy Type", "RC Book Upload", "PAN Number"
    ],
    "Property Insurance": [
        "Owner Name", "Mobile Number", "Email", "Property Address", 
        "Property Type", "Built-up Area", "Sum Insured", "Usage Type (Residential/Commercial)", 
        "PAN Number"
    ],
    "Travel Insurance": [
        "Traveler Name", "Mobile Number", "Email", "Destination", "Travel Date", 
        "Number of Travelers", "Age of Travelers", "Sum Insured", "Passport Number (if required)"
    ],
    "Specialty Insurance": [
        "Full Name", "Mobile Number", "Email", "Business/Asset Type", 
        "Insurance Requirement Description", "PAN Number"
    ],
    "Personal Loans": [
        "Applicant Name", "DOB", "Gender", "Mobile Number", "Email", "PAN", 
        "Aadhaar", "Employment Type", "Salary/Income", "Loan Amount Required", 
        "Existing EMIs", "CIBIL Score (if available)"
    ],
    "Home Loans": [
        "Applicant Name", "Contact Number", "Email", "Loan Type", "Property Details", 
        "Loan Amount Required", "PAN", "Aadhaar", "Income Details", "Property Papers (optional)"
    ],
    "Vehicle Loans": [
        "Applicant Name", "Contact Number", "Vehicle Type", "Make & Model", 
        "Loan Amount", "PAN", "Aadhaar", "Employment Status", "Salary/Income"
    ],
    "Business Loans": [
        "Business Name", "Contact Person", "Mobile Number", "Business Type", 
        "Turnover", "Loan Amount", "PAN", "GST", "Vintage of Business"
    ],
    "Education Loans": [
        "Student Name", "Contact Details", "Course Name", "Institution Name", 
        "Country", "Fees Estimate", "PAN", "Aadhaar", "Guardian Income Proof"
    ],
    "Loan Against Property (LAP)": [
        "Applicant Name", "Property Type", "Property Value", "Loan Amount", 
        "PAN", "Aadhaar", "Contact Info"
    ],
    "Gold Loans": [
        "Applicant Name", "Mobile Number", "Email", "Gold Estimate Value", "PAN/Aadhaar"
    ]
};

const productCategories = {
    "Insurance Services": [
        "Life Insurance", "Health Insurance", "Motor Insurance", 
        "Property Insurance", "Travel Insurance", "Specialty Insurance"
    ],
    "Bank Loans (DSA Services)": [
        "Personal Loans", "Home Loans", "Vehicle Loans", "Business Loans", 
        "Education Loans", "Loan Against Property (LAP)", "Gold Loans"
    ]
};

const CreateLeads = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Array<{value: string, label: string, id: string, categories: string[]}>>([]);
    const [categories, setCategories] = useState<Array<{value: string, label: string}>>([]);
    const [formData, setFormData] = useState<FormData>({
        product: "",
        category: "",
        customFields: []
    });
    const [availableFields, setAvailableFields] = useState<string[]>([]);

    const tabs = [
        { name: 'General Information', icon: 'ri-information-line' },
        { name: 'Dynamic Fields', icon: 'ri-list-check' }
    ];

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}products`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            // Create product options with proper IDs and categories
            const productOptions = response.data.results.map((product: any) => ({
                value: product.id || product._id, // Use id or _id depending on your backend
                label: product.name || product.title || 'Unnamed Product',
                id: product.id || product._id,
                type: product.type,
                categories: product.categories || [] // Array of category IDs that belong to this product
            }));
            
            setProducts(productOptions);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

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

    const fetchAvailableFields = async (categoryId: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}categories/${categoryId}/fields`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.fields || [];
        } catch (error) {
            console.error('Error fetching fields for category:', error);
            return [];
        }
    };

    const updateAvailableFields = async (categoryId: string) => {
        if (!categoryId) {
            setAvailableFields([]);
            return;
        }
        
        // First try to get from backend
        try {
            const backendFields = await fetchAvailableFields(categoryId);
            if (backendFields.length > 0) {
                setAvailableFields(backendFields);
                return;
            }
        } catch (error) {
            console.log('Backend fields not available, using static mapping');
        }
        
        // Fallback to static field mappings
        const selectedCategory = categories.find(cat => cat.value === categoryId);
        if (selectedCategory && fieldMappings[selectedCategory.label as keyof typeof fieldMappings]) {
            setAvailableFields(fieldMappings[selectedCategory.label as keyof typeof fieldMappings]);
        } else {
            setAvailableFields([]);
        }
    };

    const getCategoryOptions = () => {
        if (!formData.product) return [];
        
        // Find the selected product
        const selectedProduct = products.find(product => product.value === formData.product);
        if (!selectedProduct || !selectedProduct.categories) {
            console.log('No product found or no categories for product:', formData.product, selectedProduct);
            return [];
        }
        
        // Filter categories that belong to the selected product
        const filteredCategories = categories.filter(category => 
            selectedProduct.categories.includes(category.value)
        );
        
        console.log('Selected Product:', selectedProduct);
        console.log('Product Categories:', selectedProduct.categories);
        console.log('All Categories:', categories);
        console.log('Filtered Categories:', filteredCategories);
        
        return filteredCategories;
    };

    const handleProductChange = (selectedOption: any) => {
        console.log('Product changed to:', selectedOption);
        setFormData(prev => ({
            ...prev,
            product: selectedOption?.value || "",
            category: "", // Reset category when product changes
            customFields: [] // Reset custom fields
        }));
    };

    const handleCategoryChange = (selectedOption: any) => {
        const newCategory = selectedOption?.value || "";
        setFormData(prev => ({
            ...prev,
            category: newCategory,
            customFields: [] // Reset custom fields when category changes
        }));
        
        // Update available fields when category changes
        updateAvailableFields(newCategory);
    };

    const addCustomField = () => {
        setFormData(prev => ({
            ...prev,
            customFields: [...prev.customFields, { name: '', type: 'string' }]
        }));
    };

    const removeCustomField = (index: number) => {
        setFormData(prev => ({
            ...prev,
            customFields: prev.customFields.filter((_, i) => i !== index)
        }));
    };

    const updateCustomField = (index: number, field: 'name' | 'type', value: string) => {
        setFormData(prev => ({
            ...prev,
            customFields: prev.customFields.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleFieldToggle = (field: string) => {
        // This function is no longer needed with the new structure
        // Keeping for compatibility but functionality has been moved to custom fields
        console.log('Field toggle called for:', field);
    };

    const handleSubmit = async () => {
        if (!formData.product || !formData.category || formData.customFields.length === 0) {
            alert('Please fill all required fields and add at least one custom field');
            return;
        }

        // Validate that all custom fields have names
        const invalidFields = formData.customFields.some(field => !field.name.trim());
        if (invalidFields) {
            alert('Please ensure all custom fields have names');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            
            // Prepare data for submission in the format expected by backend
            const submitData = {
                product: formData.product, // This is now the product ID
                category: formData.category, // This is now the category ID
                fields: formData.customFields.map(field => ({
                    name: field.name.trim(),
                    type: field.type
                }))
            };

            console.log('Submitting data:', submitData); // Debug log

            const response = await axios.post(`${Base_url}leadsfields`, submitData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response.data); // Debug log
            alert('Lead fields configuration saved successfully!');
            router.push('/leadsFields/leadsFields');
        } catch (error: any) {
            console.error('Error saving lead fields:', error);
            
            // Better error handling
            let errorMessage = 'Error saving lead fields configuration';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const renderGeneralTab = () => (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
                <label className="form-label">Product *</label>
                <Select
                    options={products}
                    onChange={handleProductChange}
                    value={products.find(option => option.value === formData.product)}
                    placeholder={products.length === 0 ? "Loading products..." : "Select Product"}
                    isLoading={products.length === 0}
                    required
                />
            </div>
            <div className="col-span-12">
                <label className="form-label">Category *</label>
                <Select
                    options={getCategoryOptions()}
                    onChange={handleCategoryChange}
                    value={getCategoryOptions().find(option => option.value === formData.category)}
                    placeholder={!formData.product ? "Select a product first" : getCategoryOptions().length === 0 ? "No categories available" : "Select Category"}
                    isSearchable
                    isDisabled={!formData.product}
                    required
                />
                {formData.product && getCategoryOptions().length === 0 && (
                    <small className="text-warning">No categories found for the selected product.</small>
                )}
            </div>
            <div className="col-span-12">
                <div className="alert alert-primary" role="alert">
                    <strong>Instructions:</strong>
                    <ul className="mb-0 mt-2">
                        <li>First select a product from your available products</li>
                        <li>Then choose the specific category within that product</li>
                        <li>Proceed to Dynamic Fields tab to add custom form fields</li>
                        <li>Field names should be descriptive (e.g., "Full Name", "Phone Number")</li>
                    </ul>
                </div>
            </div>
        </div>
    );

    const renderDynamicFieldsTab = () => {
        if (!formData.category) {
            return (
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                        <div className="text-center py-8">
                            <i className="ri-information-line text-4xl text-gray-400 mb-4"></i>
                            <p className="text-gray-500">Please select a product and category first</p>
                        </div>
                    </div>
                </div>
            );
        }

        // Get the category name from the categories array
        const selectedCategory = categories.find(cat => cat.value === formData.category);
        const categoryName = selectedCategory ? selectedCategory.label : 'Selected Category';

        return (
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Custom Fields for {categoryName}</h5>
                        <button
                            type="button"
                            onClick={addCustomField}
                            className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                        >
                            <i className="ri-add-line font-semibold align-middle mr-1"></i> Add Field
                        </button>
                    </div>
                </div>

                <div className="col-span-12">
                    <label className="form-label">Define Custom Fields</label>
                    
                    {formData.customFields.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                            <i className="ri-file-add-line text-4xl text-gray-400 mb-4"></i>
                            <p className="text-gray-500 mb-4">No custom fields added yet</p>
                            <button
                                type="button"
                                onClick={addCustomField}
                                className="ti-btn ti-btn-primary"
                            >
                                <i className="ri-add-line mr-2"></i> Add Your First Field
                            </button>
                        </div>
                    )}

                    {formData.customFields.map((field, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 mb-4 p-4 border rounded-lg bg-gray-50">
                            <div className="col-span-5">
                                <label className="form-label text-sm">Field Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter field name"
                                    value={field.name}
                                    onChange={(e) => updateCustomField(index, 'name', e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="col-span-5">
                                <label className="form-label text-sm">Field Type</label>
                                <Select
                                    options={fieldTypes}
                                    value={fieldTypes.find(option => option.value === field.type)}
                                    onChange={(option) => updateCustomField(index, 'type', option?.value || 'string')}
                                    placeholder="Select field type"
                                    className="basic-single"
                                    classNamePrefix="Select2"
                                />
                            </div>

                            <div className="col-span-2 flex items-end">
                                <button
                                    type="button"
                                    onClick={() => removeCustomField(index)}
                                    className="ti-btn ti-btn-danger w-full"
                                    title="Remove field"
                                >
                                    <i className="ri-delete-bin-line"></i>
                                </button>
                            </div>
                        </div>
                    ))}

                    {formData.customFields.length > 0 && (
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={addCustomField}
                                className="ti-btn ti-btn-light w-full"
                            >
                                <i className="ri-add-line mr-2"></i> Add Another Field
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            <Seo title="Add Lead Fields" />
            <Pageheader currentpage="Add Lead Fields" activepage="Leads Fields" mainpage="Leads Fields" />
            
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Add Lead Fields Configuration</h5>
                        </div>
                        <div className="box-body">
                            {/* Tab Navigation - Matching Product Page Style */}
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

                            {/* Tab Content */}
                            <div className="mt-4">
                                {activeTab === 0 && renderGeneralTab()}
                                {activeTab === 1 && renderDynamicFieldsTab()}
                            </div>

                            {/* Action Buttons - Matching Product Page Style */}
                            <div className="flex justify-end mt-4 space-x-2">
                                <button
                                    type="button"
                                    onClick={() => router.push('/leadsFields/leadsFields')}
                                    className="ti-btn ti-btn-light"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={loading || (activeTab === 0 && (!formData.product || !formData.category)) || (activeTab === 1 && formData.customFields.length === 0)}
                                    className="ti-btn ti-btn-primary-full"
                                >
                                    {loading ? 'Saving...' : 'Save Configuration'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default function ProtectedCreateLeads() {
    return (
        <ProtectedRoute>
            <CreateLeads />
        </ProtectedRoute>
    );
} 