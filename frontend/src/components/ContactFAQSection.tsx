import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ContactFAQSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What documents do I need for a loan application?",
            answer: "Required documents include identity proof, address proof, income proof, bank statements, and property documents (for secured loans). Our team will provide a complete checklist based on your loan type."
        },
        {
            question: "How long does the loan approval process take?",
            answer: "Our streamlined process typically takes 3-7 business days for approval, depending on the loan type and documentation completeness. Emergency cases can be expedited."
        },
        {
            question: "How are your interest rates?",
            answer: "Interest rates vary based on loan type, amount, tenure, and your credit profile. Contact us for personalized rates starting from competitive market rates."
        },
        {
            question: "Can I prepay my loan without penalties?",
            answer: "Yes, we offer flexible prepayment options with minimal or no penalties. Specific terms depend on your loan agreement and tenure completed."
        }
    ];

    return (
        <section className="bg-gray-50/50 box-border caret-transparent py-24">
            <div className="box-border caret-transparent max-w-4xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="box-border caret-transparent text-center mb-16"
                >
                    <h2 className="text-[#111F3B] text-4xl font-bold box-border caret-transparent leading-tight mb-4 font-inter">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600 text-lg box-border caret-transparent font-medium">
                        Quick answers to common questions about our services and processes
                    </p>
                </motion.div>
                <div className="box-border caret-transparent">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`box-border caret-transparent border border-slate-200 overflow-hidden rounded-xl border-solid transition-all duration-300 ${activeIndex === i ? "bg-slate-50 shadow-md border-slate-300" : "bg-white hover:bg-slate-50 shadow-sm"
                                } mb-4`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                className="caret-transparent text-left w-full px-8 py-6 cursor-pointer flex items-center justify-between group"
                            >
                                <h3 className="text-[#111F3B] text-lg font-bold box-border caret-transparent leading-7 pr-4 font-inter transition-colors duration-300">
                                    {faq.question}
                                </h3>
                                <motion.div
                                    animate={{ rotate: activeIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="items-center box-border caret-transparent flex h-6 justify-center w-6"
                                >
                                    <ChevronDown className={`${activeIndex === i ? "text-[#C59D4F]" : "text-slate-400 group-hover:text-slate-600"} w-6 h-6 transition-colors`} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-8 pb-8 pt-0">
                                            <div className="h-px bg-slate-200 mb-6"></div>
                                            <p className="text-slate-600 font-medium leading-relaxed text-base">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
