import { motion } from "framer-motion";
import { Counter } from "./Counter";

export const StatsSection = () => {
    const stats = [
        { value: "25+", label: "Years Established", showDecorator: true },
        { value: "₹500Cr+", label: "Loans Disbursed", showDecorator: true },
        { value: "50,000+", label: "Satisfied Customers", showDecorator: true },
        { value: "RBI", label: "Registered NBFC", showDecorator: false },
    ];

    return (
        <section className="bg-slate-100 box-border caret-transparent py-16">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-8">
                {/* StatsGrid */}
                <div className="box-border caret-transparent gap-x-8 grid grid-cols-[repeat(2,minmax(0px,1fr))] gap-y-8 md:grid-cols-[repeat(4,minmax(0px,1fr))]">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative box-border caret-transparent text-center"
                        >
                            {stat.showDecorator && (
                                <div className="box-border caret-transparent absolute bg-gray-300 hidden h-16 transform-none w-px right-0 top-2/4 md:block md:translate-y-[-50.0%]"></div>
                            )}
                            <div className="box-border caret-transparent text-slate-900 text-4xl font-bold leading-10 mb-2 md:text-5xl md:leading-[48px]">
                                {stat.value.match(/[0-9]/) ? (
                                    <Counter value={stat.value} />
                                ) : (
                                    stat.value
                                )}
                            </div>
                            <div className="text-gray-400 text-sm font-medium box-border caret-transparent tracking-[0.7px] leading-5 uppercase">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
