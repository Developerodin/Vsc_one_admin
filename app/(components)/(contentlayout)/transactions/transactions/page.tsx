"use client"
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import DataTable from '@/shared/components/DataTable'
import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css"

const Transactions = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const StatusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
        { value: 'failed', label: 'Failed' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const TypeOptions = [
        { value: 'commission', label: 'Commission' },
        { value: 'payout', label: 'Payout' },
        { value: 'refund', label: 'Refund' }
    ];

    const headers = [
        { key: 'srNo', label: 'Sr No.' },
        { key: 'agentName', label: 'Agent Name' },
        { key: 'type', label: 'Type' },
        { key: 'amount', label: 'Amount' },
        { key: 'status', label: 'Status' },
        { key: 'date', label: 'Date' },
        { key: 'transactionId', label: 'Transaction ID' },
        { key: 'actions', label: 'Actions' }
    ];

    const tableData = [
        {
            srNo: 1,
            agentName: 'John Smith',
            type: 'Commission',
            amount: '$1,500.00',
            status: 'Completed',
            date: '24 May 2024',
            transactionId: 'TRX-001',
            actions: [
                {
                    icon: 'ri-download-2-line',
                    className: 'ti-btn-success',
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
            agentName: 'Sarah Johnson',
            type: 'Payout',
            amount: '$2,300.00',
            status: 'Pending',
            date: '23 May 2024',
            transactionId: 'TRX-002',
            actions: [
                {
                    icon: 'ri-download-2-line',
                    className: 'ti-btn-success',
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
            agentName: 'Michael Brown',
            type: 'Refund',
            amount: '$750.00',
            status: 'Failed',
            date: '22 May 2024',
            transactionId: 'TRX-003',
            actions: [
                {
                    icon: 'ri-download-2-line',
                    className: 'ti-btn-success',
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
            agentName: 'Emily Davis',
            type: 'Commission',
            amount: '$1,800.00',
            status: 'Cancelled',
            date: '21 May 2024',
            transactionId: 'TRX-004',
            actions: [
                {
                    icon: 'ri-download-2-line',
                    className: 'ti-btn-success',
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
            agentName: 'David Wilson',
            type: 'Payout',
            amount: '$3,200.00',
            status: 'Completed',
            date: '20 May 2024',
            transactionId: 'TRX-005',
            actions: [
                {
                    icon: 'ri-download-2-line',
                    className: 'ti-btn-success',
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
            agentName: 'Lisa Anderson',
            type: 'Refund',
            amount: '$950.00',
            status: 'Pending',
            date: '19 May 2024',
            transactionId: 'TRX-006',
            actions: [
                {
                    icon: 'ri-download-2-line',
                    className: 'ti-btn-success',
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
            agentName: 'Robert Taylor',
            type: 'Commission',
            amount: '$2,100.00',
            status: 'Completed',
            date: '18 May 2024',
            transactionId: 'TRX-007',
            actions: [
                {
                    icon: 'ri-download-2-line',
                    className: 'ti-btn-success',
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
            agentName: 'Jennifer Martinez',
            type: 'Payout',
            amount: '$1,750.00',
            status: 'Failed',
            date: '17 May 2024',
            transactionId: 'TRX-008',
            actions: [
                {
                    icon: 'ri-download-2-line',
                    className: 'ti-btn-success',
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
            agentName: 'James Thompson',
            type: 'Refund',
            amount: '$1,200.00',
            status: 'Cancelled',
            date: '16 May 2024',
            transactionId: 'TRX-009',
            actions: [
                {
                    icon: 'ri-download-2-line',
                    className: 'ti-btn-success',
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
            agentName: 'Patricia Garcia',
            type: 'Commission',
            amount: '$2,500.00',
            status: 'Completed',
            date: '15 May 2024',
            transactionId: 'TRX-010',
            actions: [
                {
                    icon: 'ri-download-2-line',
                    className: 'ti-btn-success',
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
            <Seo title={"Transactions"} />
            <Pageheader currentpage="Transactions" activepage="Transactions" mainpage="Transactions" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Transactions List</h5>
                            <div className="flex">
                                <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]" data-hs-overlay="#create-transaction">
                                    <i className="ri-add-line font-semibold align-middle"></i> Create Transaction
                                </button>
                                <div id="create-transaction" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
                                        <div className="ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title" id="staticBackdropLabel2">Add Transaction</h6>
                                                <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#create-transaction">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="ti-modal-body">
                                                <div className="grid grid-cols-12 gap-2">
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="agent-name" className="form-label">Agent Name</label>
                                                        <input type="text" className="form-control" id="agent-name" placeholder="Enter Agent Name" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="form-label">Type</label>
                                                        <Select
                                                            id="type-select"
                                                            name="type"
                                                            options={TypeOptions}
                                                            className=""
                                                            menuPlacement='auto'
                                                            classNamePrefix="Select2"
                                                            placeholder="Select Type"
                                                            defaultValue={TypeOptions[0]}
                                                        />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="amount" className="form-label">Amount</label>
                                                        <input type="text" className="form-control" id="amount" placeholder="Enter Amount" />
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
                                                        <label className="form-label">Date</label>
                                                        <div className="form-group">
                                                            <div className="input-group !flex-nowrap">
                                                                <div className="input-group-text text-muted"> <i className="ri-calendar-line"></i> </div>
                                                                <DatePicker
                                                                    selected={startDate}
                                                                    onChange={handleDateChange}
                                                                    dateFormat="dd MMM yyyy"
                                                                    placeholderText='Choose date'
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="transaction-id" className="form-label">Transaction ID</label>
                                                        <input type="text" className="form-control" id="transaction-id" placeholder="Enter Transaction ID" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ti-modal-footer">
                                                <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-light" data-hs-overlay="#create-transaction">
                                                    Cancel
                                                </button>
                                                <Link className="ti-btn ti-btn-primary-full" href="#!" scroll={false}>
                                                    Add Transaction
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

export default Transactions 