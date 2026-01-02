import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../apiConfig";
import { generateApplicationPDF } from "../../utils/pdfGenerator";

export const AdminApplicationDetailSection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Overview");
    const [application, setApplication] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [noteText, setNoteText] = useState("");
    const [noteCategory, setNoteCategory] = useState("General");
    const [isSubmittingNote, setIsSubmittingNote] = useState(false);
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);
    const [docName, setDocName] = useState("");
    const [docCategory, setDocCategory] = useState("Aadhar Card");
    const [isUploadingDoc, setIsUploadingDoc] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [previewDoc, setPreviewDoc] = useState<any>(null);

    const fetchApplication = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            setApplication(response.data.data);
        } catch (error) {
            console.error("Error fetching application details:", error);
            toast.error("Failed to load application details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchApplication();
    }, [id]);

    const handleStatusUpdate = async (newStatus: string) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}/status`, { status: newStatus });
            if (response.data.success) {
                toast.success("Status updated successfully");
                setApplication(response.data.data);
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleAddNote = async () => {
        if (!noteText.trim()) return;
        setIsSubmittingNote(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/${id}/notes`, {
                text: noteText,
                role: noteCategory,
                user: "Rajesh Kumar", // Hardcoded for demo, usually from Auth
                color: noteCategory === "Risk Assessment" ? "bg-slate-700" : "bg-blue-600"
            });
            if (response.data.success) {
                toast.success("Note added successfully");
                setApplication(response.data.data);
                setNoteText("");
            }
        } catch (error) {
            console.error("Error adding note:", error);
            toast.error("Failed to add note");
        } finally {
            setIsSubmittingNote(false);
        }
    };

    const handleDeleteNote = async (noteId: string) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}/notes/${noteId}`);
            if (response.data.success) {
                toast.success("Note deleted successfully");
                setApplication(response.data.data);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            toast.error("Failed to delete note");
        }
    };

    const handleDownloadReport = () => {
        if (!application) return;
        try {
            generateApplicationPDF(application);
            toast.success("Report downloaded!");
        } catch (error) {
            console.error("PDF error:", error);
            toast.error("Failed to generate report");
        }
    };

    const handleAddDocument = async (e: React.FormEvent) => {
        e.preventDefault();
        const fileInput = document.getElementById('docFile') as HTMLInputElement;
        const file = fileInput?.files?.[0];

        if (!docName || !file) {
            toast.error("Please provide document name and select a file");
            return;
        }

        setIsUploadingDoc(true);
        try {
            // Convert file to Base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64String = reader.result as string;

                const response = await axios.post(`${API_BASE_URL}/${id}/documents`, {
                    name: docName,
                    category: docCategory,
                    url: base64String
                });

                if (response.data.success) {
                    toast.success("Document added successfully");
                    setApplication(response.data.data);
                    setIsDocModalOpen(false);
                    setDocName("");
                    setDocCategory("Aadhar Card");
                }
            };
        } catch (error) {
            console.error("Error uploading document:", error);
            toast.error("Failed to upload document");
        } finally {
            setIsUploadingDoc(false);
        }
    };

    const handleDeleteDocument = async (docId: string) => {
        if (!window.confirm("Are you sure you want to delete this document?")) return;

        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}/documents/${docId}`);
            if (response.data.success) {
                toast.success("Document deleted successfully");
                setApplication(response.data.data);
            }
        } catch (error) {
            console.error("Error deleting document:", error);
            toast.error("Failed to delete document");
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

    const tabs = [
        { name: "Overview", icon: "ri-information-line" },
        { name: "Documents", icon: "ri-file-list-3-line" },
        { name: "Internal Notes", icon: "ri-chat-history-line" },
        { name: "Status History", icon: "ri-history-line" }
    ];

    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-8 space-y-6"
        >
            {/* HeaderSection */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div className="items-center box-border  flex">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/admin/applications")}
                        className="bg-white border border-gray-300  block text-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
                    >
                        <i className="ri-arrow-left-line text-gray-600 text-xl font-remixicon"></i>
                    </motion.button>
                    <div className="box-border  ml-4">
                        <h2 className="text-slate-900 text-2xl font-bold box-border  leading-8 font-inter">
                            Application Details
                        </h2>
                        <p className="text-gray-600 box-border  mt-1 font-inter uppercase">
                            ID: {application?.applicationId || "N/A"} • {application?.firstName} {application?.lastName}
                        </p>
                    </div>
                </div>
                {/* StatusAndActions */}
                <div className="items-center box-border  flex gap-3">
                    <button
                        onClick={handleDownloadReport}
                        className="text-white text-sm font-semibold bg-[#C59D4F] px-4 py-2 rounded-lg hover:bg-[#B38C3D] transition-colors cursor-pointer font-inter shadow-sm flex items-center"
                    >
                        <i className="ri-download-line mr-2"></i>
                        Download Report
                    </button>
                    <select
                        value={application?.status || "Under Review"}
                        onChange={(e) => handleStatusUpdate(e.target.value)}
                        className="text-sm bg-white  block leading-[normal] border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#C59D4F] font-inter transition-all cursor-pointer"
                    >
                        <option value="Under Review">Under Review</option>
                        <option value="Document Pending">Document Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Disbursed">Disbursed</option>
                    </select>
                </div>
            </motion.div>

            {loading ? (
                <div className="flex justify-center items-center py-40 bg-white rounded-xl border border-gray-200">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C59D4F]"></div>
                </div>
            ) : (
                <>
                    {/* ApplicationStats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white box-border  border border-gray-200 p-6 rounded-xl border-solid shadow-sm"
                    >
                        <div className="box-border  gap-x-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6">
                            <div className="box-border ">
                                <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 font-inter">
                                    Loan Amount
                                </div>
                                <div className="text-slate-900 text-2xl font-bold box-border  font-inter">
                                    ₹{new Intl.NumberFormat('en-IN').format(application?.loanAmount || 0)}
                                </div>
                            </div>
                            <div className="box-border ">
                                <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 font-inter">
                                    Loan Type
                                </div>
                                <div className="text-slate-900 text-lg font-semibold box-border  font-inter capitalize">
                                    {application?.loanType || "N/A"}
                                </div>
                            </div>
                            <div className="box-border ">
                                <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 font-inter">
                                    Current Status
                                </div>
                                <div>
                                    <span className={`${getStatusClass(application?.status)} text-xs font-bold box-border  inline-flex leading-none px-3 py-1.5 rounded-full uppercase tracking-wider font-inter`}>
                                        {application?.status || "N/A"}
                                    </span>
                                </div>
                            </div>
                            <div className="box-border ">
                                <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 font-inter">
                                    Assigned To
                                </div>
                                <div className="flex items-center">
                                    <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center mr-2">
                                        <i className="ri-user-line text-slate-500 text-sm"></i>
                                    </div>
                                    <span className="text-slate-900 text-base font-semibold box-border  font-inter">
                                        {application?.assignedTo || "Unassigned"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden min-h-[500px]"
            >
                <div className="border-b border-gray-200 bg-gray-50/50">
                    <nav className="flex overflow-x-auto no-scrollbar scroll-smooth">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex items-center space-x-2 py-4 px-6 text-sm font-semibold transition-all duration-200 border-b-2 whitespace-nowrap cursor-pointer font-inter
                                    ${activeTab === tab.name
                                        ? "text-[#C59D4F] border-[#C59D4F] bg-white"
                                        : "text-gray-500 border-transparent hover:text-slate-900 hover:bg-gray-100"}`}
                            >
                                <i className={`${tab.icon} ${activeTab === tab.name ? "text-[#C59D4F]" : "text-gray-400"}`}></i>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6 md:p-8">
                    <AnimatePresence mode="wait">
                        {activeTab === "Overview" && (
                            <motion.div
                                key="overview"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-8"
                            >
                                <div className="box-border  gap-x-12 lg:gap-x-24 grid grid-cols-1 md:grid-cols-2 gap-y-10">
                                    <div className="box-border ">
                                        <h3 className="text-slate-900 text-lg font-semibold box-border  leading-7 font-inter border-b border-gray-100 pb-3 mb-5">
                                            Personal Details
                                        </h3>
                                        <div className="box-border  space-y-4">
                                            {[
                                                { label: "Full Name:", value: `${application?.firstName} ${application?.lastName}` },
                                                { label: "Phone:", value: application?.phone },
                                                { label: "Email:", value: application?.email },
                                                { label: "Date of Birth:", value: new Date(application?.dob).toLocaleDateString() },
                                                { label: "PAN Number:", value: application?.pan, className: "uppercase tracking-wider" },
                                                { label: "Aadhar Number:", value: application?.aadhar }
                                            ].map((item, i) => (
                                                <div key={i} className="box-border  flex justify-between items-center group">
                                                    <span className="text-gray-500 text-sm font-medium font-inter">{item.label}</span>
                                                    <span className={`text-slate-900 font-semibold md:text-base font-inter ${item.className || ""}`}>{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="box-border ">
                                        <h3 className="text-slate-900 text-lg font-semibold box-border  leading-7 font-inter border-b border-gray-100 pb-3 mb-5">
                                            Employment Details
                                        </h3>
                                        <div className="box-border  space-y-4">
                                            {[
                                                { label: "Employment Type:", value: application?.employmentType, className: "capitalize" },
                                                { label: "Company:", value: application?.companyName || "N/A" },
                                                { label: "Designation:", value: application?.designation || "N/A", className: "text-right" },
                                                { label: "Experience:", value: application?.experience ? `${application.experience} years` : "N/A" },
                                                { label: "Monthly Income:", value: `₹${new Intl.NumberFormat('en-IN').format(application?.income || 0)}` },
                                                { label: "Existing EMI:", value: `₹${new Intl.NumberFormat('en-IN').format(application?.existingEmi || 0)}` }
                                            ].map((item, i) => (
                                                <div key={i} className="box-border  flex justify-between items-center">
                                                    <span className="text-gray-500 text-sm font-medium font-inter">{item.label}</span>
                                                    <span className={`text-slate-900 font-semibold md:text-base font-inter ${item.className || ""}`}>{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="box-border ">
                                        <h3 className="text-slate-900 text-lg font-semibold box-border  leading-7 mb-3 font-inter border-b border-gray-100 pb-3">
                                            Address
                                        </h3>
                                        <p className="text-slate-700 font-medium font-inter">
                                            {application?.address}, {application?.city}, {application?.state} - {application?.pinCode}
                                        </p>
                                    </div>
                                    <div className="box-border ">
                                        <h3 className="text-slate-900 text-lg font-semibold box-border  leading-7 mb-3 font-inter border-b border-gray-100 pb-3">
                                            Loan Purpose
                                        </h3>
                                        <p className="text-slate-700 font-medium font-inter capitalize">
                                            {application?.purpose?.replace(/-/g, ' ')}
                                        </p>
                                    </div>
                                </div>
                                <div className="box-border  pt-8">
                                    <h3 className="text-slate-900 text-lg font-semibold box-border  leading-7 mb-5 font-inter border-b border-gray-100 pb-3">
                                        Banking Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {[
                                            { label: "Bank Name", value: application?.bankName },
                                            { label: "Account Number", value: application?.accountNumber },
                                            { label: "IFSC Code", value: application?.ifsc, className: "uppercase" }
                                        ].map((item, i) => (
                                            <div key={i} className="box-border ">
                                                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-1 font-inter">{item.label}</span>
                                                <span className={`text-slate-900 font-bold font-inter ${item.className || ""}`}>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {activeTab === "Documents" && (
                            <motion.div
                                key="documents"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <h3 className="text-slate-900 text-lg font-semibold font-inter">Uploaded Documents</h3>
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        whileTap={{ y: 0 }}
                                        onClick={() => setIsDocModalOpen(true)}
                                        className="text-white text-sm font-semibold bg-[#C59D4F] px-4 py-2 rounded-lg hover:bg-[#B38C3D] transition-colors cursor-pointer border border-[#C59D4F] w-full md:w-auto font-inter flex items-center justify-center"
                                    >
                                        <i className="ri-add-line mr-2"></i>
                                        Add Document
                                    </motion.button>
                                </div>
                                <div className="space-y-3">
                                    {(application?.documents && application.documents.length > 0) ? (
                                        application.documents.map((doc: any, idx: number) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ scale: 1.01, borderColor: "#FB923C" }}
                                                className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl transition-all gap-4 group cursor-pointer"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="h-10 w-10 bg-slate-900 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#B38C3D] transition-colors">
                                                        <i className="ri-file-text-line text-white text-xl"></i>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-slate-900 font-semibold text-sm truncate font-inter">{doc.name}</h4>
                                                        <p className="text-gray-500 text-xs mt-1 truncate font-inter">
                                                            {doc.category} • Uploaded {formatDate(doc.date)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between lg:justify-end lg:space-x-6 gap-3">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 font-inter ${doc.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                        {doc.status}
                                                    </span>
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => {
                                                                setPreviewDoc(doc);
                                                                setIsPreviewModalOpen(true);
                                                            }}
                                                            title="View"
                                                            className="p-2 text-gray-500 hover:text-slate-900 hover:bg-white rounded-md transition-all shadow-sm border border-transparent hover:border-gray-200 cursor-pointer"
                                                        >
                                                            <i className="ri-eye-line text-lg"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteDocument(doc._id)}
                                                            title="Delete"
                                                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-all shadow-sm border border-transparent hover:border-red-200 cursor-pointer"
                                                        >
                                                            <i className="ri-delete-bin-line text-lg"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500 font-inter">
                                            No documents uploaded yet.
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                        {activeTab === "Internal Notes" && (
                            <motion.div
                                key="notes"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-slate-900 text-lg font-semibold font-inter">Add Internal Note</h3>
                                    <div className="space-y-3">
                                        <div className="w-full md:w-48">
                                            <select
                                                value={noteCategory}
                                                onChange={(e) => setNoteCategory(e.target.value)}
                                                className="w-full text-sm bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#C59D4F] transition-all font-inter cursor-pointer"
                                            >
                                                <option value="General">General</option>
                                                <option value="Document Review">Document Review</option>
                                                <option value="Risk Assessment">Risk Assessment</option>
                                                <option value="Financial Check">Financial Check</option>
                                            </select>
                                        </div>
                                        <textarea
                                            value={noteText}
                                            onChange={(e) => setNoteText(e.target.value)}
                                            className="w-full h-32 text-sm bg-gray-50 border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#C59D4F] transition-all resize-none font-inter"
                                            placeholder="Add your note here..."
                                        ></textarea>
                                        <motion.button
                                            whileHover={{ y: -2 }}
                                            whileTap={{ y: 0 }}
                                            onClick={handleAddNote}
                                            disabled={isSubmittingNote || !noteText.trim()}
                                            className="text-white text-sm font-semibold bg-[#C59D4F] hover:bg-[#B38C3D] px-6 py-2.5 rounded-lg  transition-colors shadow-sm shadow-[#C59D4F] font-inter disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmittingNote ? "Adding..." : "Add Note"}
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-6 border-t border-gray-100">
                                    {(application?.notes && application.notes.length > 0) ? (
                                        application.notes.slice().reverse().map((note: any, idx: number) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ scale: 1.01 }}
                                                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`h-8 w-8 ${note.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                                            {note.user.split(' ').map((n: string) => n[0]).join('')}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-sm font-semibold text-slate-900 truncate font-inter">{note.user}</div>
                                                            <div className="text-gray-500 text-[11px] mt-0.5 font-inter">{formatDate(note.date)}</div>
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-md self-start sm:self-center font-inter">
                                                        {note.role}
                                                    </span>
                                                </div>
                                                <p className="text-slate-700 text-sm leading-relaxed font-inter">
                                                    {note.text}
                                                </p>
                                                <div className="flex justify-end mt-3">
                                                    <button
                                                        onClick={() => handleDeleteNote(note._id)}
                                                        className="px-4 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 cursor-pointer shadow-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 text-gray-500 font-inter">
                                            No notes added yet.
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                        {activeTab === "Status History" && (
                            <motion.div
                                key="history"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6"
                            >
                                <h3 className="text-slate-900 text-lg font-semibold font-inter">Status Timeline</h3>
                                <div className="relative pl-6 space-y-10">
                                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
                                    {(application?.statusHistory && application.statusHistory.length > 0) ? (
                                        application.statusHistory.slice().reverse().map((item: any, idx: number) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="relative"
                                            >
                                                <div className="absolute -left-[22px] top-1.5 h-6 w-6 rounded-full bg-white border-4 border-[#C59D4F] flex items-center justify-center z-10 shadow-sm">
                                                    <i className="ri-history-line text-[10px] text-[#B38C3D]"></i>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                    <div>
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C59D4F]/20 text-[#B38C3D] font-inter">
                                                            {item.status}
                                                        </span>
                                                        <span className="ml-2 text-sm font-medium text-gray-500 font-inter">by {item.actor}</span>
                                                        <p className="text-gray-500 text-xs mt-2 font-inter">{item.description}</p>
                                                    </div>
                                                    <div className="text-gray-400 text-xs font-medium shrink-0 font-inter">
                                                        {formatDate(item.date)}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="text-gray-500 text-sm font-inter">
                                            No status history available.
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Add Document Modal */}
            <AnimatePresence>
                {isDocModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-[#111F3B] p-6 text-white flex justify-between items-center">
                                <h3 className="text-xl font-bold font-inter">Add Additional Document</h3>
                                <button
                                    onClick={() => setIsDocModalOpen(false)}
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    <i className="ri-close-line text-2xl"></i>
                                </button>
                            </div>

                            <form onSubmit={handleAddDocument} className="p-6 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block font-inter">
                                        Document Name
                                    </label>
                                    <input
                                        type="text"
                                        value={docName}
                                        onChange={(e) => setDocName(e.target.value)}
                                        placeholder="e.g., Aadhar Front"
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#C59D4F]/50 focus:border-[#C59D4F] transition-all font-inter"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block font-inter">
                                        Category
                                    </label>
                                    <select
                                        value={docCategory}
                                        onChange={(e) => setDocCategory(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#C59D4F]/50 focus:border-[#C59D4F] transition-all font-inter cursor-pointer"
                                    >
                                        <option value="Aadhar Card">Aadhar Card</option>
                                        <option value="PAN Card">PAN Card</option>
                                        <option value="Voter ID">Voter ID</option>
                                        <option value="Income Proof">Income Proof</option>
                                        <option value="Address Proof">Address Proof</option>
                                        <option value="Employment Proof">Employment Proof</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block font-inter">
                                        Upload File
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="docFile"
                                            accept="image/*,.pdf"
                                            className="hidden"
                                            onChange={(e) => {
                                                const fileName = e.target.files?.[0]?.name;
                                                const label = document.getElementById('file-label');
                                                if (label && fileName) label.innerText = fileName;
                                            }}
                                            required
                                        />
                                        <label
                                            htmlFor="docFile"
                                            id="file-label"
                                            className="w-full bg-slate-50 border border-dashed border-slate-300 px-4 py-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all text-gray-500 font-inter"
                                        >
                                            <i className="ri-upload-cloud-2-line text-3xl mb-2 text-[#C59D4F]"></i>
                                            <span className="text-sm">Click to choose or drag & drop</span>
                                            <span className="text-[10px] mt-1">PDF, JPG, PNG (Max 5MB)</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsDocModalOpen(false)}
                                        className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all font-inter"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUploadingDoc}
                                        className="flex-1 px-4 py-2.5 bg-[#C59D4F] text-white font-bold rounded-xl hover:bg-[#B38C3D] shadow-lg shadow-[#C59D4F]/20 transition-all disabled:opacity-50 font-inter"
                                    >
                                        {isUploadingDoc ? (
                                            <span className="flex items-center justify-center">
                                                <i className="ri-loader-4-line animate-spin mr-2"></i>
                                                Uploading...
                                            </span>
                                        ) : "Upload Document"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Document Preview Modal */}
            <AnimatePresence>
                {isPreviewModalOpen && previewDoc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-[#111F3B] p-4 text-white flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <i className="ri-file-text-line text-xl text-[#C59D4F]"></i>
                                    <div>
                                        <h3 className="text-lg font-bold font-inter leading-none">{previewDoc.name}</h3>
                                        <p className="text-white/60 text-[10px] mt-1 uppercase tracking-wider">{previewDoc.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = previewDoc.url;
                                            link.download = previewDoc.name;
                                            link.click();
                                        }}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                        title="Download"
                                    >
                                        <i className="ri-download-line text-xl"></i>
                                    </button>
                                    <button
                                        onClick={() => setIsPreviewModalOpen(false)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors font-bold"
                                    >
                                        <i className="ri-close-line text-2xl"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-auto bg-gray-100 p-4 flex items-center justify-center">
                                {previewDoc.url.startsWith('data:image/') ? (
                                    <img
                                        src={previewDoc.url}
                                        alt={previewDoc.name}
                                        className="max-w-full h-auto rounded-lg shadow-md"
                                    />
                                ) : previewDoc.url.startsWith('data:application/pdf') || previewDoc.url.includes('.pdf') ? (
                                    <iframe
                                        src={previewDoc.url}
                                        className="w-full h-[70vh] rounded-lg"
                                        title="PDF Preview"
                                    ></iframe>
                                ) : (
                                    <div className="text-gray-500 font-inter">Preview not available for this file type.</div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
