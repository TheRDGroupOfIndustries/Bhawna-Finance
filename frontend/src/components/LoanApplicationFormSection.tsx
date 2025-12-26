import { useState } from "react";
import { Search, ChevronRight, ChevronLeft, Check, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const LOAN_TYPES = [
    {
        id: "personal",
        title: "Personal Loan",
        rate: "Starting from 10.99%",
        max: "Max: ₹25,00,000",
    },
    {
        id: "business",
        title: "Business Loan",
        rate: "Starting from 12.99%",
        max: "Max: ₹5,00,00,000",
    },
    {
        id: "property",
        title: "Loan Against Property",
        rate: "Starting from 9.99%",
        max: "Max: 70% of property value",
    },
    {
        id: "gold",
        title: "Gold Loan",
        rate: "Starting from 8.99%",
        max: "Max: 75% of gold value",
    },
];

export const LoanApplicationFormSection = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        loanType: "personal",
        loanAmount: "",
        tenure: "",
        purpose: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        pan: "",
        aadhar: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        employmentType: "",
        companyName: "",
        designation: "",
        experience: "",
        income: "",
        existingEmi: "",
        bankName: "",
        accountNumber: "",
        ifsc: "",
    });

    const updateFormData = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const steps = [
        { id: 1, label: "Loan Details", sub: "Choose loan type and amount" },
        { id: 2, label: "Personal Information", sub: "Basic personal details" },
        { id: 3, label: "Employment Details", sub: "Income and employment info" },
        { id: 4, label: "Bank Details", sub: "Banking information" },
        { id: 5, label: "Review & Submit", sub: "Verify and submit application" },
    ];

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="text-slate-900 text-sm font-semibold block mb-4">Select Loan Type</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {LOAN_TYPES.map((loan) => (
                                    <motion.div
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.98 }}
                                        key={loan.id}
                                        onClick={() => updateFormData("loanType", loan.id)}
                                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.loanType === loan.id
                                            ? "bg-orange-400/10 border-orange-400 shadow-md"
                                            : "bg-white border-gray-100 hover:border-orange-200"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-slate-900">{loan.title}</h4>
                                                <p className="text-orange-500 font-semibold text-sm mt-1">{loan.rate}</p>
                                                <p className="text-gray-400 text-xs mt-1">{loan.max}</p>
                                            </div>
                                            {formData.loanType === loan.id && (
                                                <div className="bg-orange-400 rounded-full p-1">
                                                    <Check size={12} className="text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Loan Amount (₹)</label>
                                <input
                                    type="number"
                                    value={formData.loanAmount}
                                    onChange={(e) => updateFormData("loanAmount", e.target.value)}
                                    placeholder="Enter loan amount"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Tenure (Months)</label>
                                <select
                                    value={formData.tenure}
                                    onChange={(e) => updateFormData("tenure", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm bg-white transition-all"
                                >
                                    <option value="">Select tenure</option>
                                    {[12, 24, 36, 48, 60, 72, 84].map((m) => (
                                        <option key={m} value={m}>{m} months</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm font-semibold block mb-2">Purpose of Loan</label>
                            <select
                                value={formData.purpose}
                                onChange={(e) => updateFormData("purpose", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm bg-white transition-all"
                            >
                                <option value="">Select purpose</option>
                                <option value="debt-consolidation">Debt Consolidation</option>
                                <option value="home-renovation">Home Renovation</option>
                                <option value="medical-expenses">Medical Expenses</option>
                                <option value="education">Education</option>
                                <option value="wedding">Wedding</option>
                                <option value="business-expansion">Business Expansion</option>
                            </select>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">First Name</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => updateFormData("firstName", e.target.value)}
                                    placeholder="Enter first name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Last Name</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => updateFormData("lastName", e.target.value)}
                                    placeholder="Enter last name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateFormData("email", e.target.value)}
                                    placeholder="Enter email address"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => updateFormData("phone", e.target.value)}
                                    placeholder="Enter phone number"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    value={formData.dob}
                                    onChange={(e) => updateFormData("dob", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">PAN Number</label>
                                <input
                                    type="text"
                                    value={formData.pan}
                                    onChange={(e) => updateFormData("pan", e.target.value.toUpperCase())}
                                    placeholder="ABCDE1234F"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Aadhar Number</label>
                                <input
                                    type="text"
                                    value={formData.aadhar}
                                    onChange={(e) => updateFormData("aadhar", e.target.value)}
                                    placeholder="1234 5678 9012"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm font-semibold block mb-2">Full Address</label>
                            <textarea
                                value={formData.address}
                                onChange={(e) => updateFormData("address", e.target.value)}
                                placeholder="Enter complete address"
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm resize-none transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">City</label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => updateFormData("city", e.target.value)}
                                    placeholder="Enter city"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">State</label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => updateFormData("state", e.target.value)}
                                    placeholder="Enter state"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">PIN Code</label>
                                <input
                                    type="text"
                                    value={formData.pinCode}
                                    onChange={(e) => updateFormData("pinCode", e.target.value)}
                                    placeholder="Enter PIN code"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Employment Type</label>
                                <select
                                    value={formData.employmentType}
                                    onChange={(e) => updateFormData("employmentType", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm bg-white transition-all"
                                >
                                    <option value="">Select type</option>
                                    <option value="salaried">Salaried</option>
                                    <option value="self-employed">Self Employed</option>
                                    <option value="freelancer">Freelancer</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Company Name</label>
                                <input
                                    type="text"
                                    value={formData.companyName}
                                    onChange={(e) => updateFormData("companyName", e.target.value)}
                                    placeholder="Enter company name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Designation</label>
                                <input
                                    type="text"
                                    value={formData.designation}
                                    onChange={(e) => updateFormData("designation", e.target.value)}
                                    placeholder="Enter designation"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Work Experience (Years)</label>
                                <select
                                    value={formData.experience}
                                    onChange={(e) => updateFormData("experience", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm bg-white transition-all"
                                >
                                    <option value="">Select experience</option>
                                    {["0-1", "1-3", "3-5", "5-10", "10+"].map((exp) => (
                                        <option key={exp} value={exp}>{exp} years</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Monthly Income (₹)</label>
                                <input
                                    type="number"
                                    value={formData.income}
                                    onChange={(e) => updateFormData("income", e.target.value)}
                                    placeholder="Enter monthly income"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Existing Loan EMI (₹)</label>
                                <input
                                    type="number"
                                    value={formData.existingEmi}
                                    onChange={(e) => updateFormData("existingEmi", e.target.value)}
                                    placeholder="Enter existing EMI (0 if none)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="text-slate-900 text-sm font-semibold block mb-2">Bank Name</label>
                            <input
                                type="text"
                                value={formData.bankName}
                                onChange={(e) => updateFormData("bankName", e.target.value)}
                                placeholder="Enter bank name"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Account Number</label>
                                <input
                                    type="text"
                                    value={formData.accountNumber}
                                    onChange={(e) => updateFormData("accountNumber", e.target.value)}
                                    placeholder="Enter account number"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">IFSC Code</label>
                                <input
                                    type="text"
                                    value={formData.ifsc}
                                    onChange={(e) => updateFormData("ifsc", e.target.value.toUpperCase())}
                                    placeholder="Enter IFSC code"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none text-sm transition-all"
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            case 5:
                return (
                    <motion.div
                        key="step5"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-8"
                    >
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-inner">
                            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                                <div className="bg-orange-400 rounded-full p-1 mr-3">
                                    <Check className="text-white" size={18} />
                                </div>
                                Application Summary
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                                <div>
                                    <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">Loan Details</h4>
                                    <div className="space-y-3">
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">Type</span>
                                            <span className="font-semibold">{LOAN_TYPES.find(l => l.id === formData.loanType)?.title}</span>
                                        </p>
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">Amount</span>
                                            <span className="font-semibold">₹{formData.loanAmount}</span>
                                        </p>
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">Tenure</span>
                                            <span className="font-semibold">{formData.tenure} months</span>
                                        </p>
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">Purpose</span>
                                            <span className="font-semibold capitalize">{formData.purpose.replace(/-/g, ' ')}</span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">Personal Details</h4>
                                    <div className="space-y-3">
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">Name</span>
                                            <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
                                        </p>
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">Email</span>
                                            <span className="font-semibold truncate ml-2">{formData.email}</span>
                                        </p>
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">Phone</span>
                                            <span className="font-semibold">{formData.phone}</span>
                                        </p>
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">PAN</span>
                                            <span className="font-semibold">{formData.pan}</span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">Employment</h4>
                                    <div className="space-y-3">
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">Type</span>
                                            <span className="font-semibold capitalize">{formData.employmentType}</span>
                                        </p>
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">Company</span>
                                            <span className="font-semibold">{formData.companyName}</span>
                                        </p>
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">Income</span>
                                            <span className="font-semibold">₹{formData.income}/mo</span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">Bank Details</h4>
                                    <div className="space-y-3">
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">Bank</span>
                                            <span className="font-semibold">{formData.bankName}</span>
                                        </p>
                                        <p className="text-sm flex justify-between border-b border-slate-200 pb-2">
                                            <span className="text-gray-500">IFSC</span>
                                            <span className="font-semibold">{formData.ifsc}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 border border-orange-100 p-5 rounded-2xl flex items-start">
                            <div className="bg-orange-100 rounded-full p-2 mr-4 mt-0.5">
                                <Search size={18} className="text-orange-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-orange-800">Important Information:</h4>
                                <ul className="text-xs text-orange-700/80 mt-2 space-y-1.5 list-disc ml-4">
                                    <li>Your application will be processed within 24-48 business hours</li>
                                    <li>Track status using Application ID sent to your email</li>
                                    <li>Keep original documents ready for physical verification</li>
                                    <li>Disbursement subject to final verification and credit check</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="bg-slate-50 py-16">
            <div className="max-w-4xl mx-auto px-8">
                <div className="mb-12">
                    <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
                        {steps.map((step, idx) => (
                            <div key={step.id} className={`${idx < steps.length - 1 ? "flex-1" : ""} flex items-center`}>
                                <div className="relative flex flex-col items-center">
                                    <motion.div
                                        animate={{
                                            backgroundColor: currentStep >= step.id ? "#FB923C" : "#FFFFFF",
                                            borderColor: currentStep >= step.id ? "#FB923C" : "#E2E8F0",
                                            color: currentStep >= step.id ? "#FFFFFF" : "#94A3B8"
                                        }}
                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-shadow duration-300 ${currentStep === step.id ? "shadow-lg ring-4 ring-orange-100" : ""}`}
                                    >
                                        {currentStep > step.id ? <Check size={20} strokeWidth={3} /> : <span className="text-sm md:text-lg font-bold">{step.id}</span>}
                                    </motion.div>
                                    <div className="absolute top-14 text-center hidden md:block w-32">
                                        <p className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= step.id ? "text-orange-500" : "text-gray-300"}`}>
                                            Step {step.id}
                                        </p>
                                    </div>
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className="h-1 flex-1 mx-2 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                                            className="h-full bg-orange-400"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mt-16 md:mt-20"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 font-inter">{steps[currentStep - 1].label}</h2>
                        <p className="text-gray-500 text-sm mt-2">{steps[currentStep - 1].sub}</p>
                    </motion.div>
                </div>

                <motion.div
                    layout
                    className="bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50"
                >
                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>

                    <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between mt-10 md:mt-16 pt-8 border-t border-gray-100">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`flex items-center justify-center px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto ${currentStep === 1
                                ? "text-gray-300 border-gray-100 cursor-not-allowed border-2"
                                : "text-slate-700 border-2 border-slate-700 hover:bg-slate-700 hover:text-white"
                                }`}
                        >
                            <ChevronLeft size={20} className="mr-2" strokeWidth={3} />
                            Previous
                        </motion.button>

                        {currentStep < 5 ? (
                            <motion.button
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={nextStep}
                                className="flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-orange-200 transition-all w-full sm:w-auto"
                            >
                                Next Step
                                <ChevronRight size={20} className="ml-2" strokeWidth={3} />
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ backgroundColor: "#FB923C" }}
                                animate={{ backgroundColor: "#111F3B" }}
                                onClick={() => toast.success("Application Submitted Successfully!")}
                                className="flex items-center justify-center text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-slate-300 transition-all w-full sm:w-auto"
                            >
                                Submit Application
                                <Send size={20} className="ml-2" strokeWidth={2} />
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
