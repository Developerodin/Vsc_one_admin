"use client"
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import DataTable from '@/shared/components/DataTable'
import React, { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import axios from 'axios'
import { Base_url } from '@/app/api/config/BaseUrl'
import { useRouter } from 'next/navigation'

interface CategoryData {
    category: string | JSX.Element;
    subcategoryCount: JSX.Element;
    createdDate: string;
    status: string;
    actions: Array<{
        icon: string;
        className: string;
        href: string;
    }>;
}

const Category = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '',
        status: 'active',
        metadata: {
            notes: '',
            description: ''
        }
    });

    const tabs = [
        { name: 'General Information', icon: 'ri-information-line' },
        { name: 'Status', icon: 'ri-toggle-line' },
        { name: 'Metadata', icon: 'ri-settings-4-line' }
    ];

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}categories`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const formattedData = await Promise.all(response.data.results.flatMap(async (category: any) => {
                const subcategoryResponse = await axios.get(`${Base_url}subcategories/category/${category.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (subcategoryResponse.data.length > 0) {
                    return subcategoryResponse.data.map((sub: any) => ({
                        category: (
                            <Link 
                                href={`/subcategory/subcategory?categoryId=${category.id}`} 
                                className="text-black hover:text-primary-dark"
                            >
                                {category.name || '--'} › {sub.name}
                            </Link>
                        ),
                        createdDate: new Date(category.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        }),
                        status: category.status || '--',
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
                } else {
                    return [{
                        category: (
                            <Link 
                                href={`/subcategory/subcategory?categoryId=${category.id}`} 
                                className="text-black hover:text-primary-dark"
                            >
                                {category.name || '--'}
                            </Link>
                        ),
                        createdDate: new Date(category.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        }),
                        status: category.status || '--',
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
                    }];
                }
            }));

            setCategories(formattedData.flat());
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('metadata.')) {
            const metadataField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                metadata: {
                    ...prev.metadata,
                    [metadataField]: value
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
            await axios.post(`${Base_url}categories`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFormData({
                name: '',
                description: '',
                type: '',
                status: 'active',
                metadata: {
                    notes: '',
                    description: ''
                }
            });
            const modal = document.getElementById('create-category');
            if (modal) {
                modal.classList.add('hidden');
            }
            const backdrop = document.querySelector('.hs-overlay-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
            fetchCategories();
        } catch (error) {
            console.error('Error creating category:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
    ];

    const TypeOptions = [
        { value: 'insurance', label: 'Insurance' },
        { value: 'banking', label: 'Banking' }
    ];

    const headers = [
        { key: 'category', label: 'Category Name' ,sortable: true},
        { key: 'createdDate', label: 'Created Date' ,sortable: false},
        { key: 'status', label: 'Status' ,sortable: false},
        { key: 'actions', label: 'Actions' ,sortable: false}
    ];

    return (
        <Fragment>
            <Seo title={"Category"} />
            <Pageheader currentpage="Category" activepage="Category" mainpage="Category" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Category List</h5>
                            <div className="flex">
                                <button 
                                    type="button" 
                                    className="hs-dropdown-toggle ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                                    onClick={() => router.push('/category/create')}
                                >
                                    <i className="ri-add-line font-semibold align-middle"></i> Create Category
                                </button>
                                <div id="create-category" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
                                        <div className="ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title" id="staticBackdropLabel2">Add Category</h6>
                                                <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#create-category">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="ti-modal-body">
                                                    <div className="flex space-x-2 border-b border-gray-200">
                                                        {tabs.map((tab, index) => (
                                                            <button
                                                                key={index}
                                                                type="button"
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
                                                                    <label htmlFor="name" className="form-label">Category Name *</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="name"
                                                                        name="name"
                                                                        value={formData.name}
                                                                        onChange={handleInputChange}
                                                                        placeholder="Enter Category Name"
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
                                                                        rows={4}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-span-12">
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
                                                            </div>
                                                        )}
                                                        {activeTab === 1 && (
                                                            <div className="grid grid-cols-12 gap-4">
                                                                <div className="col-span-12">
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
                                                        )}
                                                        {activeTab === 2 && (
                                                            <div className="grid grid-cols-12 gap-4">
                                                                <div className="col-span-12">
                                                                    <label className="form-label">Additional Notes</label>
                                                                    <textarea
                                                                        className="form-control"
                                                                        name="metadata.notes"
                                                                        value={formData.metadata.notes}
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
                                                                        value={formData.metadata.description}
                                                                        onChange={handleInputChange}
                                                                        placeholder="Enter Description"
                                                                        rows={4}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="ti-modal-footer">
                                                    <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-light" data-hs-overlay="#create-category">
                                                        Cancel
                                                    </button>
                                                    <button type="submit" className="ti-btn ti-btn-primary-full" disabled={loading}>
                                                        {loading ? 'Creating...' : 'Add Category'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <DataTable headers={headers} data={categories} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Category 