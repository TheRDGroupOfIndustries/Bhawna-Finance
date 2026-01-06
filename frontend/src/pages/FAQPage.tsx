import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { ChevronDown, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const faqs = [
        {
            category: "General",
            items: [
                {
                    question: "Who is Bhawan Finance?",
                    answer: "Bhawan Finance is an RBI registered NBFC (Non-Banking Financial Company) providing reliable lending solutions since 1998. We specialize in personal loans, business loans, and various secured lending products with a focus on transparency and customer-first service."
                },
                {
                    question: "Where is Bhawan Finance located?",
                    answer: "Our main office is located at Vishwanath Katra, Bhikharipur, Varanasi - 221004 (U.P.). You can visit us during business hours for in-person consultations."
                },
                {
                    question: "What is your RBI Registration Number?",
                    answer: "Our RBI Registration Number is N-14.03268. As a registered NBFC, we adhere to all regulatory guidelines ensuring safety and transparency for our customers."
                }
            ]
        },
        {
            category: "Loan Process",
            items: [
                {
                    question: "What documents do I need for a loan application?",
                    answer: "Typically, you need identity proof (Aadhar/PAN), address proof, income proof (last 3 months' salary slips or ITR), bank statements for the last 6 months, and property documents for secured loans."
                },
                {
                    question: "How long does the loan approval process take?",
                    answer: "Our digital-first approach ensures quick processing. Initial approval can be received within 24 hours of complete application submission. Final disbursement typically takes 3-7 business days."
                },
                {
                    question: "How are interest rates determined?",
                    answer: "Interest rates vary based on the loan type, your credit score (CIBIL), income stability, and the loan amount. We offer competitive rates starting from market standards."
                }
            ]
        },
        {
            category: "Eligibility",
            items: [
                {
                    question: "What is the minimum CIBIL score required?",
                    answer: "We typically look for a CIBIL score of 650+ for personal loans and 700+ for business loans. However, we consider the overall profile and may approve cases with lower scores if income stability is high."
                },
                {
                    question: "Can self-employed individuals apply?",
                    answer: "Yes, we have dedicated loan products for self-employed professionals and business owners. Documentation requirements include business registration and ITR records."
                }
            ]
        },
        {
            category: "Repayment",
            items: [
                {
                    question: "Are there any prepayment charges?",
                    answer: "We offer flexible prepayment options. Most personal loans have zero foreclosure charges after 12 EMIs. Full details will be provided in your specific loan agreement."
                },
                {
                    question: "What happens if I miss an EMI?",
                    answer: "Missing an EMI may lead to late payment fees and can negatively impact your credit score. We recommend contacting us immediately if you anticipate any difficulty in making a payment."
                }
            ]
        }
    ];

    // Flatten FAQs for the accordion
    const allFaqs = faqs.flatMap(category => category.items);

    return (
        <div className="bg-slate-50">
            <PageHero
                title="Frequently Asked Questions"
                description="Everything you need to know about our loans, processing, and how we can help you grow. Can't find an answer? Our team is just a call away."
            />

            <section className="py-20">
                <div className="max-w-4xl mx-auto px-8">
                    <div className="space-y-4">
                        {allFaqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className={`border border-slate-200 overflow-hidden rounded-2xl transition-all duration-300 ${activeIndex === i ? "bg-white shadow-xl border-[#C59D4F]/30" : "bg-white/60 hover:bg-white shadow-sm"
                                    }`}
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                    className="text-left w-full px-8 py-6 cursor-pointer flex items-center justify-between group"
                                >
                                    <h3 className={`text-lg font-bold font-inter transition-colors duration-300 ${activeIndex === i ? "text-[#C59D4F]" : "text-slate-900"
                                        }`}>
                                        {faq.question}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: activeIndex === i ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${activeIndex === i ? "bg-[#C59D4F]/10 text-[#C59D4F]" : "bg-slate-100 text-slate-400"
                                            }`}
                                    >
                                        <ChevronDown size={20} />
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
                                                <div className="h-px bg-slate-100 mb-6"></div>
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

                    {/* Contact CTA */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-20 bg-slate-900 rounded-[2rem] p-10 md:p-16 relative overflow-hidden text-center"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C59D4F]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="relative z-10">
                            <h2 className="text-white text-3xl font-bold mb-6">Didn't find your answer?</h2>
                            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                                Our dedicated support team is available from 10:00 AM to 6:00 PM to assist you with any specific queries.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link
                                    to="/contact"
                                    className="bg-[#C59D4F] hover:bg-[#B38C3D] text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105"
                                >
                                    Get In Touch
                                </Link>
                                <a
                                    href="tel:+918400260002"
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2"
                                >
                                    <Phone size={18} />
                                    Call Now
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
