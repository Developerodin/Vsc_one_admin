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
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        status: 'active'
    });
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId');

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
                        icon: 'ri-eye-line',
                        className: 'ti-btn-primary',
                        href: '#'
                    },
                    {
                        icon: 'ri-edit-line',
                        className: 'ti-btn-info',
                        href: '#'
                    },
                    {
                        icon: 'ri-delete-bin-line',
                        className: 'ti-btn-danger',
                        href: '#'
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${Base_url}subcategories`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Reset form and close modal
            setFormData({
                name: '',
                description: '',
                category: categoryId || '',
                status: 'active'
            });
            const modal = document.getElementById('create-subcategory');
            const backdrop = document.querySelector('.hs-overlay-backdrop');
            if (modal) {
                modal.classList.add('hidden');
            }
            if (backdrop) {
                backdrop.remove();
            }
            // Refresh subcategories list
            fetchSubcategories();
        } catch (error) {
            console.error('Error creating subcategory:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const StatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
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
            <div id="create-subcategory" className="hs-overlay hidden ti-modal">
                <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
                    <div className="ti-modal-content">
                        <div className="ti-modal-header">
                            <h6 className="modal-title" id="staticBackdropLabel2">Add Subcategory</h6>
                            <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#create-subcategory">
                                <span className="sr-only">Close</span>
                                <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="ti-modal-body">
                                <div className="grid grid-cols-12 gap-2">
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
                                        />
                                    </div>
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
                                <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-light" data-hs-overlay="#create-subcategory">
                                    Cancel
                                </button>
                                <button type="submit" className="ti-btn ti-btn-primary-full" disabled={loading}>
                                    {loading ? 'Creating...' : 'Add Subcategory'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default function ProtectedSubcategory() {
    return (
        <ProtectedRoute>
            <Subcategory />
        </ProtectedRoute>
    )
}
