import { useState, useEffect } from "react";
import { Search, ChevronRight, ChevronLeft, Check, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";
import { LOAN_DATA } from "./LoanFilterSection";

const LOAN_TYPES = Object.keys(LOAN_DATA).map(key => ({
    id: key,
    title: LOAN_DATA[key as keyof typeof LOAN_DATA].title,
}));

const FIELD_LABELS: Record<string, string> = {
    loanAmount: "Loan Amount",
    tenure: "Tenure",
    purpose: "Purpose",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phoneCode: "Country Code",
    phone: "Phone Number",
    dob: "Date of Birth",
    pan: "PAN Number",
    aadhar: "Aadhar Number",
    address: "Address",
    city: "City",
    state: "State",
    pinCode: "PIN Code",
    employmentType: "Employment Type",
    companyName: "Company Name",
    designation: "Designation",
    experience: "Experience",
    income: "Monthly Income",
    loanType: "Loan Type",
    existingEmi: "Existing EMI",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    ifsc: "IFSC Code",
};

const COUNTRY_PHONE_LENGTHS: Record<string, number> = {
    IN: 10, US: 10, GB: 10, CA: 10, AU: 9,
    DE: 11, CN: 11, JP: 10, BR: 11, FR: 9,
    IT: 10, RU: 10, PH: 10, MY: 10, SG: 8,
    AE: 9, SA: 9, PK: 10, BD: 10, ID: 11
};

const DEFAULT_FORM_DATA = {
    loanType: "",
    loanAmount: "",
    tenure: "",
    purpose: "",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "IN",
    phoneCode: "+91",
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
};

const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return "🌐";
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

export const LoanApplicationFormSection = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countries, setCountries] = useState<{ name: string, dial_code: string, code: string, flag: string }[]>([]);

    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    // Fetch countries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await axios.get("https://countriesnow.space/api/v0.1/countries/codes");
                if (!res.data.error) {
                    const formatted = res.data.data.map((c: any) => ({
                        ...c,
                        flag: getFlagEmoji(c.code)
                    })).sort((a: any, b: any) => a.name.localeCompare(b.name));

                    // Put India at top of list but keep alphabetical for others
                    const india = formatted.find((c: any) => c.code === "IN");
                    const others = formatted.filter((c: any) => c.code !== "IN");
                    setCountries(india ? [india, ...others] : formatted);
                }
            } catch (err) {
                console.error("Failed to fetch countries", err);
                // Fallback basic list
                setCountries([
                    { name: "India", code: "IN", dial_code: "+91", flag: "🇮🇳" },
                    { name: "United States", code: "US", dial_code: "+1", flag: "🇺🇸" },
                    { name: "United Kingdom", code: "GB", dial_code: "+44", flag: "🇬🇧" }
                ]);
            }
        };
        fetchCountries();
    }, []);


    const updateFormData = (field: string, value: string) => {
        let newValue = value;

        // Truncate phone number based on country and remove non-numeric characters
        if (field === "phone") {
            const targetLength = COUNTRY_PHONE_LENGTHS[formData.countryCode] || 10;
            newValue = value.replace(/\D/g, '').slice(0, targetLength);
        }

        // Truncate Aadhar number to 12 digits and remove non-numeric characters
        if (field === "aadhar") {
            newValue = value.replace(/\D/g, '').slice(0, 12);
        }

        setFormData((prev: any) => ({ ...prev, [field]: newValue }));
        // Clear error for this field when updated
        if (validationErrors.includes(field)) {
            setValidationErrors((prev) => prev.filter((f) => f !== field));
        }
    };

    const handleCountryChange = (val: string) => {
        const [code, dial] = val.split('|');
        setFormData((prev: any) => ({
            ...prev,
            countryCode: code,
            phoneCode: dial,
            phone: prev.phone.slice(0, COUNTRY_PHONE_LENGTHS[code] || 10)
        }));
        if (validationErrors.includes("phone")) {
            setValidationErrors(prev => prev.filter(f => f !== "phone"));
        }
    };

    const clearError = (field: string) => {
        if (validationErrors.includes(field)) {
            setValidationErrors((prev) => prev.filter((f) => f !== field));
        }
    };

    const fieldError = (field: keyof typeof formData) => {
        return validationErrors.includes(field as string);
    };

    const validateStep = (step: number) => {
        const requiredFields: Record<number, string[]> = {
            1: ["loanType", "loanAmount", "tenure", "purpose"],
            2: ["firstName", "lastName", "email", "phone", "dob", "pan", "aadhar", "address", "city", "state", "pinCode"],
            3: ["employmentType", "companyName", "designation", "experience", "income", "existingEmi"],
            4: ["bankName", "accountNumber", "ifsc"]
        };

        const fieldsForStep = requiredFields[step];
        if (!fieldsForStep) return true;

        // 1. Basic empty check
        const missing = fieldsForStep.filter(field => {
            const value = formData[field as keyof typeof formData];
            return value === undefined || value === null || value === "";
        });

        if (missing.length > 0) {
            const firstMissingField = missing[0];
            setValidationErrors([firstMissingField]);
            const label = FIELD_LABELS[firstMissingField] || firstMissingField;
            toast.error(`Please fill in your ${label}`);
            return false;
        }

        // 2. Advanced format checks for Step 2
        if (step === 2) {
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setValidationErrors(["email"]);
                toast.error("Please enter a valid email address.");
                return false;
            }

            // Phone number validation (country-specific)
            const targetLength = COUNTRY_PHONE_LENGTHS[formData.countryCode] || 10;
            if (formData.phone.length !== targetLength) {
                setValidationErrors(["phone"]);
                toast.error(`Phone number for ${formData.countryCode} must be exactly ${targetLength} digits.`);
                return false;
            }

            // Age validation (18+ years)
            const birthDate = new Date(formData.dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                setValidationErrors(["dob"]);
                toast.error("You must be at least 18 years old to apply.");
                return false;
            }

            // Aadhar validation (12 digits)
            if (!/^\d{12}$/.test(formData.aadhar)) {
                setValidationErrors(["aadhar"]);
                toast.error("Aadhar number must be exactly 12 digits.");
                return false;
            }
        }

        setValidationErrors([]);
        return true;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, 5));
            setValidationErrors([]);
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        setValidationErrors([]);
    };

    const handleSubmit = async () => {
        if (!validateStep(4)) return;

        setIsSubmitting(true);
        try {
            const response = await axios.post(API_BASE_URL, formData);
            if (response.data.success) {
                toast.success("Application submitted successfully!");
                setCurrentStep(1);
                setFormData(DEFAULT_FORM_DATA);
            }
        } catch (error: any) {
            console.error("Submission error:", error);
            toast.error(error.response?.data?.message || "Failed to submit application");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            <label className="text-slate-900 text-sm font-semibold block mb-2">Select Loan Type</label>
                            <select
                                value={formData.loanType}
                                onChange={(e) => updateFormData("loanType", e.target.value)}
                                onFocus={() => clearError("loanType")}
                                className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm bg-white transition-all appearance-none cursor-pointer ${fieldError("loanType") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23C59D4F' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 1rem center',
                                    backgroundSize: '1.25rem'
                                }}
                            >
                                <option value="">Select loan type</option>
                                {LOAN_TYPES.map((loan) => (
                                    <option key={loan.id} value={loan.id}>
                                        {loan.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Loan Amount (₹)</label>
                                <input
                                    type="number"
                                    value={formData.loanAmount}
                                    onChange={(e) => updateFormData("loanAmount", e.target.value)}
                                    placeholder="Enter loan amount"
                                    onFocus={() => clearError("loanAmount")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("loanAmount") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Tenure (Months)</label>
                                <select
                                    value={formData.tenure}
                                    onChange={(e) => updateFormData("tenure", e.target.value)}
                                    onFocus={() => clearError("tenure")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm bg-white transition-all ${fieldError("tenure") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
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
                                onFocus={() => clearError("purpose")}
                                className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm bg-white transition-all ${fieldError("purpose") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
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
                                    onFocus={() => clearError("firstName")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("firstName") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Last Name</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => updateFormData("lastName", e.target.value)}
                                    placeholder="Enter last name"
                                    onFocus={() => clearError("lastName")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("lastName") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
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
                                    onFocus={() => clearError("email")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("email") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Phone Number</label>
                                <div className="flex gap-2">
                                    <select
                                        value={`${formData.countryCode}|${formData.phoneCode}`}
                                        onChange={(e) => handleCountryChange(e.target.value)}
                                        className="w-24 px-2 py-3 rounded-xl border border-gray-200 focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm bg-white appearance-none"
                                    >
                                        {countries.length > 0 ? (
                                            countries.map((c, idx) => (
                                                <option key={`${c.code}-${idx}`} value={`${c.code}|${c.dial_code}`}>
                                                    {c.flag} {c.dial_code}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="IN|+91">🇮🇳 +91</option>
                                        )}
                                    </select>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => updateFormData("phone", e.target.value)}
                                        placeholder="Enter phone number"
                                        maxLength={COUNTRY_PHONE_LENGTHS[formData.countryCode] || 10}
                                        onFocus={() => clearError("phone")}
                                        className={`flex-1 px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("phone") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    value={formData.dob}
                                    onChange={(e) => updateFormData("dob", e.target.value)}
                                    onFocus={() => clearError("dob")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("dob") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">PAN Number</label>
                                <input
                                    type="text"
                                    value={formData.pan}
                                    onChange={(e) => updateFormData("pan", e.target.value.toUpperCase())}
                                    placeholder="ABCDE1234F"
                                    onFocus={() => clearError("pan")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("pan") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Aadhar Number</label>
                                <input
                                    type="text"
                                    value={formData.aadhar}
                                    onChange={(e) => updateFormData("aadhar", e.target.value)}
                                    placeholder="1234 5678 9012"
                                    maxLength={12}
                                    onFocus={() => clearError("aadhar")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("aadhar") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
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
                                onFocus={() => clearError("address")}
                                className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm resize-none transition-all ${fieldError("address") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
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
                                    onFocus={() => clearError("city")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("city") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">State</label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => updateFormData("state", e.target.value)}
                                    placeholder="Enter state"
                                    onFocus={() => clearError("state")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("state") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">PIN Code</label>
                                <input
                                    type="text"
                                    value={formData.pinCode}
                                    onChange={(e) => updateFormData("pinCode", e.target.value)}
                                    placeholder="Enter PIN code"
                                    onFocus={() => clearError("pinCode")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("pinCode") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
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
                                    onFocus={() => clearError("employmentType")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm bg-white transition-all ${fieldError("employmentType") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
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
                                    onFocus={() => clearError("companyName")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("companyName") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
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
                                    onFocus={() => clearError("designation")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("designation") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Work Experience (Years)</label>
                                <select
                                    value={formData.experience}
                                    onChange={(e) => updateFormData("experience", e.target.value)}
                                    onFocus={() => clearError("experience")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm bg-white transition-all ${fieldError("experience") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
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
                                    onFocus={() => clearError("income")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("income") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">Existing Loan EMI (₹)</label>
                                <input
                                    type="number"
                                    value={formData.existingEmi}
                                    onChange={(e) => updateFormData("existingEmi", e.target.value)}
                                    placeholder="Enter existing EMI (0 if none)"
                                    onFocus={() => clearError("existingEmi")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("existingEmi") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
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
                                onFocus={() => clearError("bankName")}
                                className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("bankName") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
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
                                    onFocus={() => clearError("accountNumber")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("accountNumber") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-semibold block mb-2">IFSC Code</label>
                                <input
                                    type="text"
                                    value={formData.ifsc}
                                    onChange={(e) => updateFormData("ifsc", e.target.value.toUpperCase())}
                                    placeholder="Enter IFSC code"
                                    onFocus={() => clearError("ifsc")}
                                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm transition-all ${fieldError("ifsc") ? "border-red-500 bg-red-50" : "border-gray-200"}`}
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
                                <div className="bg-[#C59D4F] rounded-full p-1 mr-3">
                                    <Check className="text-white" size={18} />
                                </div>
                                Application Summary
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                                <div>
                                    <h4 className="text-xs font-bold text-[#C59D4F] uppercase tracking-widest mb-4">Loan Details</h4>
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
                                    <h4 className="text-xs font-bold text-[#C59D4F] uppercase tracking-widest mb-4">Personal Details</h4>
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
                                    <h4 className="text-xs font-bold text-[#C59D4F] uppercase tracking-widest mb-4">Employment</h4>
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
                                    <h4 className="text-xs font-bold text-[#C59D4F] uppercase tracking-widest mb-4">Bank Details</h4>
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

                        <div className="bg-[#F9F5EE] border border-[#C59D4F] p-5 rounded-2xl flex items-start">
                            <div className="bg-[#C59D4F]/20 rounded-full p-2 mr-4 mt-0.5">
                                <Search size={18} className="text-[#B38C3D]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#C59D4F]">Important Information:</h4>
                                <ul className="text-xs text-[#B38C3D]/80 mt-2 space-y-1.5 list-disc ml-4">
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
                                            backgroundColor: currentStep >= step.id ? "#C59D4F" : "#FFFFFF",
                                            borderColor: currentStep >= step.id ? "#C59D4F" : "#E2E8F0",
                                            color: currentStep >= step.id ? "#FFFFFF" : "#94A3B8"
                                        }}
                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-shadow duration-300 ${currentStep === step.id ? "shadow-lg ring-4 ring-[#C59D4F]" : ""}`}
                                    >
                                        {currentStep > step.id ? <Check size={20} strokeWidth={3} /> : <span className="text-sm md:text-lg font-bold">{step.id}</span>}
                                    </motion.div>
                                    <div className="absolute top-14 text-center hidden md:block w-32">
                                        <p className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= step.id ? "text-[#C59D4F]" : "text-gray-300"}`}>
                                            Step {step.id}
                                        </p>
                                    </div>
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className="h-1 flex-1 mx-2 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                                            className="h-full bg-[#C59D4F]"
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
                                className="flex items-center justify-center bg-[#C59D4F] hover:bg-[#B38C3D] text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-[#C59D4F]/20 transition-all w-full sm:w-auto"
                            >
                                Next Step
                                <ChevronRight size={20} className="ml-2" strokeWidth={3} />
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ backgroundColor: "#C59D4F" }}
                                animate={{ backgroundColor: isSubmitting ? "#94A3B8" : "#111F3B" }}
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center justify-center text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-[#C59D4F]/20 transition-all w-full sm:w-auto disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        Submitting...
                                        <Loader2 size={20} className="ml-2 animate-spin" strokeWidth={2} />
                                    </>
                                ) : (
                                    <>
                                        Submit Application
                                        <Send size={20} className="ml-2" strokeWidth={2} />
                                    </>
                                )}
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
