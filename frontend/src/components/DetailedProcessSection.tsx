import { SectionHeader } from "./SectionHeader";
import { Monitor, CloudUpload, Search, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Counter } from "./Counter";

export const DetailedProcessSection = () => {
    const steps = [
        {
            stepNumber: "01",
            title: "Online Application",
            description: "Fill out our comprehensive online application form with your personal, employment, and financial details.",
            duration: "5-10 minutes",
            icon: Monitor,
            items: [
                "Personal information verification",
                "Employment and income details",
                "Loan amount and purpose",
                "Bank account information",
            ]
        },
        {
            stepNumber: "02",
            title: "Document Upload",
            description: "Upload required documents through our secure portal. Our system will verify document authenticity.",
            duration: "10-15 minutes",
            icon: CloudUpload,
            items: [
                "Identity and address proof",
                "Income and employment documents",
                "Bank statements (6-12 months)",
                "Property documents (if applicable)",
            ]
        },
        {
            stepNumber: "03",
            title: "Credit Assessment",
            description: "Our advanced algorithms and credit experts review your application and credit profile comprehensively.",
            duration: "2-24 hours",
            icon: Search,
            items: [
                "CIBIL score verification",
                "Income stability analysis",
                "Debt-to-income ratio check",
                "Employment verification",
            ]
        },
        {
            stepNumber: "04",
            title: "Approval & Disbursement",
            description: "Upon approval, loan agreement is generated and funds are disbursed to your registered bank account.",
            duration: "1-3 business days",
            icon: CheckCircle2,
            items: [
                "Loan agreement signing",
                "Final terms confirmation",
                "NACH mandate setup",
                "Fund disbursement",
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section className="bg-white box-border caret-transparent py-16 md:py-24">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <SectionHeader
                        title="Simple Application Process"
                        description="Our streamlined digital process ensures quick approvals and hassle-free experience. Get your loan approved in as little as 24 hours."
                    />
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="box-border caret-transparent mt-10 md:mt-16"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="relative box-border caret-transparent mt-8 first:mt-0 md:mt-12"
                        >
                            <div className="items-start box-border caret-transparent gap-x-8 flex flex-col gap-y-6 md:gap-y-8 md:items-center md:flex-row">
                                <div className="box-border caret-transparent shrink-0">
                                    <div className="relative box-border caret-transparent">
                                        <div className="items-center bg-[#111F3B] box-border caret-transparent flex h-16 w-16 md:h-20 md:w-20 justify-center rounded-full shadow-lg">
                                            <step.icon className="text-white w-7 h-7 md:w-8 md:h-8" />
                                        </div>
                                        <div className="absolute items-center bg-[#C59D4F] box-border caret-transparent flex h-7 w-7 md:h-8 md:w-8 justify-center rounded-full -right-1 -top-1 md:-right-2 md:-top-2 border-2 border-white shadow-sm">
                                            <span className="text-white text-xs md:text-sm font-bold box-border caret-transparent block leading-5">
                                                {step.stepNumber}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-border caret-transparent basis-[0%] grow w-full">
                                    <div className="bg-[#F8FAFC] box-border caret-transparent p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md">
                                        <div className="[align-items:normal] box-border caret-transparent flex flex-col justify-normal mb-4 md:mb-6 md:items-start md:flex-row md:justify-between">
                                            <div className="box-border caret-transparent">
                                                <h3 className="text-[#111F3B] text-xl md:text-2xl font-bold box-border caret-transparent leading-8 mb-2 font-inter">
                                                    {step.title}
                                                </h3>
                                                <p className="text-slate-600 text-base md:text-lg box-border caret-transparent leading-relaxed md:leading-[29.25px] max-w-2xl">
                                                    {step.description}
                                                </p>
                                            </div>
                                            <div className="box-border caret-transparent mt-4 md:mt-0">
                                                <div className="text-white text-[10px] md:text-xs font-bold bg-[#C59D4F] box-border caret-transparent leading-5 text-nowrap px-3 md:px-4 py-1.5 rounded-full uppercase tracking-wider">
                                                    {step.duration.match(/[0-9]/) ? (
                                                        <Counter value={step.duration} />
                                                    ) : (
                                                        step.duration
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-border caret-transparent gap-x-8 grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-4">
                                            {step.items.map((item, i) => (
                                                <div key={i} className="items-center box-border caret-transparent flex">
                                                    <div className="bg-[#C59D4F] box-border caret-transparent shrink-0 h-1.5 w-1.5 md:h-2 md:w-2 rounded-full"></div>
                                                    <span className="text-slate-700 text-xs md:text-sm font-medium box-border caret-transparent block leading-5 ml-3">
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="box-border caret-transparent absolute bg-slate-200 hidden h-12 w-[2px] left-10 top-20 md:block"></div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
                {/* CTACard */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="box-border caret-transparent text-center mt-16 md:mt-24"
                >
                    <div className="text-white bg-[#111F3B] box-border caret-transparent p-6 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold box-border caret-transparent leading-tight mb-4 font-inter">
                                Ready to Start Your Application?
                            </h3>
                            <p className="text-white/80 text-base md:text-lg box-border caret-transparent max-w-2xl mb-8 md:mb-10 mx-auto">
                                Join thousands of satisfied customers who have successfully obtained
                                loans through our platform. Start your application today and get
                                approved quickly.
                            </p>
                            <button className="font-bold bg-[#C59D4F] hover:bg-[#B38C3D] transition-all duration-300 transform hover:scale-105 caret-transparent text-nowrap px-8 md:px-10 py-3 md:py-4 rounded-xl shadow-lg cursor-pointer text-base md:text-lg">
                                Start Application Now
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
