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
                            {timelineData.phases?.map((phase: any, index: number) => (
                                <li key={index}>
                                <div className="timeline-time text-end">
                                        <span className="date">{phase.name.toUpperCase()}</span>
                                        <span className="time inline-block">{phase.estimatedDuration}</span>
                                </div>
                                <div className="timeline-icon">
                                        <a aria-label="anchor" href="#!">
                                            <i className={getPhaseIcon(phase)}></i>
                                        </a>
                                </div>
                                <div className="timeline-body">
                                    <div className="flex items-start timeline-main-content flex-wrap mt-0">
                                            <div className="avatar avatar-md me-3 avatar-rounded md:mt-0 mt-6">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <i className={getPhaseIcon(phase)} />
                                                </div>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center">
                                                <div className="sm:mt-0 mt-2">
                                                        <p className="mb-0 text-[.875rem] font-semibold capitalize">{phase.name}</p>
                                                        <p className="mb-0 text-[#8c9097] dark:text-white/50">{phase.description}</p>
                                                        <span className={`badge ${getPhaseStatus(phase)} mt-2`}>
                                                            {phase.completed ? 'Completed' : phase.active ? 'Active' : phase.skipped ? 'Skipped' : 'Pending'}
                                                        </span>
                                                </div>
                                                    {phase.name.toLowerCase() === 'new' && (
                                                <div className="ms-auto">
                                                    <span className="ltr:float-right rtl:float-left badge !bg-light text-[#8c9097] dark:text-white/50 timeline-badge whitespace-nowrap">
                                                                {formatDate(timelineData.createdAt)}
                                                    </span>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            ))}

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