import { motion } from "framer-motion";

export const TrackingHero = () => {
    return (
        <section className="bg-white box-border caret-transparent py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="box-border caret-transparent max-w-4xl text-center mx-auto px-8"
            >
                <h1 className="text-slate-900 text-4xl font-bold box-border caret-transparent leading-10 mb-4 font-inter">
                    Track Your Application
                </h1>
                <p className="text-gray-400 text-lg box-border caret-transparent leading-7">
                    Enter your application details to check the current status
                </p>
            </motion.div>
        </section>
    );
};
