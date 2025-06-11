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
import { useRouter } from 'next/navigation'
import ConfirmModal from "@/app/shared/components/ConfirmModal";
import * as XLSX from 'xlsx'
import ProtectedRoute from "@/shared/components/ProtectedRoute";
interface ProductData {
    name: string;
    type: string;
    category: string;
    commission: string;
    duration: string;
    status: string;
    actions: Array<{
        icon: string;
        className: string;
        href?: string;
        onClick?: () => void;
    }>;
}

const Products = () => {
    const router = useRouter();
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductData[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
    const [categories, setCategories] = useState<Array<{value: string, label: string}>>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        categories: [],
        description: '',
        features: [''],
        terms: [''],
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
        status: 'active',
        documents: [],
        images: []
    });
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteSelectedLoading, setDeleteSelectedLoading] = useState(false);
    const [sortKey, setSortKey] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        fetchProducts();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(products);
            setTotalResults(products.length);
            setTotalPages(Math.ceil(products.length / itemsPerPage));
        } else {
            const filtered = products.filter(product => {
                const productName = product.name.toLowerCase();
                const productType = product.type.toLowerCase();
                const productCategory = product.category.toLowerCase();
                const searchLower = searchQuery.toLowerCase();
                
                return productName.includes(searchLower) || 
                       productType.includes(searchLower) || 
                       productCategory.includes(searchLower);
            });
            setFilteredProducts(filtered);
            setTotalResults(filtered.length);
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        }
        setCurrentPage(1); // Reset to first page when filtering
    }, [searchQuery, products]);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // First get categories
            const categoriesResponse = await axios.get(`${Base_url}categories?limit=100`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const categoryOptions = categoriesResponse.data.results.map((category: any) => ({
                value: category.id,
                label: category.name
            }));
            setCategories(categoryOptions);

            // Then get products with pagination
            const response = await axios.get(`${Base_url}products?limit=${itemsPerPage}&page=${currentPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Format the data according to table headers
            const formattedData = response.data.results.map((product: any, index: number) => {
                // Get category names for all category IDs
                const categoryNames = product.categories?.map((catId: string) => {
                    const category = categoryOptions.find(cat => cat.value === catId);
                    return category?.label || '--';
                }) || ['--'];

                return {
                    id: product.id,
                    srNo: index + 1,
                    name: product.name || '--',
                    type: product.type || '--',
                    category: categoryNames.join(', '),
                    commission: `${product.commission?.percentage || 0}%`,
                    duration: product.duration || '--',
                    status: product.status || '--',
                    actions: [
                        {
                            icon: 'ri-eye-line',
                            className: 'ti-btn-primary',
                            href: `/products/edit?id=${product.id}`
                        },
                        {
                            icon: 'ri-delete-bin-line',
                            className: 'ti-btn-danger',
                            onClick: () => handleDelete(product.id)
                        }
                    ]
                };
            });

            setProducts(formattedData);
            setFilteredProducts(formattedData);
            setTotalPages(response.data.totalPages);
            setTotalResults(response.data.totalResults);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${Base_url}products`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Reset form and close modal
            setFormData({
                name: '',
                type: '',
                categories: [],
                description: '',
                features: [''],
                terms: [''],
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
                status: 'active',
                documents: [],
                images: []
            });
            const modal = document.getElementById('create-product');
            const backdrop = document.querySelector('.hs-overlay-backdrop');
            if (modal) {
                modal.classList.add('hidden');
            }
            if (backdrop) {
                backdrop.remove();
            }
            // Refresh products list
            fetchProducts();
        } catch (error) {
            console.error('Error creating product:', error);
        } finally {
            setLoading(false);
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
            await axios.delete(`${Base_url}products/${selectedProductId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Refresh the products list
            fetchProducts();
            setDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setDeleteLoading(false);
            setSelectedProductId(null);
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) return;
        
        try {
            setDeleteSelectedLoading(true);
            const token = localStorage.getItem('token');
            console.log("selectedIds",selectedIds);
            
            // await Promise.all(
            //     selectedIds.map(id =>
            //         axios.delete(`${Base_url}products/${id}`, {
            //             headers: {
            //                 Authorization: `Bearer ${token}`
            //             }
            //         })
            //     )
            // );
            
            // await fetchProducts();
            setSelectedIds([]);
        } catch (error) {
            console.error('Error deleting selected products:', error);
        } finally {
            setDeleteSelectedLoading(false);
        }
    };

    const handleSort = (key: string, direction: 'asc' | 'desc') => {
        console.log('Sorting:', { key, direction });
        setSortKey(key);
        setSortDirection(direction);
        
        // Sort the data on the frontend
        const sortedData = [...filteredProducts].sort((a, b) => {
            let valueA = a[key];
            let valueB = b[key];

            // Handle JSX elements
            if (React.isValidElement(valueA)) {
                valueA = valueA.props.children;
            }
            if (React.isValidElement(valueB)) {
                valueB = valueB.props.children;
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

        setFilteredProducts(sortedData);
    };

    const handleExport = () => {
        // Filter data based on selected IDs
        const dataToExport = selectedIds.length > 0
            ? products.filter(product => selectedIds.includes(product.id))
            : products;

        // Create a new array without the actions column
        const exportData = dataToExport.map(product => ({
            'Name': product.name,
            'Type': product.type,
            'Category': product.category,
            'Commission': product.commission,
            'Duration': product.duration,
            'Status': product.status
        }));

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Products');

        // Generate Excel file
        XLSX.writeFile(wb, 'products.xlsx');
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const StatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'draft', label: 'Draft' }
    ];

    const TypeOptions = [
        { value: 'insurance', label: 'Insurance' },
        { value: 'banking', label: 'Banking' }
    ];

    const headers = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'type', label: 'Type', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'commission', label: 'Commission', sortable: true },
        { key: 'duration', label: 'Duration', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    return (
        <Fragment>
            <Seo title={"Products"} />
            <Pageheader currentpage="Products" activepage="Products" mainpage="Products" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Products List</h5>
                            <div className="flex space-x-2">
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
                                <button 
                                    type="button" 
                                    className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                                    onClick={() => router.push('/products/create')}
                                >
                                    <i className="ri-add-line font-semibold align-middle"></i> Create Product
                                </button>
                                <div id="create-product" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
                                        <div className="ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title" id="staticBackdropLabel2">Add Product</h6>
                                                <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#create-product">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="ti-modal-body">
                                                    <div className="grid grid-cols-12 gap-2">
                                                        {/* Required Fields */}
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label htmlFor="name" className="form-label">Product Name *</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="name"
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Product Name"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label className="form-label">Type *</label>
                                                            <Select
                                                                id="type-select"
                                                                name="type"
                                                                options={TypeOptions}
                                                                onChange={(option) => handleSelectChange('type', option)}
                                                                className=""
                                                                menuPlacement='auto'
                                                                classNamePrefix="Select2"
                                                                placeholder="Select Type"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label className="form-label">Categories *</label>
                                                            <Select
                                                                id="categories-select"
                                                                name="categories"
                                                                options={categories}
                                                                onChange={(option) => handleSelectChange('categories', option)}
                                                                className=""
                                                                menuPlacement='auto'
                                                                classNamePrefix="Select2"
                                                                placeholder="Select Categories"
                                                                isMulti
                                                                required
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label htmlFor="description" className="form-label">Description *</label>
                                                            <textarea
                                                                className="form-control"
                                                                id="description"
                                                                name="description"
                                                                value={formData.description}
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Description"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label htmlFor="commission.percentage" className="form-label">Commission Percentage *</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="commission.percentage"
                                                                name="commission.percentage"
                                                                value={formData.commission.percentage}
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Commission Percentage"
                                                                min="0"
                                                                max="100"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label htmlFor="commission.minAmount" className="form-label">Min Amount *</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="commission.minAmount"
                                                                name="commission.minAmount"
                                                                value={formData.commission.minAmount}
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Min Amount"
                                                                min="0"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label htmlFor="commission.maxAmount" className="form-label">Max Amount *</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="commission.maxAmount"
                                                                name="commission.maxAmount"
                                                                value={formData.commission.maxAmount}
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Max Amount"
                                                                min="0"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label htmlFor="commission.bonus" className="form-label">Bonus *</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="commission.bonus"
                                                                name="commission.bonus"
                                                                value={formData.commission.bonus}
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Bonus"
                                                                min="0"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label htmlFor="pricing.basePrice" className="form-label">Base Price *</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="pricing.basePrice"
                                                                name="pricing.basePrice"
                                                                value={formData.pricing.basePrice}
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Base Price"
                                                                min="0"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label htmlFor="coverage" className="form-label">Coverage *</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="coverage"
                                                                name="coverage"
                                                                value={formData.coverage}
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Coverage"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label htmlFor="duration" className="form-label">Duration *</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="duration"
                                                                name="duration"
                                                                value={formData.duration}
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Duration"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="col-span-12">
                                                            <label htmlFor="eligibility" className="form-label">Eligibility *</label>
                                                            <textarea
                                                                className="form-control"
                                                                id="eligibility"
                                                                name="eligibility"
                                                                value={formData.eligibility}
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Eligibility Criteria"
                                                                required
                                                            />
                                                        </div>

                                                        {/* Features Array */}
                                                        <div className="col-span-12">
                                                            <label className="form-label">Features *</label>
                                                            {formData.features.map((feature, index) => (
                                                                <div key={index} className="flex gap-2 mb-2">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={feature}
                                                                        onChange={(e) => handleArrayInputChange(index, e.target.value, 'features')}
                                                                        placeholder="Enter Feature"
                                                                        required
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

                                                        {/* Terms Array */}
                                                        <div className="col-span-12">
                                                            <label className="form-label">Terms *</label>
                                                            {formData.terms.map((term, index) => (
                                                                <div key={index} className="flex gap-2 mb-2">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={term}
                                                                        onChange={(e) => handleArrayInputChange(index, e.target.value, 'terms')}
                                                                        placeholder="Enter Term"
                                                                        required
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

                                                        {/* Status */}
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <label className="form-label">Status</label>
                                                            <Select
                                                                id="status-select"
                                                                name="status"
                                                                options={StatusOptions}
                                                                onChange={(option) => handleSelectChange('status', option)}
                                                                className=""
                                                                menuPlacement='auto'
                                                                classNamePrefix="Select2"
                                                                placeholder="Select Status"
                                                                defaultValue={StatusOptions[0]}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ti-modal-footer">
                                                    <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-light" data-hs-overlay="#create-product">
                                                        Cancel
                                                    </button>
                                                    <button type="submit" className="ti-btn ti-btn-primary-full" disabled={loading}>
                                                        {loading ? 'Creating...' : 'Add Product'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <DataTable 
                                headers={headers} 
                                data={filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
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
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                loading={deleteLoading}
            />
        </Fragment>
    )
}

export default function ProtectedProducts() {
    return (
        <ProtectedRoute>
            <Products />
        </ProtectedRoute>
    )
}
