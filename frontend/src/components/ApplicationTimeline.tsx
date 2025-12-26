import { SectionHeader } from "./SectionHeader";
import {
    FileText,
    Search,
    BarChart3,
    UserCheck,
    ClipboardCheck,
    Landmark,
    Check,
    Clock,
    Ellipsis

} from "lucide-react";
import { motion } from "framer-motion";
import { Counter } from "./Counter";

export const ApplicationTimeline = () => {
    const steps = [
        {
            mainIcon: FileText,
            statusIcon: Check,
            iconContainerVariant: "bg-green-500",
            dayRange: "Day 1",
            status: "completed",
            statusColorClasses: "text-green-700 bg-green-100",
            title: "Application Submission",
            description: "Submit your complete application with all required documents through our secure online portal."
        },
        {
            containerVariant: "mt-12",
            mainIcon: Search,
            statusIcon: Check,
            iconContainerVariant: "bg-green-500",
            dayRange: "Day 1-2",
            status: "completed",
            statusColorClasses: "text-green-700 bg-green-100",
            title: "Initial Verification",
            description: "Our system performs automated document verification and basic eligibility checks."
        },
        {
            containerVariant: "mt-12",
            mainIcon: BarChart3,
            statusIcon: Clock,
            iconContainerVariant: "bg-[#C59D4F]",
            dayRange: "Day 2-3",
            status: "in progress",
            statusColorClasses: "text-yellow-700 bg-yellow-100",
            title: "Credit Assessment",
            description: "Comprehensive credit evaluation including CIBIL score analysis and income verification."
        },
        {
            containerVariant: "mt-12",
            mainIcon: UserCheck,
            statusIcon: Ellipsis,
            iconContainerVariant: "bg-slate-300",
            dayRange: "Day 3-4",
            status: "pending",
            statusColorClasses: "text-slate-600 bg-slate-100",
            title: "Manual Review",
            description: "Senior credit officers review your application for final approval decision."
        },
        {
            containerVariant: "mt-12",
            mainIcon: ClipboardCheck,
            statusIcon: Ellipsis,
            iconContainerVariant: "bg-slate-300",
            dayRange: "Day 4-5",
            status: "pending",
            statusColorClasses: "text-slate-600 bg-slate-100",
            title: "Approval & Documentation",
            description: "Loan approval notification and digital loan agreement preparation."
        },
        {
            containerVariant: "mt-12",
            mainIcon: Landmark,
            statusIcon: Ellipsis,
            iconContainerVariant: "bg-slate-300",
            dayRange: "Day 5-7",
            status: "pending",
            statusColorClasses: "text-slate-600 bg-slate-100",
            title: "Fund Disbursement",
            description: "Loan amount transferred to your registered bank account after agreement signing."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
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
                        title="Application Processing Timeline"
                        description="Track your loan application journey from submission to disbursement. Our transparent process keeps you informed at every step."
                    />
                </motion.div>
                <div className="relative box-border caret-transparent max-w-4xl mx-auto mt-10 md:mt-16">
                    <div className="absolute bg-slate-100 box-border caret-transparent hidden w-[2px] left-8 top-8 bottom-8 md:block"></div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="box-border caret-transparent space-y-6 md:space-y-8"
                    >
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`relative items-start box-border caret-transparent flex flex-col md:items-center md:flex-row ${index > 0 ? "mt-8 md:mt-12" : ""}`}
                            >
                                <div className="relative box-border caret-transparent shrink-0 mb-4 md:mb-0 z-10">
                                    <div
                                        className={`items-center shadow-lg box-border caret-transparent flex h-14 w-14 md:h-16 md:w-16 rounded-full transition-transform duration-300 hover:scale-110 justify-center ${step.iconContainerVariant}`}
                                    >
                                        <step.mainIcon className="text-white w-6 h-6 md:w-7 md:h-7" />
                                    </div>
                                    <div
                                        className={`absolute items-center box-border caret-transparent flex h-5 w-5 md:h-6 md:w-6 rounded-full border-2 border-solid border-white -right-1 -top-1 shadow-sm justify-center ${step.iconContainerVariant}`}
                                    >
                                        <step.statusIcon className="text-white w-2.5 h-2.5 md:w-3 md:h-3" />
                                    </div>
                                </div>
                                <div className="box-border caret-transparent basis-[0%] grow ml-0 md:ml-12 w-full">
                                    <div className="bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-300 box-border caret-transparent p-6 md:p-8 rounded-2xl border border-transparent hover:border-slate-100">
                                        <div className="[align-items:normal] box-border caret-transparent flex flex-col justify-normal mb-3 md:mb-4 md:items-center md:flex-row md:justify-between">
                                            <div className="box-border caret-transparent">
                                                <div className="items-center box-border caret-transparent flex mb-3 gap-3">
                                                    <span
                                                        className={`${step.statusColorClasses} text-[10px] md:text-[11px] font-bold uppercase tracking-wider box-border caret-transparent block leading-4 px-3 py-1 rounded-full`}
                                                    >
                                                        {step.dayRange}
                                                    </span>
                                                    <span
                                                        className={`${step.statusColorClasses} text-[10px] md:text-[11px] font-bold uppercase tracking-wider box-border caret-transparent block leading-4 capitalize px-3 py-1 rounded-full`}
                                                    >
                                                        {step.status}
                                                    </span>
                                                </div>
                                                <h3 className="text-[#111F3B] text-lg md:text-xl font-bold box-border caret-transparent leading-7 mb-2 font-inter">
                                                    {step.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 font-medium text-xs md:text-sm box-border caret-transparent leading-relaxed max-w-2xl">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                {/* TimelineStats */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-white bg-[#111F3B] box-border caret-transparent mt-16 md:mt-24 p-6 md:p-12 rounded-3xl shadow-xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

                    <div className="box-border caret-transparent gap-x-8 grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-12 text-center relative z-10">
                        <div className="box-border caret-transparent">
                            <div className="text-[#C59D4F] text-2xl md:text-4xl font-bold box-border caret-transparent leading-none mb-3 font-inter">
                                <Counter value="24" /> Hours
                            </div>
                            <div className="text-white/80 font-bold uppercase tracking-widest text-[10px] md:text-xs box-border caret-transparent">
                                Initial Response
                            </div>
                        </div>
                        <div className="box-border caret-transparent">
                            <div className="text-[#C59D4F] text-2xl md:text-4xl font-bold box-border caret-transparent leading-none mb-3 font-inter">
                                <Counter value="3" />-<Counter value="5" /> Days
                            </div>
                            <div className="text-white/80 font-bold uppercase tracking-widest text-[10px] md:text-xs box-border caret-transparent">
                                Complete Processing
                            </div>
                        </div>
                        <div className="box-border caret-transparent">
                            <div className="text-[#C59D4F] text-2xl md:text-4xl font-bold box-border caret-transparent leading-none mb-3 font-inter">
                                <Counter value="5" />-<Counter value="7" /> Days
                            </div>
                            <div className="text-white/80 font-bold uppercase tracking-widest text-[10px] md:text-xs box-border caret-transparent">
                                Fund Disbursement
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
