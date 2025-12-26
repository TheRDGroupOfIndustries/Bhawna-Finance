import { motion } from "framer-motion";

export const ApplyHero = () => {
    return (
        <section className="bg-white box-border caret-transparent py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="box-border caret-transparent max-w-4xl text-center mx-auto px-8"
            >
                <h1 className="text-slate-900 text-4xl font-bold box-border caret-transparent leading-10 mb-4 font-inter">
                    Loan Application
                </h1>
                <p className="text-gray-400 text-lg box-border caret-transparent leading-7">
                    Complete your loan application in simple steps
                </p>
            </motion.div>
        </section>
    );
};
