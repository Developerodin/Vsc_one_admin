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

    useEffect(() => {
        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <Seo title={"Profile"} />
            <Pageheader currentpage="Profile" activepage="Pages" mainpage="Profile" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-4 xl:col-span-12 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-body !p-0">
                            <div className="sm:flex items-start p-6 main-profile-cover">
                                <div>
                                    <span className="avatar avatar-xxl avatar-rounded online me-4">
                                        <img src="../../assets/images/faces/9.jpg" alt="" />
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
                            <div className="p-6 border-b dark:border-defaultborder/10 border-dashed sm:flex items-center">
                                <p className="text-[.9375rem] mb-2 me-6 font-semibold">Social Networks :</p>
                                <div className="btn-list mb-0">
                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-primary text-primary me-[.375rem] mb-1">
                                        <i className="ri-facebook-line font-semibold"></i>
                                    </button>
                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-secondary me-[.375rem] mb-1">
                                        <i className="ri-twitter-x-line font-semibold"></i>
                                    </button>
                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-warning me-[.375rem] mb-1">
                                        <i className="ri-instagram-line font-semibold"></i>
                                    </button>
                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-success me-[.375rem] mb-1">
                                        <i className="ri-github-line font-semibold"></i>
                                    </button>
                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger me-[.375rem] mb-1">
                                        <i className="ri-youtube-line font-semibold"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 border-b dark:border-defaultborder/10 border-dashed">
                                <p className="text-[.9375rem] mb-2 me-6 font-semibold">Skills :</p>
                                <div>
                                    {Skillsdata.map((idx)=>(
                                    <Link href="#!" scroll={false} key={Math.random()}>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 m-1">{idx.text}</span>
                                    </Link>
                                    ))}
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
                                                className={`w-full sm:w-auto flex ${activeTab === 'activity' ? 'active hs-tab-active:font-semibold hs-tab-active:text-white hs-tab-active:bg-primary' : ''} rounded-md py-2 px-4 text-primary text-sm`}
                                                onClick={() => setActiveTab('activity')}
                                            >
                                                <i className="ri-gift-line align-middle inline-block me-1"></i>Activity
                                            </button>
                                            <button 
                                                className={`w-full sm:w-auto flex ${activeTab === 'friends' ? 'active hs-tab-active:font-semibold hs-tab-active:text-white hs-tab-active:bg-primary' : ''} rounded-md py-2 px-4 text-primary text-sm`}
                                                onClick={() => setActiveTab('friends')}
                                            >
                                                <i className="ri-money-dollar-box-line me-1 align-middle inline-block"></i>Friends
                                            </button>
                                            <button 
                                                className={`w-full sm:w-auto flex ${activeTab === 'gallery' ? 'active hs-tab-active:font-semibold hs-tab-active:text-white hs-tab-active:bg-primary' : ''} rounded-md py-2 px-4 text-primary text-sm`}
                                                onClick={() => setActiveTab('gallery')}
                                            >
                                                <i className="ri-exchange-box-line me-1 align-middle inline-block"></i>Gallery
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
                                                <ul className="list-none profile-timeline">
                                                    <li>
                                                        <div>
                                                            <span className="avatar avatar-sm bg-primary/10  !text-primary avatar-rounded profile-timeline-avatar">
                                                                E
                                                            </span>
                                                            <p className="mb-2">
                                                                <b>You</b> Commented on <b>alexander taylor</b> post <Link className="text-secondary" href="#!" scroll={false}><u>#beautiful day</u></Link>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">24,Dec 2022 - 14:34</span>
                                                            </p>
                                                            <p className="profile-activity-media mb-0 flex w-full mt-2 sm:mt-0">
                                                                <Link aria-label="anchor" href="#!" scroll={false}>
                                                                    <img src="../../assets/images/media/media-17.jpg" alt="" />
                                                                </Link>
                                                                <Link aria-label="anchor" href="#!" scroll={false}>
                                                                    <img src="../../assets/images/media/media-18.jpg" alt="" />
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                                                <img src="../../assets/images/faces/11.jpg" alt="" />
                                                            </span>
                                                            <p className="text-[#8c9097] dark:text-white/50 mb-2">
                                                                <span className="text-default"><b>Json Smith</b> reacted to the post 👍</span>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">18,Dec 2022 - 12:16</span>
                                                            </p>
                                                            <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, repellendus rem rerum excepturi aperiam ipsam temporibus inventore ullam tempora eligendi libero sequi dignissimos cumque, et a sint tenetur consequatur omnis!
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                                                <img src="../../assets/images/faces/4.jpg" alt="" />
                                                            </span>
                                                            <p className="text-[#8c9097] dark:text-white/50 mb-2">
                                                                <span className="text-default"><b>Alicia Keys</b> shared a document with <b>you</b></span>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">21,Dec 2022 - 15:32</span>
                                                            </p>
                                                            <p className="profile-activity-media mb-0 flex w-full mt-2 sm:mt-0 items-center">
                                                                <Link aria-label="anchor" href="#!" scroll={false}>
                                                                    <img src="../../assets/images/media/file-manager/3.png" alt="" />
                                                                </Link>
                                                                <span className="text-[.6875rem] text-[#8c9097] dark:text-white/50">432.87KB</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <span className="avatar avatar-sm bg-success/10 !text-success avatar-rounded profile-timeline-avatar">
                                                                P
                                                            </span>
                                                            <p className="text-[#8c9097] dark:text-white/50 mb-4">
                                                                <span className="text-default"><b>You</b> shared a post with 4 people <b>Simon,Sasha, Anagha,Hishen</b></span>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">28,Dec 2022 - 18:46</span>
                                                            </p>
                                                            <p className="profile-activity-media mb-4">
                                                                <Link aria-label="anchor" href="#!" scroll={false}>
                                                                    <img src="../../assets/images/media/media-75.jpg" alt="" />
                                                                </Link>
                                                            </p>
                                                            <div>
                                                                <div className="avatar-list-stacked">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src="../../assets/images/faces/2.jpg" alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src="../../assets/images/faces/8.jpg" alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src="../../assets/images/faces/2.jpg" alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src="../../assets/images/faces/10.jpg" alt="img" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                                                <img src="../../assets/images/faces/5.jpg" alt="" />
                                                            </span>
                                                            <p className="text-[#8c9097] dark:text-white/50 mb-1">
                                                                <span className="text-default"><b>Melissa Blue</b> liked your post <b>travel excites</b></span>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">11,Dec 2022 - 11:18</span>
                                                            </p>
                                                            <p className="text-[#8c9097] dark:text-white/50">you are already feeling the tense atmosphere of the video playing in the background</p>
                                                            <p className="profile-activity-media sm:flex mb-0">
                                                                <Link aria-label="anchor" href="#!" scroll={false}>
                                                                    <img src="../../assets/images/media/media-59.jpg" className="m-1" alt="" />
                                                                </Link>
                                                                <Link aria-label="anchor" href="#!" scroll={false}>
                                                                    <img src="../../assets/images/media/media-60.jpg" className="m-1" alt="" />
                                                                </Link>
                                                                <Link aria-label="anchor" href="#!" scroll={false}>
                                                                    <img src="../../assets/images/media/media-61.jpg" className="m-1" alt="" />
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                                                <img src="../../assets/images/media/media-39.jpg" alt="" />
                                                            </span>
                                                            <p className="mb-1">
                                                                <b>You</b> Commented on <b>Peter Engola</b> post <Link className="text-secondary" href="#!" scroll={false}><u>#Mother Nature</u></Link>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">24,Dec 2022 - 14:34</span>
                                                            </p>
                                                            <p className="text-[#8c9097] dark:text-white/50">Technology id developing rapidly kepp uo your work 👌</p>
                                                            <p className="profile-activity-media mb-0 flex w-full mt-2 sm:mt-0">
                                                                <Link aria-label="anchor" href="#!" scroll={false}>
                                                                    <img src="../../assets/images/media/media-26.jpg" alt="" />
                                                                </Link>
                                                                <Link aria-label="anchor" href="#!" scroll={false}>
                                                                    <img src="../../assets/images/media/media-29.jpg" alt="" />
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            )}
                                            {activeTab === 'friends' && (
                                                <div className="tab-pane show active fade !p-0 !border-0" role="tabpanel">
                                                <div className="grid grid-cols-12 sm:gap-x-6">
                                                    {Friendsdata.map((idx) =>(
                                                    <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 col-span-12" key={Math.random()}>
                                                        <div className="box !shadow-none border dark:border-defaultborder/10">
                                                            <div className="box-body p-6">
                                                                <div className="text-center">
                                                                    <span className="avatar avatar-xl avatar-rounded">
                                                                        <img src={idx.src} alt="" />
                                                                    </span>
                                                                    <div className="mt-2">
                                                                        <p className="mb-0 font-semibold">{idx.name}</p>
                                                                        <p className="text-[0.75rem] opacity-[0.7] mb-1 text-[#8c9097] dark:text-white/50">{idx.mail}</p>
                                                                        <span className={`badge bg-${idx.color}/10 rounded-full text-${idx.color}`}>{idx.badge}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="box-footer text-center">
                                                                <div className="btn-list">
                                                                    <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] me-1 ti-btn-light">Block</button>
                                                                    <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] text-white bg-primary">Unfollow</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ))}
                                                    </div>
                                                </div>
                                            )}
                                            {activeTab === 'gallery' && (
                                                <div className="tab-pane show active fade !p-0 !border-0" role="tabpanel">
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
                                                    <LightboxGallery/>
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