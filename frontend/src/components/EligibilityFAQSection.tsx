import { useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const EligibilityFAQSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What is the minimum CIBIL score required for loan approval?",
            answer: "We typically require a minimum CIBIL score of 650 for personal loans, 700 for business loans, and 750 for home loans. However, we also consider other factors like income stability, employment history, and existing debt obligations in our assessment."
        },
        {
            question: "How long does the loan approval process take?",
            answer: "Our digital-first approach ensures quick processing. Initial approval can be received within 24 hours of complete application submission. Final disbursement typically takes 3-7 business days depending on document verification and loan type."
        },
        {
            question: "Can I apply for a loan if I am self-employed?",
            answer: "Yes, we welcome applications from self-employed individuals and business owners. You will need to provide additional documentation including ITR for the last 2-3 years, bank statements for 12 months, and business registration documents."
        },
        {
            question: "What is the maximum loan amount I can get?",
            answer: "Loan amounts vary by type: Personal loans up to ₹50 lakhs, Business loans up to ₹5 crores, and Home loans up to ₹10 crores. The actual amount depends on your income, credit profile, and repayment capacity."
        },
        {
            question: "Are there any prepayment charges?",
            answer: "We offer flexible prepayment options. For personal loans, there are no prepayment charges after 12 months. For business and home loans, prepayment charges may apply as per RBI guidelines and will be clearly mentioned in your loan agreement."
        },
        {
            question: "What happens if I miss an EMI payment?",
            answer: "We understand that financial situations can change. If you miss an EMI, we charge a late payment fee and it may impact your credit score. We recommend contacting our customer service immediately to discuss restructuring options if you face difficulties."
        },
        {
            question: "Can I increase my loan amount after approval?",
            answer: "Yes, you can apply for a top-up loan after completing 12 months of regular payments on your existing loan. The top-up amount will be subject to fresh eligibility assessment and documentation."
        },
        {
            question: "Do you offer loans to NRIs?",
            answer: "Currently, we primarily serve Indian residents. However, we do consider NRI applications on a case-by-case basis for specific loan products. Please contact our NRI desk for detailed eligibility criteria and documentation requirements."
        }
    ];

    return (
        <section className="bg-white box-border caret-transparent py-16 md:py-24">
            <div className="box-border caret-transparent max-w-4xl mx-auto px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <SectionHeader
                        title="Frequently Asked Questions"
                        description="Find answers to common questions about our loan eligibility criteria and application process. Can't find what you're looking for? Contact our support team."
                    />
                </motion.div>
                <div className="box-border caret-transparent mt-10 md:mt-12">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className={`box-border caret-transparent border border-slate-200 overflow-hidden rounded-xl border-solid transition-all duration-300 ${activeIndex === i ? "bg-slate-50 shadow-md border-slate-300" : "bg-white hover:bg-slate-50"
                                } mb-4`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                className="caret-transparent text-left w-full px-5 py-4 md:px-6 md:py-5 cursor-pointer flex items-center justify-between group"
                            >
                                <h3 className="text-[#111F3B] text-base md:text-lg font-bold box-border caret-transparent leading-6 md:leading-7 pr-4 font-inter transition-colors duration-300">
                                    {faq.question}
                                </h3>
                                <div className={`items-center box-border caret-transparent flex h-5 w-5 md:h-6 md:w-6 shrink-0 transition-transform duration-300 ${activeIndex === i ? "rotate-180" : ""}`}>
                                    {activeIndex === i ? (
                                        <ChevronUp className="text-[#C59D4F] w-5 h-5 md:w-6 md:h-6" />
                                    ) : (
                                        <ChevronDown className="text-slate-400 group-hover:text-slate-600 w-5 h-5 md:w-6 md:h-6" />
                                    )}
                                </div>
                            </button>
                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                                            <div className="h-px bg-slate-200 mb-4"></div>
                                            <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
                {/* FAQFooter */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-white bg-[#111F3B] box-border caret-transparent text-center mt-16 md:mt-20 p-6 md:p-12 rounded-3xl shadow-xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold box-border caret-transparent leading-tight mb-4 font-inter">
                            Still Have Questions?
                        </h3>
                        <p className="text-white/80 text-base md:text-lg box-border caret-transparent max-w-2xl mb-8 md:mb-10 mx-auto font-medium">
                            Our loan specialists are here to help you understand the eligibility
                            criteria and guide you through the application process.
                        </p>
                        <div className="box-border caret-transparent gap-x-6 flex flex-col justify-center gap-y-4 md:flex-row">
                            <Link
                                to="/contact"
                                className="font-bold bg-[#C59D4F] hover:bg-[#B38C3D] transition-all duration-300 transform hover:scale-105 caret-transparent text-nowrap px-8 py-3.5 md:py-4 rounded-xl shadow-lg cursor-pointer inline-block text-center text-sm md:text-base"
                            >
                                Contact Support
                            </Link>
                            <button className="font-bold bg-transparent caret-transparent text-nowrap border-2 px-8 py-3.5 md:py-4 rounded-xl border-solid border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 cursor-pointer shadow-lg text-sm md:text-base">
                                Schedule a Call
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
