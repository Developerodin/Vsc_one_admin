"use client"
import { Followersdata, Friendsdata, LightboxGallery, Personalinfodata, RecentPostsdata, Skillsdata, Suggestionsdata } from '@/shared/data/pages/profiledata'
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import axios from 'axios';
import { Base_url } from '@/app/api/config/BaseUrl';
import { useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/shared/components/ProtectedRoute';
const Profile = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get('id');
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('activity');
    const [leads, setLeads] = useState<any[]>([]);
    const [leadsLoading, setLeadsLoading] = useState(false);
    const [totalLeads, setTotalLeads] = useState(0);

    useEffect(() => {
        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    useEffect(() => {
        if (activeTab === 'activity' && userId) {
            fetchUserLeads();
        }
    }, [activeTab, userId]);

    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(`${Base_url}users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserLeads = async () => {
        try {
            setLeadsLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(`${Base_url}leads/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLeads(response.data.results || []);
            setTotalLeads(response.data.results?.length || 0);
        } catch (error) {
            console.error("Error fetching leads:", error);
        } finally {
            setLeadsLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <Seo title={"Profile"} />
            <Pageheader currentpage="Profile" activepage="Pages" mainpage="Profile" />

            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 mb-4">
                    <div className="flex justify-end">
                        <Link href="/users/users" className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]">
                            <i className="ri-arrow-left-line font-semibold align-middle me-1"></i> Back to Users
                        </Link>
                    </div>
                </div>
                <div className="xxl:col-span-4 xl:col-span-12 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-body !p-0">
                            <div className="sm:flex items-start p-6 main-profile-cover">
                                <div>
                                    <span className="avatar avatar-xxl avatar-rounded online me-4">
                                        {userData?.profilePicture ? (
                                            <img src={userData.profilePicture} alt="Profile" />
                                        ) : (
                                            <i className="ri-user-line text-4xl"></i>
                                        )}
                                    </span>
                                </div>
                                <div className="flex-grow main-profile-info">
                                    <div className="flex items-center !justify-between">
                                        <h6 className="font-semibold mb-1 text-white text-[1rem]">{userData?.name || '--'}</h6>
                                    </div>
                                    <p className="mb-1 !text-white opacity-[0.7]">{userData?.role || '--'}</p>
                                    <p className="text-[0.75rem] text-white mb-6 opacity-[0.5]">
                                        <span className="me-4 inline-flex"><i className="ri-building-line me-1 align-middle"></i>{userData?.address?.country || '--'}</span>
                                    </p>
                                    <div className="flex mb-0">
                                        <div className="me-6">
                                            <p className="font-bold text-[1.25rem] text-white text-shadow mb-0">{userData?.totalCommission || '0'}</p>
                                            <p className="mb-0 text-[.6875rem] opacity-[0.5] text-white">Commission</p>
                                        </div>
                                        <div className="me-6">
                                            <p className="font-bold text-[1.25rem] text-white text-shadow mb-0">{userData?.totalLeads || '0'}</p>
                                            <p className="mb-0 text-[.6875rem] opacity-[0.5] text-white">Leads</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-b border-dashed dark:border-defaultborder/10">
                                <div className="mb-6">
                                    <p className="text-[.9375rem] mb-2 font-semibold">Professional Bio :</p>
                                    <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 opacity-[0.7] mb-0">
                                        I am <b className="text-defaulttextcolor">{userData?.name || '--'},</b> here by conclude that,i am the founder and managing director of the prestigeous company name laugh at all and acts as the cheif executieve officer of the company.
                                    </p>
                                </div>
                            </div>
                            <div className="p-6 border-b border-dashed dark:border-defaultborder/10">
                                <p className="text-[.9375rem] mb-2 me-6 font-semibold">Contact Information :</p>
                                <div className="text-[#8c9097] dark:text-white/50">
                                    <p className="mb-2">
                                        <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                                            <i className="ri-mail-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                                        </span>
                                        {userData?.email || '--'}
                                    </p>
                                    <p className="mb-2">
                                        <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                                            <i className="ri-phone-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                                        </span>
                                        {userData?.mobileNumber || '--'}
                                    </p>
                                    <p className="mb-0">
                                        <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                                            <i className="ri-map-pin-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                                        </span>
                                        {userData?.address?.country || '--'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-8 xl:col-span-12 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-body !p-0">
                                    <div className="!p-4 border-b dark:border-defaultborder/10 border-dashed md:flex items-center justify-between">
                                        <nav className="-mb-0.5 sm:flex md:space-x-4 rtl:space-x-reverse pb-2" role='tablist'>
                                            <button 
                                                className={`w-full sm:w-auto flex rounded-md py-2 px-4 text-sm font-medium ${
                                                    activeTab === 'activity' 
                                                        ? 'bg-primary text-white' 
                                                        : 'text-primary hover:text-primary/80'
                                                }`}
                                                onClick={() => setActiveTab('activity')}
                                            >
                                                <i className="ri-gift-line align-middle inline-block me-1"></i>Activity
                                            </button>
                                            <button 
                                                className={`w-full sm:w-auto flex rounded-md py-2 px-4 text-sm font-medium ${
                                                    activeTab === 'friends' 
                                                        ? 'bg-primary text-white' 
                                                        : 'text-primary hover:text-primary/80'
                                                }`}
                                                onClick={() => setActiveTab('friends')}
                                            >
                                                <i className="ri-information-line me-1 align-middle inline-block"></i>Other Information
                                            </button>
                                            <button 
                                                className={`w-full sm:w-auto flex rounded-md py-2 px-4 text-sm font-medium ${
                                                    activeTab === 'kyc' 
                                                        ? 'bg-primary text-white' 
                                                        : 'text-primary hover:text-primary/80'
                                                }`}
                                                onClick={() => setActiveTab('kyc')}
                                            >
                                                <i className="ri-file-text-line me-1 align-middle inline-block"></i>KYC
                                            </button>

                                        </nav>
                                        <div>
                                            <p className="font-semibold mb-2">Profile 60% completed - <Link href="#!" scroll={false} className="text-primary text-[0.75rem]">Finish now</Link></p>
                                            <div className="progress progress-xs progress-animate">
                                                <div className="progress-bar bg-primary w-[60%]" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="!p-4">
                                        <div className="tab-content" id="myTabContent">
                                            {activeTab === 'activity' && (
                                            <div className="tab-pane show active fade !p-0 !border-0" id="activity-tab-pane"
                                                role="tabpanel" aria-labelledby="activity-tab">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h6 className="text-lg font-semibold">Lead Details</h6>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm text-gray-500">Total Leads: {totalLeads}</span>
                                                    </div>
                                                </div>
                                                {leadsLoading ? (
                                                    <div className="text-center py-8">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                                        <p className="mt-2 text-gray-500">Loading leads...</p>
                                                    </div>
                                                ) : leads.length > 0 ? (
                                                    <div className="space-y-4">
                                                        {leads.map((lead) => (
                                                            <div key={lead.id} className="border rounded-lg p-4">
                                                                <div className="flex justify-between items-start mb-3">
                                                                    <div>
                                                                        <h6 className="font-semibold text-lg">{lead.fieldsData['Full Name']}</h6>
                                                                        <p className="text-sm text-gray-500">{lead.fieldsData['Email']}</p>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <span className={`badge ${
                                                                            lead.status === 'new' ? 'bg-primary' :
                                                                            lead.status === 'interested' ? 'bg-success' :
                                                                            lead.status === 'not_interested' ? 'bg-danger' :
                                                                            'bg-warning'
                                                                        } text-white`}>
                                                                            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                                                        </span>
                                                                        <Link 
                                                                            href={`/leads/timeline?id=${lead.id}`}
                                                                            className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                                                                        >
                                                                            <i className="ri-timeline-line me-1"></i>
                                                                            View Timeline
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                                                    <div>
                                                                        <p className="text-sm text-gray-500">Mobile</p>
                                                                        <p className="font-medium">{lead.fieldsData['Mobile Number']}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm text-gray-500">DOB</p>
                                                                        <p className="font-medium">{lead.fieldsData['DOB']}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm text-gray-500">Policy Term</p>
                                                                        <p className="font-medium">{lead.fieldsData['Policy Term']}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm text-gray-500">Occupation</p>
                                                                        <p className="font-medium">{lead.fieldsData['Occupation']}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-3">
                                                                    <p className="text-sm text-gray-500">Address</p>
                                                                    <p className="font-medium">{lead.fieldsData['Address']}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-8">
                                                        <i className="ri-history-line text-6xl text-gray-400 mb-4"></i>
                                                        <h4 className="text-gray-600 mb-2">No Leads History</h4>
                                                        <p className="text-gray-500">This user has no leads activity to display yet.</p>
                                                    </div>
                                                )}
                                            </div>
                                            )}
                                            {activeTab === 'friends' && (
                                                <div className="tab-pane show active fade !p-0 !border-0" role="tabpanel">
                                                    <div className="grid grid-cols-12 gap-4">
                                                        <div className="col-span-12 md:col-span-6">
                                                            <div className="box !shadow-none border dark:border-defaultborder/10">
                                                                <div className="box-header">
                                                                    <h6 className="box-title">Personal Information</h6>
                                                                </div>
                                                                <div className="box-body">
                                                                    <div className="space-y-3">
                                                                        <div className="flex justify-between">
                                                                            <span className="text-[#8c9097] dark:text-white/50">Full Name:</span>
                                                                            <span className="font-semibold">{userData?.name || '--'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-[#8c9097] dark:text-white/50">Email:</span>
                                                                            <span className="font-semibold">{userData?.email || '--'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-[#8c9097] dark:text-white/50">Mobile:</span>
                                                                            <span className="font-semibold">{userData?.mobileNumber || '--'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-[#8c9097] dark:text-white/50">Role:</span>
                                                                            <span className="font-semibold capitalize">{userData?.role || '--'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between items-center">
                                                                            <span className="text-[#8c9097] dark:text-white/50">Status:</span>
                                                                            <div className="flex items-center gap-2">
                                                                                <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${userData?.status === 'active' ? 'bg-primary' : 'bg-primary'}`}>
                                                                                    <i className="ri-shield-check-line text-xs text-white"></i>
                                                                                </div>
                                                                                <span className={`badge ${userData?.status === 'active' ? 'bg-primary text-white' : 'bg-primary text-white'}`}>
                                                                                    {userData?.status || '--'}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex justify-between items-center">
                                                                            <span className="text-[#8c9097] dark:text-white/50">KYC Status:</span>
                                                                            <div className="flex items-center gap-2">
                                                                                    <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${userData?.kycStatus === 'verified' ? 'bg-primary' : 'bg-primary'}`}>
                                                                                    <i className="ri-verified-badge-line text-xs text-white"></i>
                                                                                </div>
                                                                                <span className={`badge ${userData?.kycStatus === 'verified' ? 'bg-primary text-white' : 'bg-primary text-white'}`}>
                                                                                    {userData?.kycStatus || '--'}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-6">
                                                            <div className="box !shadow-none border dark:border-defaultborder/10">
                                                                <div className="box-header">
                                                                    <h6 className="box-title">Address Information</h6>
                                                                </div>
                                                                <div className="box-body">
                                                                    <div className="space-y-3">
                                                                        <div className="flex justify-between">
                                                                            <span className="text-[#8c9097] dark:text-white/50">Street:</span>
                                                                            <span className="font-semibold">{userData?.address?.street || '--'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-[#8c9097] dark:text-white/50">City:</span>
                                                                            <span className="font-semibold">{userData?.address?.city || '--'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-[#8c9097] dark:text-white/50">State:</span>
                                                                            <span className="font-semibold">{userData?.address?.state || '--'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-[#8c9097] dark:text-white/50">Country:</span>
                                                                            <span className="font-semibold">{userData?.address?.country || '--'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-[#8c9097] dark:text-white/50">Pincode:</span>
                                                                            <span className="font-semibold">{userData?.address?.pincode || '--'}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12">
                                                            <div className="box !shadow-none border dark:border-defaultborder/10">
                                                                <div className="box-header">
                                                                    <h6 className="box-title">Verification Status</h6>
                                                                </div>
                                                                <div className="box-body">
                                                                    <div className="grid grid-cols-12 gap-4">
                                                                        <div className="col-span-6 md:col-span-3">
                                                                            <div className="text-center">
                                                                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${userData?.isEmailVerified ? 'bg-primary' : 'bg-primary'}`}>
                                                                                    <i className="ri-mail-line text-xl text-white"></i>
                                                                                </div>
                                                                                <p className="text-sm mt-1">Email</p>
                                                                                <span className={`badge ${userData?.isEmailVerified ? 'bg-primary text-white' : 'bg-primary text-white'}`}>
                                                                                    {userData?.isEmailVerified ? 'Verified' : 'Pending'}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-6 md:col-span-3">
                                                                            <div className="text-center">
                                                                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${userData?.isMobileVerified ? 'bg-primary' : 'bg-primary'}`}>
                                                                                    <i className="ri-phone-line text-xl text-white"></i>
                                                                                </div>
                                                                                <p className="text-sm mt-1">Mobile</p>
                                                                                <span className={`badge ${userData?.isMobileVerified ? 'bg-primary text-white' : 'bg-primary text-white'}`}>
                                                                                    {userData?.isMobileVerified ? 'Verified' : 'Pending'}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-6 md:col-span-3">
                                                                            <div className="text-center">
                                                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 bg-primary">
                                                                                    <i className="ri-currency-line text-xl text-white"></i>
                                                                                </div>
                                                                                <p className="text-sm mt-1">Total Sales</p>
                                                                                <span className="badge bg-primary text-white">{userData?.totalSales || '0'}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-6 md:col-span-3">
                                                                            <div className="text-center">
                                                                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${userData?.onboardingStatus === 'completed' ? 'bg-primary' : 'bg-primary'}`}>
                                                                                    <i className="ri-user-settings-line text-xl text-white"></i>
                                                                                </div>
                                                                                <p className="text-sm mt-1">Onboarding</p>
                                                                                <span className={`badge ${userData?.onboardingStatus === 'completed' ? 'bg-primary text-white' : 'bg-primary text-white'}`}>
                                                                                    {userData?.onboardingStatus || 'Pending'}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {activeTab === 'kyc' && (
                                                <div className="tab-pane show active fade !p-0 !border-0" role="tabpanel">
                                                    <div className="grid grid-cols-12 gap-4">
                                                        <div className="col-span-12 md:col-span-6">
                                                            <div className="box !shadow-none border dark:border-defaultborder/10">
                                                                <div className="box-header">
                                                                    <h6 className="box-title">Aadhaar Details</h6>
                                                                </div>
                                                                <div className="box-body">
                                                                    <div className="space-y-3">
                                                                        <div className="flex justify-between items-center">
                                                                            <span className="text-[#8c9097] dark:text-white/50">Aadhaar Number:</span>
                                                                            <span className="font-semibold">{userData?.kycDetails?.aadhaarNumber || '--'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between items-center">
                                                                            <span className="text-[#8c9097] dark:text-white/50">Verification Status:</span>
                                                                            <div className="flex items-center gap-2">
                                                                                <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${userData?.kycDetails?.aadhaarVerified ? 'bg-primary' : 'bg-primary'}`}>
                                                                                    <i className="ri-id-card-line text-xs text-white"></i>
                                                                                </div>
                                                                                <span className={`badge ${userData?.kycDetails?.aadhaarVerified ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white'}`}>
                                                                                    {userData?.kycDetails?.aadhaarVerified ? 'Verified' : 'Pending'}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-6">
                                                            <div className="box !shadow-none border dark:border-defaultborder/10">
                                                                <div className="box-header">
                                                                    <h6 className="box-title">PAN Details</h6>
                                                                </div>
                                                                <div className="box-body">
                                                                    <div className="space-y-3">
                                                                        <div className="flex justify-between items-center">
                                                                            <span className="text-[#8c9097] dark:text-white/50">PAN Number:</span>
                                                                            <span className="font-semibold">{userData?.kycDetails?.panNumber || '--'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between items-center">
                                                                            <span className="text-[#8c9097] dark:text-white/50">Verification Status:</span>
                                                                            <div className="flex items-center gap-2">
                                                                                <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${userData?.kycDetails?.panVerified ? 'bg-primary' : 'bg-primary'}`}>
                                                                                    <i className="ri-bank-card-line text-xs text-white"></i>
                                                                                </div>
                                                                                <span className={`badge ${userData?.kycDetails?.panVerified ? 'bg-primary text-white' : 'bg-primary text-white'}`}>
                                                                                    {userData?.kycDetails?.panVerified ? 'Verified' : 'Pending'}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12">
                                                            <div className="box !shadow-none border dark:border-defaultborder/10">
                                                                <div className="box-header">
                                                                    <h6 className="box-title">Uploaded Documents</h6>
                                                                </div>
                                                                <div className="box-body">
                                                                    {userData?.kycDetails?.documents && userData.kycDetails.documents.length > 0 ? (
                                                                        <div className="grid grid-cols-12 gap-4">
                                                                            {userData.kycDetails.documents.map((doc: any, index: number) => (
                                                                                <div key={index} className="col-span-12 md:col-span-6">
                                                                                    <div className="border rounded-lg p-4">
                                                                                        <div className="flex items-center justify-between mb-3">
                                                                                            <h6 className="text-sm font-semibold capitalize">{doc.type} Document</h6>
                                                                                            <span className={`badge ${doc.verified ? 'bg-primary text-white' : 'bg-primary text-white'}`}>
                                                                                                {doc.verified ? 'Verified' : 'Pending'}
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="text-center">
                                                                                            <img 
                                                                                                src={doc.url} 
                                                                                                alt={`${doc.type} document`}
                                                                                                className="max-w-full h-32 object-cover rounded border mx-auto"
                                                                                            />
                                                                                            <p className="text-xs text-gray-500 mt-2">
                                                                                                Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="text-center py-8">
                                                                            <i className="ri-file-list-3-line text-4xl text-gray-400 mb-4"></i>
                                                                            <p className="text-gray-500">No documents uploaded yet</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default function ProtectedProfile() {
    return (
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    )
}