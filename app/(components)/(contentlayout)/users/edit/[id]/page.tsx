"use client";
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
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    role: string;
    status: string;
    profilePicture: string;
    onboardingStatus: string;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: string;
        country: string;
    };
    kycStatus: string;
    aadhaarNumber: string;
    aadhaarVerified: boolean;
    aadhaarVerificationDate: Date | null;
    panNumber: string;
    panVerified: boolean;
    panVerificationDate: Date | null;
    documents: Array<{
        name: string;
        url: string;
        type: string;
    }>;
    bankAccounts: Array<{
        accountNumber: string;
        bankName: string;
        ifscCode: string;
        accountType: string;
    }>;
    totalCommission: number;
    totalLeads: number;
    totalSales: number;
    lastLogin: Date | null;
    verification: {
        email: {
            token: string;
            expiresAt: Date | null;
            verified: boolean;
        };
        mobile: {
            token: string;
            expiresAt: Date | null;
            verified: boolean;
        };
    };
    otp: {
        code: string;
        expiresAt: Date | null;
        attempts: number;
    };
    metadata: {
        notes?: string;
        description?: string;
        [key: string]: any;
    };
}

const EditUser = () => {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        mobileNumber: "",
        role: "",
        status: "active",
        profilePicture: "",
        onboardingStatus: "pending",
        address: {
            street: "",
            city: "",
            state: "",
            pincode: "",
            country: "India"
        },
        kycStatus: "pending",
        aadhaarNumber: "",
        aadhaarVerified: false,
        aadhaarVerificationDate: null,
        panNumber: "",
        panVerified: false,
        panVerificationDate: null,
        documents: [],
        bankAccounts: [],
        totalCommission: 0,
        totalLeads: 0,
        totalSales: 0,
        lastLogin: null,
        verification: {
            email: {
                token: "",
                expiresAt: null,
                verified: false
            },
            mobile: {
                token: "",
                expiresAt: null,
                verified: false
            }
        },
        otp: {
            code: "",
            expiresAt: null,
            attempts: 0
        },
        metadata: {
            notes: "",
            description: ""
        }
    });

    const tabs = [
        { name: 'General Information', icon: 'ri-information-line' },
        { name: 'Address', icon: 'ri-map-pin-line' },
        { name: 'KYC Details', icon: 'ri-shield-check-line' },
        { name: 'Bank Accounts', icon: 'ri-bank-line' },
        { name: 'Statistics', icon: 'ri-line-chart-line' },
        { name: 'Verification', icon: 'ri-shield-check-line' },
        { name: 'Additional Notes', icon: 'ri-file-list-line' }
    ];

    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const RoleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
        { value: 'agent', label: 'Agent' }
    ];

    const StatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'suspended', label: 'Suspended' }
    ];

    const OnboardingStatusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
        { value: 'rejected', label: 'Rejected' }
    ];

    const KYCStatusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'verified', label: 'Verified' },
        { value: 'rejected', label: 'Rejected' }
    ];

    const AccountTypeOptions = [
        { value: 'savings', label: 'Savings' },
        { value: 'current', label: 'Current' },
        { value: 'fixed', label: 'Fixed Deposit' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => {
                const parentObj = prev[parent as keyof FormData] as Record<string, any>;
                return {
                    ...prev,
                    [parent]: {
                        ...parentObj,
                        [child]: value
                    }
                };
            });
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSelectChange = (name: string, selectedOption: any) => {
        if (selectedOption) {
            setFormData(prev => ({
                ...prev,
                [name]: selectedOption.value
            }));
        }
    };

    const handleDateChange = (name: string, date: Date | null) => {
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => {
                const parentObj = prev[parent as keyof FormData] as Record<string, any>;
                return {
                    ...prev,
                    [parent]: {
                        ...parentObj,
                        [child]: date
                    }
                };
            });
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: date
            }));
        }
    };

    const handleBankAccountChange = (index: number, field: string, value: string) => {
        const newBankAccounts = [...formData.bankAccounts];
        newBankAccounts[index] = {
            ...newBankAccounts[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            bankAccounts: newBankAccounts
        }));
    };

    const addBankAccount = () => {
        setFormData(prev => ({
            ...prev,
            bankAccounts: [...prev.bankAccounts, {
                accountNumber: '',
                bankName: '',
                ifscCode: '',
                accountType: 'savings'
            }]
        }));
    };

    const removeBankAccount = (index: number) => {
        setFormData(prev => ({
            ...prev,
            bankAccounts: prev.bankAccounts.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            await axios.put(`${Base_url}users/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            router.push('/users/users');
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <Seo title={"Edit User"} />
            <Pageheader currentpage="Edit User" activepage="Users" mainpage="Edit User" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Edit User</h5>
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
                                            <label className="form-label">Name *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter Name"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Email *</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Enter Email"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="Enter Password"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Mobile Number *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="mobileNumber"
                                                value={formData.mobileNumber}
                                                onChange={handleInputChange}
                                                placeholder="Enter Mobile Number"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Role *</label>
                                            <Select
                                                options={RoleOptions}
                                                value={RoleOptions.find(option => option.value === formData.role)}
                                                onChange={(option) => handleSelectChange('role', option)}
                                                placeholder="Select Role"
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
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Onboarding Status</label>
                                            <Select
                                                options={OnboardingStatusOptions}
                                                value={OnboardingStatusOptions.find(option => option.value === formData.onboardingStatus)}
                                                onChange={(option) => handleSelectChange('onboardingStatus', option)}
                                                placeholder="Select Onboarding Status"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Profile Picture URL</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="profilePicture"
                                                value={formData.profilePicture}
                                                onChange={handleInputChange}
                                                placeholder="Enter Profile Picture URL"
                                            />
                                        </div>
                                    </div>
                                )}
                                {activeTab === 1 && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">Street</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="address.street"
                                                value={formData.address.street}
                                                onChange={handleInputChange}
                                                placeholder="Enter Street"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="address.city"
                                                value={formData.address.city}
                                                onChange={handleInputChange}
                                                placeholder="Enter City"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">State</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="address.state"
                                                value={formData.address.state}
                                                onChange={handleInputChange}
                                                placeholder="Enter State"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Pincode</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="address.pincode"
                                                value={formData.address.pincode}
                                                onChange={handleInputChange}
                                                placeholder="Enter Pincode"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Country</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="address.country"
                                                value={formData.address.country}
                                                onChange={handleInputChange}
                                                placeholder="Enter Country"
                                            />
                                        </div>
                                    </div>
                                )}
                                {activeTab === 2 && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">KYC Status</label>
                                            <Select
                                                options={KYCStatusOptions}
                                                value={KYCStatusOptions.find(option => option.value === formData.kycStatus)}
                                                onChange={(option) => handleSelectChange('kycStatus', option)}
                                                placeholder="Select KYC Status"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Aadhaar Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="aadhaarNumber"
                                                value={formData.aadhaarNumber}
                                                onChange={handleInputChange}
                                                placeholder="Enter Aadhaar Number"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Aadhaar Verification Date</label>
                                            <DatePicker
                                                selected={formData.aadhaarVerificationDate}
                                                onChange={(date) => handleDateChange('aadhaarVerificationDate', date)}
                                                className="form-control"
                                                placeholderText="Select Date"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">PAN Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="panNumber"
                                                value={formData.panNumber}
                                                onChange={handleInputChange}
                                                placeholder="Enter PAN Number"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">PAN Verification Date</label>
                                            <DatePicker
                                                selected={formData.panVerificationDate}
                                                onChange={(date) => handleDateChange('panVerificationDate', date)}
                                                className="form-control"
                                                placeholderText="Select Date"
                                            />
                                        </div>
                                    </div>
                                )}
                                {activeTab === 3 && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">Bank Accounts</label>
                                            <div className="space-y-4">
                                                {formData.bankAccounts.map((account, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Account Number"
                                                            value={account.accountNumber}
                                                            onChange={(e) => handleBankAccountChange(index, 'accountNumber', e.target.value)}
                                                        />
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Bank Name"
                                                            value={account.bankName}
                                                            onChange={(e) => handleBankAccountChange(index, 'bankName', e.target.value)}
                                                        />
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="IFSC Code"
                                                            value={account.ifscCode}
                                                            onChange={(e) => handleBankAccountChange(index, 'ifscCode', e.target.value)}
                                                        />
                                                        <Select
                                                            options={AccountTypeOptions}
                                                            value={AccountTypeOptions.find(option => option.value === account.accountType)}
                                                            onChange={(option) => {
                                                                if (option) {
                                                                    handleBankAccountChange(index, 'accountType', option.value);
                                                                }
                                                            }}
                                                            placeholder="Select Type"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="ti-btn ti-btn-danger"
                                                            onClick={() => removeBankAccount(index)}
                                                        >
                                                            <i className="ri-delete-bin-line"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="ti-btn ti-btn-light"
                                                    onClick={addBankAccount}
                                                >
                                                    Add Bank Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 4 && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">Total Commission</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="totalCommission"
                                                value={formData.totalCommission}
                                                onChange={handleInputChange}
                                                placeholder="Enter Total Commission"
                                                min="0"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Total Leads</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="totalLeads"
                                                value={formData.totalLeads}
                                                onChange={handleInputChange}
                                                placeholder="Enter Total Leads"
                                                min="0"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Total Sales</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="totalSales"
                                                value={formData.totalSales}
                                                onChange={handleInputChange}
                                                placeholder="Enter Total Sales"
                                                min="0"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Last Login</label>
                                            <DatePicker
                                                selected={formData.lastLogin}
                                                onChange={(date) => handleDateChange('lastLogin', date)}
                                                className="form-control"
                                                placeholderText="Select Date"
                                            />
                                        </div>
                                    </div>
                                )}
                                {activeTab === 5 && (
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <label className="form-label">Email Verification</label>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox"
                                                        checked={formData.verification.email.verified}
                                                        onChange={(e) => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                verification: {
                                                                    ...prev.verification,
                                                                    email: {
                                                                        ...prev.verification.email,
                                                                        verified: e.target.checked
                                                                    }
                                                                }
                                                            }));
                                                        }}
                                                    />
                                                    <span>Email Verified</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Verification Token"
                                                    value={formData.verification.email.token}
                                                    onChange={(e) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            verification: {
                                                                ...prev.verification,
                                                                email: {
                                                                    ...prev.verification.email,
                                                                    token: e.target.value
                                                                }
                                                            }
                                                        }));
                                                    }}
                                                />
                                                <DatePicker
                                                    selected={formData.verification.email.expiresAt}
                                                    onChange={(date) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            verification: {
                                                                ...prev.verification,
                                                                email: {
                                                                    ...prev.verification.email,
                                                                    expiresAt: date
                                                                }
                                                            }
                                                        }));
                                                    }}
                                                    className="form-control"
                                                    placeholderText="Token Expiry Date"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">Mobile Verification</label>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox"
                                                        checked={formData.verification.mobile.verified}
                                                        onChange={(e) => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                verification: {
                                                                    ...prev.verification,
                                                                    mobile: {
                                                                        ...prev.verification.mobile,
                                                                        verified: e.target.checked
                                                                    }
                                                                }
                                                            }));
                                                        }}
                                                    />
                                                    <span>Mobile Verified</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Verification Token"
                                                    value={formData.verification.mobile.token}
                                                    onChange={(e) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            verification: {
                                                                ...prev.verification,
                                                                mobile: {
                                                                    ...prev.verification.mobile,
                                                                    token: e.target.value
                                                                }
                                                            }
                                                        }));
                                                    }}
                                                />
                                                <DatePicker
                                                    selected={formData.verification.mobile.expiresAt}
                                                    onChange={(date) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            verification: {
                                                                ...prev.verification,
                                                                mobile: {
                                                                    ...prev.verification.mobile,
                                                                    expiresAt: date
                                                                }
                                                            }
                                                        }));
                                                    }}
                                                    className="form-control"
                                                    placeholderText="Token Expiry Date"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <label className="form-label">OTP Information</label>
                                            <div className="space-y-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="OTP Code"
                                                    value={formData.otp.code}
                                                    onChange={(e) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            otp: {
                                                                ...prev.otp,
                                                                code: e.target.value
                                                            }
                                                        }));
                                                    }}
                                                />
                                                <DatePicker
                                                    selected={formData.otp.expiresAt}
                                                    onChange={(date) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            otp: {
                                                                ...prev.otp,
                                                                expiresAt: date
                                                            }
                                                        }));
                                                    }}
                                                    className="form-control"
                                                    placeholderText="OTP Expiry Date"
                                                />
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="OTP Attempts"
                                                    value={formData.otp.attempts}
                                                    onChange={(e) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            otp: {
                                                                ...prev.otp,
                                                                attempts: parseInt(e.target.value)
                                                            }
                                                        }));
                                                    }}
                                                    min="0"
                                                />
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
                                    {loading ? "Updating..." : "Update User"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export async function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
        // Add more static IDs if needed
    ];
}

export default function ProtectedEditUser() {
    return (
        <ProtectedRoute>
            <EditUser />
        </ProtectedRoute>
    );
} 