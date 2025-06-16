"use client"
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import DataTable from '@/shared/components/DataTable'
import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { Base_url } from '@/app/api/config/BaseUrl'
import ConfirmModal from "@/app/shared/components/ConfirmModal"
import * as XLSX from 'xlsx'
import ProtectedRoute from "@/shared/components/ProtectedRoute"

interface WithdrawalData {
    id: string;
    agent: string;
    agentName: string;
    amount: number;
    status: string;
    createdAt: string;
    commissions: string[];
    actions: Array<{
        icon: string;
        className: string;
        onClick?: () => void;
    }>;
}

const Withdrawal = () => {
    const [loading, setLoading] = useState(false);
    const [withdrawals, setWithdrawals] = useState<WithdrawalData[]>([]);
    const [filteredWithdrawals, setFilteredWithdrawals] = useState<WithdrawalData[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedWithdrawalId, setSelectedWithdrawalId] = useState<string | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteSelectedLoading, setDeleteSelectedLoading] = useState(false);
    const [sortKey, setSortKey] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
    const [adminNote, setAdminNote] = useState('');
    const [rejectReason, setRejectReason] = useState('');

    useEffect(() => {
        fetchWithdrawals();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredWithdrawals(withdrawals);
            setTotalResults(withdrawals.length);
            setTotalPages(Math.ceil(withdrawals.length / itemsPerPage));
        } else {
            const filtered = withdrawals.filter(withdrawal => {
                const withdrawalStatus = withdrawal.status.toLowerCase();
                const withdrawalAmount = withdrawal.amount.toString();
                const agentName = withdrawal.agentName.toLowerCase();
                const searchLower = searchQuery.toLowerCase();
                
                return withdrawalStatus.includes(searchLower) || 
                       withdrawalAmount.includes(searchLower) ||
                       agentName.includes(searchLower);
            });
            setFilteredWithdrawals(filtered);
            setTotalResults(filtered.length);
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        }
        setCurrentPage(1);
    }, [searchQuery]);

    const fetchAgentName = async (agentId: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}users/${agentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.data || !response.data.name) {
                return null;
            }
            return response.data.name;
        } catch (error) {
            console.error('Error fetching agent name:', error);
            return null;
        }
    };

    const fetchWithdrawals = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}withdrawal-requests?limit=${itemsPerPage}&page=${currentPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const withdrawalsWithAgentNames = await Promise.all(
                response.data.results.map(async (withdrawal: any) => {
                    const agentName = await fetchAgentName(withdrawal.agent);
                    if (!agentName) {
                        return null;
                    }
                    return {
                        id: withdrawal.id,
                        agent: withdrawal.agent,
                        agentName: agentName,
                        amount: withdrawal.amount,
                        status: withdrawal.status,
                        createdAt: new Date(withdrawal.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        }),
                        commissions: withdrawal.commissions,
                        actions: [
                            {
                                icon: 'ri-check-line',
                                className: 'ti-btn-success',
                                onClick: () => handleAction(withdrawal.id, 'approve')
                            },
                            {
                                icon: 'ri-close-line',
                                className: 'ti-btn-danger',
                                onClick: () => handleAction(withdrawal.id, 'reject')
                            }
                        ]
                    };
                })
            );

            const validWithdrawals = withdrawalsWithAgentNames.filter(withdrawal => withdrawal !== null);
            
            setWithdrawals(validWithdrawals);
            setFilteredWithdrawals(validWithdrawals);
            setTotalPages(Math.ceil(validWithdrawals.length / itemsPerPage));
            setTotalResults(validWithdrawals.length);
        } catch (error) {
            console.error('Error fetching withdrawals:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = (withdrawalId: string, type: 'approve' | 'reject') => {
        setSelectedWithdrawalId(withdrawalId);
        setActionType(type);
        setDeleteModalOpen(true);
    };

    const confirmAction = async () => {
        if (!selectedWithdrawalId || !actionType) return;
        
        try {
            setDeleteLoading(true);
            const token = localStorage.getItem('token');
            const endpoint = `${Base_url}withdrawal-requests/${selectedWithdrawalId}/${actionType}`;
            const body = actionType === 'approve' 
                ? { adminNote: adminNote || 'Request approved' }
                : { reason: rejectReason || 'Request rejected' };

            await axios.patch(endpoint, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            fetchWithdrawals();
            setDeleteModalOpen(false);
            setAdminNote('');
            setRejectReason('');
        } catch (error) {
            console.error(`Error ${actionType}ing withdrawal:`, error);
        } finally {
            setDeleteLoading(false);
            setSelectedWithdrawalId(null);
            setActionType(null);
        }
    };

    const handleSort = (key: string, direction: 'asc' | 'desc') => {
        setSortKey(key);
        setSortDirection(direction);
        
        const sortedData = [...filteredWithdrawals].sort((a, b) => {
            let valueA = a[key];
            let valueB = b[key];

            if (React.isValidElement(valueA)) {
                valueA = valueA.props.children;
            }
            if (React.isValidElement(valueB)) {
                valueB = valueB.props.children;
            }

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return direction === 'asc' 
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return direction === 'asc' 
                    ? valueA - valueB
                    : valueB - valueA;
            }

            return 0;
        });

        setFilteredWithdrawals(sortedData);
    };

    const handleExport = () => {
        const dataToExport = selectedIds.length > 0
            ? withdrawals.filter(withdrawal => selectedIds.includes(withdrawal.id))
            : withdrawals;

        const exportData = dataToExport.map(withdrawal => ({
            'Agent': withdrawal.agentName,
            'Amount': withdrawal.amount,
            'Status': withdrawal.status,
            'Created At': withdrawal.createdAt
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Withdrawals');
        XLSX.writeFile(wb, 'withdrawals.xlsx');
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const headers = [
        { key: 'agentName', label: 'Agent', sortable: true },
        { key: 'amount', label: 'Amount', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'createdAt', label: 'Created At', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    return (
        <Fragment>
            <Seo title={"Withdrawals"} />
            <Pageheader currentpage="Withdrawals" activepage="Withdrawals" mainpage="Withdrawals" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Withdrawal Requests</h5>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    className="ti-btn ti-btn-primary"
                                    onClick={handleExport}
                                    disabled={selectedIds.length === 0}
                                >
                                    <i className="ri-download-2-line me-2"></i> Export
                                </button>
                            </div>
                        </div>
                        <div className="box-body">
                            <DataTable 
                                headers={headers} 
                                data={filteredWithdrawals}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => {
                                    setCurrentPage(page);
                                }}
                                totalItems={totalResults}
                                itemsPerPage={itemsPerPage}
                                onItemsPerPageChange={(size) => {
                                    setItemsPerPage(size);
                                    setCurrentPage(1);
                                }}
                                onSearch={handleSearch}
                                searchQuery={searchQuery}
                                showCheckbox={true}
                                selectedIds={selectedIds}
                                onSelectionChange={setSelectedIds}
                                idField="id"
                                onSort={handleSort}
                                sortKey={sortKey}
                                sortDirection={sortDirection}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setActionType(null);
                    setAdminNote('');
                    setRejectReason('');
                }}
                onConfirm={confirmAction}
                title={`${actionType === 'approve' ? 'Approve' : 'Reject'} Withdrawal`}
                message={
                    <div className="mt-4">
                        <p className="mb-4">Are you sure you want to {actionType} this withdrawal request?</p>
                        {actionType === 'approve' ? (
                            <div className="form-group">
                                <label className="form-label">Admin Note</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={adminNote}
                                    onChange={(e) => setAdminNote(e.target.value)}
                                    placeholder="Enter admin note"
                                />
                            </div>
                        ) : (
                            <div className="form-group">
                                <label className="form-label">Rejection Reason</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Enter rejection reason"
                                />
                            </div>
                        )}
                    </div>
                }
                loading={deleteLoading}
            />
        </Fragment>
    )
}

export default function ProtectedWithdrawal() {
    return (
        <ProtectedRoute>
            <Withdrawal />
        </ProtectedRoute>
    )
} 