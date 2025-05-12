"use client"
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import React, { Fragment } from 'react'
import Link from 'next/link'

const LeadTimeline = () => {
    return (
        <Fragment>
            <Seo title={"Lead Tracking"} />
            <Pageheader currentpage="Lead Tracking" activepage="Leads" mainpage="Tracking" />
            <div className="container">
                <div className="box">
                    <div className="box-header">
                        <h5 className="box-title">Lead Status Tracking</h5>
                        <div className="flex">
                            <Link href="/leads/leads" className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]">
                                <i className="ri-arrow-left-line font-semibold align-middle"></i> Back to Leads
                            </Link>
                        </div>
                    </div>
                    <div className="box-body">
                        <ul className="timeline list-none text-[0.813rem] text-defaulttextcolor">
                            <li>
                                <div className="timeline-time text-end">
                                    <span className="date">TODAY</span>
                                    <span className="time inline-block">10:30</span>
                                </div>
                                <div className="timeline-icon">
                                    <a aria-label="anchor" href="#!"></a>
                                </div>
                                <div className="timeline-body">
                                    <div className="flex items-start timeline-main-content flex-wrap mt-0">
                                        <div className="avatar avatar-md online me-3 avatar-rounded md:mt-0 mt-6">
                                            <img alt="avatar" src="../../assets/images/faces/4.jpg"/>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center">
                                                <div className="sm:mt-0 mt-2">
                                                    <p className="mb-0 text-[.875rem] font-semibold">John Smith</p>
                                                    <p className="mb-0 text-[#8c9097] dark:text-white/50">Lead status changed to <span className="badge bg-success/10 text-success font-semibold mx-1">Qualified</span></p>
                                                </div>
                                                <div className="ms-auto">
                                                    <span className="ltr:float-right rtl:float-left badge !bg-light text-[#8c9097] dark:text-white/50 timeline-badge whitespace-nowrap">
                                                        Today, 10:30 AM
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="timeline-time text-end">
                                    <span className="date">YESTERDAY</span>
                                    <span className="time inline-block">15:45</span>
                                </div>
                                <div className="timeline-icon">
                                    <a aria-label="anchor" href="#!"></a>
                                </div>
                                <div className="timeline-body">
                                    <div className="flex items-start timeline-main-content flex-wrap mt-0">
                                        <div className="avatar avatar-md online me-3 avatar-rounded md:mt-0 mt-6">
                                            <img alt="avatar" src="../../assets/images/faces/15.jpg"/>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center">
                                                <div className="sm:mt-0 mt-2">
                                                    <p className="mb-0 text-[.875rem] font-semibold">John Smith</p>
                                                    <p className="mb-0 text-[#8c9097] dark:text-white/50">Lead status changed to <span className="badge bg-info/10 text-info font-semibold mx-1">Follow Up</span></p>
                                                </div>
                                                <div className="ms-auto">
                                                    <span className="ltr:float-right rtl:float-left badge !bg-light text-[#8c9097] dark:text-white/50 timeline-badge whitespace-nowrap">
                                                        Yesterday, 3:45 PM
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="timeline-time text-end">
                                    <span className="date">2 DAYS AGO</span>
                                    <span className="time inline-block">09:15</span>
                                </div>
                                <div className="timeline-icon">
                                    <a aria-label="anchor" href="#!"></a>
                                </div>
                                <div className="timeline-body">
                                    <div className="flex items-start timeline-main-content flex-wrap mt-0">
                                        <div className="avatar avatar-md online me-3 avatar-rounded md:mt-0 mt-6">
                                            <img alt="avatar" src="../../assets/images/faces/11.jpg"/>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center">
                                                <div className="sm:mt-0 mt-2">
                                                    <p className="mb-0 text-[.875rem] font-semibold">John Smith</p>
                                                    <p className="mb-0 text-[#8c9097] dark:text-white/50">Lead status changed to <span className="badge bg-warning/10 text-warning font-semibold mx-1">Interested</span></p>
                                                </div>
                                                <div className="ms-auto">
                                                    <span className="ltr:float-right rtl:float-left badge !bg-light text-[#8c9097] dark:text-white/50 timeline-badge whitespace-nowrap">
                                                        2 days ago, 9:15 AM
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="timeline-time text-end">
                                    <span className="date">3 DAYS AGO</span>
                                    <span className="time inline-block">14:20</span>
                                </div>
                                <div className="timeline-icon">
                                    <a aria-label="anchor" href="#!"></a>
                                </div>
                                <div className="timeline-body">
                                    <div className="flex items-start timeline-main-content flex-wrap mt-0">
                                        <div className="avatar avatar-md online me-3 avatar-rounded md:mt-0 mt-6">
                                            <img alt="avatar" src="../../assets/images/faces/5.jpg"/>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center">
                                                <div className="sm:mt-0 mt-2">
                                                    <p className="mb-0 text-[.875rem] font-semibold">John Smith</p>
                                                    <p className="mb-0 text-[#8c9097] dark:text-white/50">Lead status changed to <span className="badge bg-primary/10 text-primary font-semibold mx-1">Contacted</span></p>
                                                </div>
                                                <div className="ms-auto">
                                                    <span className="ltr:float-right rtl:float-left badge !bg-light text-[#8c9097] dark:text-white/50 timeline-badge whitespace-nowrap">
                                                        3 days ago, 2:20 PM
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="timeline-time text-end">
                                    <span className="date">4 DAYS AGO</span>
                                    <span className="time inline-block">11:00</span>
                                </div>
                                <div className="timeline-icon">
                                    <a aria-label="anchor" href="#!"></a>
                                </div>
                                <div className="timeline-body">
                                    <div className="flex items-start timeline-main-content flex-wrap mt-0">
                                        <div className="avatar avatar-md online me-3 avatar-rounded md:mt-0 mt-6">
                                            <img alt="avatar" src="../../assets/images/faces/5.jpg"/>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center">
                                                <div className="sm:mt-0 mt-2">
                                                    <p className="mb-0 text-[.875rem] font-semibold">John Smith</p>
                                                    <p className="mb-0 text-[#8c9097] dark:text-white/50">Lead status changed to <span className="badge bg-secondary/10 text-secondary font-semibold mx-1">New</span></p>
                                                </div>
                                                <div className="ms-auto">
                                                    <span className="ltr:float-right rtl:float-left badge !bg-light text-[#8c9097] dark:text-white/50 timeline-badge whitespace-nowrap">
                                                        4 days ago, 11:00 AM
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="timeline-loadmore-container text-center mt-4">
                            <button type="button" className="ti-btn ti-btn-info ti-btn-loader">
                                Load More
                                <span className="ti-spinner !h-4 !w-4" role="status"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default LeadTimeline 