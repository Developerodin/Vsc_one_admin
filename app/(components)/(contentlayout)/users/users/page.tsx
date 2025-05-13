"use client";
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import DataTable from "@/shared/components/DataTable";
import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";

const Users = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userIdToFetch, setUserIdToFetch] = useState<string | null>(null);
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    mobileNumber: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Fetch user details when userIdToFetch changes and is not null
    if (userIdToFetch) {
      fetchUserDetails(userIdToFetch);
    }
  }, [userIdToFetch]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Format the data according to table headers
      const formattedData = response.data.results.map(
        (user: any, index: number) => ({
          srNo: index + 1,
          name: user.name || "--",
          email: user.email || "--",
          kycStatus: user.kycStatus || "--",
          status: user.status || "--",
          totalCommission: user.totalCommission || "--",
          totalLeads: user.totalLeads || "--",
          onboardingStatus: user.onboardingStatus || "--",
          address: user.address?.country || "--",
          userId: user.id, // Store the user ID for fetching details
          actions: [
            {
              icon: "ri-eye-line",
              className: "ti-btn-primary",
              onClick: () => openUserModal(user.id),
            },
            {
              icon: "ri-edit-line",
              className: "ti-btn-info",
              href: "#",
            },
            {
              icon: "ri-delete-bin-line",
              className: "ti-btn-danger",
              href: "#",
            },
          ],
        })
      );

      setUsers(formattedData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserDetails = async (userId: string) => {
    try {
      setLoadingUserDetails(true);
      console.log("Fetching user details for ID:", userId);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User details response:", response.data);

      // Set the user data from the response
      setSelectedUser(response.data);
      console.log("Selected user state set");
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoadingUserDetails(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${Base_url}users`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers(); // Refresh the users list
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
        mobileNumber: "",
      });
      // Close modal
      const modal = document.getElementById("create-user");
      if (modal) {
        modal.classList.add("hidden");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const StatusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const KycStatusOptions = [
    { value: "pending", label: "Pending" },
    { value: "verified", label: "Verified" },
    { value: "rejected", label: "Rejected" },
  ];

  const OnboardingStatusOptions = [
    { value: "completed", label: "Completed" },
    { value: "in_progress", label: "In Progress" },
    { value: "not_started", label: "Not Started" },
  ];

  const headers = [
    { key: "srNo", label: "Sr No." },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "kycStatus", label: "KYC Status" },
    { key: "status", label: "Status" },
    { key: "totalCommission", label: "Total Commission" },
    { key: "totalLeads", label: "Total Leads" },
    { key: "onboardingStatus", label: "Onboarding Status" },
    { key: "address", label: "Address" },
    { key: "actions", label: "Actions" },
  ];

  const openUserModal = (userId: string) => {
    // First show the modal
    setShowUserModal(true);

    // Then set the userId to fetch, which will trigger the useEffect
    setUserIdToFetch(userId);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
  };

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
                <button
                  type="button"
                  className="hs-dropdown-toggle ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                  data-hs-overlay="#create-user"
                >
                  <i className="ri-add-line font-semibold align-middle"></i>{" "}
                  Create User
                </button>

               
                
                <div id="create-user" className="hs-overlay hidden ti-modal">
                  <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
                    <div className="ti-modal-content">
                      <div className="ti-modal-header">
                        <h6 className="modal-title" id="staticBackdropLabel2">
                          Add User
                        </h6>
                        <button
                          type="button"
                          className="hs-dropdown-toggle ti-modal-close-btn"
                          data-hs-overlay="#create-user"
                        >
                          <span className="sr-only">Close</span>
                          <svg
                            className="w-3.5 h-3.5"
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="ti-modal-body">
                          <div className="grid grid-cols-12 gap-2">
                            <div className="xl:col-span-6 col-span-12">
                              <label htmlFor="name" className="form-label">
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter Name"
                                required
                              />
                            </div>
                            <div className="xl:col-span-6 col-span-12">
                              <label htmlFor="email" className="form-label">
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter Email"
                                required
                              />
                            </div>
                            <div className="xl:col-span-6 col-span-12">
                              <label htmlFor="password" className="form-label">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter Password"
                                required
                              />
                            </div>
                            <div className="xl:col-span-6 col-span-12">
                              <label
                                htmlFor="mobileNumber"
                                className="form-label"
                              >
                                Mobile Number
                              </label>
                              <input
                                type="tel"
                                className="form-control"
                                id="mobileNumber"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                placeholder="Enter Mobile Number"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="ti-modal-footer">
                          <button
                            type="button"
                            className="hs-dropdown-toggle ti-btn ti-btn-light"
                            data-hs-overlay="#create-user"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="ti-btn ti-btn-primary-full"
                            disabled={loading}
                          >
                            {loading ? "Creating..." : "Add User"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-body">
              <DataTable headers={headers} data={users} />
            </div>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 transition-opacity"></div>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-4xl my-8">
                <div className="ti-modal-header flex justify-between items-center px-6 py-3 border-b">
                  <h6 className="modal-title text-lg font-semibold">User Details</h6>
                  <button
                    type="button"
                    className="hs-dropdown-toggle ti-modal-close-btn"
                    onClick={closeUserModal}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="w-3.5 h-3.5"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
                <div className="ti-modal-body px-6 py-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {loadingUserDetails ? (
                    <div className="flex justify-center py-6">
                      <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
                    </div>
                  ) : (
                    selectedUser && (
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <label className="form-label font-semibold">Name</label>
                          <p className="text-gray-600">
                            {selectedUser.name || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">Email</label>
                          <p className="text-gray-600">
                            {selectedUser.email || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            Mobile Number
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.mobileNumber || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">Role</label>
                          <p className="text-gray-600">
                            {selectedUser.role || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">Status</label>
                          <p className="text-gray-600">
                            {selectedUser.status || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            KYC Status
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.kycStatus || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            Onboarding Status
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.onboardingStatus || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            Total Commission
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.totalCommission || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            Total Leads
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.totalLeads || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            Total Sales
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.totalSales || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            Email Verified
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.isEmailVerified ? "Yes" : "No"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            Mobile Verified
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.isMobileVerified ? "Yes" : "No"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            Country
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.address?.country || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            Aadhaar Number
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.kycDetails?.aadhaarNumber || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            PAN Number
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.kycDetails?.panNumber || "--"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            Aadhaar Verified
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.kycDetails?.aadhaarVerified
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label className="form-label font-semibold">
                            PAN Verified
                          </label>
                          <p className="text-gray-600">
                            {selectedUser.kycDetails?.panVerified ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="ti-modal-footer flex justify-end px-6 py-3 border-t">
                  <button
                    type="button"
                    className="ti-btn ti-btn-light"
                    onClick={closeUserModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Users;
