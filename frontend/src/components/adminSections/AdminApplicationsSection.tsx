import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../apiConfig";
import { generateApplicationPDF } from "../../utils/pdfGenerator";

export const AdminApplicationsSection = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const statusFilter = searchParams.get("status") || "All Status";

    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [loanTypeFilter, setLoanTypeFilter] = useState("All Types");
    const [dateFilter, setDateFilter] = useState("All Time");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchApplications = async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            setApplications(response.data.data);
        } catch (error) {
            console.error("Error fetching applications:", error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}/status`, { status: newStatus });
            if (response.data.success) {
                toast.success("Status updated successfully");
                setApplications(prev => prev.map(app => app._id === id ? { ...app, status: newStatus } : app));
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            case 'Under Review': return 'bg-yellow-100 text-yellow-800';
            case 'Document Pending': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const toggleAll = () => {
        if (selectedRows.length === applications.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(applications.map(app => app._id));
        }
    };

    const toggleRow = (id: string) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    // const containerVariants = {
    //     hidden: { opacity: 0 },
    //     visible: {
    //         opacity: 1,
    //         transition: {
    //             staggerChildren: 0.1
    //         }
    //     }
    // };

    const filteredApplications = applications.filter(app => {
        const matchesStatus = statusFilter === "All Status" || app.status === statusFilter;
        const matchesLoanType = loanTypeFilter === "All Types" || app.loanType === loanTypeFilter;

        // Date match
        let matchesDate = true;
        if (dateFilter !== "All Time") {
            const appDate = new Date(app.createdAt);
            const now = new Date();
            if (dateFilter === "Last 7 days") {
                const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
                matchesDate = appDate >= sevenDaysAgo;
            } else if (dateFilter === "Last 30 days") {
                const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
                matchesDate = appDate >= thirtyDaysAgo;
            } else if (dateFilter === "Last 3 months") {
                const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
                matchesDate = appDate >= threeMonthsAgo;
            }
        }

        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = !searchTerm ||
            app.firstName.toLowerCase().includes(searchLower) ||
            app.lastName.toLowerCase().includes(searchLower) ||
            app.phone.includes(searchTerm) ||
            app.applicationId.toLowerCase().includes(searchLower);

        return matchesStatus && matchesLoanType && matchesDate && matchesSearch;
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter, loanTypeFilter, dateFilter, searchTerm]);

    const handleDownloadDocs = (app: any) => {
        try {
            generateApplicationPDF(app);
            toast.success("Report downloaded successfully!");
        } catch (error) {
            console.error("PDF Generation error:", error);
            toast.error("Failed to generate PDF report");
        }
    };

    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    const paginatedApplications = filteredApplications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-8 space-y-6"
        >
            {/* PageHeader */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
                <div>
                    <h2 className="text-slate-900 text-2xl font-bold font-inter">
                        Loan Application Management
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Review and process incoming loan requests
                    </p>
                </div>
            </motion.div>

            {/* FilterSection */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white border border-gray-200 mt-6 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <label className="text-slate-700 text-sm font-semibold block mb-2 font-inter">Search</label>
                        <div className="relative">
                            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                            <input
                                placeholder="Name, ID, or phone..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#C59D4F] focus:border-[#C59D4F] outline-none transition-all font-inter"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-slate-700 text-sm font-semibold block mb-2 font-inter">Status</label>
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === "All Status") {
                                        searchParams.delete("status");
                                    } else {
                                        searchParams.set("status", val);
                                    }
                                    setSearchParams(searchParams);
                                }}
                                className="w-full bg-slate-50 border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#C59D4F] outline-none appearance-none cursor-pointer font-inter"
                            >
                                <option>All Status</option>
                                <option>Under Review</option>
                                <option>Document Pending</option>
                                <option>Approved</option>
                                <option>Rejected</option>
                                <option>Disbursed</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg"></i>
                        </div>
                    </div>
                    <div>
                        <label className="text-slate-700 text-sm font-semibold block mb-2 font-inter">Loan Type</label>
                        <div className="relative">
                            <select
                                value={loanTypeFilter}
                                onChange={(e) => setLoanTypeFilter(e.target.value)}
                                className="w-full bg-slate-50 border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#C59D4F] outline-none appearance-none cursor-pointer font-inter"
                            >
                                <option value="All Types">All Types</option>
                                <option value="personal-loan">Personal Loan</option>
                                <option value="business-loan">Business Loan</option>
                                <option value="property-loan">Property Loan</option>
                                <option value="gold-loan">Gold Loan</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg"></i>
                        </div>
                    </div>
                    <div>
                        <label className="text-slate-700 text-sm font-semibold block mb-2 font-inter">Date Range</label>
                        <div className="relative">
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="w-full bg-slate-50 border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#C59D4F] outline-none appearance-none cursor-pointer font-inter"
                            >
                                <option value="All Time">All Time</option>
                                <option value="Last 7 days">Last 7 days</option>
                                <option value="Last 30 days">Last 30 days</option>
                                <option value="Last 3 months">Last 3 months</option>
                            </select>
                            <i className="ri-calendar-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg"></i>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div
                className="bg-white border border-gray-200 overflow-hidden rounded-xl shadow-sm"
            >
                {/* TableHeader */}
                <div className="border-gray-200 p-6 border-b border-solid bg-white">
                    <div className="items-center flex justify-between">
                        <h3 className="text-slate-900 text-lg font-semibold leading-7 font-inter">
                            Applications ({filteredApplications.length})
                        </h3>
                    </div>
                </div>

                {/* TableWrapper */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="align-middle">
                                <th className="font-bold text-left align-middle px-6 py-4">
                                    <input
                                        type="checkbox"
                                        className="accent-slate-900 h-4 w-4 cursor-pointer"
                                        checked={selectedRows.length === applications.length && applications.length > 0}
                                        onChange={toggleAll}
                                    />
                                </th>
                                <th className="text-gray-500 text-xs font-semibold tracking-wider leading-4 text-left uppercase align-middle px-6 py-4 font-inter">
                                    Application
                                </th>
                                <th className="text-gray-500 text-xs font-semibold tracking-wider leading-4 text-left uppercase align-middle px-6 py-4 font-inter">
                                    Applicant / Phone
                                </th>
                                <th className="text-gray-500 text-xs font-semibold tracking-wider leading-4 text-left uppercase align-middle px-6 py-4 font-inter">
                                    Loan Details
                                </th>
                                <th className="text-gray-500 text-xs font-semibold tracking-wider leading-4 text-left uppercase align-middle px-6 py-4 font-inter">
                                    Status
                                </th>
                                <th className="text-gray-500 text-xs font-semibold tracking-wider leading-4 text-left uppercase align-middle px-6 py-4 font-inter">
                                    Assigned To
                                </th>
                                <th className="text-gray-500 text-xs font-semibold tracking-wider leading-4 text-left uppercase align-middle px-6 py-4 text-right font-inter">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C59D4F]"></div>
                                            <p className="text-gray-500 mt-4 font-inter">Loading applications...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : paginatedApplications.length > 0 ? (
                                paginatedApplications.map((app) => (
                                    <tr
                                        key={app._id}
                                        className={`hover:bg-gray-50 transition-colors ${selectedRows.includes(app._id) ? 'bg-[#C59D4F]/20' : ''}`}
                                    >
                                        <td className="px-6 py-4 align-middle text-center">
                                            <input
                                                type="checkbox"
                                                className="accent-[#C59D4F] h-4 w-4 cursor-pointer"
                                                checked={selectedRows.includes(app._id)}
                                                onChange={() => toggleRow(app._id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-900 text-base font-bold font-inter uppercase">
                                                {app.applicationId}
                                            </div>
                                            <div className="text-gray-500 text-xs mt-1 font-inter">{formatDate(app.createdAt)}</div>
                                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-2 font-inter bg-blue-100 text-blue-800`}>
                                                Medium
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-900 text-base font-bold font-inter">{app.firstName} {app.lastName}</div>
                                            <div className="text-gray-500 text-sm mt-1 font-inter">{app.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-900 text-sm font-medium font-inter capitalize">{app.loanType}</div>
                                            <div className="text-slate-900 text-base font-bold mt-1 font-inter">
                                                ₹{new Intl.NumberFormat('en-IN').format(app.loanAmount)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="inline-block">
                                                <select
                                                    value={app.status}
                                                    onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                                                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border-none focus:ring-2 focus:ring-[#C59D4F] font-inter cursor-pointer transition-all ${getStatusClass(app.status)}`}
                                                >
                                                    <option value="Under Review">Under Review</option>
                                                    <option value="Document Pending">Document Pending</option>
                                                    <option value="Approved">Approved</option>
                                                    <option value="Rejected">Rejected</option>
                                                    <option value="Disbursed">Disbursed</option>
                                                </select>
                                            </div>
                                            <div className="text-gray-400 text-[10px] mt-2 block font-inter">
                                                Last update: {formatDate(app.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center mr-2">
                                                    <i className="ri-user-line text-slate-500 text-xs"></i>
                                                </div>
                                                <span className="text-slate-700 text-sm font-medium font-inter">{app.assignedTo}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => navigate(`/admin/applications/${app._id}`)}
                                                    title="View Details"
                                                    className="p-2 text-slate-600 hover:text-white hover:bg-slate-900 rounded-lg transition-all cursor-pointer shadow-sm"
                                                >
                                                    <i className="ri-eye-line text-lg"></i>
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin/applications/${app._id}`)}
                                                    title="Edit"
                                                    className="p-2 text-[#C59D4F] hover:text-white hover:bg-[#C59D4F] rounded-lg transition-all shadow-sm cursor-pointer"
                                                >
                                                    <i className="ri-edit-line text-lg"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDownloadDocs(app)}
                                                    title="Download Documents"
                                                    className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all shadow-sm cursor-pointer"
                                                >
                                                    <i className="ri-download-line text-lg"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center text-gray-500 font-inter">
                                        No applications found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="box-border border-gray-200 px-6 py-4 border-t border-solid bg-white">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-gray-700 text-sm leading-5 font-inter">
                            Showing {filteredApplications.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredApplications.length)} of {filteredApplications.length} results
                        </div>
                        <div className="items-center flex space-x-2">
                            <motion.button
                                whileHover={currentPage !== 1 ? { scale: 1.05, backgroundColor: "#f8fafc" } : {}}
                                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`text-sm border border-gray-300 px-4 py-2 rounded-lg transition-colors font-inter ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Previous
                            </motion.button>
                            <div className="flex space-x-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <motion.button
                                        key={i + 1}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`text-sm px-4 py-2 rounded-lg font-inter transition-all ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-md' : 'border border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        {i + 1}
                                    </motion.button>
                                ))}
                            </div>
                            <motion.button
                                whileHover={currentPage !== totalPages && totalPages !== 0 ? { scale: 1.05, backgroundColor: "#f8fafc" } : {}}
                                whileTap={currentPage !== totalPages && totalPages !== 0 ? { scale: 0.95 } : {}}
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className={`text-sm border border-gray-300 px-4 py-2 rounded-lg transition-colors font-inter ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Next
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
