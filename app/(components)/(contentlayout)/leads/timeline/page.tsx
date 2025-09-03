"use client"
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import React, { Fragment, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { Base_url } from '@/app/api/config/BaseUrl'
import ProtectedRoute from '@/shared/components/ProtectedRoute'

const LeadTimeline = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const leadId = searchParams.get('id');
    const [timelineData, setTimelineData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedPhase, setSelectedPhase] = useState<any>(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateForm, setUpdateForm] = useState({
        status: '',
        remark: ''
    });

    useEffect(() => {
        if (leadId) {
            fetchTimelineData();
        } else {
            router.push('/leads/leads');
        }
    }, [leadId]);

    const fetchTimelineData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Base_url}leads/${leadId}/timeline`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTimelineData(response.data);
        } catch (error) {
            console.error('Error fetching timeline data:', error);
            setError('Failed to load timeline data');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '--';
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPhaseIcon = (phase: any) => {
        if (phase.completed) return 'ri-check-line text-green-500';
        if (phase.active) return 'ri-play-circle-line text-blue-500';
        if (phase.skipped) return 'ri-skip-forward-line text-gray-400';
        return 'ri-circle-line text-gray-300';
    };

    const getPhaseStatus = (phase: any) => {
        if (phase.completed) return 'bg-green-100 text-green-800';
        if (phase.active) return 'bg-blue-100 text-blue-800';
        if (phase.skipped) return 'bg-gray-100 text-gray-600';
        return 'bg-gray-50 text-gray-500';
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'new': return 'bg-primary';
            case 'contacted': return 'bg-primary';
            case 'interested': return 'bg-primary';
            case 'qualified': return 'bg-primary';
            case 'closed': return 'bg-green-500';
            case 'lost': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    const handleUpdateStatus = (phase: any) => {
        setSelectedPhase(phase);
        setUpdateForm({
            status: phase.name.toLowerCase(),
            remark: ''
        });
        setUpdateModalOpen(true);
    };

    const convertStatusForBackend = (status: string) => {
        // Convert frontend status format to backend format
        const statusMap: { [key: string]: string } = {
            'follow_up': 'followUp',
            'not_interested': 'notInterested'
        };
        return statusMap[status] || status;
    };

    const handleStatusUpdate = async () => {
        if (!updateForm.status || !updateForm.remark.trim()) {
            alert('Please fill in all fields');
            return;
        }

        try {
            setUpdateLoading(true);
            const token = localStorage.getItem('token');
            const backendStatus = convertStatusForBackend(updateForm.status);
            
            await axios.patch(`${Base_url}leads/${leadId}/status`, {
                status: backendStatus,
                remark: updateForm.remark
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            // Refresh timeline data
            await fetchTimelineData();
            setUpdateModalOpen(false);
            setUpdateForm({ status: '', remark: '' });
            setSelectedPhase(null);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        } finally {
            setUpdateLoading(false);
        }
    };

    const getNextStatusOptions = (currentStatus: string) => {
        const statusFlow: { [key: string]: string[] } = {
            'new': ['contacted', 'not_interested'],
            'contacted': ['interested', 'not_interested', 'follow_up'],
            'interested': ['qualified', 'proposal', 'not_interested'],
            'qualified': ['proposal', 'negotiation', 'not_interested'],
            'proposal': ['negotiation', 'closed', 'not_interested'],
            'negotiation': ['closed', 'not_interested'],
            'follow_up': ['interested', 'not_interested'],
            'not_interested': [],
            'closed': [],
            'lost': []
        };

        return statusFlow[currentStatus?.toLowerCase()] || [];
    };

    const getNextSequentialStatus = (currentStatus: string) => {
        const statusOrder = ['new', 'contacted', 'interested', 'qualified', 'proposal', 'negotiation', 'closed'];
        const currentIndex = statusOrder.indexOf(currentStatus?.toLowerCase());
        
        if (currentIndex === -1 || currentIndex === statusOrder.length - 1) return null;
        
        // Return the next sequential status
        return statusOrder[currentIndex + 1];
    };

    const getCompletedPhases = (currentStatus: string) => {
        const statusOrder = ['new', 'contacted', 'interested', 'qualified', 'proposal', 'negotiation', 'closed'];
        const currentIndex = statusOrder.indexOf(currentStatus?.toLowerCase());
        
        if (currentIndex === -1) return [];
        
        // Return all phases up to and including the current status
        return statusOrder.slice(0, currentIndex + 1);
    };

    const getActivePhase = (currentStatus: string) => {
        const statusOrder = ['new', 'contacted', 'interested', 'qualified', 'proposal', 'negotiation', 'closed'];
        const currentIndex = statusOrder.indexOf(currentStatus?.toLowerCase());
        
        if (currentIndex === -1 || currentIndex === statusOrder.length - 1) return null;
        
        // Return the next phase in the sequence
        return statusOrder[currentIndex + 1];
    };

    const getSkippedPhases = (currentStatus: string) => {
        // Follow up is always skipped in the main sequence since we go directly from contacted to interested
        if (currentStatus === 'contacted' || currentStatus === 'interested' || 
            currentStatus === 'qualified' || currentStatus === 'proposal' || 
            currentStatus === 'negotiation' || currentStatus === 'closed') {
            return ['follow_up'];
        }
        return [];
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !timelineData) {
        return (
            <Fragment>
                <Seo title="Lead Timeline" />
                <Pageheader currentpage="Lead Timeline" activepage="Leads" mainpage="Timeline" />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <i className="ri-error-warning-line text-6xl text-red-500 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Error Loading Timeline</h3>
                        <p className="text-gray-500 mb-4">{error || 'Timeline not found'}</p>
                        <button 
                            onClick={() => router.push('/leads/leads')}
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                        >
                            Back to Leads
                        </button>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Seo title="Lead Timeline" />
            <Pageheader currentpage="Lead Timeline" activepage="Leads" mainpage="Timeline" />
            <div className="container">
                {/* Lead Overview */}
                <div className="box mb-6">
                    <div className="box-header">
                        <h5 className="box-title">Lead Overview</h5>
                        <div className="flex items-center gap-3">
                            <span className={`badge ${getStatusBadgeColor(timelineData.currentStatus)} text-white px-3 py-1`}>
                                {timelineData.currentStatus || '--'}
                            </span>
                            <Link href="/leads/leads" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors flex items-center gap-2">
                                <i className="ri-arrow-left-line"></i>
                                Back to Leads
                            </Link>
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Agent</label>
                                    <p className="text-sm font-semibold">{timelineData.agent?.name || '--'}</p>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Category</label>
                                    <p className="text-sm font-semibold">{timelineData.category?.name || '--'}</p>
                                </div>
                                        </div>
                            <div className="col-span-12 md:col-span-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Completion</label>
                                    <p className="text-sm font-semibold">{timelineData.completionPercentage || 0}%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                {/* Timeline */}
                <div className="box">
                    <div className="box-header">
                        <h5 className="box-title">Lead Progress Timeline</h5>
                    </div>
                    <div className="box-body">
                        <ul className="timeline list-none text-[0.813rem] text-defaulttextcolor">
                            {/* Phases Timeline */}
                            {timelineData.phases?.map((phase: any, index: number) => {
                                const currentStatus = timelineData.currentStatus?.toLowerCase();
                                const completedPhases = getCompletedPhases(currentStatus);
                                const activePhase = getActivePhase(currentStatus);
                                const skippedPhases = getSkippedPhases(currentStatus);
                                const phaseName = phase.name.toLowerCase();
                                
                                // Convert camelCase to snake_case for comparison
                                const normalizedPhaseName = phaseName === 'followup' ? 'follow_up' : phaseName;
                                
                                // Determine phase status based on current lead status
                                const isCompleted = completedPhases.includes(normalizedPhaseName) || phase.completed;
                                const isActive = activePhase === normalizedPhaseName && !phase.completed;
                                const isSkipped = skippedPhases.includes(normalizedPhaseName) || phase.skipped || false;
                                
                                // Get the correct icon and status for this phase
                                const phaseIcon = isCompleted ? 'ri-check-line text-green-500' : 
                                                isActive ? 'ri-play-circle-line text-blue-500' : 
                                                isSkipped ? 'ri-skip-forward-line text-gray-400' : 
                                                'ri-circle-line text-gray-300';
                                
                                const phaseStatusClass = isCompleted ? 'bg-green-100 text-green-800' : 
                                                       isActive ? 'bg-blue-100 text-blue-800' : 
                                                       isSkipped ? 'bg-gray-100 text-gray-600' : 
                                                       'bg-gray-50 text-gray-500';
                                
                                const phaseStatusText = isCompleted ? 'Completed' : 
                                                       isActive ? 'Active' : 
                                                       isSkipped ? 'Skipped' : 
                                                       'Pending';
                                
                                // Show edit button on any phase that is not completed
                                const showEditButton = !isCompleted;
                                
                                return (
                                    <li key={index}>
                                    <div className="timeline-time text-end">
                                            <span className="date">{phase.name.toUpperCase()}</span>
                                            <span className="time inline-block">{phase.estimatedDuration}</span>
                                    </div>
                                    <div className="timeline-icon">
                                            <a aria-label="anchor" href="#!">
                                                <i className={phaseIcon}></i>
                                            </a>
                                    </div>
                                    <div className="timeline-body">
                                        <div className="flex items-start timeline-main-content flex-wrap mt-0">
                                                <div className="avatar avatar-md me-3 avatar-rounded md:mt-0 mt-6">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <i className={phaseIcon} />
                                                    </div>
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center">
                                                    <div className="sm:mt-0 mt-2">
                                                            <p className="mb-0 text-[.875rem] font-semibold capitalize">{phase.name}</p>
                                                            <p className="mb-0 text-[#8c9097] dark:text-white/50">{phase.description}</p>
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <span className={`badge ${phaseStatusClass}`}>
                                                                    {phaseStatusText}
                                                                </span>
                                                                {showEditButton && (
                                                                    <button
                                                                        onClick={() => handleUpdateStatus(phase)}
                                                                        className="ti-btn ti-btn-sm ti-btn-primary"
                                                                        title="Update Status"
                                                                    >
                                                                        <i className="ri-edit-line"></i>
                                                                    </button>
                                                                )}
                                                            </div>
                                                    </div>
                                                        {/* Show timestamp for phases with status history */}
                                                        {(() => {
                                                            const phaseHistory = timelineData.statusHistory?.find((h: any) => {
                                                                const historyStatus = h.status.toLowerCase();
                                                                const normalizedHistoryStatus = historyStatus === 'followup' ? 'follow_up' : historyStatus;
                                                                return normalizedHistoryStatus === normalizedPhaseName;
                                                            });
                                                            
                                                            if (phaseHistory) {
                                                                return (
                                                                    <div className="ms-auto">
                                                                        <div className="text-right">
                                                                            <span className="ltr:float-right rtl:float-left badge !bg-light text-[#8c9097] dark:text-white/50 timeline-badge whitespace-nowrap">
                                                                                {formatDate(phaseHistory.updatedAt)}
                                                                            </span>
                                                                            {phaseHistory.remark && (
                                                                                <div className="text-xs text-gray-500 mt-1 max-w-48 text-right">
                                                                                    "{phaseHistory.remark}"
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            } else if (phase.name.toLowerCase() === 'new') {
                                                                return (
                                                                    <div className="ms-auto">
                                                                        <span className="ltr:float-right rtl:float-left badge !bg-light text-[#8c9097] dark:text-white/50 timeline-badge whitespace-nowrap">
                                                                            {formatDate(timelineData.createdAt)}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                );
                            })}

                            {/* Key Events */}
                            {timelineData.keyEvents?.map((event: any, index: number) => (
                                <li key={`event-${index}`} className="border-t pt-4 mt-4">
                                <div className="timeline-time text-end">
                                        <span className="date">KEY EVENT</span>
                                        <span className="time inline-block">{event.name}</span>
                                </div>
                                <div className="timeline-icon">
                                        <a aria-label="anchor" href="#!">
                                            <i className="ri-calendar-event-line text-orange-500"></i>
                                        </a>
                                </div>
                                <div className="timeline-body">
                                    <div className="flex items-start timeline-main-content flex-wrap mt-0">
                                            <div className="avatar avatar-md me-3 avatar-rounded md:mt-0 mt-6">
                                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                                    <i className="ri-calendar-event-line text-orange-500" />
                                                </div>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center">
                                                <div className="sm:mt-0 mt-2">
                                                        <p className="mb-0 text-[.875rem] font-semibold">{event.name}</p>
                                                        <p className="mb-0 text-[#8c9097] dark:text-white/50">{event.description}</p>
                                                </div>
                                                <div className="ms-auto">
                                                    <span className="ltr:float-right rtl:float-left badge !bg-light text-[#8c9097] dark:text-white/50 timeline-badge whitespace-nowrap">
                                                            {formatDate(event.date)}
                                                    </span>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            ))}
                        </ul>

                        {/* Status History */}
                        {timelineData.statusHistory && timelineData.statusHistory.length > 0 && (
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <h6 className="font-semibold mb-4 text-gray-800">Status History</h6>
                                <div className="space-y-3">
                                    {timelineData.statusHistory.map((history: any, index: number) => (
                                        <div key={history._id || index} className="flex items-start gap-3 p-3 bg-white rounded-md border">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <i className="ri-history-line text-primary text-sm"></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="font-semibold text-sm capitalize">
                                                            {history.status.replace(/([A-Z])/g, ' $1').replace('_', ' ').trim()}
                                                        </span>
                                                        {history.remark && (
                                                            <p className="text-xs text-gray-600 mt-1">
                                                                "{history.remark}"
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xs text-gray-500">
                                                            {formatDate(history.updatedAt)}
                                                        </div>
                                                        {/* <div className="text-xs text-gray-400 mt-1">
                                                            by {history.updatedBy?.name || 'Unknown'}
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Next Steps */}
                        {timelineData.remainingSteps && timelineData.remainingSteps.length > 0 && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <h6 className="font-semibold mb-3 text-blue-800">Upcoming Steps</h6>
                                <div className="space-y-2">
                                    {timelineData.remainingSteps.slice(0, 3).map((step: any, index: number) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <i className="ri-arrow-right-line text-blue-600"></i>
                                            <span className="text-sm font-medium capitalize">{step.name}</span>
                                            <span className="text-xs text-gray-500">({step.estimatedDuration})</span>
                                        </div>
                                    ))}
                                </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Status Update Modal */}
            {updateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Update Lead Status</h3>
                            <button
                                onClick={() => setUpdateModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="ri-close-line text-xl"></i>
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Status: <span className="font-semibold capitalize">{selectedPhase?.name}</span>
                                </label>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Update to Status *
                                </label>
                                <select
                                    value={updateForm.status}
                                    onChange={(e) => setUpdateForm({...updateForm, status: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                >
                                    <option value="">Select Status</option>
                                    {['new', 'contacted', 'interested', 'followUp', 'qualified', 'proposal', 'negotiation', 'closed', 'lost'].map((status) => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Remark *
                                </label>
                                <textarea
                                    value={updateForm.remark}
                                    onChange={(e) => setUpdateForm({...updateForm, remark: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    rows={3}
                                    placeholder="Enter remark for this status update..."
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setUpdateModalOpen(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                disabled={updateLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleStatusUpdate}
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
                                disabled={updateLoading}
                            >
                                {updateLoading ? 'Updating...' : 'Update Status'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default function ProtectedLeadTimeline() {
    return (
        <ProtectedRoute>
            <LeadTimeline />
        </ProtectedRoute>
    );
} 