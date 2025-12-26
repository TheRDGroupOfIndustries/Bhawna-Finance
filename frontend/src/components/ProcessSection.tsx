import { Check } from "lucide-react";
import { motion } from "framer-motion";

export const ProcessSection = () => {
    const eligibilityRequirements = [
        "Age: 21-65 years",
        "Stable income source",
        "Valid KYC documents",
        "Good credit history",
        "Minimum income criteria",
        "Employment stability",
    ];

    const applicationSteps = [
        {
            title: "Submit Application",
            description: "Fill out our simple online application form with basic details",
        },
        {
            title: "Document Verification",
            description: "Upload required documents for quick verification process",
        },
        {
            title: "Credit Assessment",
            description: "Our team reviews your application and credit profile",
        },
        {
            title: "Loan Approval",
            description: "Receive approval and funds disbursed to your account",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    const stepVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="bg-slate-700 box-border caret-transparent py-20">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-8">
                {/* ProcessGrid */}
                <div className="box-border caret-transparent gap-x-16 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-16 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
                    {/* EligibilityColumn */}
                    <div className="box-border caret-transparent">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-white text-3xl font-bold box-border caret-transparent leading-9 mb-8 font-inter md:text-4xl md:leading-10"
                        >
                            Eligibility Requirements
                        </motion.h2>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="box-border caret-transparent"
                        >
                            {eligibilityRequirements.map((req, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className={`items-center box-border caret-transparent flex${index > 0 ? " mt-4" : ""}`}
                                >
                                    <div className="items-center bg-orange-400 box-border caret-transparent flex shrink-0 h-5 justify-center w-5 rounded-full">
                                        <Check className="text-white w-3 h-3" strokeWidth={3} />
                                    </div>
                                    <span className="text-white text-lg box-border caret-transparent block leading-7 ml-4">
                                        {req}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ProcessColumn */}
                    <div className="box-border caret-transparent">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-white text-3xl font-bold box-border caret-transparent leading-9 mb-8 font-inter md:text-4xl md:leading-10"
                        >
                            Simple Application Process
                        </motion.h2>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="box-border caret-transparent"
                        >
                            {applicationSteps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    variants={stepVariants}
                                    className={`items-start box-border caret-transparent flex${index > 0 ? " mt-8" : ""}`}
                                >
                                    <div className="relative box-border caret-transparent">
                                        <div className="text-white font-bold items-center bg-orange-400 box-border caret-transparent flex h-10 justify-center w-10 rounded-full">
                                            {index + 1}
                                        </div>
                                        {index < applicationSteps.length - 1 && (
                                            <div className="absolute bg-white/30 box-border caret-transparent h-8 translate-x-[-50.0%] w-px left-2/4 top-10"></div>
                                        )}
                                    </div>
                                    <div className="box-border caret-transparent basis-[0%] grow ml-4">
                                        <h3 className="text-white text-lg font-semibold box-border caret-transparent leading-7 mb-2 font-inter">
                                            {step.title}
                                        </h3>
                                        <p className="text-white/80 text-sm box-border caret-transparent leading-[22.75px]">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="box-border caret-transparent text-center mt-16"
                >
                    <button className="text-white text-lg font-medium items-center bg-orange-400 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] caret-transparent inline-flex h-14 justify-center leading-7 text-nowrap px-8 py-4 rounded-bl rounded-br rounded-tl rounded-tr hover:bg-orange-500 hover:shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_4px_6px_-1px,rgba(0,0,0,0.1)_0px_2px_4px_-2px]">
                        Check Your Eligibility
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
