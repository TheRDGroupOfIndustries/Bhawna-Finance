import { motion } from "framer-motion";
import { Counter } from "./Counter";

export const LoanRatesSection = () => {
    const rates = [
        { title: "Personal Loans", rate: "10.99%", subtitle: "Starting from" },
        { title: "Business Loans", rate: "12.99%", subtitle: "Starting from" },
        { title: "Loan Against Property", rate: "9.99%", subtitle: "Starting from" },
        { title: "Gold Loans", rate: "8.99%", subtitle: "Starting from" }
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="bg-white box-border caret-transparent py-20">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="box-border caret-transparent text-center mb-12"
                >
                    <h2 className="text-slate-900 text-4xl font-bold box-border caret-transparent leading-10 mb-4 font-inter">
                        Competitive Interest Rates
                    </h2>
                    <p className="text-gray-400 text-lg box-border caret-transparent leading-7">
                        Compare our rates across different loan products
                    </p>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="box-border caret-transparent gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-6 md:grid-cols-[repeat(4,minmax(0px,1fr))]"
                >
                    {rates.map((rate, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-slate-100 box-border caret-transparent text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                        >
                            <h4 className="text-slate-900 font-semibold box-border caret-transparent mb-2 font-inter">
                                {rate.title}
                            </h4>
                            <div className="text-orange-400 text-2xl font-bold box-border caret-transparent leading-8 mb-1">
                                <Counter value={rate.rate} />
                            </div>
                            <p className="text-gray-400 text-xs box-border caret-transparent leading-4">
                                {rate.subtitle}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
