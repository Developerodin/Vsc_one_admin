"use client";
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import Select from "react-select";
import Link from 'next/link';
interface FormData {
    name: string;
    description: string;
    type: string;
    status: string;
    image?: string;
    imageKey?: string;
    metadata: {
        notes?: string;
        description?: string;
        [key: string]: any;
    };
}

const EditCategory = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('id');
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
        name: "",
        description: "",
        type: "",
        status: "active",
        image: "",
        imageKey: "",
        metadata: {
            notes: "",
            description: ""
        }
    });

    const tabs = [
        { name: 'General Information', icon: 'ri-information-line' },
        { name: 'Status', icon: 'ri-toggle-line' },
        { name: 'Metadata', icon: 'ri-settings-4-line' }
    ];

    const TypeOptions = [
        { value: 'insurance', label: 'Insurance' },
        { value: 'banking', label: 'Banking' }
    ];

    const StatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
    ];

    useEffect(() => {
        if (categoryId) {
            fetchCategoryData();
        } else {
            router.push('/category/category');
        }
    }, [categoryId]);

    const fetchCategoryData = async () => {
        try {
            setInitialLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}categories/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const categoryData = response.data;
            setFormData({
                name: categoryData.name || "",
                description: categoryData.description || "",
                type: categoryData.type || "",
                status: categoryData.status || "active",
                image: categoryData.image || "",
                imageKey: categoryData.imageKey || "",
                metadata: {
                    notes: categoryData.metadata?.notes || "",
                    description: categoryData.metadata?.description || ""
                }
            });

            // Set preview image if exists
            if (categoryData.image) {
                setPreviewImage(categoryData.image);
            }
        } catch (error) {
            console.error('Error fetching category data:', error);
        } finally {
            setInitialLoading(false);
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

            // Validate image dimensions (minimum 44x44 pixels)
            const img = new Image();
            const url = URL.createObjectURL(file);
            
            img.onload = () => {
                URL.revokeObjectURL(url);
                
                if (img.width < 44 || img.height < 44) {
                    alert('Image dimensions must be at least 44x44 pixels. Current dimensions: ' + img.width + 'x' + img.height);
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

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            await axios.patch(`${Base_url}categories/${categoryId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            router.push('/category/category');
        } catch (error) {
            console.error("Error updating category:", error);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <Fragment>
            <Seo title={"Edit Category"} />
            <Pageheader currentpage="Edit Category" activepage="Category" mainpage="Edit Category" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Edit Category</h5>
                            <Link href="/category/category" className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]">
                                <i className="ri-arrow-left-line font-semibold align-middle me-1"></i> Back to Category
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
                                            <label className="form-label">Category Icon *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                placeholder="Enter Category Name"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Description *</label>
                                            <textarea
                                                className="form-control"
                                                value={formData.description}
                                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                                placeholder="Enter Description"
                                                rows={4}
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
                                            <div className="flex items-center justify-between mb-3">
                                                <h6 className="mb-0">Category Image</h6>
                                                <span className="text-xs text-gray-500">Upload an image for this category</span>
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
                                                    <small className="text-gray-500">Supported formats: JPG, PNG, GIF. Max size: 5MB. Minimum dimensions: 44x44 pixels</small>
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
                                                            alt="Category preview" 
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
                                    </div>
                                )}
                                {activeTab === 1 && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">Status</label>
                                            <Select
                                                options={StatusOptions}
                                                value={StatusOptions.find(option => option.value === formData.status)}
                                                onChange={(option) => handleSelectChange('status', option)}
                                                placeholder="Select Status"
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
                                                value={formData.metadata.notes || ''}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    metadata: {...formData.metadata, notes: e.target.value}
                                                })}
                                                placeholder="Enter Additional Notes"
                                                rows={4}
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                value={formData.metadata.description || ''}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    metadata: {...formData.metadata, description: e.target.value}
                                                })}
                                                placeholder="Enter Description"
                                                rows={4}
                                            />
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
                                    {loading ? "Updating..." : "Update Category"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default function ProtectedEditCategory() {
    return (
        <ProtectedRoute>
            <EditCategory />
        </ProtectedRoute>
    );
} 