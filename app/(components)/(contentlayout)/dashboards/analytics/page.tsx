"use client"
import { Visitorsbychannel } from '@/shared/data/dashboards/analyticsdata'
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import Link from 'next/link'
import React, { Fragment, useState, useEffect } from 'react'
import * as Analyticsdata from "@/shared/data/dashboards/analyticsdata";
import axios from 'axios'
import { Base_url } from '@/app/api/config/BaseUrl'
import dynamic from "next/dynamic";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DashboardStats {
    leads: {
        total: number;
        byStatus: {
            new: number;
            interested: number;
            contacted: number;
            closed: number;
        };
    };
    summary: {
        totalLeads: number;
        totalUsers: number;
        totalProducts: number;
        totalCategories: number;
        totalTransactions: number;
        totalAmount: number;
    };
}

const Analytics = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}dashboard/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Seo title={"Analytics"} />
            <Pageheader currentpage="Analytics" activepage="Dashboards" mainpage="Analytics" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-7 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <div className="flex flex-wrap items-center justify-between">
                                        <div>
                                            <h6 className="font-semibold mb-3 text-[1rem]">Total Users</h6>
                                            <span className="text-[1.5625rem] font-semibold">
                                                {loading ? 'Loading...' : stats?.summary.totalUsers || 0}
                                            </span>
                                        </div>
                                        <div id="analytics-users">
                                            <span className="avatar avatar-md bg-primary text-white">
                                                <i className="ri-user-3-line"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h6 className="font-semibold mb-3 text-[1rem]">Total Leads</h6>
                                            <span className="text-[1.5625rem] font-semibold">
                                                {loading ? 'Loading...' : stats?.summary.totalLeads || 0}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="avatar avatar-md bg-secondary text-white">
                                                <i className="ri-user-3-line"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h6 className="font-semibold mb-3 text-[1rem]">Total Categories</h6>
                                            <span className="text-[1.5625rem] font-semibold">
                                                {loading ? 'Loading...' : stats?.summary.totalCategories || 0}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="avatar avatar-md bg-success text-white">
                                                <i className="ri-folder-line"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-header justify-between">
                                    <div className="box-title">
                                        Audience Report
                                    </div>
                                    <div>
                                        <button type="button" className="ti-btn ti-btn-primary ti-btn-wave !font-medium"><i className="ri-share-forward-line me-1 align-middle inline-block"></i>Export</button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div id="audienceReport">
                                        <ReactApexChart options={Analyticsdata.AudienceReport.options} series={Analyticsdata.AudienceReport.series} type="line" width={"100%"} height={257} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-header justify-between">
                                    <div className="box-title">
                                        Top Countries Sessions vs Bounce Rate
                                    </div>
                                    <div className="hs-dropdown ti-dropdown">
                                        <Link href="#!" scroll={false} className="px-2 font-normal text-[0.75rem] text-[#8c9097] dark:text-white/50"
                                            aria-expanded="false">
                                            View All<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                        </Link>
                                        <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                            <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                href="#!" scroll={false}>Today</Link></li>
                                            <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                href="#!" scroll={false}>This Week</Link></li>
                                            <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                href="#!" scroll={false}>Last Week</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div id="country-sessions">
                                        <ReactApexChart options={Analyticsdata.Countries.options} series={Analyticsdata.Countries.series} type="line" width={"100%"} height={330} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
                            <div className="box overflow-hidden">
                                <div className="box-header justify-between">
                                    <div className="box-title">
                                        Traffic Sources
                                    </div>
                                    <div className="hs-dropdown ti-dropdown">
                                        <Link href="#!" scroll={false} className="px-2 font-normal text-[0.75rem] text-[#8c9097] dark:text-white/50"
                                            aria-expanded="false">
                                            View All<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                        </Link>
                                        <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                            <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                href="#!" scroll={false}>Today</Link></li>
                                            <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                href="#!" scroll={false}>This Week</Link></li>
                                            <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                href="#!" scroll={false}>Last Week</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <div className="table-responsive">
                                        <table className="table table-hover whitespace-nowrap min-w-full">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="text-start">Browser</th>
                                                    <th scope="col" className="text-start">Sessions</th>
                                                    <th scope="col" className="text-start">Traffic</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-t border-inherit border-solid hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10">
                                                    <td>
                                                        <div className="flex items-center">
                                                            <span className="avatar avatar-rounded avatar-sm p-2 bg-light me-2">
                                                                <i className="ri-google-fill text-[1.125rem] text-primary"></i>
                                                            </span>
                                                            <div className="font-semibold">Google</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span><i className="ri-arrow-up-s-fill me-1 text-success align-middle text-[1.125rem]"></i>23,379</span>
                                                    </td>
                                                    <td>
                                                        <div className="progress progress-xs">
                                                            <div className="progress-bar bg-primary w-[78%]" role="progressbar" aria-valuenow={78} aria-valuemin={0} aria-valuemax={100}>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-inherit border-solid hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10">
                                                    <td>
                                                        <div className="flex items-center">
                                                            <span className="avatar avatar-rounded avatar-sm p-2 bg-light me-2">
                                                                <i className="ri-safari-line text-[1.125rem] text-secondary"></i>
                                                            </span>
                                                            <div className="font-semibold">Safari</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span><i className="ri-arrow-up-s-fill me-1 text-success align-middle text-[1.125rem]"></i>78,973</span>
                                                    </td>
                                                    <td>
                                                        <div className="progress progress-xs">
                                                            <div className="progress-bar bg-primary w-[32%]" role="progressbar" aria-valuenow={32} aria-valuemin={0} aria-valuemax={100}>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-inherit border-solid hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10">
                                                    <td>
                                                        <div className="flex items-center">
                                                            <span className="avatar avatar-rounded avatar-sm p-2 bg-light me-2">
                                                                <i className="ri-opera-fill text-[1.125rem] text-success"></i>
                                                            </span>
                                                            <div className="font-semibold">Opera</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span><i className="ri-arrow-down-s-fill me-1 text-danger align-middle text-[1.125rem]"></i>12,457</span>
                                                    </td>
                                                    <td>
                                                        <div className="progress progress-xs">
                                                            <div className="progress-bar bg-primary w-[21%]" role="progressbar" aria-valuenow={21} aria-valuemin={0} aria-valuemax={100}>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-inherit border-solid hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10">
                                                    <td>
                                                        <div className="flex items-center">
                                                            <span className="avatar avatar-rounded avatar-sm p-2 bg-light me-2">
                                                                <i className="ri-edge-fill text-[1.125rem] text-info"></i>
                                                            </span>
                                                            <div className="font-semibold">Edge</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span><i className="ri-arrow-up-s-fill me-1 text-success align-middle text-[1.125rem]"></i>8,570</span>
                                                    </td>
                                                    <td>
                                                        <div className="progress progress-xs">
                                                            <div className="progress-bar bg-primary w-1/4" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-inherit border-solid hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10">
                                                    <td>
                                                        <div className="flex items-center">
                                                            <span className="avatar avatar-rounded avatar-sm p-2 bg-light me-2">
                                                                <i className="ri-firefox-fill text-[1.125rem] text-warning"></i>
                                                            </span>
                                                            <div className="font-semibold">Firefox</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span><i className="ri-arrow-down-s-fill me-1 text-danger align-middle text-[1.125rem]"></i>6,135</span>
                                                    </td>
                                                    <td>
                                                        <div className="progress progress-xs">
                                                            <div className="progress-bar bg-primary w-[35%]" role="progressbar" aria-valuenow={35} aria-valuemin={0} aria-valuemax={100}>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-inherit border-solid hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10">
                                                    <td className="border-bottom-0">
                                                        <div className="flex items-center">
                                                            <span className="avatar avatar-rounded avatar-sm p-2 bg-light me-2">
                                                                <i className="ri-ubuntu-fill text-[1.125rem] text-danger"></i>
                                                            </span>
                                                            <div className="font-semibold">Ubuntu</div>
                                                        </div>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <span><i className="ri-arrow-up-s-fill me-1 text-success align-middle text-[1.125rem]"></i>4,789</span>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <div className="progress progress-xs">
                                                            <div className="progress-bar bg-primary w-[12%]" role="progressbar" aria-valuenow={12} aria-valuemin={0} aria-valuemax={100}>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-5 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-header justify-between">
                                    <div className="box-title">
                                        Sessions By Device
                                    </div>
                                    <div>
                                        <button type="button" className="ti-btn ti-btn-primary 1 !text-[0.85rem] !m-0 !font-medium">View All</button>
                                    </div>
                                </div>
                                <div className="box-body !my-2 !py-6 !px-2">
                                    <div id="sessions">
                                        <ReactApexChart options={Analyticsdata.Sessionbydevice.options} series={Analyticsdata.Sessionbydevice.series} type="donut" width={"100%"} height={250} />
                                    </div>
                                </div>
                                <div className="box-footer !p-0">
                                    <div className="grid grid-cols-12 justify-center">
                                        <div className="col-span-3 pe-0 text-center">
                                            <div className="sm:p-4  p-2 ">
                                                <span className="text-[#8c9097] dark:text-white/50 text-[0.6875rem]">Mobile</span>
                                                <span className="block text-[1rem] font-semibold">68.3%</span>
                                            </div>
                                        </div>
                                        <div className="col-span-3 px-0 text-center">
                                            <div className="sm:p-4 p-2">
                                                <span className="text-[#8c9097] dark:text-white/50 text-[0.6875rem]">Tablet</span>
                                                <span className="block text-[1rem] font-semibold">17.68%</span>
                                            </div>
                                        </div>
                                        <div className="col-span-3 px-0 text-center">
                                            <div className="sm:p-4 p-2 ">
                                                <span className="text-[#8c9097] dark:text-white/50 text-[0.6875rem]">Desktop</span>
                                                <span className="block text-[1rem] font-semibold">10.5%</span>
                                            </div>
                                        </div>
                                        <div className="col-span-3 px-0 text-center">
                                            <div className="sm:p-4 p-2">
                                                <span className="text-[#8c9097] dark:text-white/50 text-[0.6875rem]">Others</span>
                                                <span className="block text-[1rem] font-semibold">5.16%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-header justify-between">
                                    <div className="box-title">Sessions Duration By New Users</div>
                                    <div className="hs-dropdown ti-dropdown">
                                        <Link href="#!" scroll={false} className="px-2 font-normal text-[0.75rem] text-[#8c9097] dark:text-white/50"
                                            aria-expanded="false">
                                            View All<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                        </Link>
                                        <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                            <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                href="#!" scroll={false}>Today</Link></li>
                                            <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                href="#!" scroll={false}>This Week</Link></li>
                                            <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                href="#!" scroll={false}>Last Week</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div id="session-users">
                                        <ReactApexChart options={Analyticsdata.Sessionduration.options} series={Analyticsdata.Sessionduration.series} type="line" width={"100%"} height={425} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-9 col-span-12">
                    <div className="box">
                        <div className="box-header justify-between">
                            <div className="box-title">
                                Visitors By Channel Report
                            </div>
                            <div className="flex flex-wrap">
                                <div className="me-3 my-1">
                                    <input className="ti-form-control form-control-sm" type="text" placeholder="Search Here" aria-label=".form-control-sm example" />
                                </div>
                                <div className="hs-dropdown ti-dropdown my-1">
                                    <Link href="#!" scroll={false}
                                        className="ti-btn ti-btn-primary !bg-primary !text-white !py-1 !px-2 !text-[0.75rem] !m-0 !gap-0 !font-medium"
                                        aria-expanded="false">
                                        Sort By<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                    </Link>
                                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                            href="#!" scroll={false}>New</Link></li>
                                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                            href="#!" scroll={false}>Popular</Link></li>
                                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                            href="#!" scroll={false}>Relevant</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="table-responsive">
                                <table className="table table-hover whitespace-nowrap table-bordered min-w-full">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-start">S.No</th>
                                            <th scope="col" className="text-start">Channel</th>
                                            <th scope="col" className="text-start">Sessions</th>
                                            <th scope="col" className="text-start">Bounce Rate</th>
                                            <th scope="col" className="text-start">Avg Session Duration</th>
                                            <th scope="col" className="text-start">Goal Completed</th>
                                            <th scope="col" className="text-start">Pages Per Session</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Visitorsbychannel.map((idx) => (
                                            <tr className="border-t border-inherit border-solid hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10" key={Math.random()}>
                                                <th scope="row" className="!text-start">
                                                    {idx.id}
                                                </th>
                                                <td>
                                                    <div className="flex items-center">
                                                        <span className={`avatar avatar-sm !mb-0 bg-${idx.color}/10 avatar-rounded`}>
                                                            <i className={`ri-${idx.icon} text-[0.9375rem] font-semibiold text-${idx.color}`}></i>
                                                        </span>
                                                        <span className="ms-2">
                                                            {idx.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>{idx.session}</td>
                                                <td>{idx.rate}</td>
                                                <td>
                                                    {idx.avg}
                                                </td>
                                                <td>
                                                    <span className={`badge bg-${idx.color}/10 text-${idx.color}`}>{idx.goal}</span>
                                                </td>
                                                <td>
                                                    {idx.pages}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="sm:flex items-center">
                                <div className="dark:text-defaulttextcolor/70">
                                    Showing 5 Entries <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                                </div>
                                <div className="ms-auto">
                                    <nav aria-label="Page navigation" className="pagination-style-4">
                                        <ul className="ti-pagination mb-0">
                                            <li className="page-item disabled">
                                                <Link className="page-link" href="#!" scroll={false}>
                                                    Prev
                                                </Link>
                                            </li>
                                            <li className="page-item"><Link className="page-link active" href="#!" scroll={false}>1</Link></li>
                                            <li className="page-item"><Link className="page-link" href="#!" scroll={false}>2</Link></li>
                                            <li className="page-item">
                                                <Link className="page-link !text-primary" href="#!" scroll={false}>
                                                    next
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-header justify-between">
                            <div className="box-title">
                                Visitors By Countries
                            </div>
                            <div className="hs-dropdown ti-dropdown">
                                <Link href="#!" scroll={false} className="px-2 font-normal text-[0.75rem] text-[#8c9097] dark:text-white/50"
                                    aria-expanded="false">
                                    View All<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                </Link>
                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        href="#!" scroll={false}>Today</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        href="#!" scroll={false}>This Week</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        href="#!" scroll={false}>Last Week</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="box-body">
                            <ul className="list-none mb-0 analytics-visitors-countries min-w-full">
                                <li>
                                    <div className="flex items-center">
                                        <div className="leading-none">
                                            <span className="avatar avatar-sm !mb-0 text-default">
                                                <img src="../../assets/images/flags/us_flag.jpg" alt="" className="!rounded-full h-[1.75rem] w-[1.75rem]" />
                                            </span>
                                        </div>
                                        <div className="ms-4 flex-grow leading-none">
                                            <span className="text-[0.75rem]">United States</span>
                                        </div>
                                        <div>
                                            <span className="text-default badge bg-light font-semibold mt-2">32,190</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="leading-none">
                                            <span className="avatar avatar-sm !mb-0 avatar-rounded text-default">
                                                <img src="../../assets/images/flags/germany_flag.jpg" alt="" className="!rounded-full h-[1.75rem] w-[1.75rem]" />
                                            </span>
                                        </div>
                                        <div className="ms-4 flex-grow leading-none">
                                            <span className="text-[0.75rem]">Germany</span>
                                        </div>
                                        <div>
                                            <span className="text-default badge bg-light font-semibold mt-2">8,798</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="leading-none">
                                            <span className="avatar avatar-sm !mb-0 avatar-rounded text-default">
                                                <img src="../../assets/images/flags/mexico_flag.jpg" alt="" className="!rounded-full h-[1.75rem] w-[1.75rem]" />
                                            </span>
                                        </div>
                                        <div className="ms-4 flex-grow leading-none">
                                            <span className="text-[0.75rem]">Mexico</span>
                                        </div>
                                        <div>
                                            <span className="text-default badge bg-light font-semibold mt-2">16,885</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="leading-none">
                                            <span className="avatar avatar-sm !mb-0 avatar-rounded text-default">
                                                <img src="../../assets/images/flags/uae_flag.jpg" alt="" className="!rounded-full h-[1.75rem] w-[1.75rem]" />
                                            </span>
                                        </div>
                                        <div className="ms-4 flex-grow leading-none">
                                            <span className="text-[0.75rem]">Uae</span>
                                        </div>
                                        <div>
                                            <span className="text-default badge bg-light font-semibold mt-2">14,885</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="leading-none">
                                            <span className="avatar avatar-sm !mb-0 avatar-rounded text-default">
                                                <img src="../../assets/images/flags/argentina_flag.jpg" alt="" className="!rounded-full h-[1.75rem] w-[1.75rem]" />
                                            </span>
                                        </div>
                                        <div className="ms-4 flex-grow leading-none">
                                            <span className="text-[0.75rem]">Argentina</span>
                                        </div>
                                        <div>
                                            <span className="text-default badge bg-light font-semibold mt-2">17,578</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="leading-none">
                                            <span className="avatar avatar-sm !mb-0 avatar-rounded text-default">
                                                <img src="../../assets/images/flags/russia_flag.jpg" alt="" className="!rounded-full h-[1.75rem] w-[1.75rem]" />
                                            </span>
                                        </div>
                                        <div className="ms-4 flex-grow leading-none">
                                            <span className="text-[0.75rem]">Russia</span>
                                        </div>
                                        <div>
                                            <span className="text-default badge bg-light font-semibold mt-2">10,118</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="leading-none">
                                            <span className="avatar avatar-sm !mb-0 avatar-rounded text-default">
                                                <img src="../../assets/images/flags/china_flag.jpg" alt="" className="!rounded-full h-[1.75rem] w-[1.75rem]" />
                                            </span>
                                        </div>
                                        <div className="ms-4 flex-grow leading-none">
                                            <span className="text-[0.75rem]">China</span>
                                        </div>
                                        <div>
                                            <span className="text-default badge bg-light font-semibold mt-2">6,578</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="leading-none">
                                            <span className="avatar avatar-sm !mb-0 avatar-rounded text-default">
                                                <img src="../../assets/images/flags/french_flag.jpg" alt="" className="!rounded-full h-[1.75rem] w-[1.75rem]" />
                                            </span>
                                        </div>
                                        <div className="ms-4 flex-grow leading-none">
                                            <span className="text-[0.75rem]">France</span>
                                        </div>
                                        <div>
                                            <span className="text-default badge bg-light font-semibold mt-2">2,345</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="leading-none">
                                            <span className="avatar avatar-sm !mb-0 avatar-rounded text-default">
                                                <img src="../../assets/images/flags/canada_flag.jpg" alt="" className="!rounded-full h-[1.75rem] w-[1.75rem]" />
                                            </span>
                                        </div>
                                        <div className="ms-4 flex-grow leading-none">
                                            <span className="text-[0.75rem]">Canada</span>
                                        </div>
                                        <div>
                                            <span className="text-default badge bg-light font-semibold mt-2">1,678</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default function ProtectedAnalytics() {
    return (
        <ProtectedRoute>
            <Analytics />
        </ProtectedRoute>
    )
}
