"use client"
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import DataTable from '@/shared/components/DataTable'
import React, { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import { Base_url } from '@/app/api/config/BaseUrl'
import { useSearchParams } from 'next/navigation'
import ProtectedRoute from '@/shared/components/ProtectedRoute'
import * as XLSX from 'xlsx'

interface SubcategoryData {
    id: string;
    subcategory: string;
    createdDate: string;
    status: string;
    actions: Array<{
        icon: string;
        className: string;
        href?: string;
        onClick?: () => void;
    }>;
    [key: string]: any; // Add index signature for dynamic access
}

interface FormData {
    name: string;
    description: string;
    category: string;
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
            validUntil: Date;
        }>;
    };
    coverage: string;
    duration: string;
    interestRate: number;
    loanAmount: {
        min: number;
        max: number;
    };
    tenure: {
        min: number;
        max: number;
    };
    status: string;
    documents: Array<{
        name: string;
        url: string;
        type: string;
    }>;
    metadata: Map<string, any>;
    image?: string;
    imageKey?: string;
}

const Subcategory = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [subcategories, setSubcategories] = useState<SubcategoryData[]>([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState<SubcategoryData[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteSelectedLoading, setDeleteSelectedLoading] = useState(false);
    const [sortKey, setSortKey] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        category: '',
        features: [],
        terms: [],
        eligibility: '',
        commission: {
            percentage: 0,
            minAmount: 0,
            maxAmount: 0,
            bonus: 0
        },
        pricing: {
            basePrice: 0,
            currency: 'INR',
            discounts: []
        },
        coverage: '',
        duration: '',
        interestRate: 0,
        loanAmount: {
            min: 0,
            max: 0
        },
        tenure: {
            min: 0,
            max: 0
        },
        status: 'active',
        documents: [],
        metadata: new Map(),
        image: '',
        imageKey: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId');

    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>('');

    useEffect(() => {
        if (categoryId) {
            setFormData(prev => ({
                ...prev,
                category: categoryId
            }));
            fetchSubcategories();
        }
    }, [categoryId, currentPage]);

    const fetchSubcategories = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}subcategories/category/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const subcategoriesData = Array.isArray(response.data) ? response.data : response.data.results;

            const formattedData: SubcategoryData[] = subcategoriesData.map((subcategory: any) => ({
                id: subcategory.id,
                subcategory: subcategory.name || '--',
                createdDate: new Date(subcategory.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                }),
                status: subcategory.status || '--',
                actions: [
                    {
                        icon: 'ri-edit-line',
                        className: 'ti-btn-info',
                        onClick: () => handleEdit(subcategory.id)
                    },
                    {
                        icon: 'ri-delete-bin-line',
                        className: 'ti-btn-danger',
                        onClick: () => handleDelete(subcategory.id)
                    }
                ]
            }));

            setSubcategories(formattedData);
            setFilteredSubcategories(formattedData);
            
            if (!Array.isArray(response.data)) {
                setTotalPages(response.data.totalPages || 1);
                setTotalResults(response.data.totalResults || formattedData.length);
            } else {
                setTotalPages(1);
                setTotalResults(formattedData.length);
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredSubcategories(subcategories);
            setTotalResults(subcategories.length);
            setTotalPages(Math.ceil(subcategories.length / itemsPerPage));
        } else {
            const filtered = subcategories.filter(subcategory => {
                const searchLower = searchQuery.toLowerCase();
                return String(subcategory.subcategory).toLowerCase().includes(searchLower);
            });
            setFilteredSubcategories(filtered);
            setTotalResults(filtered.length);
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        }
        setCurrentPage(1);
    }, [searchQuery, itemsPerPage]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredSubcategories(subcategories);
        } else {
            const filtered = subcategories.filter(subcategory => {
                const searchLower = searchQuery.toLowerCase();
                return String(subcategory.subcategory).toLowerCase().includes(searchLower);
            });
            setFilteredSubcategories(filtered);
        }
    }, [subcategories]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name: string, selectedOption: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: selectedOption.value
        }));
    };

    const handleEdit = async (id: string) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}subcategories/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const subcategoryData = response.data;
            setFormData({
                name: subcategoryData.name || '',
                description: subcategoryData.description || '',
                category: typeof subcategoryData.category === 'object' ? subcategoryData.category.id : subcategoryData.category || categoryId || '',
                features: subcategoryData.features || [],
                terms: subcategoryData.terms || [],
                eligibility: subcategoryData.eligibility || '',
                commission: {
                    percentage: subcategoryData.commission?.percentage || 0,
                    minAmount: subcategoryData.commission?.minAmount || 0,
                    maxAmount: subcategoryData.commission?.maxAmount || 0,
                    bonus: subcategoryData.commission?.bonus || 0
                },
                pricing: {
                    basePrice: subcategoryData.pricing?.basePrice || 0,
                    currency: subcategoryData.pricing?.currency || 'INR',
                    discounts: subcategoryData.pricing?.discounts || []
                },
                coverage: subcategoryData.coverage || '',
                duration: subcategoryData.duration || '',
                interestRate: subcategoryData.interestRate || 0,
                loanAmount: {
                    min: subcategoryData.loanAmount?.min || 0,
                    max: subcategoryData.loanAmount?.max || 0
                },
                tenure: {
                    min: subcategoryData.tenure?.min || 0,
                    max: subcategoryData.tenure?.max || 0
                },
                status: subcategoryData.status || 'active',
                documents: subcategoryData.documents || [],
                metadata: new Map(Object.entries(subcategoryData.metadata || {})),
                image: subcategoryData.image || '',
                imageKey: subcategoryData.imageKey || ''
            });

            // Set preview image if exists
            if (subcategoryData.image) {
                setPreviewImage(subcategoryData.image);
            }

            setIsEditing(true);
            setSelectedSubcategory(id);

            // Open modal using HSOverlay
            const modal = document.querySelector('#create-subcategory');
            const HSOverlay = (window as any).HSOverlay;
            if (modal && HSOverlay) {
                const overlay = HSOverlay.open(modal);
            }
        } catch (error) {
            console.error('Error fetching subcategory:', error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        resetForm();
        const modal = document.querySelector('#create-subcategory');
        const HSOverlay = (window as any).HSOverlay;
        if (modal && HSOverlay) {
            const overlay = HSOverlay.close(modal);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this subcategory? This action cannot be undone.')) {
            try {
                setDeleteLoading(true);
                const token = localStorage.getItem('token');
                await axios.delete(`${Base_url}subcategories/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                // Refresh the list
                await fetchSubcategories();
            } catch (error) {
                console.error('Error deleting subcategory:', error);
            } finally {
                setDeleteLoading(false);
            }
        }
    };

    const handleImageUpload = async () => {
        if (!selectedImageFile) {
            alert('Please select an image first');
            return;
        }

        setImageUploadLoading(true);
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('file', selectedImageFile);

            const response = await axios.post(`${Base_url}files/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { url, key } = response.data.data;
            
            // Update form data with the uploaded image information
            setFormData(prev => ({
                ...prev,
                image: url,
                imageKey: key
            }));

            alert('Image uploaded successfully!');
        } catch (error: any) {
            console.error('Error uploading image:', error);
            let errorMessage = 'Error uploading image';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            alert(errorMessage);
        } finally {
            setImageUploadLoading(false);
        }
    };

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            // Validate image dimensions (minimum 48x48 pixels)
            const img = new Image();
            const url = URL.createObjectURL(file);
            
            img.onload = () => {
                URL.revokeObjectURL(url);
                
                if (img.width < 48 || img.height < 48) {
                    alert('Image dimensions must be at least 48x48 pixels. Current dimensions: ' + img.width + 'x' + img.height);
                    return;
                }

                setSelectedImageFile(file);
                
                // Create preview
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreviewImage(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
                alert('Error reading image file. Please try again.');
            };

            img.src = url;
        }
    };

    const removeImage = () => {
        setSelectedImageFile(null);
        setPreviewImage('');
        setFormData(prev => ({
            ...prev,
            image: '',
            imageKey: ''
        }));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            category: categoryId || '',
            features: [],
            terms: [],
            eligibility: '',
            commission: {
                percentage: 0,
                minAmount: 0,
                maxAmount: 0,
                bonus: 0
            },
            pricing: {
                basePrice: 0,
                currency: 'INR',
                discounts: []
            },
            coverage: '',
            duration: '',
            interestRate: 0,
            loanAmount: {
                min: 0,
                max: 0
            },
            tenure: {
                min: 0,
                max: 0
            },
            status: 'active',
            documents: [],
            metadata: new Map(),
            image: '',
            imageKey: ''
        });
        setIsEditing(false);
        setSelectedSubcategory(null);
        setSelectedImageFile(null);
        setPreviewImage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (isEditing && selectedSubcategory) {
                // Update existing subcategory
                await axios.patch(`${Base_url}subcategories/${selectedSubcategory}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                // Create new subcategory
                await axios.post(`${Base_url}subcategories`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            // Reset form and close modal
            resetForm();
            // Close modal using HSOverlay
            const modal = document.querySelector('#create-subcategory');
            const HSOverlay = (window as any).HSOverlay;
            if (modal && HSOverlay) {
                const overlay = HSOverlay.close(modal);
            }
            // Refresh subcategories list
            fetchSubcategories();
        } catch (error) {
            console.error('Error saving subcategory:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const StatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'draft', label: 'Draft' }
    ];

    const CategoryOptions = [
        { value: 'life_insurance', label: 'Life Insurance' },
        { value: 'health_insurance', label: 'Health Insurance' },
        { value: 'motor_insurance', label: 'Motor Insurance' },
        { value: 'property_insurance', label: 'Property Insurance' },
        { value: 'car_loan', label: 'Car Loan' },
        { value: 'home_loan', label: 'Home Loan' },
        { value: 'business_loan', label: 'Business Loan' },
        { value: 'msme_loans', label: 'MSME Loans' },
        { value: 'travel_insurance', label: 'Travel Insurance' },
        { value: 'education_loan', label: 'Education Loan' }
    ];

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleSort = (key: string, direction: 'asc' | 'desc') => {
        setSortKey(key);
        setSortDirection(direction);
        
        const sortedData = [...subcategories].sort((a, b) => {
            let valueA = a[key];
            let valueB = b[key];

            if (key === 'createdDate') {
                valueA = new Date(valueA).getTime();
                valueB = new Date(valueB).getTime();
            }

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return direction === 'asc' 
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return direction === 'asc' 
                    ? valueA - valueB
                    : valueB - valueA;
            }

            return 0;
        });

        setSubcategories(sortedData);
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) return;
        
        try {
            setDeleteSelectedLoading(true);
            // const token = localStorage.getItem('token');
            
            // Delete each selected subcategory
            // for (const id of selectedIds) {
            //     await axios.delete(`${Base_url}subcategories/${id}`, {
            //         headers: {
            //             Authorization: `Bearer ${token}`
            //         }
            //     });
            // }
            
            // Refresh the list
            await fetchSubcategories();
            setSelectedIds([]);
        } catch (error) {
            console.error('Error deleting selected subcategories:', error);
        } finally {
            setDeleteSelectedLoading(false);
        }
    };

    const handleExport = () => {
        // Filter data based on selected IDs
        const dataToExport = selectedIds.length > 0
            ? subcategories.filter(subcategory => selectedIds.includes(subcategory.id))
            : subcategories;

        // Create a new array without the actions column
        const exportData = dataToExport.map(subcategory => ({
            'Subcategory Name': subcategory.subcategory,
            'Created Date': subcategory.createdDate,
            'Status': subcategory.status
        }));

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Subcategories');

        // Generate Excel file
        XLSX.writeFile(wb, 'subcategories.xlsx');
    };

    const headers = [
        { key: 'subcategory', label: 'Subcategory Name', sortable: true },
        { key: 'createdDate', label: 'Created Date', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    return (
        <Fragment>
            <Seo title={"Subcategory"} />
            <Pageheader currentpage="Subcategory" activepage="Subcategory" mainpage="Subcategory" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Subcategory List</h5>
                            <div className="flex gap-2">
                                {!(selectedIds.length === 0 || deleteSelectedLoading) ? (
                                    <button 
                                        type="button" 
                                        className="ti-btn ti-btn-danger"
                                        onClick={handleDeleteSelected}
                                        disabled={selectedIds.length === 0 || deleteSelectedLoading}
                                    >
                                        <i className="ri-delete-bin-line me-2"></i>{" "}
                                        {deleteSelectedLoading ? "Deleting..." : "Delete Selected" + ` (${selectedIds.length})`}
                                    </button>
                                ) : null}
                                <button 
                                    type="button" 
                                    className="ti-btn ti-btn-primary"
                                    onClick={handleExport}
                                    disabled={selectedIds.length === 0}
                                >
                                    <i className="ri-download-2-line me-2"></i> Export
                                </button>
                                <button 
                                    type="button" 
                                    className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]" 
                                    data-hs-overlay="#create-subcategory"
                                    onClick={() => {
                                        resetForm();
                                        const modal = document.querySelector('#create-subcategory');
                                        const HSOverlay = (window as any).HSOverlay;
                                        if (modal && HSOverlay) {
                                            const overlay = HSOverlay.open(modal);
                                        }
                                    }}
                                >
                                    <i className="ri-add-line font-semibold align-middle"></i> Create Subcategory
                                </button>
                                <Link 
                                    href="/category/category" 
                                    className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                                >
                                    <i className="ri-arrow-left-line font-semibold align-middle me-1"></i> Back to Category
                                </Link>
                            </div>
                        </div>
                        <div className="box-body">
                            <DataTable 
                                headers={headers} 
                                data={filteredSubcategories}
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
                                showCheckbox={true}
                                selectedIds={selectedIds}
                                onSelectionChange={setSelectedIds}
                                idField="id"
                                onSort={handleSort}
                                sortKey={sortKey}
                                sortDirection={sortDirection}
                                onSearch={handleSearch}
                                searchQuery={searchQuery}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <div id="create-subcategory" className="hs-overlay hidden ti-modal">
                <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                    <div className="ti-modal-content">
                        <div className="ti-modal-header">
                            <h6 className="modal-title" id="staticBackdropLabel2">
                                {isEditing ? 'Edit Subcategory' : 'Add Subcategory'}
                            </h6>
                            <button 
                                type="button" 
                                className="hs-dropdown-toggle ti-modal-close-btn" 
                                onClick={closeModal}
                            >
                                <span className="sr-only">Close</span>
                                <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="ti-modal-body">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="name" className="form-label">Subcategory Name *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter Subcategory Name"
                                            required
                                        />
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <label className="form-label">Status</label>
                                        <Select
                                            id="status-select"
                                            name="status"
                                            options={[
                                                { value: 'active', label: 'Active' },
                                                { value: 'inactive', label: 'Inactive' },
                                                { value: 'draft', label: 'Draft' }
                                            ]}
                                            onChange={(option) => handleSelectChange('status', option)}
                                            className=""
                                            menuPlacement='auto'
                                            classNamePrefix="Select2"
                                            placeholder="Select Status"
                                            defaultValue={{ value: 'active', label: 'Active' }}
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <label htmlFor="description" className="form-label">Description *</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Enter Description"
                                            required
                                            rows={3}
                                        />
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="features" className="form-label">Features</label>
                                        <textarea
                                            className="form-control"
                                            id="features"
                                            name="features"
                                            value={formData.features.join('\n')}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                features: e.target.value.split('\n').filter(f => f.trim() !== '')
                                            }))}
                                            placeholder="Enter Features (one per line)"
                                            rows={3}
                                        />
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="terms" className="form-label">Terms</label>
                                        <textarea
                                            className="form-control"
                                            id="terms"
                                            name="terms"
                                            value={formData.terms.join('\n')}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                terms: e.target.value.split('\n').filter(t => t.trim() !== '')
                                            }))}
                                            placeholder="Enter Terms (one per line)"
                                            rows={3}
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <label htmlFor="eligibility" className="form-label">Eligibility</label>
                                        <textarea
                                            className="form-control"
                                            id="eligibility"
                                            name="eligibility"
                                            value={formData.eligibility}
                                            onChange={handleInputChange}
                                            placeholder="Enter Eligibility Criteria"
                                            rows={2}
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <div className="flex items-center justify-between mb-3">
                                            <h6 className="mb-0">Commission Details</h6>
                                            <span className="text-xs text-gray-500">* Required fields</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="xl:col-span-3 col-span-12">
                                                <label htmlFor="commission.percentage" className="form-label">Percentage *</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="commission.percentage"
                                                    name="commission.percentage"
                                                    value={formData.commission.percentage}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        commission: {
                                                            ...prev.commission,
                                                            percentage: Number(e.target.value)
                                                        }
                                                    }))}
                                                    min="0"
                                                    max="100"
                                                    required
                                                />
                                            </div>
                                            <div className="xl:col-span-3 col-span-12">
                                                <label htmlFor="commission.minAmount" className="form-label">Min Amount</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="commission.minAmount"
                                                    name="commission.minAmount"
                                                    value={formData.commission.minAmount}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        commission: {
                                                            ...prev.commission,
                                                            minAmount: Number(e.target.value)
                                                        }
                                                    }))}
                                                    min="0"
                                                />
                                            </div>
                                            <div className="xl:col-span-3 col-span-12">
                                                <label htmlFor="commission.maxAmount" className="form-label">Max Amount</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="commission.maxAmount"
                                                    name="commission.maxAmount"
                                                    value={formData.commission.maxAmount}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        commission: {
                                                            ...prev.commission,
                                                            maxAmount: Number(e.target.value)
                                                        }
                                                    }))}
                                                    min="0"
                                                />
                                            </div>
                                            <div className="xl:col-span-3 col-span-12">
                                                <label htmlFor="commission.bonus" className="form-label">Bonus</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="commission.bonus"
                                                    name="commission.bonus"
                                                    value={formData.commission.bonus}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        commission: {
                                                            ...prev.commission,
                                                            bonus: Number(e.target.value)
                                                        }
                                                    }))}
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="flex items-center justify-between mb-3">
                                            <h6 className="mb-0">Pricing Details</h6>
                                            <span className="text-xs text-gray-500">* Required fields</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="pricing.basePrice" className="form-label">Base Price *</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="pricing.basePrice"
                                                    name="pricing.basePrice"
                                                    value={formData.pricing.basePrice}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        pricing: {
                                                            ...prev.pricing,
                                                            basePrice: Number(e.target.value)
                                                        }
                                                    }))}
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="pricing.currency" className="form-label">Currency</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="pricing.currency"
                                                    name="pricing.currency"
                                                    value={formData.pricing.currency}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        pricing: {
                                                            ...prev.pricing,
                                                            currency: e.target.value
                                                        }
                                                    }))}
                                                    placeholder="INR"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="coverage" className="form-label">Coverage</label>
                                        <textarea
                                            className="form-control"
                                            id="coverage"
                                            name="coverage"
                                            value={formData.coverage}
                                            onChange={handleInputChange}
                                            placeholder="Enter Coverage Details"
                                            rows={2}
                                        />
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="duration" className="form-label">Duration</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="duration"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            placeholder="Enter Duration"
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <div className="flex items-center justify-between mb-3">
                                            <h6 className="mb-0">Subcategory Image</h6>
                                            <span className="text-xs text-gray-500">Upload an image for this subcategory</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="image" className="form-label">Select Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="image"
                                                    accept="image/*"
                                                    onChange={handleImageFileChange}
                                                />
                                                <small className="text-gray-500">Supported formats: JPG, PNG, GIF. Max size: 5MB. Minimum dimensions: 48x48 pixels</small>
                                            </div>
                                            <div className="xl:col-span-6 col-span-12 flex items-end">
                                                <button
                                                    type="button"
                                                    onClick={handleImageUpload}
                                                    disabled={!selectedImageFile || imageUploadLoading}
                                                    className="ti-btn ti-btn-primary-full w-full"
                                                >
                                                    {imageUploadLoading ? (
                                                        <>
                                                            <i className="ri-loader-4-line animate-spin mr-2"></i>
                                                            Uploading...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="ri-upload-2-line mr-2"></i>
                                                            Upload Image
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Image Preview */}
                                        {(previewImage || formData.image) && (
                                            <div className="mt-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="form-label mb-0">Image Preview</label>
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="ti-btn ti-btn-danger !py-1 !px-2 !text-xs"
                                                    >
                                                        <i className="ri-delete-bin-line mr-1"></i>
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="border rounded-lg p-4 bg-gray-50">
                                                    <img 
                                                        src={previewImage || formData.image} 
                                                        alt="Subcategory preview" 
                                                        className="max-w-full h-auto max-h-48 mx-auto rounded"
                                                    />
                                                    {formData.image && (
                                                        <div className="mt-2 text-center">
                                                            <small className="text-green-600">
                                                                <i className="ri-check-line mr-1"></i>
                                                                Image uploaded successfully
                                                            </small>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="xl:col-span-4 col-span-12">
                                        <label htmlFor="interestRate" className="form-label">Interest Rate (%)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="interestRate"
                                            name="interestRate"
                                            value={formData.interestRate}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                interestRate: Number(e.target.value)
                                            }))}
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <div className="flex items-center justify-between mb-3">
                                            <h6 className="mb-0">Loan Amount Range</h6>
                                        </div>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="loanAmount.min" className="form-label">Minimum</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="loanAmount.min"
                                                    name="loanAmount.min"
                                                    value={formData.loanAmount.min}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        loanAmount: {
                                                            ...prev.loanAmount,
                                                            min: Number(e.target.value)
                                                        }
                                                    }))}
                                                    min="0"
                                                />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="loanAmount.max" className="form-label">Maximum</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="loanAmount.max"
                                                    name="loanAmount.max"
                                                    value={formData.loanAmount.max}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        loanAmount: {
                                                            ...prev.loanAmount,
                                                            max: Number(e.target.value)
                                                        }
                                                    }))}
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="flex items-center justify-between mb-3">
                                            <h6 className="mb-0">Tenure Range (in months)</h6>
                                        </div>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="tenure.min" className="form-label">Minimum</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="tenure.min"
                                                    name="tenure.min"
                                                    value={formData.tenure.min}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        tenure: {
                                                            ...prev.tenure,
                                                            min: Number(e.target.value)
                                                        }
                                                    }))}
                                                    min="0"
                                                />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="tenure.max" className="form-label">Maximum</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="tenure.max"
                                                    name="tenure.max"
                                                    value={formData.tenure.max}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        tenure: {
                                                            ...prev.tenure,
                                                            max: Number(e.target.value)
                                                        }
                                                    }))}
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ti-modal-footer">
                                <button 
                                    type="button" 
                                    className="hs-dropdown-toggle ti-btn ti-btn-light" 
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="ti-btn ti-btn-primary-full" disabled={loading}>
                                    {loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Subcategory' : 'Add Subcategory')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default function ProtectedSubcategory() {
    return (
        <ProtectedRoute>
            <Subcategory />
        </ProtectedRoute>
    )
}
