import { useState } from "react";
import { User, Briefcase, Home, Coins, Check, ChevronRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Counter } from "./Counter";

const LOAN_DATA = {
    personal: {
        title: "Personal Loans",
        subtitle: "Quick and hassle-free personal financing solutions",
        image: "https://readdy.ai/api/search-image?query=happy%20family%20planning%20finances%20at%20home%2C%20personal%20loan%20consultation%2C%20financial%20planning%20discussion%2C%20modern%20home%20interior%2C%20professional%20financial%20advisor&width=600&height=400&seq=personal001&orientation=landscape",
        features: [
            "Loan Amount: ₹50,000 to ₹25,00,000",
            "Interest Rate: Starting from 10.99% p.a.",
            "Tenure: 12 to 84 months",
            "Processing Fee: 1% to 3% of loan amount",
            "Minimal documentation required",
            "Quick approval within 24-48 hours",
        ],
        eligibility: [
            "Age: 21 to 65 years",
            "Minimum monthly income: ₹25,000",
            "Employment: Salaried or self-employed",
            "Credit Score: 650 and above",
            "Work experience: Minimum 2 years",
        ],
        documents: [
            "Identity Proof (Aadhaar/PAN/Passport)",
            "Address Proof (Utility bills/Rent agreement)",
            "Income Proof (Salary slips/ITR)",
            "Bank Statements (Last 6 months)",
            "Employment Proof (Offer letter/Business registration)",
        ],
        icon: User,
    },
    business: {
        title: "Business Loans",
        subtitle: "Fuel your business growth with tailored financing",
        image: "https://readdy.ai/api/search-image?query=successful%20business%20owner%20in%20modern%20office%2C%20business%20loan%20consultation%2C%20entrepreneur%20planning%20expansion%2C%20corporate%20meeting%20room%2C%20professional%20business%20setting&width=600&height=400&seq=business001&orientation=landscape",
        features: [
            "Loan Amount: ₹1,00,000 to ₹5,00,00,000",
            "Interest Rate: Starting from 12.99% p.a.",
            "Tenure: 12 to 120 months",
            "Processing Fee: 1% to 2% of loan amount",
            "Working capital and term loans available",
            "Flexible repayment options",
        ],
        eligibility: [
            "Business vintage: Minimum 2 years",
            "Annual turnover: Minimum ₹10 lakhs",
            "Business type: Proprietorship/Partnership/Pvt Ltd",
            "Credit Score: 700 and above",
            "Profit margin: Positive for last 2 years",
        ],
        documents: [
            "Business registration documents",
            "GST registration certificate",
            "Financial statements (Last 2 years)",
            "Bank statements (Last 12 months)",
            "Income Tax Returns (Last 2 years)",
            "Project report (for new ventures)",
        ],
        icon: Briefcase,
    },
    lap: {
        title: "Loan Against Property",
        subtitle: "Unlock the value of your property for financial needs",
        image: "https://public.readdy.ai/ai/img_res/4933c1b34b49a38315a834ee42861fb4.jpg",
        features: [
            "Loan Amount: Up to 70% of property value",
            "Interest Rate: Starting from 9.99% p.a.",
            "Tenure: Up to 20 years",
            "Processing Fee: 0.5% to 1% of loan amount",
            "Residential and commercial properties accepted",
            "Competitive interest rates",
        ],
        eligibility: [
            "Age: 21 to 70 years",
            "Property ownership: Clear title",
            "Income: Stable source of income",
            "Credit Score: 650 and above",
            "Property location: Major cities and towns",
        ],
        documents: [
            "Property documents (Sale deed/Title deed)",
            "Property valuation report",
            "Income proof documents",
            "Identity and address proof",
            "Bank statements (Last 6 months)",
            "Property tax receipts",
        ],
        icon: Home,
    },
    gold: {
        title: "Gold Loans",
        subtitle: "Instant liquidity against your gold ornaments",
        image: "https://readdy.ai/api/search-image?query=gold%20jewelry%20and%20ornaments%20collection%2C%20gold%20loan%20consultation%2C%20precious%20metal%20valuation%2C%20secure%20banking%20environment%2C%20professional%20gold%20assessment&width=600&height=400&seq=gold001&orientation=landscape",
        features: [
            "Loan Amount: Up to 75% of gold value",
            "Interest Rate: Starting from 8.99% p.a.",
            "Tenure: 6 to 36 months",
            "Processing Fee: Nil to 1% of loan amount",
            "Instant approval and disbursement",
            "Secure gold storage facility",
        ],
        eligibility: [
            "Age: 18 to 75 years",
            "Gold purity: Minimum 18 karat",
            "Gold weight: Minimum 10 grams",
            "Valid identity proof required",
            "No income proof required",
        ],
        documents: [
            "Identity proof (Aadhaar/PAN/Driving License)",
            "Address proof (Utility bills/Aadhaar)",
            "Gold ornaments/coins",
            "Purchase invoice (if available)",
            "Passport size photographs",
        ],
        icon: Coins,
    },
};

export const LoanFilterSection = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof LOAN_DATA>("personal");
    const activeData = LOAN_DATA[activeTab];

    return (
        <section className="bg-slate-100 box-border caret-transparent py-16">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-8">
                {/* FilterButtons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="box-border caret-transparent gap-x-4 flex flex-wrap justify-center gap-y-4 mb-12"
                >
                    {(Object.keys(LOAN_DATA) as Array<keyof typeof LOAN_DATA>).map((tab) => {
                        const Icon = LOAN_DATA[tab].icon;
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`group cursor-pointer font-medium items-center caret-transparent flex text-center px-6 py-3 rounded-full transition-all duration-300 ${isActive
                                    ? "bg-slate-900 text-white shadow-lg"
                                    : "bg-white text-slate-700 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 mr-2 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-700 group-hover:text-white"}`} />
                                <span className="box-border caret-transparent block">
                                    {LOAN_DATA[tab].title}
                                </span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* LoanDetailsCard */}
                <motion.div
                    layout
                    className="bg-white shadow-xl box-border caret-transparent overflow-hidden rounded-2xl border border-slate-200"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                            className="box-border caret-transparent gap-x-0 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-0 md:grid-cols-[repeat(2,minmax(0px,1fr))]"
                        >
                            {/* LoanImageSection */}
                            <div className="relative box-border caret-transparent h-96 md:h-auto overflow-hidden">
                                <motion.img
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                    alt={activeData.title}
                                    src={activeData.image}
                                    className="box-border caret-transparent h-full max-w-full object-cover w-full"
                                />
                                <div className="absolute bg-[linear-gradient(to_right,rgba(11,31,59,0.8),rgba(0,0,0,0))] box-border caret-transparent inset-0"></div>
                                <div className="absolute text-white box-border caret-transparent left-8 bottom-8 pr-8">
                                    <h2 className="text-3xl font-bold box-border caret-transparent leading-9 mb-2 font-inter">
                                        {activeData.title}
                                    </h2>
                                    <p className="text-lg box-border caret-transparent leading-7 opacity-90">
                                        {activeData.subtitle}
                                    </p>
                                </div>
                            </div>

                            {/* LoanFeaturesSection */}
                            <div className="box-border caret-transparent p-10">
                                <div className="box-border caret-transparent">
                                    <div className="box-border caret-transparent">
                                        <h3 className="text-slate-900 text-xl font-bold box-border caret-transparent leading-7 mb-6 font-inter underline decoration-orange-400 decoration-4 underline-offset-8">
                                            Key Features
                                        </h3>
                                        <ul className="box-border caret-transparent list-none pl-0 space-y-3">
                                            {activeData.features.map((feature, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="items-start box-border caret-transparent flex"
                                                >
                                                    <Check className="text-orange-400 w-5 h-5 shrink-0 mt-0.5" strokeWidth={3} />
                                                    <span className="text-gray-500 text-sm box-border caret-transparent block leading-5 ml-3 font-medium">
                                                        {feature.match(/[0-9]+/) ? (
                                                            <>
                                                                {feature.split(/(\d+)/).map((part, i) =>
                                                                    /^\d+$/.test(part) ? <Counter key={i} value={part} /> : part
                                                                )}
                                                            </>
                                                        ) : feature}
                                                    </span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="box-border caret-transparent mt-10"
                                    >
                                        <button className="text-white cursor-pointer text-lg font-bold items-center bg-[#C59D4F] hover:bg-[#B38C3D] transition-all duration-300 shadow-md caret-transparent inline-flex h-14 justify-center leading-7 text-center text-nowrap w-full px-8 py-4 rounded-xl">
                                            Apply for {activeData.title}
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* LoanEligibilitySection */}
                    <div className="box-border caret-transparent border-slate-100 border-t border-solid bg-slate-50/50">
                        <div className="box-border caret-transparent gap-x-0 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-0 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
                            <div className="box-border caret-transparent border-slate-200 p-10 border-r border-solid">
                                <h3 className="text-slate-900 text-xl font-bold box-border caret-transparent leading-7 mb-6 font-inter">
                                    Eligibility Criteria
                                </h3>
                                <ul className="box-border caret-transparent list-none pl-0 space-y-3">
                                    {activeData.eligibility.map((item, idx) => (
                                        <li key={idx} className="items-start box-border caret-transparent flex">
                                            <ChevronRight className="text-slate-400 w-5 h-5 shrink-0 mt-0.5" />
                                            <span className="text-gray-500 text-sm box-border caret-transparent block leading-5 ml-3">
                                                {item.match(/[0-9]+/) ? (
                                                    <>
                                                        {item.split(/(\d+)/).map((part, i) =>
                                                            /^\d+$/.test(part) ? <Counter key={i} value={part} /> : part
                                                        )}
                                                    </>
                                                ) : item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="box-border caret-transparent p-10">
                                <h3 className="text-slate-900 text-xl font-bold box-border caret-transparent leading-7 mb-6 font-inter">
                                    Required Documents
                                </h3>
                                <ul className="box-border caret-transparent list-none pl-0 space-y-3">
                                    {activeData.documents.map((item, idx) => (
                                        <li key={idx} className="items-start box-border caret-transparent flex">
                                            <FileText className="text-slate-500 w-5 h-5 shrink-0 mt-0.5" />
                                            <span className="text-gray-500 text-sm box-border caret-transparent block leading-5 ml-3">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
