import { Search } from "lucide-react";
import { motion } from "framer-motion";

export const TrackingFormSection = () => {
    return (
        <section className="bg-slate-100 box-border caret-transparent py-16">
            <div className="box-border caret-transparent max-w-2xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white shadow-xl box-border caret-transparent p-8 rounded-2xl border border-slate-200"
                >
                    <form className="box-border caret-transparent">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="box-border caret-transparent"
                        >
                            <label className="text-slate-900 text-sm font-semibold box-border caret-transparent block leading-5 mb-2">
                                Application ID
                            </label>
                            <input
                                placeholder="Enter your application ID (e.g., BF2024001)"
                                type="text"
                                className="text-sm box-border caret-transparent leading-5 w-full border border-gray-300 px-4 py-3 rounded-xl border-solid focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                            />
                            <p className="text-gray-400 text-xs box-border caret-transparent leading-4 mt-2">
                                You can find your application ID in the confirmation email or SMS
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="box-border caret-transparent mt-6"
                        >
                            <label className="text-slate-900 text-sm font-semibold box-border caret-transparent block leading-5 mb-2">
                                Registered Phone Number
                            </label>
                            <input
                                placeholder="Enter your registered phone number"
                                type="tel"
                                className="text-sm box-border caret-transparent leading-5 w-full border border-gray-300 px-4 py-3 rounded-xl border-solid focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                            />
                        </motion.div>
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="text-white text-lg font-bold items-center bg-orange-400 shadow-lg caret-transparent border-none flex cursor-pointer h-14 justify-center leading-7 text-center text-nowrap w-full mt-8 px-8 py-4 rounded-xl hover:bg-orange-500 transition-all"
                        >
                            <Search className="mr-2 w-5 h-5" />
                            Track Application
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};
