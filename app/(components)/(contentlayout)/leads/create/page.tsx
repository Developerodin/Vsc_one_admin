"use client";
import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import axios from "axios";
import { Base_url } from "@/app/api/config/BaseUrl";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
  agent: string;
  customerName: string;
  email: string;
  mobileNumber: string;
  status:
    | "new"
    | "contacted"
    | "interested"
    | "followUp"
    | "qualified"
    | "proposal"
    | "negotiation"
    | "closed"
    | "lost";
  source: "direct" | "referral" | "website" | "social" | "other";
  products: Array<{
    product: string;
    status: "interested" | "proposed" | "sold" | "rejected";
    notes: string;
  }>;
  requirements: string;
  budget: {
    amount: number;
    currency: string;
  };
  followUps: Array<{
    date: Date;
    notes: string;
    status: "pending" | "completed" | "cancelled";
    agent: string;
  }>;
  documents: Array<{
    name: string;
    url: string;
    type: string;
    uploadedAt: Date;
  }>;
  notes: Array<{
    content: string;
    createdBy: string;
    createdAt: Date;
  }>;
  lastContact?: Date;
  nextFollowUp?: Date;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  tags: string[];
  metadata: {
    [key: string]: any;
  };
}

const CreateLead = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    agent: "",
    customerName: "",
    email: "",
    mobileNumber: "",
    status: "new",
    source: "direct",
    products: [],
    requirements: "",
    budget: {
      amount: 0,
      currency: "INR",
    },
    followUps: [],
    documents: [],
    notes: [],
    lastContact: new Date(),
    nextFollowUp: new Date(),
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
    tags: [],
    metadata: {},
  });

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    // Get current user ID from localStorage or context
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setCurrentUserId(user.id || "");
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.results);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_url}products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name: string, option: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: option.value,
    }));
  };

  const handleMultiSelectChange = (name: string, options: any[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: options.map((option) => option.value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate required fields
      if (
        !formData.agent ||
        !formData.customerName ||
        !formData.mobileNumber ||
        !formData.source
      ) {
        alert("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Validate email format if provided
      if (
        formData.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        alert("Please enter a valid email address");
        setLoading(false);
        return;
      }

      // Format the data to match the API structure
      const formattedData = {
        agent: formData.agent,
        customerName: formData.customerName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        status: formData.status,
        source: formData.source,
        products: formData.products.map((p) => ({
          product: p.product,
          status: p.status,
          notes: p.notes,
        })),
        requirements: formData.requirements,
        budget: {
          amount: Number(formData.budget.amount),
          currency: formData.budget.currency,
        },
        followUps: formData.followUps.map((f) => ({
          date: f.date.toISOString(),
          notes: f.notes,
          status: f.status,
          agent: f.agent,
        })),
        documents: formData.documents.map((d) => ({
          name: d.name,
          url: d.url,
          type: d.type,
          uploadedAt: d.uploadedAt.toISOString(),
        })),
        notes: formData.notes.map((n) => ({
          content: n.content,
          createdBy: n.createdBy,
          createdAt: n.createdAt.toISOString(),
        })),
        lastContact: formData.lastContact?.toISOString(),
        nextFollowUp: formData.nextFollowUp?.toISOString(),
        address: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          pincode: formData.address.pincode,
          country: formData.address.country,
        },
        tags: formData.tags,
        metadata: formData.metadata,
      };

      const token = localStorage.getItem("token");
      await axios.post(`${Base_url}leads`, formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/leads/leads");
    } catch (error: any) {
      console.error("Error creating lead:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Error creating lead. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const StatusOptions = [
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "interested", label: "Interested" },
    { value: "followUp", label: "Follow Up" },
    { value: "qualified", label: "Qualified" },
    { value: "proposal", label: "Proposal" },
    { value: "negotiation", label: "Negotiation" },
    { value: "closed", label: "Closed" },
    { value: "lost", label: "Lost" },
  ];

  const SourceOptions = [
    { value: "direct", label: "Direct" },
    { value: "referral", label: "Referral" },
    { value: "website", label: "Website" },
    { value: "social", label: "Social Media" },
    { value: "other", label: "Other" },
  ];

  const CurrencyOptions = [
    { value: "INR", label: "INR" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
  ];

  const TagOptions = [
    { value: "health", label: "Health" },
    { value: "insurance", label: "Insurance" },
    { value: "banking", label: "Banking" },
    { value: "loan", label: "Loan" },
  ];

  const ProductStatusOptions = [
    { value: "interested", label: "Interested" },
    { value: "proposed", label: "Proposed" },
    { value: "sold", label: "Sold" },
    { value: "rejected", label: "Rejected" },
  ];

  const FollowUpStatusOptions = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const tabs = [
    { id: 0, label: "Basic Info" },
    { id: 1, label: "Products" },
    { id: 2, label: "Requirements & Budget" },
    { id: 3, label: "Follow Ups" },
    { id: 4, label: "Documents" },
    { id: 5, label: "Notes" },
    { id: 6, label: "Address" },
    { id: 7, label: "Metadata" },
  ];

  if (initialLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <Fragment>
      <Seo title="Create Lead" />
      <Pageheader
        currentpage="Create Lead"
        activepage="Leads"
        mainpage="Leads"
      />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Create New Lead</h5>
            </div>
            <div className="box-body">
              <form onSubmit={handleSubmit}>
                <div className="flex border-b border-gray-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
                        activeTab === tab.id
                          ? "bg-primary text-white"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  {activeTab === 0 && (
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <label className="form-label">Customer Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleInputChange}
                          placeholder="Enter Customer Name"
                          required
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter Email"
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="form-label">Mobile Number *</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          placeholder="Enter Mobile Number"
                          required
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit mobile number"
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="form-label">Status *</label>
                        <Select
                          options={StatusOptions}
                          value={StatusOptions.find(
                            (option) => option.value === formData.status
                          )}
                          onChange={(option) =>
                            handleSelectChange("status", option)
                          }
                          placeholder="Select Status"
                          required
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="form-label">Source *</label>
                        <Select
                          options={SourceOptions}
                          value={SourceOptions.find(
                            (option) => option.value === formData.source
                          )}
                          onChange={(option) =>
                            handleSelectChange("source", option)
                          }
                          placeholder="Select Source"
                          required
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="form-label">Agent *</label>
                        <Select
                          options={users.map((user) => ({
                            value: user.id,
                            label: user.name,
                          }))}
                          value={
                            users.find((user) => user.id === formData.agent)
                              ? {
                                  value: formData.agent,
                                  label: users.find(
                                    (user) => user.id === formData.agent
                                  )?.name,
                                }
                              : null
                          }
                          onChange={(option) =>
                            handleSelectChange("agent", option)
                          }
                          placeholder="Select Agent"
                          required
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="form-label">Tags</label>
                        <Select
                          isMulti
                          options={TagOptions}
                          value={TagOptions.filter((option) =>
                            formData.tags.includes(option.value)
                          )}
                          onChange={(options) =>
                            handleMultiSelectChange("tags", options)
                          }
                          placeholder="Select Tags"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 1 && (
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <label className="form-label">Products</label>
                        <Select
                          isMulti
                          options={products.map((product) => ({
                            value: product.id,
                            label: product.name,
                          }))}
                          value={formData.products.map((p) => {
                            const product = products.find(
                              (prod) => prod.id === p.product
                            );
                            return {
                              value: p.product,
                              label: product?.name || "",
                            };
                          })}
                          onChange={(options) => {
                            setFormData((prev) => ({
                              ...prev,
                              products: options.map((option) => ({
                                product: option.value,
                                status: "interested",
                                notes: "",
                              })),
                            }));
                          }}
                          placeholder="Select Products"
                        />
                      </div>
                      {formData.products.map((product, index) => (
                        <div
                          key={index}
                          className="col-span-12 grid grid-cols-12 gap-4"
                        >
                          <div className="col-span-6">
                            <label className="form-label">Status</label>
                            <Select
                              options={ProductStatusOptions}
                              value={ProductStatusOptions.find(
                                (option) => option.value === product.status
                              )}
                              onChange={(option) => {
                                const newProducts = [...formData.products];
                                if (option) {
                                  newProducts[index].status = option.value as
                                    | "interested"
                                    | "proposed"
                                    | "sold"
                                    | "rejected";
                                  setFormData((prev) => ({
                                    ...prev,
                                    products: newProducts,
                                  }));
                                }
                              }}
                              placeholder="Select Status"
                            />
                          </div>
                          <div className="col-span-6">
                            <label className="form-label">Notes</label>
                            <input
                              type="text"
                              className="form-control"
                              value={product.notes}
                              onChange={(e) => {
                                const newProducts = [...formData.products];
                                newProducts[index].notes = e.target.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  products: newProducts,
                                }));
                              }}
                              placeholder="Enter Notes"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 2 && (
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <label className="form-label">Requirements</label>
                        <textarea
                          className="form-control"
                          name="requirements"
                          value={formData.requirements}
                          onChange={handleInputChange}
                          placeholder="Enter Requirements"
                          rows={4}
                        />
                      </div>
                      <div className="col-span-6">
                        <label className="form-label">Budget Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          name="budget.amount"
                          value={formData.budget.amount}
                          onChange={handleInputChange}
                          placeholder="Enter Amount"
                        />
                      </div>
                      <div className="col-span-6">
                        <label className="form-label">Currency</label>
                        <Select
                          options={CurrencyOptions}
                          value={CurrencyOptions.find(
                            (option) =>
                              option.value === formData.budget.currency
                          )}
                          onChange={(option) => {
                            if (option) {
                              setFormData((prev) => ({
                                ...prev,
                                budget: {
                                  ...prev.budget,
                                  currency: option.value,
                                },
                              }));
                            }
                          }}
                          placeholder="Select Currency"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 3 && (
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <button
                          type="button"
                          className="ti-btn ti-btn-primary"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              followUps: [
                                ...prev.followUps,
                                {
                                  date: new Date(),
                                  notes: "",
                                  status: "pending",
                                  agent: "",
                                },
                              ],
                            }));
                          }}
                        >
                          Add Follow Up
                        </button>
                      </div>
                      {formData.followUps.map((followUp, index) => (
                        <div
                          key={index}
                          className="col-span-12 grid grid-cols-12 gap-4"
                        >
                          <div className="col-span-3">
                            <label className="form-label">Date</label>
                            <DatePicker
                              selected={followUp.date}
                              onChange={(date) => {
                                const newFollowUps = [...formData.followUps];
                                newFollowUps[index].date = date || new Date();
                                setFormData((prev) => ({
                                  ...prev,
                                  followUps: newFollowUps,
                                }));
                              }}
                              className="form-control"
                            />
                          </div>
                          <div className="col-span-3">
                            <label className="form-label">Status</label>
                            <Select
                              options={FollowUpStatusOptions}
                              value={FollowUpStatusOptions.find(
                                (option) => option.value === followUp.status
                              )}
                              onChange={(option) => {
                                const newFollowUps = [...formData.followUps];
                                if (option) {
                                  newFollowUps[index].status = option.value as
                                    | "pending"
                                    | "completed"
                                    | "cancelled";
                                  setFormData((prev) => ({
                                    ...prev,
                                    followUps: newFollowUps,
                                  }));
                                }
                              }}
                              placeholder="Select Status"
                            />
                          </div>
                          <div className="col-span-3">
                            <label className="form-label">Agent</label>
                            <Select
                              options={users.map((user) => ({
                                value: user.id,
                                label: user.name,
                              }))}
                              value={
                                users.find((user) => user.id === followUp.agent)
                                  ? {
                                      value: followUp.agent,
                                      label: users.find(
                                        (user) => user.id === followUp.agent
                                      )?.name,
                                    }
                                  : null
                              }
                              onChange={(option) => {
                                const newFollowUps = [...formData.followUps];
                                newFollowUps[index].agent = option?.value || "";
                                setFormData((prev) => ({
                                  ...prev,
                                  followUps: newFollowUps,
                                }));
                              }}
                              placeholder="Select Agent"
                            />
                          </div>
                          <div className="col-span-3">
                            <label className="form-label">Notes</label>
                            <input
                              type="text"
                              className="form-control"
                              value={followUp.notes}
                              onChange={(e) => {
                                const newFollowUps = [...formData.followUps];
                                newFollowUps[index].notes = e.target.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  followUps: newFollowUps,
                                }));
                              }}
                              placeholder="Enter Notes"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 4 && (
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <button
                          type="button"
                          className="ti-btn ti-btn-primary"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              documents: [
                                ...prev.documents,
                                {
                                  name: "",
                                  url: "",
                                  type: "",
                                  uploadedAt: new Date(),
                                },
                              ],
                            }));
                          }}
                        >
                          Add Document
                        </button>
                      </div>
                      {formData.documents.map((document, index) => (
                        <div
                          key={index}
                          className="col-span-12 grid grid-cols-12 gap-4"
                        >
                          <div className="col-span-3">
                            <label className="form-label">Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={document.name}
                              onChange={(e) => {
                                const newDocuments = [...formData.documents];
                                newDocuments[index].name = e.target.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  documents: newDocuments,
                                }));
                              }}
                              placeholder="Enter Name"
                              required
                            />
                          </div>
                          <div className="col-span-3">
                            <label className="form-label">URL *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={document.url}
                              onChange={(e) => {
                                const newDocuments = [...formData.documents];
                                newDocuments[index].url = e.target.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  documents: newDocuments,
                                }));
                              }}
                              placeholder="Enter URL"
                              required
                            />
                          </div>
                          <div className="col-span-3">
                            <label className="form-label">Type *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={document.type}
                              onChange={(e) => {
                                const newDocuments = [...formData.documents];
                                newDocuments[index].type = e.target.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  documents: newDocuments,
                                }));
                              }}
                              placeholder="Enter Type"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 5 && (
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <button
                          type="button"
                          className="ti-btn ti-btn-primary"
                          onClick={() => {
                            if (!currentUserId) {
                              alert("User ID not found. Please log in again.");
                              return;
                            }
                            setFormData((prev) => ({
                              ...prev,
                              notes: [
                                ...prev.notes,
                                {
                                  content: "",
                                  createdBy: currentUserId,
                                  createdAt: new Date(),
                                },
                              ],
                            }));
                          }}
                        >
                          Add Note
                        </button>
                      </div>
                      {formData.notes.map((note, index) => (
                        <div key={index} className="col-span-12">
                          <label className="form-label">Note Content</label>
                          <textarea
                            className="form-control"
                            value={note.content}
                            onChange={(e) => {
                              const newNotes = [...formData.notes];
                              newNotes[index] = {
                                ...newNotes[index],
                                content: e.target.value,
                                createdBy: currentUserId,
                                createdAt: new Date(),
                              };
                              setFormData((prev) => ({
                                ...prev,
                                notes: newNotes,
                              }));
                            }}
                            placeholder="Enter Note Content"
                            rows={3}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 6 && (
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <label className="form-label">Street</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          placeholder="Enter Street"
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                          placeholder="Enter City"
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleInputChange}
                          placeholder="Enter State"
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="form-label">Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.pincode"
                          value={formData.address.pincode}
                          onChange={handleInputChange}
                          placeholder="Enter Pincode"
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.country"
                          value={formData.address.country}
                          onChange={handleInputChange}
                          placeholder="Enter Country"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 7 && (
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <button
                          type="button"
                          className="ti-btn ti-btn-primary"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              metadata: {
                                ...prev.metadata,
                                "": "",
                              },
                            }));
                          }}
                        >
                          Add Metadata
                        </button>
                      </div>
                      {Object.entries(formData.metadata).map(
                        ([key, value], index) => (
                          <div
                            key={index}
                            className="col-span-12 grid grid-cols-12 gap-4"
                          >
                            <div className="col-span-6">
                              <label className="form-label">Key</label>
                              <input
                                type="text"
                                className="form-control"
                                value={key}
                                onChange={(e) => {
                                  const newMetadata = { ...formData.metadata };
                                  delete newMetadata[key];
                                  newMetadata[e.target.value] = value;
                                  setFormData((prev) => ({
                                    ...prev,
                                    metadata: newMetadata,
                                  }));
                                }}
                                placeholder="Enter Key"
                              />
                            </div>
                            <div className="col-span-6">
                              <label className="form-label">Value</label>
                              <input
                                type="text"
                                className="form-control"
                                value={value}
                                onChange={(e) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    metadata: {
                                      ...prev.metadata,
                                      [key]: e.target.value,
                                    },
                                  }));
                                }}
                                placeholder="Enter Value"
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    className="ti-btn ti-btn-light hover:bg-gray-100"
                    onClick={() => router.push("/leads/leads")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ti-btn ti-btn-primary-full"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Lead"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default function ProtectedCreateLead() {
  return (
    <ProtectedRoute>
      <CreateLead />
    </ProtectedRoute>
  );
}
