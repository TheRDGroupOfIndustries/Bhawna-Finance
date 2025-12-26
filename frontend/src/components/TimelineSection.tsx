import { motion } from "framer-motion";
import { Counter } from "./Counter";

export const TimelineSection = () => {
    const timelineItems = [
        {
            year: "1998",
            title: "Company Founded",
            description: "Established as a private lending institution",
            variant: "justify-start"
        },
        {
            year: "2003",
            title: "RBI Registration",
            description: "Obtained NBFC license from Reserve Bank of India",
            variant: "justify-end"
        },
        {
            year: "2010",
            title: "Digital Transformation",
            description: "Launched online application and tracking systems",
            variant: "justify-start"
        },
        {
            year: "2018",
            title: "₹500Cr Milestone",
            description: "Crossed ₹500 crores in total loan disbursements",
            variant: "justify-end"
        },
        {
            year: "2024",
            title: "50,000+ Customers",
            description: "Serving over 50,000 satisfied customers nationwide",
            variant: "justify-start"
        }
    ];

    return (
        <section className="bg-white box-border caret-transparent py-20">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-4 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="box-border caret-transparent text-center mb-16"
                >
                    <h2 className="text-slate-900 text-3xl sm:text-4xl font-bold box-border caret-transparent leading-10 mb-4 font-inter">
                        Our Journey
                    </h2>
                    <p className="text-gray-400 text-base sm:text-lg box-border caret-transparent leading-7 max-w-2xl mx-auto">
                        Key milestones that have shaped our growth and commitment to
                        excellence
                    </p>
                </motion.div>
                <div className="relative box-border caret-transparent">
                    {/* Vertical line - hidden on mobile, center on desktop */}
                    <div className="absolute hidden md:block bg-slate-700 h-full left-1/2 -translate-x-1/2 w-px"></div>
                    {/* Vertical line - mobile only, left side */}
                    <div className="absolute md:hidden bg-slate-700 h-full left-4 sm:left-6 w-px"></div>

                    {timelineItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: item.variant === "justify-start" ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className={`relative items-center flex flex-col md:flex-row mb-12 ${item.variant} md:mb-12`}
                        >
                            <div
                                className={`w-full pl-12 sm:pl-16 md:pl-0 md:w-[41.6667%] ${item.variant === "justify-start" ? "md:text-right md:pr-8" : "md:text-left md:pl-8 md:ml-auto"}`}
                            >
                                {/* Mobile indicator dot */}
                                <div className="absolute md:hidden bg-orange-400 h-4 w-4 rounded-full border-4 border-solid border-white left-4 sm:left-6 -translate-x-1/2 top-6"></div>

                                <div className="bg-white shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-gray-200 p-6 rounded-lg border-solid">
                                    <div className="text-orange-400 text-lg font-bold leading-7 mb-2">
                                        <Counter value={item.year} />
                                    </div>
                                    <h4 className="text-slate-900 text-xl font-semibold leading-7 mb-2 font-inter">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-5">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            {/* Desktop indicator dot */}
                            <div className="absolute hidden md:block bg-orange-400 h-4 w-4 rounded-full border-4 border-solid border-white left-1/2 -translate-x-1/2"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
