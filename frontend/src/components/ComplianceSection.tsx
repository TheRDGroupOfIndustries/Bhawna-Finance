import { ShieldCheck, Award, FileCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Counter } from "./Counter";

export const ComplianceSection = () => {
    return (
        <section className="bg-slate-900 box-border caret-transparent py-20">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-8">
                <div className="items-center box-border caret-transparent gap-x-12 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-12 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="box-border caret-transparent"
                    >
                        <h2 className="text-white text-4xl font-bold box-border caret-transparent leading-10 mb-6 font-inter">
                            Regulatory Compliance &amp; Governance
                        </h2>
                        <p className="text-white/90 box-border caret-transparent leading-[26px] mb-8">
                            As an RBI-registered NBFC, we adhere to the highest standards of
                            regulatory compliance, risk management, and corporate governance.
                            Our operations are regularly audited and monitored to ensure
                            complete transparency and customer protection.
                        </p>

                        {/* ComplianceList */}
                        <div className="box-border caret-transparent space-y-4">
                            {[
                                { Icon: ShieldCheck, text: "RBI Registered NBFC (License: N-14.03268)" },
                                { Icon: Award, text: "ISO 27001 Certified for Information Security" },
                                { Icon: FileCheck, text: "Regular Compliance Audits & Reporting" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="items-center box-border caret-transparent flex"
                                >
                                    <item.Icon className="text-orange-400 w-5 h-5" />
                                    <span className="text-white box-border caret-transparent block ml-3">
                                        {item.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ComplianceDetails */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white/10 box-border caret-transparent p-8 rounded-lg"
                    >
                        <h3 className="text-white text-xl font-semibold box-border caret-transparent leading-7 mb-6 font-inter">
                            Key Regulatory Details
                        </h3>
                        <div className="text-white/90 box-border caret-transparent">
                            <div className="box-border caret-transparent">
                                <strong className="font-bold box-border caret-transparent">
                                    RBI Registration Number:
                                </strong>
                                <span className="ml-2">N-14.<Counter value="03268" /></span>
                            </div>
                            <div className="box-border caret-transparent mt-4">
                                <strong className="font-bold box-border caret-transparent">
                                    Date of Registration:
                                </strong>
                                <span className="ml-2">March 15, <Counter value="2003" /></span>
                            </div>
                            <div className="box-border caret-transparent mt-4">
                                <strong className="font-bold box-border caret-transparent">
                                    Certificate of Registration:
                                </strong>
                                <span className="ml-2">Valid &amp; Current</span>
                            </div>
                            <div className="box-border caret-transparent mt-4">
                                <strong className="font-bold box-border caret-transparent">
                                    Regulatory Authority:
                                </strong>
                                <span className="ml-2">Reserve Bank of India</span>
                            </div>
                            <div className="box-border caret-transparent mt-4">
                                <strong className="font-bold box-border caret-transparent">
                                    Grievance Officer:
                                </strong>
                                <span className="ml-2">Available for customer complaints</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
