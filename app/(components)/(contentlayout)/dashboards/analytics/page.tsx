"use client";
import { Visitorsbychannel } from "@/shared/data/dashboards/analyticsdata";
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";
import * as Analyticsdata from "@/shared/data/dashboards/analyticsdata";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import dynamic from "next/dynamic";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import DataTable from "@/shared/components/DataTable";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

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

interface MonthlyLeadStats {
  year: number;
  totalLeads: number;
  averageLeadsPerMonth: number;
  monthlyData: Array<{
    month: number;
    monthName: string;
    year: number;
    count: number;
    leads: Array<{
      id: string;
      status: string;
      source: string;
      createdAt: string;
    }>;
  }>;
  summary: {
    highestMonth: {
      month: number;
      monthName: string;
      count: number;
    };
    lowestMonth: {
      month: number;
      monthName: string;
      count: number;
    };
  };
  statusBreakdown: Array<{
    _id: string;
    count: number;
  }>;
  sourceBreakdown: Array<{
    _id: string;
    count: number;
  }>;
  generatedAt: string;
}

interface ProductStats {
  totalProducts: number;
  pieChartData: {
    byType: {
      title: string;
      data: Array<{
        name: string;
        value: number;
        percentage: number;
      }>;
      total: number;
    };
    byStatus: {
      title: string;
      data: Array<{
        name: string;
        value: number;
        percentage: number;
      }>;
      total: number;
    };
    byCategory: {
      title: string;
      data: Array<{
        name: string;
        categoryId: string;
        value: number;
        percentage: number;
      }>;
      total: number;
    };
  };
  additionalStats: {
    averagePrice: number;
    minPrice: number;
    maxPrice: number;
    totalValue: number;
  };
  generatedAt: string;
}

interface RandomUser {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  role: string;
  status: string;
  onboardingStatus: string;
  kycStatus: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  totalLeads: number;
  totalCommissions: number;
  totalBankAccounts: number;
  lastLeadDate: string;
  lastCommissionDate: string;
  performanceScore: number;
  createdAt: string;
  lastLogin: string;
  profilePicture?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
}

interface RandomUsersResponse {
  users: RandomUser[];
  summary: {
    totalUsers: number;
    returnedUsers: number;
    averageLeads: number;
    averageCommissions: number;
    topPerformer: {
      name: string;
      performanceScore: number;
      totalLeads: number;
      totalCommissions: number;
    };
  };
  generatedAt: string;
  message: string;
}

interface Lead {
  id: string;
  srNo: number;
  agentName: string;
  status: string;
  product: string;
  leadTracking: JSX.Element;
  actions: Array<{
    icon: string;
    className: string;
    href?: string;
    onClick?: () => void;
  }>;
}

const Analytics = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [monthlyLeadStats, setMonthlyLeadStats] = useState<MonthlyLeadStats | null>(null);
  const [productStats, setProductStats] = useState<ProductStats | null>(null);
  const [randomUsers, setRandomUsers] = useState<RandomUser[]>([]);
  const [randomUsersSummary, setRandomUsersSummary] = useState<RandomUsersResponse['summary'] | null>(null);
  const [topCategories, setTopCategories] = useState<any[]>([]);
  const [topCategoriesSummary, setTopCategoriesSummary] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [chartError, setChartError] = useState<string | null>(null);
  const [productChartError, setProductChartError] = useState<string | null>(null);
  const [randomUsersError, setRandomUsersError] = useState<string | null>(null);
  const [topCategoriesError, setTopCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
    fetchLeads();
    fetchMonthlyLeadStats();
    fetchProductStats();
    fetchRandomUsers();
    fetchTopCategories();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}leads?limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeads(response.data.results);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const fetchMonthlyLeadStats = async () => {
    try {
      setChartError(null);
      const token = localStorage.getItem("token");
      const currentYear = new Date().getFullYear();
      const response = await axios.get(`${Base_url}leads/stats/monthly?year=${currentYear}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMonthlyLeadStats(response.data);
    } catch (error) {
      console.error("Error fetching monthly lead stats:", error);
      setChartError("Failed to load lead statistics");
    }
  };

  const fetchProductStats = async () => {
    try {
      setProductChartError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}products/stats/pie-chart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductStats(response.data);
    } catch (error) {
      console.error("Error fetching product stats:", error);
      setProductChartError("Failed to load product statistics");
    }
  };

  const fetchRandomUsers = async () => {
    try {
      setRandomUsersError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}users/random?limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRandomUsers(response.data.users);
      setRandomUsersSummary(response.data.summary);
    } catch (error) {
      console.error("Error fetching random users:", error);
      setRandomUsersError("Failed to load user data");
    }
  };

  const fetchTopCategories = async () => {
    try {
      setTopCategoriesError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}categories/top?limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTopCategories(response.data.categories);
      setTopCategoriesSummary(response.data.summary);
    } catch (error) {
      console.error("Error fetching top categories:", error);
      setTopCategoriesError("Failed to load top categories data");
    }
  };

  const headers = [
    { key: "agentName", label: "Submitted By", sortable: true },
    { key: "product", label: "Product", sortable: false },
    { key: "status", label: "Status", sortable: false },
    { key: "leadTracking", label: "Timeline", sortable: false },
    { key: "actions", label: "Actions", sortable: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "primary";
      case "contacted":
        return "info";
      case "interested":
        return "success";
      case "closed":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getLeadReportChartData = () => {
    if (!monthlyLeadStats) {
      return {
        options: {
                  chart: {
          type: 'line' as const,
          height: 257,
          toolbar: {
            show: false
          }
        },
          stroke: {
            curve: 'smooth' as const,
            width: 3
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yaxis: {
            title: {
              text: 'Number of Leads'
            }
          },
          colors: ['#3b82f6'],
          dataLabels: {
            enabled: false
          },
          grid: {
            borderColor: '#f1f5f9'
          }
        },
        series: [{
          name: 'Leads',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
      };
    }

    const monthlyData = monthlyLeadStats.monthlyData;
    const leadCounts = Array.from({ length: 12 }, (_, index) => {
      const monthData = monthlyData.find(data => data.month === index + 1);
      return monthData ? monthData.count : 0;
    });

    return {
      options: {
        chart: {
          type: 'line' as const,
          height: 257,
          toolbar: {
            show: false
          }
        },
        stroke: {
          curve: 'smooth' as const,
          width: 3
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yaxis: {
          title: {
            text: 'Number of Leads'
          }
        },
        colors: ['#3b82f6'],
        dataLabels: {
          enabled: false
        },
        grid: {
          borderColor: '#f1f5f9'
        },
      },
      series: [{
        name: 'Leads',
        data: leadCounts
      }]
    };
  };

  const getProductSegregationChartData = () => {
    if (!productStats) {
      return {
        options: {
          chart: {
            type: 'donut' as const,
            height: 250,
            toolbar: {
              show: false
            }
          },
          labels: ['No Data'],
          colors: ['#e5e7eb'],
          dataLabels: {
            enabled: false
          },
          legend: {
            position: 'bottom' as const
          }
        },
        series: [100]
      };
    }

    const byTypeData = productStats.pieChartData.byType;
    const labels = byTypeData.data.map(item => item.name.charAt(0).toUpperCase() + item.name.slice(1));
    const series = byTypeData.data.map(item => item.value);
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

    return {
      options: {
        chart: {
          type: 'donut' as const,
          height: 250,
          toolbar: {
            show: false
          }
        },
        labels: labels,
        colors: colors.slice(0, labels.length),
        dataLabels: {
          enabled: false
        },
        legend: {
          position: 'bottom' as const,
          fontSize: '12px'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '60%',
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Products',
                  formatter: function () {
                    return byTypeData.total.toString()
                  }
                }
              }
            }
          }
        }
      },
      series: series
    };
  };

  return (
    <Fragment>
      <Seo title={"Analytics"} />
      <Pageheader
        currentpage="Analytics"
        activepage="Dashboards"
        mainpage="Analytics"
      />
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-7 col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
              <div className="box">
                <div className="box-body">
                  <div className="flex flex-wrap items-center justify-between">
                    <div>
                      <h6 className="font-semibold mb-3 text-[1rem]">
                        Total Users
                      </h6>
                      <span className="text-[1.5625rem] font-semibold">
                        {loading
                          ? "Loading..."
                          : stats?.summary.totalUsers || 0}
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
                      <h6 className="font-semibold mb-3 text-[1rem]">
                        Total Leads
                      </h6>
                      <span className="text-[1.5625rem] font-semibold">
                        {loading
                          ? "Loading..."
                          : stats?.summary.totalLeads || 0}
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
                      <h6 className="font-semibold mb-3 text-[1rem]">
                        Total Categories
                      </h6>
                      <span className="text-[1.5625rem] font-semibold">
                        {loading
                          ? "Loading..."
                          : stats?.summary.totalCategories || 0}
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
                  <div className="box-title">Lead Report</div>
                  <div>
                    <button
                      type="button"
                      className="ti-btn ti-btn-primary ti-btn-wave !font-medium"
                      onClick={fetchMonthlyLeadStats}
                    >
                      <i className="ri-refresh-line me-1 align-middle inline-block"></i>
                      Refresh
                    </button>
                  </div>
                </div>
                <div className="box-body">
                  {chartError ? (
                    <div className="text-center text-danger py-4">
                      <i className="ri-error-warning-line text-2xl mb-2"></i>
                      <p>{chartError}</p>
                      <button
                        type="button"
                        className="ti-btn ti-btn-primary ti-btn-sm mt-2"
                        onClick={fetchMonthlyLeadStats}
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <div id="leadReport">
                      <ReactApexChart
                        options={getLeadReportChartData().options}
                        series={getLeadReportChartData().series}
                        type="line"
                        width={"100%"}
                        height={257}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
              <div className="box">
                <div className="box-header justify-between">
                  <div className="box-title">
                  Conversion Rate
                  </div>
                  <div className="hs-dropdown ti-dropdown">
                    <Link
                      href="#!"
                      scroll={false}
                      className="px-2 font-normal text-[0.75rem] text-[#8c9097] dark:text-white/50"
                      aria-expanded="false"
                    >
                      View All
                      <i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                    </Link>
                    <ul
                      className="hs-dropdown-menu ti-dropdown-menu hidden"
                      role="menu"
                    >
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                          scroll={false}
                        >
                          Today
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                          scroll={false}
                        >
                          This Week
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                          scroll={false}
                        >
                          Last Week
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box-body">
                  <div id="country-sessions">
                    <ReactApexChart
                      options={Analyticsdata.Countries.options}
                      series={Analyticsdata.Countries.series}
                      type="line"
                      width={"100%"}
                      height={330}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
              <div className="box overflow-hidden">
                <div className="box-header justify-between">
                  <div className="box-title">Traffic Sources</div>
                  <div className="hs-dropdown ti-dropdown">
                    <Link
                      href="#!"
                      scroll={false}
                      className="px-2 font-normal text-[0.75rem] text-[#8c9097] dark:text-white/50"
                      aria-expanded="false"
                    >
                      View All
                      <i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                    </Link>
                    <ul
                      className="hs-dropdown-menu ti-dropdown-menu hidden"
                      role="menu"
                    >
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                          scroll={false}
                        >
                          Today
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                          scroll={false}
                        >
                          This Week
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                          scroll={false}
                        >
                          Last Week
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box-body !p-0">
                  <div className="table-responsive">
                    <table className="table table-hover whitespace-nowrap min-w-full">
                      <thead>
                        <tr>
                          <th scope="col" className="text-start">
                            Browser
                          </th>
                          <th scope="col" className="text-start">
                            Sessions
                          </th>
                          <th scope="col" className="text-start">
                            Traffic
                          </th>
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
                            <span>
                              <i className="ri-arrow-up-s-fill me-1 text-success align-middle text-[1.125rem]"></i>
                              23,379
                            </span>
                          </td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar bg-primary w-[78%]"
                                role="progressbar"
                                aria-valuenow={78}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
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
                            <span>
                              <i className="ri-arrow-up-s-fill me-1 text-success align-middle text-[1.125rem]"></i>
                              78,973
                            </span>
                          </td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar bg-primary w-[32%]"
                                role="progressbar"
                                aria-valuenow={32}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
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
                            <span>
                              <i className="ri-arrow-down-s-fill me-1 text-danger align-middle text-[1.125rem]"></i>
                              12,457
                            </span>
                          </td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar bg-primary w-[21%]"
                                role="progressbar"
                                aria-valuenow={21}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
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
                            <span>
                              <i className="ri-arrow-up-s-fill me-1 text-success align-middle text-[1.125rem]"></i>
                              8,570
                            </span>
                          </td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar bg-primary w-1/4"
                                role="progressbar"
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
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
                            <span>
                              <i className="ri-arrow-down-s-fill me-1 text-danger align-middle text-[1.125rem]"></i>
                              6,135
                            </span>
                          </td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar bg-primary w-[35%]"
                                role="progressbar"
                                aria-valuenow={35}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
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
                            <span>
                              <i className="ri-arrow-up-s-fill me-1 text-success align-middle text-[1.125rem]"></i>
                              4,789
                            </span>
                          </td>
                          <td className="border-bottom-0">
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar bg-primary w-[12%]"
                                role="progressbar"
                                aria-valuenow={12}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="xl:col-span-5 col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-span-12 col-span-12">
              <div className="box">
                <div className="box-header justify-between">
                  <div className="box-title">Product Segregation</div>
                  <div>
                    <button
                      type="button"
                      className="ti-btn ti-btn-primary !text-[0.85rem] !m-0 !font-medium"
                      onClick={fetchProductStats}
                    >
                      <i className="ri-refresh-line me-1"></i>
                      Refresh
                    </button>
                  </div>
                </div>
                <div className="box-body !my-2 !py-6 !px-2" style={{ minHeight: '440px' }}>
                  {productChartError ? (
                    <div className="text-center text-danger py-4">
                      <i className="ri-error-warning-line text-2xl mb-2"></i>
                      <p>{productChartError}</p>
                      <button
                        type="button"
                        className="ti-btn ti-btn-primary ti-btn-sm mt-2"
                        onClick={fetchProductStats}
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <div id="productSegregation" className="flex items-center justify-center h-full">
                      <ReactApexChart
                        options={getProductSegregationChartData().options}
                        series={getProductSegregationChartData().series}
                        type="donut"
                        width={"100%"}
                        height={400}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="xl:col-span-12 col-span-12">
              <div className="box">
                <div className="box-header justify-between">
                  <div className="box-title">
                     New Leads Summary
                  </div>
                  <div className="hs-dropdown ti-dropdown">
                    <Link
                      href="#!"
                      scroll={false}
                      className="px-2 font-normal text-[0.75rem] text-[#8c9097] dark:text-white/50"
                      aria-expanded="false"
                    >
                      View All
                      <i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                    </Link>
                    <ul
                      className="hs-dropdown-menu ti-dropdown-menu hidden"
                      role="menu"
                    >
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                          scroll={false}
                        >
                          Today
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                          scroll={false}
                        >
                          This Week
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!"
                          scroll={false}
                        >
                          Last Week
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box-body">
                  <div id="session-users">
                    <ReactApexChart
                      options={Analyticsdata.Sessionduration.options}
                      series={Analyticsdata.Sessionduration.series}
                      type="line"
                      width={"100%"}
                      height={425}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      
      {/* Top 5 Users Table - Full Width */}
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header justify-between">
              <div className="box-title">Top 5 Users</div>
              <div>
                <button
                  type="button"
                  className="ti-btn ti-btn-primary ti-btn-wave !font-medium"
                  onClick={fetchRandomUsers}
                >
                  <i className="ri-refresh-line me-1 align-middle inline-block"></i>
                  Refresh
                </button>
              </div>
            </div>
            <div className="box-body">
              {randomUsersError ? (
                <div className="text-center text-danger py-4">
                  <i className="ri-error-warning-line text-2xl mb-2"></i>
                  <p>{randomUsersError}</p>
                  <button
                    type="button"
                    className="ti-btn ti-btn-primary ti-btn-sm mt-2"
                    onClick={fetchRandomUsers}
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover whitespace-nowrap table-bordered min-w-full">
                    <thead>
                      <tr>
                        <th scope="col" className="text-start">S.No</th>
                        <th scope="col" className="text-start">User</th>
                        <th scope="col" className="text-start">Email</th>
                        <th scope="col" className="text-start">Mobile</th>
                        <th scope="col" className="text-start">Total Leads</th>
                        <th scope="col" className="text-start">Total Commissions</th>
                        <th scope="col" className="text-start">Performance Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {randomUsers.map((user, index) => (
                        <tr
                          className="border-t border-inherit border-solid hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10"
                          key={user._id}
                        >
                          <th scope="row" className="!text-start">
                            {index + 1}
                          </th>
                          <td>
                            <div className="flex items-center">
                              <span className="avatar avatar-sm !mb-0 bg-primary/10 avatar-rounded">
                                {user.profilePicture ? (
                                  <img
                                    src={user.profilePicture}
                                    alt={user.name}
                                    className="!rounded-full h-[1.75rem] w-[1.75rem]"
                                  />
                                ) : (
                                  <i className="ri-user-3-line text-[0.9375rem] font-semibold text-primary"></i>
                                )}
                              </span>
                              <span className="ms-2 font-semibold">
                                {user.name}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="text-[0.875rem]">
                              {user.email}
                            </span>
                          </td>
                          <td>
                            <span className="text-[0.875rem]">
                              {user.mobileNumber}
                            </span>
                          </td>
                          <td>
                            <span className="font-semibold text-primary">
                              {user.totalLeads}
                            </span>
                          </td>
                          <td>
                            <span className="font-semibold text-success">
                              ₹{user.totalCommissions.toLocaleString()}
                            </span>
                          </td>
                          <td>
                            <span className="font-semibold text-info">
                              {user.performanceScore}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-9 col-span-12">
          <div className="box">
            <div className="box-header justify-between">
              <div className="box-title">Latest Leads</div>
              <div className="flex flex-wrap">
                <div className="me-3 my-1">
                  <input
                    className="ti-form-control form-control-sm"
                    type="text"
                    placeholder="Search Here"
                    aria-label=".form-control-sm example"
                  />
                </div>
                <div className="hs-dropdown ti-dropdown my-1">
                  <Link
                    href="#!"
                    scroll={false}
                    className="ti-btn ti-btn-primary !bg-primary !text-white !py-1 !px-2 !text-[0.75rem] !m-0 !gap-0 !font-medium"
                    aria-expanded="false"
                  >
                    Sort By
                    <i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                  </Link>
                  <ul
                    className="hs-dropdown-menu ti-dropdown-menu hidden"
                    role="menu"
                  >
                    <li>
                      <Link
                        className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        href="#!"
                        scroll={false}
                      >
                        New
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        href="#!"
                        scroll={false}
                      >
                        Popular
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        href="#!"
                        scroll={false}
                      >
                        Relevant
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="box-body">
              <div className="table-responsive">
                <table className="table table-hover whitespace-nowrap table-bordered min-w-full">
                  <thead>
                    <tr>
                      <th scope="col" className="text-start">
                        S.No
                      </th>
                      <th scope="col" className="text-start">
                        Submitted By
                      </th>
                      <th scope="col" className="text-start">
                        Product
                      </th>
                      <th scope="col" className="text-start">
                        Status
                      </th>
                      <th scope="col" className="text-start">
                        Timeline
                      </th>
                      <th scope="col" className="text-start">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, index) => (
                      <tr
                        className="border-t border-inherit border-solid hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10"
                        key={lead.id}
                      >
                        <th scope="row" className="!text-start">
                          {index + 1}
                        </th>
                        <td>
                          <div className="flex items-center">
                            <span className="avatar avatar-sm !mb-0 bg-primary/10 avatar-rounded">
                              <i className="ri-user-3-line text-[0.9375rem] font-semibiold text-primary"></i>
                            </span>
                            <span className="ms-2">
                              {lead.agent?.name || lead.agent?.email || "--"}
                            </span>
                          </div>
                        </td>
                        <td>
                          {lead.products && lead.products.length > 0
                            ? lead.products[0]?.product?.name || "--"
                            : "--"}
                        </td>
                        <td>
                          <span
                            className={`badge bg-${getStatusColor(
                              lead.status
                            )}/10 text-${getStatusColor(lead.status)}`}
                          >
                            {lead.status || "--"}
                          </span>
                        </td>
                        <td>
                          <Link
                            href={`/leads/timeline?id=${lead.id}`}
                            className="text-primary hover:text-primary-dark"
                          >
                            View Timeline
                          </Link>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <Link
                              href={`/leads/view?id=${lead.id}`}
                              className="ti-btn ti-btn-primary !py-1 !px-2 !text-[0.75rem]"
                            >
                              <i className="ri-eye-line"></i>
                            </Link>
                            <Link
                              href={`/leads/edit?id=${lead.id}`}
                              className="ti-btn ti-btn-info !py-1 !px-2 !text-[0.75rem]"
                            >
                              <i className="ri-edit-line"></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-3 col-span-12">
          <div className="box">
            <div className="box-header justify-between">
              <div className="box-title">Top Performing Categories</div>
              
            </div>
            <div className="box-body">
              {topCategoriesError ? (
                <div className="text-center text-danger py-4">
                  <i className="ri-error-warning-line text-2xl mb-2"></i>
                  <p>{topCategoriesError}</p>
                  <button
                    type="button"
                    className="ti-btn ti-btn-primary ti-btn-sm mt-2"
                    onClick={fetchTopCategories}
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <ul className="list-none mb-0 analytics-visitors-countries min-w-full">
                  {topCategories.length > 0 ? (
                    topCategories.map((category, index) => (
                      <li key={category._id || index}>
                        <div className="flex items-center">
                          <div className="leading-none">
                            <span className="avatar avatar-sm !mb-0 text-default">
                              <i className="ri-folder-line text-primary text-lg"></i>
                            </span>
                          </div>
                          <div className="ms-4 flex-grow leading-none">
                            <span className="text-[0.75rem] font-medium">{category.name}</span>
                          </div>
                          <div>
                            <span className="text-default badge bg-light font-semibold mt-2">
                              {category.leadCount || 0}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>
                      <div className="text-center text-muted py-4">
                        <i className="ri-folder-open-line text-2xl mb-2"></i>
                        <p className="text-sm">No categories found</p>
                      </div>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default function ProtectedAnalytics() {
  return (
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  );
}
