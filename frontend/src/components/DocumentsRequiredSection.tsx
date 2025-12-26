import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { User, Briefcase, Home, ShieldCheck, Clock, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DOCUMENT_DATA = {
    personal: {
        title: "Personal Loan Documents",
        icon: User,
        categories: [
            {
                name: "Identity Proof",
                status: "Mandatory",
                type: "mandatory",
                items: ["Aadhaar Card", "PAN Card", "Passport", "Voter ID", "Driving License"]
            },
            {
                name: "Address Proof",
                status: "Mandatory",
                type: "mandatory",
                items: ["Aadhaar Card", "Utility Bills", "Rent Agreement", "Property Documents"]
            },
            {
                name: "Income Proof",
                status: "Mandatory",
                type: "mandatory",
                items: ["Salary Slips (3 months)", "Bank Statements (6 months)", "Form 16", "ITR (2 years)"]
            },
            {
                name: "Employment Proof",
                status: "Optional",
                type: "optional",
                items: ["Employment Letter", "Offer Letter", "Employee ID Card"]
            }
        ]
    },
    business: {
        title: "Business Loan Documents",
        icon: Briefcase,
        categories: [
            {
                name: "Business Registration",
                status: "Mandatory",
                type: "mandatory",
                items: ["GST Registration", "Shop Act License", "Partnership Deed", "MOA/AOA"]
            },
            {
                name: "Financial Documents",
                status: "Mandatory",
                type: "mandatory",
                items: ["ITR (3 years)", "Audited Financial Statements", "Bank Statements (12 months)", "GST Returns"]
            },
            {
                name: "Identity & Address",
                status: "Mandatory",
                type: "mandatory",
                items: ["PAN Card", "Aadhaar Card", "Business Address Proof", "Passport Size Photos"]
            },
            {
                name: "Additional Documents",
                status: "Optional",
                type: "optional",
                items: ["Project Report", "Quotations", "Property Documents", "Existing Loan Details"]
            }
        ]
    },
    home: {
        title: "Home Loan Documents",
        icon: Home,
        categories: [
            {
                name: "Personal Documents",
                status: "Mandatory",
                type: "mandatory",
                items: ["PAN Card", "Aadhaar Card", "Passport", "Salary Slips (3 months)"]
            },
            {
                name: "Income Proof",
                status: "Mandatory",
                type: "mandatory",
                items: ["Bank Statements (6 months)", "Form 16", "ITR (2 years)", "Employment Certificate"]
            },
            {
                name: "Property Documents",
                status: "Mandatory",
                type: "mandatory",
                items: ["Sale Agreement", "Title Deed", "Approved Building Plan", "NOC from Builder"]
            },
            {
                name: "Additional Requirements",
                status: "Optional",
                type: "optional",
                items: ["Property Valuation Report", "Insurance Documents", "Co-applicant Documents"]
            }
        ]
    }
};

export const DocumentsRequiredSection = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof DOCUMENT_DATA>("personal");
    const activeData = DOCUMENT_DATA[activeTab];

    return (
        <section className="bg-gray-50/50 box-border caret-transparent py-16 md:py-24">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <SectionHeader
                        title="Required Documents"
                        description="Prepare these documents in advance to speed up your application process. All documents should be clear, legible, and up-to-date."
                    />
                </motion.div>

                {/* DocumentTabs */}
                <div className="box-border caret-transparent flex flex-col justify-center mb-8 md:mb-12">
                    <div className="bg-white shadow-sm box-border caret-transparent flex border border-slate-200 p-2 rounded-xl border-solid overflow-x-auto no-scrollbar max-w-full">
                        <div className="flex min-w-max mx-auto md:min-w-0">
                            {(Object.keys(DOCUMENT_DATA) as Array<keyof typeof DOCUMENT_DATA>).map((tab) => {
                                const Icon = DOCUMENT_DATA[tab].icon;
                                const isActive = activeTab === tab;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`font-bold items-center caret-transparent flex text-center text-nowrap px-4 py-2.5 md:px-6 md:py-3 rounded-lg transition-all duration-300 cursor-pointer text-sm md:text-base ${isActive
                                            ? "bg-[#111F3B] text-white shadow-md"
                                            : "text-slate-600 hover:text-[#111F3B] hover:bg-slate-50"
                                            }`}
                                    >
                                        <Icon className={`w-4 h-4 md:w-5 md:h-5 mr-2 ${isActive ? "text-white" : "text-slate-400"}`} />
                                        <span className="box-border caret-transparent block text-nowrap font-inter">
                                            {tab === "personal" ? "Personal Loan" : tab === "business" ? "Business Loan" : "Home Loan"}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <motion.div
                    layout
                    className="bg-white shadow-xl box-border caret-transparent border border-slate-100 p-6 md:p-10 rounded-3xl border-solid"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="text-[#111F3B] text-xl md:text-2xl font-bold box-border caret-transparent leading-8 text-center mb-8 md:mb-10 font-inter">
                                {activeData.title}
                            </h3>
                            <div className="box-border caret-transparent gap-x-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-8">
                                {activeData.categories.map((cat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="box-border caret-transparent border border-gray-100 p-5 md:p-6 rounded-xl border-solid transition-all duration-300 hover:shadow-md"
                                    >
                                        <div className="items-center box-border caret-transparent flex justify-between mb-4">
                                            <h4 className="text-slate-900 text-base md:text-lg font-bold box-border caret-transparent leading-7 font-inter">
                                                {cat.name}
                                            </h4>
                                            <span className={`text-[10px] md:text-xs font-bold box-border caret-transparent block leading-4 px-2.5 md:px-3 py-1 rounded-full ${cat.type === "mandatory" ? "text-red-600 bg-red-50" : "text-blue-600 bg-blue-50"
                                                }`}>
                                                {cat.status}
                                            </span>
                                        </div>
                                        <ul className="box-border caret-transparent list-none pl-0 space-y-3">
                                            {cat.items.map((item: string, idx: number) => (
                                                <li key={idx} className="items-center box-border caret-transparent flex">
                                                    <div className={`${cat.type === "mandatory" ? "bg-red-400" : "bg-blue-400"} box-border caret-transparent shrink-0 h-1.5 w-1.5 rounded-full`}></div>
                                                    <span className="text-slate-600 text-xs md:text-sm font-medium box-border caret-transparent block leading-5 ml-3">
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* DocumentFeatures */}
                <div className="box-border caret-transparent gap-x-6 grid grid-cols-1 md:grid-cols-3 gap-y-6 mt-12 md:mt-16">
                    {[
                        { Icon: ShieldCheck, title: "Document Security", desc: "All documents are encrypted and stored securely. We follow strict data protection protocols.", color: "green" },
                        { Icon: Clock, title: "Quick Verification", desc: "Our AI-powered system verifies documents instantly, reducing processing time significantly.", color: "blue" },
                        { Icon: Headphones, title: "Expert Support", desc: "Our document specialists are available to help you with any questions or clarifications.", color: "orange" }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white box-border caret-transparent border border-gray-100 p-6 md:p-8 rounded-2xl border-solid shadow-sm transition-all duration-300 hover:shadow-md"
                        >
                            <div className={`items-center bg-${feature.color}-100/50 box-border caret-transparent flex h-10 w-10 md:h-12 md:w-12 mb-6 rounded-lg justify-center`}>
                                <feature.Icon className={`text-${feature.color}-600 w-5 h-5 md:w-6 md:h-6`} />
                            </div>
                            <h4 className="text-slate-900 text-base md:text-lg font-bold box-border caret-transparent mb-3 font-inter">
                                {feature.title}
                            </h4>
                            <p className="text-slate-600 text-xs md:text-sm box-border caret-transparent leading-relaxed font-medium">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
