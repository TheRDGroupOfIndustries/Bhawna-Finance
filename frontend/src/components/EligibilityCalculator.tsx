import { SectionHeader } from "./SectionHeader";
import { Calculator, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export const EligibilityCalculator = () => {
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
                        title="Eligibility Calculator"
                        description="Get an instant estimate of your loan eligibility and EMI amount. This calculator provides approximate values based on standard criteria."
                    />
                </motion.div>
                <div className="box-border caret-transparent gap-x-8 md:gap-x-12 grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white shadow-sm box-border caret-transparent border border-slate-200 p-6 md:p-8 rounded-xl border-solid"
                    >
                        <h3 className="text-slate-900 text-lg md:text-xl font-bold box-border caret-transparent leading-7 mb-6 font-inter">
                            Enter Your Details
                        </h3>
                        <div className="box-border caret-transparent space-y-4 md:space-y-6">
                            <div className="box-border caret-transparent">
                                <label className="text-gray-700 text-xs md:text-sm font-medium box-border caret-transparent block leading-5 mb-2">
                                    Loan Type
                                </label>
                                <select
                                    name="loanType"
                                    className="bg-zinc-100 caret-transparent leading-[normal] w-full border-gray-300 px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-sm md:text-base outline-none focus:ring-2 focus:ring-[#111F3B] transition-all"
                                >
                                    <option value="personal">Personal Loan</option>
                                    <option value="business">Business Loan</option>
                                    <option value="home">Home Loan</option>
                                </select>
                            </div>
                            <div className="box-border caret-transparent">
                                <label className="text-gray-700 text-xs md:text-sm font-medium box-border caret-transparent block leading-5 mb-2">
                                    Monthly Income (₹)
                                </label>
                                <input
                                    placeholder="Enter your monthly income"
                                    type="number"
                                    name="monthlyIncome"
                                    className="box-border caret-transparent w-full border border-gray-300 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-solid text-sm md:text-base outline-none focus:ring-2 focus:ring-[#111F3B] transition-all"
                                />
                            </div>
                            <div className="box-border caret-transparent">
                                <label className="text-gray-700 text-xs md:text-sm font-medium box-border caret-transparent block leading-5 mb-2">
                                    Existing EMI (₹)
                                </label>
                                <input
                                    placeholder="Enter existing EMI amount"
                                    type="number"
                                    name="existingEMI"
                                    className="box-border caret-transparent w-full border border-gray-300 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-solid text-sm md:text-base outline-none focus:ring-2 focus:ring-[#111F3B] transition-all"
                                />
                            </div>
                            <div className="box-border caret-transparent">
                                <label className="text-gray-700 text-xs md:text-sm font-medium box-border caret-transparent block leading-5 mb-2">
                                    Desired Loan Amount (₹)
                                </label>
                                <input
                                    placeholder="Enter desired loan amount"
                                    type="number"
                                    name="loanAmount"
                                    className="box-border caret-transparent w-full border border-gray-300 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-solid text-sm md:text-base outline-none focus:ring-2 focus:ring-[#111F3B] transition-all"
                                />
                            </div>
                            <div className="box-border caret-transparent">
                                <label className="text-gray-700 text-xs md:text-sm font-medium box-border caret-transparent block leading-5 mb-2">
                                    Loan Tenure (Months)
                                </label>
                                <select
                                    name="loanTenure"
                                    className="bg-zinc-100 caret-transparent leading-[normal] w-full border-gray-300 px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-sm md:text-base outline-none focus:ring-2 focus:ring-[#111F3B] transition-all"
                                >
                                    {[12, 24, 36, 48, 60, 84, 120].map((months) => (
                                        <option key={months} value={months}>{months} Months</option>
                                    ))}
                                </select>
                            </div>
                            <button className="text-white font-bold bg-[#111F3B] caret-transparent text-center text-nowrap w-full mt-2 md:mt-4 px-0 py-3 md:py-3.5 rounded-lg hover:bg-slate-800 transition-colors duration-300 cursor-pointer text-sm md:text-base">
                                Calculate Eligibility
                            </button>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white shadow-sm box-border caret-transparent border border-slate-200 p-6 md:p-8 rounded-xl border-solid h-full flex flex-col"
                    >
                        <h3 className="text-slate-900 text-lg md:text-xl font-bold box-border caret-transparent leading-7 mb-6 font-inter">
                            Eligibility Results
                        </h3>
                        <div className="box-border caret-transparent text-center py-10 md:py-12 flex-grow flex flex-col justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                                className="items-center bg-slate-50 box-border caret-transparent flex h-16 w-16 md:h-20 md:w-20 mb-4 md:mb-6 mx-auto rounded-full shadow-inner justify-center"
                            >
                                <Calculator className="text-slate-400 w-8 h-8 md:w-10 md:h-10" />
                            </motion.div>
                            <p className="text-slate-500 text-sm md:text-base box-border caret-transparent max-w-[280px] md:max-w-sm mx-auto leading-relaxed font-medium">
                                Fill in your details and click &quot;Calculate Eligibility&quot; to
                                see your loan eligibility results.
                            </p>
                        </div>
                    </motion.div>
                </div>
                {/* Disclaimer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-orange-50/50 box-border caret-transparent border border-orange-100 mt-12 md:mt-16 p-6 md:p-8 rounded-2xl border-solid"
                >
                    <div className="items-start box-border caret-transparent flex">
                        <div className="items-center bg-[#C59D4F] box-border caret-transparent flex shrink-0 h-8 w-8 md:h-10 md:w-10 mt-0.5 rounded-full shadow-sm justify-center">
                            <AlertTriangle className="text-white w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div className="box-border caret-transparent ml-4">
                            <h4 className="text-[#111F3B] font-bold box-border caret-transparent mb-2 font-inter text-base md:text-lg">
                                Important Disclaimer
                            </h4>
                            <p className="text-slate-600 text-[13px] md:text-sm box-border caret-transparent leading-relaxed font-medium">
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
