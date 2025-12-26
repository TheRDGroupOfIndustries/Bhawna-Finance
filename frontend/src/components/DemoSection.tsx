import { motion } from "framer-motion";

export const DemoSection = () => {
    const demoIds = [
        { id: "BF2024001", status: "Personal Loan - Under Review" },
        { id: "BF2024002", status: "Business Loan - Approved" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4 }
        }
    };

    return (
        <section className="bg-white box-border caret-transparent py-16">
            <div className="box-border caret-transparent max-w-4xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-slate-50 box-border caret-transparent p-10 rounded-2xl border border-slate-100"
                >
                    <h3 className="text-slate-900 text-xl font-bold box-border caret-transparent leading-7 mb-4 font-inter">
                        Demo Application IDs
                    </h3>
                    <p className="text-gray-500 box-border caret-transparent mb-8">
                        Try tracking with these sample application IDs to see the status flow:
                    </p>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="box-border caret-transparent gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-6 md:grid-cols-[repeat(2,minmax(0px,1fr))]"
                    >
                        {demoIds.map((demo, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                className="bg-white box-border caret-transparent border border-slate-200 p-6 rounded-xl border-solid transition-all cursor-pointer"
                            >
                                <p className="text-slate-900 font-bold text-lg box-border caret-transparent mb-1">
                                    {demo.id}
                                </p>
                                <p className="text-gray-400 text-sm box-border caret-transparent leading-5">
                                    {demo.status}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
