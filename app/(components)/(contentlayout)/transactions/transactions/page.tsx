"use client"
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import DataTable from '@/shared/components/DataTable'
import React, { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css"
import ProtectedRoute from '@/shared/components/ProtectedRoute'
import { Base_url } from "@/app/api/config/BaseUrl";
import axios from 'axios';

interface Transaction {
    _id: string;
    type: 'commission' | 'payout' | 'refund';
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    paymentMethod: string;
    description: string;
    reference: {
        id: string;
        model: string;
    };
    bankAccount: string;
    notes: Array<{
        content: string;
        createdBy: string;
        createdAt: Date;
    }>;
    documents: Array<{
        name: string;
        url: string;
        type: string;
    }>;
    processing: {
        processedBy: string;
        processedAt: Date;
        error?: {
            code: string;
            message: string;
            details: string;
        };
    };
    metadata: {
        [key: string]: any;
    };
    createdAt: string;
}

const Transactions = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}transactions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTransactions(response.data.results);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

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
        { key: 'agentName', label: 'Agent Name' , sortable: true},
        { key: 'type', label: 'Type' , sortable: false},
        { key: 'amount', label: 'Amount' , sortable: true},
        { key: 'status', label: 'Status' , sortable: false},
        { key: 'date', label: 'Date' , sortable: false},
        { key: 'actions', label: 'Actions' , sortable: false}
    ];

    const formatTableData = (transactions: Transaction[]) => {
        return transactions.map((transaction, index) => ({
            srNo: index + 1,
            agentName: transaction.reference?.id || 'N/A',
            type: transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
            amount: `${transaction.currency} ${transaction.amount.toFixed(2)}`,
            status: transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1),
            date: new Date(transaction.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }),
            actions: [
                {
                    icon: 'ri-eye-line',
                    className: 'ti-btn-primary',
                    href: `/transactions/view/${transaction._id}`
                },
                {
                    icon: 'ri-edit-line',
                    className: 'ti-btn-info',
                    href: `/transactions/edit/${transaction._id}`
                },
                {
                    icon: 'ri-delete-bin-line',
                    className: 'ti-btn-danger',
                    href: '#',
                    onClick: () => handleDelete(transaction._id)
                }
            ]
        }));
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${Base_url}transactions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchTransactions(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting transaction:', error);
                alert('Error deleting transaction. Please try again.');
            }
        }
    };

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
                                <Link href="/transactions/create" className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]">
                                    <i className="ri-add-line font-semibold align-middle"></i> Create Transaction
                                </Link>
                            </div>
                        </div>
                        <div className="box-body">
                            {loading ? (
                                <div className="text-center py-4">Loading...</div>
                            ) : (
                                <DataTable headers={headers} data={formatTableData(transactions)} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default function ProtectedTransactions() {
    return (
        <ProtectedRoute>
            <Transactions />
        </ProtectedRoute>
    )
}
