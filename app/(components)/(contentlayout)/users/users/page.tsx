"use client";
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import DataTable from "@/shared/components/DataTable";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import Modal from "@/app/shared/components/Modal";
import FormModal from "@/app/shared/components/FormModal";
import ConfirmModal from "@/app/shared/components/ConfirmModal";

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
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    role: "",
    status: "",
    onboardingStatus: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

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
          profile: (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <i className="ri-user-line text-xl text-primary"></i>
              </div>
            </div>
          ),
          name: (
            <div className="flex items-center gap-2">
              <span>{user.name || "--"}</span>
              {user.kycStatus === "verified" && (
                <i className="ri-checkbox-circle-fill text-success text-lg"></i>
              )}
            </div>
          ),
          contact: (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.mobileNumber || "--"}</span>
              <span className="text-xs text-gray-500">{user.email || "--"}</span>
            </div>
          ),
          totalCommission: user.totalCommission || "--",
          address: user.address?.country || "--",
          userId: user.id,
          actions: [
            {
              icon: "ri-eye-line",
              className: "ti-btn-primary",
              onClick: () => openUserModal(user.id),
            },
            {
              icon: "ri-edit-line",
              className: "ti-btn-info",
              onClick: () => openUpdateModal(user.id),
            },
            {
              icon: "ri-delete-bin-line",
              className: "ti-btn-danger",
              onClick: () => openDeleteModal(user.id),
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

  const roleOptions = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  const headers = [
    { key: "profile", label: "Profile", sortable: false },
    { key: "name", label: "Name", sortable: true },
    { key: "contact", label: "Contact", sortable: false },
    { key: "totalCommission", label: "Total Commission", sortable: true },
    { key: "address", label: "Address", sortable: false },
    { key: "actions", label: "Actions", sortable: false },
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

  const handleUpdateInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, selectedOption: any) => {
    setUpdateFormData((prev) => ({
      ...prev,
      [name]: selectedOption.value,
    }));
  };

  const openUpdateModal = async (userId: string) => {
    try {
      setLoadingUserDetails(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      setUpdateFormData({
        name: userData.name || "",
        email: userData.email || "",
        mobileNumber: userData.mobileNumber || "",
        role: userData.role || "",
        status: userData.status || "",
        onboardingStatus: userData.onboardingStatus || "",
      });
      setUserIdToFetch(userId);
      setShowUpdateModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoadingUserDetails(false);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${Base_url}users/${userIdToFetch}`,
        updateFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers(); // Refresh the users list
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${Base_url}users/${userToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers(); // Refresh the users list
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDeleteModal = (userId: string) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
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
      <Modal
        isOpen={showUserModal}
        onClose={closeUserModal}
        title="User Details"
        loading={loadingUserDetails}
        footer={
          <button
            type="button"
            className="ti-btn ti-btn-light"
            onClick={closeUserModal}
          >
            Close
          </button>
        }
        fields={selectedUser ? [
          { label: "Name", value: selectedUser.name },
          { label: "Email", value: selectedUser.email },
          { label: "Mobile Number", value: selectedUser.mobileNumber },
          { label: "Role", value: selectedUser.role },
          { label: "Status", value: selectedUser.status },
          { label: "KYC Status", value: selectedUser.kycStatus },
          { label: "Onboarding Status", value: selectedUser.onboardingStatus },
          { label: "Total Commission", value: selectedUser.totalCommission },
          { label: "Total Leads", value: selectedUser.totalLeads },
          { label: "Total Sales", value: selectedUser.totalSales },
          { label: "Email Verified", value: selectedUser.isEmailVerified },
          { label: "Mobile Verified", value: selectedUser.isMobileVerified },
          { label: "Country", value: selectedUser.address?.country },
          { label: "Aadhaar Number", value: selectedUser.kycDetails?.aadhaarNumber },
          { label: "PAN Number", value: selectedUser.kycDetails?.panNumber },
          { label: "Aadhaar Verified", value: selectedUser.kycDetails?.aadhaarVerified },
          { label: "PAN Verified", value: selectedUser.kycDetails?.panVerified }
        ] : []}
      />

      {/* Update User Modal */}
      <FormModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        title="Update User"
        loading={loadingUserDetails}
        footer={
          <div className="flex gap-2">
            <button
              type="button"
              className="ti-btn ti-btn-light"
              onClick={() => setShowUpdateModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="ti-btn ti-btn-primary-full"
              onClick={handleUpdateSubmit}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </div>
        }
      >
        <form onSubmit={handleUpdateSubmit}>
          <div className="grid grid-cols-12 gap-2">
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="update-name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="update-name"
                name="name"
                value={updateFormData.name}
                onChange={handleUpdateInputChange}
                placeholder="Enter Name"
                required
              />
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="update-email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="update-email"
                name="email"
                value={updateFormData.email}
                onChange={handleUpdateInputChange}
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="update-mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="update-mobileNumber"
                name="mobileNumber"
                value={updateFormData.mobileNumber}
                onChange={handleUpdateInputChange}
                placeholder="Enter Mobile Number"
                required
              />
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="update-role" className="form-label">
                Role
              </label>
              <Select
                id="update-role"
                options={roleOptions}
                value={roleOptions.find(option => option.value === updateFormData.role)}
                onChange={(option) => handleSelectChange('role', option)}
                className="basic-single"
                classNamePrefix="select"
              />
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="update-status" className="form-label">
                Status
              </label>
              <Select
                id="update-status"
                options={StatusOptions}
                value={StatusOptions.find(option => option.value === updateFormData.status)}
                onChange={(option) => handleSelectChange('status', option)}
                className="basic-single"
                classNamePrefix="select"
              />
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="update-onboardingStatus" className="form-label">
                Onboarding Status
              </label>
              <Select
                id="update-onboardingStatus"
                options={OnboardingStatusOptions}
                value={OnboardingStatusOptions.find(option => option.value === updateFormData.onboardingStatus)}
                onChange={(option) => handleSelectChange('onboardingStatus', option)}
                className="basic-single"
                classNamePrefix="select"
              />
            </div>
          </div>
        </form>
      </FormModal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        loading={deleteLoading}
      />
    </Fragment>
  );
};

// Wrap the Users component with ProtectedRoute
export default function ProtectedUsers() {
    return (
        <ProtectedRoute>
            <Users />
        </ProtectedRoute>
    );
}
