"use client"
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import DataTable from '@/shared/components/DataTable'
import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css"

const Users = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const StatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
    ];

    const KycStatusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'verified', label: 'Verified' },
        { value: 'rejected', label: 'Rejected' }
    ];

    const OnboardingStatusOptions = [
        { value: 'completed', label: 'Completed' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'not_started', label: 'Not Started' }
    ];

    const headers = [
        { key: 'srNo', label: 'Sr No.' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'kycStatus', label: 'KYC Status' },
        { key: 'status', label: 'Status' },
        { key: 'totalCommission', label: 'Total Commission' },
        { key: 'totalLeads', label: 'Total Leads' },
        { key: 'onboardingStatus', label: 'Onboarding Status' },
        { key: 'address', label: 'Address' },
        { key: 'actions', label: 'Actions' }
    ];

    const tableData = [
        {
            srNo: 1,
            name: 'John Smith',
            email: 'john.smith@example.com',
            kycStatus: 'Verified',
            status: 'Active',
            totalCommission: '$2,500',
            totalLeads: '45',
            onboardingStatus: 'Completed',
            address: '123 Main St, New York, NY',
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
        },
        {
            srNo: 2,
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            kycStatus: 'Pending',
            status: 'Active',
            totalCommission: '$1,800',
            totalLeads: '32',
            onboardingStatus: 'In Progress',
            address: '456 Park Ave, Boston, MA',
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
        },
        {
            srNo: 3,
            name: 'Michael Brown',
            email: 'michael.b@example.com',
            kycStatus: 'Rejected',
            status: 'Inactive',
            totalCommission: '$950',
            totalLeads: '15',
            onboardingStatus: 'Not Started',
            address: '789 Oak St, Chicago, IL',
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
        },
        {
            srNo: 4,
            name: 'Emily Davis',
            email: 'emily.d@example.com',
            kycStatus: 'Verified',
            status: 'Active',
            totalCommission: '$3,200',
            totalLeads: '58',
            onboardingStatus: 'Completed',
            address: '321 Pine Rd, San Francisco, CA',
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
        },
        {
            srNo: 5,
            name: 'David Wilson',
            email: 'david.w@example.com',
            kycStatus: 'Pending',
            status: 'Active',
            totalCommission: '$1,500',
            totalLeads: '28',
            onboardingStatus: 'In Progress',
            address: '654 Maple Dr, Seattle, WA',
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
        },
        {
            srNo: 6,
            name: 'Lisa Anderson',
            email: 'lisa.a@example.com',
            kycStatus: 'Verified',
            status: 'Active',
            totalCommission: '$4,100',
            totalLeads: '72',
            onboardingStatus: 'Completed',
            address: '987 Cedar Ln, Miami, FL',
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
        },
        {
            srNo: 7,
            name: 'Robert Taylor',
            email: 'robert.t@example.com',
            kycStatus: 'Rejected',
            status: 'Inactive',
            totalCommission: '$800',
            totalLeads: '12',
            onboardingStatus: 'Not Started',
            address: '147 Elm St, Denver, CO',
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
        },
        {
            srNo: 8,
            name: 'Jennifer Martinez',
            email: 'jennifer.m@example.com',
            kycStatus: 'Verified',
            status: 'Active',
            totalCommission: '$2,800',
            totalLeads: '49',
            onboardingStatus: 'Completed',
            address: '258 Birch Ave, Austin, TX',
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
        },
        {
            srNo: 9,
            name: 'James Thompson',
            email: 'james.t@example.com',
            kycStatus: 'Pending',
            status: 'Active',
            totalCommission: '$1,200',
            totalLeads: '22',
            onboardingStatus: 'In Progress',
            address: '369 Spruce St, Portland, OR',
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
        },
        {
            srNo: 10,
            name: 'Patricia Garcia',
            email: 'patricia.g@example.com',
            kycStatus: 'Verified',
            status: 'Active',
            totalCommission: '$3,500',
            totalLeads: '63',
            onboardingStatus: 'Completed',
            address: '741 Walnut Rd, Phoenix, AZ',
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
        }
    ];

    return (
        <Fragment>
            <Seo title={"Users"} />
            <Pageheader currentpage="Users" activepage="Users" mainpage="Users" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Users List</h5>
                            <div className="flex">
                                <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]" data-hs-overlay="#create-user">
                                    <i className="ri-add-line font-semibold align-middle"></i> Create User
                                </button>
                                <div id="create-user" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
                                        <div className="ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title" id="staticBackdropLabel2">Add User</h6>
                                                <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#create-user">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="ti-modal-body">
                                                <div className="grid grid-cols-12 gap-2">
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="user-name" className="form-label">Name</label>
                                                        <input type="text" className="form-control" id="user-name" placeholder="Enter Name" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="user-email" className="form-label">Email</label>
                                                        <input type="email" className="form-control" id="user-email" placeholder="Enter Email" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="form-label">KYC Status</label>
                                                        <Select
                                                            id="kyc-status-select"
                                                            name="kycStatus"
                                                            options={KycStatusOptions}
                                                            className=""
                                                            menuPlacement='auto'
                                                            classNamePrefix="Select2"
                                                            placeholder="Select KYC Status"
                                                            defaultValue={KycStatusOptions[0]}
                                                        />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="form-label">Status</label>
                                                        <Select
                                                            id="status-select"
                                                            name="status"
                                                            options={StatusOptions}
                                                            className=""
                                                            menuPlacement='auto'
                                                            classNamePrefix="Select2"
                                                            placeholder="Select Status"
                                                            defaultValue={StatusOptions[0]}
                                                        />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="total-commission" className="form-label">Total Commission</label>
                                                        <input type="text" className="form-control" id="total-commission" placeholder="Enter Total Commission" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="total-leads" className="form-label">Total Leads</label>
                                                        <input type="number" className="form-control" id="total-leads" placeholder="Enter Total Leads" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="form-label">Onboarding Status</label>
                                                        <Select
                                                            id="onboarding-status-select"
                                                            name="onboardingStatus"
                                                            options={OnboardingStatusOptions}
                                                            className=""
                                                            menuPlacement='auto'
                                                            classNamePrefix="Select2"
                                                            placeholder="Select Onboarding Status"
                                                            defaultValue={OnboardingStatusOptions[0]}
                                                        />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="address" className="form-label">Address</label>
                                                        <textarea className="form-control" id="address" rows={3} placeholder="Enter Address"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ti-modal-footer">
                                                <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-light" data-hs-overlay="#create-user">
                                                    Cancel
                                                </button>
                                                <Link className="ti-btn ti-btn-primary-full" href="#!" scroll={false}>
                                                    Add User
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <DataTable headers={headers} data={tableData} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Users 