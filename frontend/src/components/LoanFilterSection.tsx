import { useState } from "react";
import { User, Briefcase, Home, Coins, Check, ChevronRight, FileText, Car, Bike, Sprout, Factory, Scissors, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Counter } from "./Counter";
import { Link } from "react-router-dom";

const LOAN_DATA = {
    car: {
        title: "Car Loans",
        subtitle: "Drive your dream car with flexible financing",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
        features: [
            "Loan Amount: Up to 90% of on-road price",
            "Interest Rate: Starting from 8.5% p.a.",
            "Tenure: 12 to 84 months",
            "Minimal documentation",
            "Instant eligibility check",
            "Special rates for electric vehicles",
        ],
        eligibility: [
            "Age: 21 to 65 years",
            "Minimum monthly income: ₹20,000",
            "Employment: Salaried or self-employed",
            "CIBIL Score: 700+",
        ],
        documents: [
            "ID Proof (Aadhaar/PAN)",
            "Last 3 months salary slips",
            "Bank statements (Last 6 months)",
            "Address Proof",
        ],
        icon: Car,
    },
    twowheeler: {
        title: "Two Wheeler Loans",
        subtitle: "Quick approval for your bike or scooter",
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800",
        features: [
            "Loan Amount: Up to 95% of ex-showroom price",
            "Interest Rate: Starting from 10.5% p.a.",
            "Tenure: 12 to 48 months",
            "Easy documentation",
            "Fastest processing",
            "Low down payment options",
        ],
        eligibility: [
            "Age: 18 to 65 years",
            "Stable monthly income",
            "Resident of India",
            "Valid driving license",
        ],
        documents: [
            "Aadhaar & PAN Card",
            "Passport size photos",
            "Income proof (optional for small loans)",
            "Recent electricity bill",
        ],
        icon: Bike,
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
    agriculture: {
        title: "Agriculture Loans",
        subtitle: "Supporting farmers with affordable credit",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
        features: [
            "Low interest rates",
            "Repayment linked to crop cycles",
            "Short-term and long-term credit",
            "Kisan Credit Card (KCC) available",
            "Minimal collateral required",
            "Subsidy benefits as per govt. norms",
        ],
        eligibility: [
            "Land ownership/cultivator details",
            "Age: 18 to 70 years",
            "Agricultural experience",
            "Valid identity documents",
        ],
        documents: [
            "Land revenue records (7/12 extract)",
            "Crop details",
            "Aadhaar & PAN Card",
            "Bank passbook copy",
        ],
        icon: Sprout,
    },
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
    home: {
        title: "Home Loans",
        subtitle: "Build or buy your dream home with ease",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
        features: [
            "Tenure: Up to 30 years",
            "Interest Rate: Starting from 7.5% p.a.",
            "Balance transfer facility available",
            "Top-up loan options",
            "Flexible EMI options",
            "Zero prepayment charges",
        ],
        eligibility: [
            "Age: 21 to 70 years",
            "Resident/Non-resident Indians",
            "Clear property title",
            "Stable income source",
        ],
        documents: [
            "Property Sale Deed/Agreement",
            "NOC from builder/society",
            "Approved floor plan",
            "Identity & Address proofs",
        ],
        icon: Home,
    },
    industrial: {
        title: "Industrial Loans",
        subtitle: "Scaling your industrial manufacturing capacity",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        features: [
            "Machinery and equipment financing",
            "Working capital term loans",
            "Project finance for new units",
            "Competitive interest rates",
            "Customized repayment structures",
            "Large loan quantum available",
        ],
        eligibility: [
            "Industrial license/registration",
            "Business vintage: 3+ years",
            "Healthy balance sheets",
            "Credit rating (if available)",
        ],
        documents: [
            "Audit reports (Last 3 years)",
            "Company registration docs",
            "Project report & Teaser",
            "CFO/MD identity proofs",
        ],
        icon: Factory,
    },
    weaver: {
        title: "Weaver Loans",
        subtitle: "Empowering artisans and handloom weavers",
        image: "https://images.unsplash.com/photo-1640292343595-889db1c8262e?auto=format&fit=crop&q=80&w=800",
        features: [
            "Subsidized interest rates",
            "Mudram scheme eligibility",
            "Purchase of yarn and equipment",
            "Marketing support loans",
            "Easy repayment options",
            "Dedicated artisans' credit card",
        ],
        eligibility: [
            "Weaver ID Card holder",
            "Member of Weaver Co-op Society",
            "Skilled artisan status",
            "Aadhaar identification",
        ],
        documents: [
            "Weaver certificate/Artisan card",
            "Aadhaar Card",
            "Bank account passbook",
            "Recommendation from Society",
        ],
        icon: Scissors,
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
    plot: {
        title: "Plot Loans",
        subtitle: "Finance your land purchase for a secure future",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
        features: [
            "Finance for residential plots",
            "Composite loan (Plot + Construction)",
            "Tenure: Up to 15 years",
            "Low interest rates",
            "Doorstep service",
            "Hassle-free documentation",
        ],
        eligibility: [
            "Stable monthly income",
            "Age: 21 to 65 years",
            "CIBIL Score: 680+",
            "Plot within municipal limits",
        ],
        documents: [
            "Allotment letter/Booking receipt",
            "7/12 extract or Khata certificate",
            "Income proof documents",
            "ID and Address proof",
        ],
        icon: Map,
    },
};

export const LoanFilterSection = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof LOAN_DATA>("car");
    const activeData = LOAN_DATA[activeTab];

    return (
        <section className="bg-slate-100 box-border  py-16">
            <div className="box-border  max-w-screen-xl mx-auto px-8">
                {/* FilterButtons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="box-border  gap-x-4 flex flex-wrap justify-center gap-y-4 mb-12"
                >
                    {(Object.keys(LOAN_DATA) as Array<keyof typeof LOAN_DATA>).map((tab) => {
                        const Icon = LOAN_DATA[tab].icon;
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`group cursor-pointer font-medium items-center  flex text-center px-6 py-3 rounded-full transition-all duration-300 ${isActive
                                    ? "bg-slate-900 text-white shadow-lg"
                                    : "bg-white text-slate-700 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 mr-2 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-700 group-hover:text-white"}`} />
                                <span className="box-border  block">
                                    {LOAN_DATA[tab].title}
                                </span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* LoanDetailsCard */}
                <motion.div
                    layout
                    className="bg-white shadow-xl box-border  overflow-hidden rounded-2xl border border-slate-200"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                            className="box-border  gap-x-0 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-0 md:grid-cols-[repeat(2,minmax(0px,1fr))]"
                        >
                            {/* LoanImageSection */}
                            <div className="relative box-border  h-96 md:h-auto overflow-hidden">
                                <motion.img
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                    alt={activeData.title}
                                    src={activeData.image}
                                    className="box-border  h-full max-w-full object-cover w-full"
                                />
                                <div className="absolute bg-[linear-gradient(to_right,rgba(11,31,59,0.8),rgba(0,0,0,0))] box-border  inset-0"></div>
                                <div className="absolute text-white box-border  left-8 bottom-8 pr-8">
                                    <h2 className="text-3xl font-bold box-border  leading-9 mb-2 font-inter">
                                        {activeData.title}
                                    </h2>
                                    <p className="text-lg box-border  leading-7 opacity-90">
                                        {activeData.subtitle}
                                    </p>
                                </div>
                            </div>

                            {/* LoanFeaturesSection */}
                            <div className="box-border  p-10">
                                <div className="box-border ">
                                    <div className="box-border ">
                                        <h3 className="text-slate-900 text-xl font-bold box-border  leading-7 mb-6 font-inter underline decoration-[#C59D4F] decoration-4 underline-offset-8">
                                            Key Features
                                        </h3>
                                        <ul className="box-border  list-none pl-0 space-y-3">
                                            {activeData.features.map((feature, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="items-start box-border  flex"
                                                >
                                                    <Check className="text-[#C59D4F] w-5 h-5 shrink-0 mt-0.5" strokeWidth={3} />
                                                    <span className="text-gray-500 text-sm box-border  block leading-5 ml-3 font-medium">
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
                                        className="box-border  mt-10"
                                    >
                                        <Link to="/apply-now" className="text-white cursor-pointer text-lg font-bold items-center bg-[#C59D4F] hover:bg-[#B38C3D] transition-all duration-300 shadow-md  inline-flex h-14 justify-center leading-7 text-center text-nowrap w-full px-8 py-4 rounded-xl">
                                            Apply for {activeData.title}
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* LoanEligibilitySection */}
                    <div className="box-border  border-slate-100 border-t border-solid bg-slate-50/50">
                        <div className="box-border  gap-x-0 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-0 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
                            <div className="box-border  border-slate-200 p-10 border-r border-solid">
                                <h3 className="text-slate-900 text-xl font-bold box-border  leading-7 mb-6 font-inter">
                                    Eligibility Criteria
                                </h3>
                                <ul className="box-border  list-none pl-0 space-y-3">
                                    {activeData.eligibility.map((item, idx) => (
                                        <li key={idx} className="items-start box-border  flex">
                                            <ChevronRight className="text-slate-400 w-5 h-5 shrink-0 mt-0.5" />
                                            <span className="text-gray-500 text-sm box-border  block leading-5 ml-3">
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
                            <div className="box-border  p-10">
                                <h3 className="text-slate-900 text-xl font-bold box-border  leading-7 mb-6 font-inter">
                                    Required Documents
                                </h3>
                                <ul className="box-border  list-none pl-0 space-y-3">
                                    {activeData.documents.map((item, idx) => (
                                        <li key={idx} className="items-start box-border  flex">
                                            <FileText className="text-slate-500 w-5 h-5 shrink-0 mt-0.5" />
                                            <span className="text-gray-500 text-sm box-border  block leading-5 ml-3">
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
