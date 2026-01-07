import { useState } from "react";
import { Calculator, AlertTriangle, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { LOAN_DATA } from "./LoanFilterSection";
import { SectionHeader } from "./SectionHeader";

export const EligibilityCalculator = () => {
    const [formData, setFormData] = useState({
        loanType: "personal",
        monthlyIncome: "",
        existingEMI: "",
        loanAmount: "",
        loanTenure: "36"
    });

    const [result, setResult] = useState<{
        isEligible: boolean;
        maxLoanAmount: number;
        monthlyEMI: number;
        eligibleEMI: number;
    } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculateEligibility = () => {
        const income = parseFloat(formData.monthlyIncome) || 0;
        const currentEMI = parseFloat(formData.existingEMI) || 0;
        const desiredAmount = parseFloat(formData.loanAmount) || 0;
        const tenureMonths = parseInt(formData.loanTenure);

        if (income <= 0 || desiredAmount <= 0) return;

        // Interest rates based on LOAN_DATA or defaults
        const interestRates: Record<string, number> = {
            car: 8.5,
            twowheeler: 10.5,
            gold: 8.99,
            agriculture: 7,
            personal: 10.99,
            home: 7.5,
            industrial: 9,
            weaver: 6,
            business: 12.99,
            plot: 8.5
        };

        const annualRate = interestRates[formData.loanType] || 10;
        const r = annualRate / 12 / 100;
        const n = tenureMonths;

        // Calculated EMI for desired amount: P * r * (1 + r)^n / ((1 + r)^n - 1)
        const emi = (desiredAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        // Max EMI allowed (50% FOIR)
        const maxEMIAllowed = (income * 0.5) - currentEMI;

        // Max Loan Amount based on maxEMIAllowed
        const maxLoan = maxEMIAllowed > 0
            ? (maxEMIAllowed * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n))
            : 0;

        setResult({
            isEligible: emi <= maxEMIAllowed,
            maxLoanAmount: Math.round(maxLoan),
            monthlyEMI: Math.round(emi),
            eligibleEMI: Math.max(0, Math.round(maxEMIAllowed))
        });
    };

    return (
        <section className="bg-gray-50/50 box-border  py-16 md:py-24" id="EligibilityCalculator">
            <div className="box-border  max-w-screen-xl mx-auto px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <SectionHeader
                        title="Eligibility Calculator"
                        description="Get an instant estimate of your loan eligibility and EMI amount. This calculator provides approximate values based on standard criteria."
                    />
                </motion.div>
                <div className="box-border  gap-x-8 md:gap-x-12 grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white shadow-sm box-border  border border-slate-200 p-6 md:p-8 rounded-xl border-solid"
                    >
                        <h3 className="text-slate-900 text-lg md:text-xl font-bold box-border  leading-7 mb-6 font-inter">
                            Enter Your Details
                        </h3>
                        <div className="box-border  space-y-4 md:space-y-6">
                            <div className="box-border ">
                                <label className="text-gray-700 text-xs md:text-sm font-medium box-border  block leading-5 mb-2">
                                    Loan Type
                                </label>
                                <select
                                    name="loanType"
                                    value={formData.loanType}
                                    onChange={handleInputChange}
                                    className="bg-zinc-100  leading-[normal] w-full border-gray-300 px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-sm md:text-base outline-none focus:ring-2 focus:ring-[#111F3B] transition-all cursor-pointer"
                                >
                                    {Object.entries(LOAN_DATA).map(([key, data]) => (
                                        <option key={key} value={key}>{data.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="box-border ">
                                <label className="text-gray-700 text-xs md:text-sm font-medium box-border  block leading-5 mb-2">
                                    Monthly Income (₹)
                                </label>
                                <input
                                    placeholder="Enter your monthly income"
                                    type="number"
                                    name="monthlyIncome"
                                    value={formData.monthlyIncome}
                                    onChange={handleInputChange}
                                    className="box-border  w-full border border-gray-300 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-solid text-sm md:text-base outline-none focus:ring-2 focus:ring-[#111F3B] transition-all"
                                />
                            </div>
                            <div className="box-border ">
                                <label className="text-gray-700 text-xs md:text-sm font-medium box-border  block leading-5 mb-2">
                                    Existing EMI (₹)
                                </label>
                                <input
                                    placeholder="Enter existing EMI amount"
                                    type="number"
                                    name="existingEMI"
                                    value={formData.existingEMI}
                                    onChange={handleInputChange}
                                    className="box-border  w-full border border-gray-300 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-solid text-sm md:text-base outline-none focus:ring-2 focus:ring-[#111F3B] transition-all"
                                />
                            </div>
                            <div className="box-border ">
                                <label className="text-gray-700 text-xs md:text-sm font-medium box-border  block leading-5 mb-2">
                                    Desired Loan Amount (₹)
                                </label>
                                <input
                                    placeholder="Enter desired loan amount"
                                    type="number"
                                    name="loanAmount"
                                    value={formData.loanAmount}
                                    onChange={handleInputChange}
                                    className="box-border  w-full border border-gray-300 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-solid text-sm md:text-base outline-none focus:ring-2 focus:ring-[#111F3B] transition-all"
                                />
                            </div>
                            <div className="box-border ">
                                <label className="text-gray-700 text-xs md:text-sm font-medium box-border  block leading-5 mb-2">
                                    Loan Tenure (Months)
                                </label>
                                <select
                                    name="loanTenure"
                                    value={formData.loanTenure}
                                    onChange={handleInputChange}
                                    className="bg-zinc-100  leading-[normal] w-full border-gray-300 px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-sm md:text-base outline-none focus:ring-2 focus:ring-[#111F3B] transition-all"
                                >
                                    {[12, 24, 36, 48, 60, 84, 120].map((months) => (
                                        <option key={months} value={months}>{months} Months</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={calculateEligibility}
                                className="text-white font-bold bg-[#111F3B]  text-center text-nowrap w-full mt-2 md:mt-4 px-0 py-3 md:py-3.5 rounded-lg hover:bg-slate-800 transition-colors duration-300 cursor-pointer text-sm md:text-base"
                            >
                                Calculate Eligibility
                            </button>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white shadow-sm box-border  border border-slate-200 p-6 md:p-8 rounded-xl border-solid h-full flex flex-col"
                    >
                        <h3 className="text-slate-900 text-lg md:text-xl font-bold box-border  leading-7 mb-6 font-inter">
                            Eligibility Results
                        </h3>
                        <div className="box-border  text-center flex-grow flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                {!result ? (
                                    <motion.div
                                        key="initial"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="py-10 md:py-12"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                                            className="items-center bg-slate-50 box-border  flex h-16 w-16 md:h-20 md:w-20 mb-4 md:mb-6 mx-auto rounded-full shadow-inner justify-center"
                                        >
                                            <Calculator className="text-slate-400 w-8 h-8 md:w-10 md:h-10" />
                                        </motion.div>
                                        <p className="text-slate-500 text-sm md:text-base box-border  max-w-[280px] md:max-w-sm mx-auto leading-relaxed font-medium">
                                            Fill in your details and click &quot;Calculate Eligibility&quot; to
                                            see your loan eligibility results.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-6 md:space-y-8"
                                    >
                                        <div className="flex flex-col items-center">
                                            {result.isEligible ? (
                                                <motion.div
                                                    initial={{ rotate: -10, scale: 0 }}
                                                    animate={{ rotate: 0, scale: 1 }}
                                                    transition={{ type: "spring", bounce: 0.5 }}
                                                    className="bg-green-100 p-4 rounded-full mb-4"
                                                >
                                                    <CheckCircle2 className="text-green-600 w-12 h-12 md:w-16 md:h-16" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    initial={{ rotate: 10, scale: 0 }}
                                                    animate={{ rotate: 0, scale: 1 }}
                                                    transition={{ type: "spring", bounce: 0.5 }}
                                                    className="bg-red-100 p-4 rounded-full mb-4"
                                                >
                                                    <XCircle className="text-red-600 w-12 h-12 md:w-16 md:h-16" />
                                                </motion.div>
                                            )}
                                            <h4 className={`text-xl md:text-2xl font-bold ${result.isEligible ? "text-green-600" : "text-red-600"}`}>
                                                {result.isEligible ? "Congratulations! You're Eligible" : "Currently Not Eligible"}
                                            </h4>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 text-left">
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Estimated Monthly EMI</p>
                                                <p className="text-2xl md:text-3xl font-bold text-slate-900">₹{result.monthlyEMI.toLocaleString('en-IN')}</p>
                                            </div>

                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Max Potential Loan Amount</p>
                                                <p className="text-2xl md:text-3xl font-bold text-[#C59D4F]">₹{result.maxLoanAmount.toLocaleString('en-IN')}</p>
                                            </div>

                                            {!result.isEligible && (
                                                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex items-start gap-3">
                                                    <AlertTriangle className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" />
                                                    <p className="text-orange-800 text-xs md:text-sm font-medium">
                                                        Your desired EMI (₹{result.monthlyEMI.toLocaleString()}) exceeds your recommended limit of ₹{result.eligibleEMI.toLocaleString()}. Try reducing the loan amount or increasing the tenure.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {result.isEligible && (
                                            <Link
                                                to="/apply-now"
                                                className="bg-[#C59D4F] text-white font-bold py-3 px-6 rounded-xl w-full flex items-center justify-center gap-2 hover:bg-[#B38C3D] transition-colors"
                                            >
                                                Apply Now <ArrowRight size={18} />
                                            </Link>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
                {/* Disclaimer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-[#C59D4F]/10 box-border  border border-[#C59D4F] mt-12 md:mt-16 p-6 md:p-8 rounded-2xl border-solid"
                >
                    <div className="items-start box-border  flex">
                        <div className="items-center bg-[#C59D4F] box-border  flex shrink-0 h-8 w-8 md:h-10 md:w-10 mt-0.5 rounded-full shadow-sm justify-center">
                            <AlertTriangle className="text-white w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div className="box-border  ml-4">
                            <h4 className="text-[#111F3B] font-bold box-border  mb-2 font-inter text-base md:text-lg">
                                Important Disclaimer
                            </h4>
                            <p className="text-slate-600 text-[13px] md:text-sm box-border  leading-relaxed font-medium">
                                This calculator provides approximate eligibility estimates based on
                                basic parameters. Actual loan approval depends on comprehensive
                                credit assessment, document verification, and our internal risk
                                evaluation process. Interest rates and terms may vary based on
                                individual credit profiles and market conditions.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
