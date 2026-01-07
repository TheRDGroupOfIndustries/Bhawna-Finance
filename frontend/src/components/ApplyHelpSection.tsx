import { Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export const ApplyHelpSection = () => {
    return (
        <section className="bg-slate-100 box-border  py-16">
            <div className="box-border  max-w-4xl text-center mx-auto px-8">
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-slate-900 text-2xl font-bold box-border  leading-7 mb-4 font-inter"
                >
                    Still Have Questions?
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-500 font-medium box-border  mb-10 max-w-lg mx-auto"
                >
                    Our loan experts are available to assist you through every step of your application process.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="box-border  gap-x-6 flex flex-col justify-center gap-y-4 md:flex-row"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-white font-bold items-center bg-slate-900  flex h-14 justify-center text-nowrap border-none px-8 py-3 rounded-xl shadow-lg hover:bg-slate-800 transition-all"
                    >
                        <Phone size={20} className="mr-3" />
                        Call: 7800276002
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-slate-900 font-bold items-center bg-white  flex h-14 justify-center text-nowrap border-2 border-slate-900 px-8 py-3 rounded-xl shadow-md hover:bg-slate-50 transition-all"
                    >
                        <Mail size={20} className="mr-3" />
                        Email bhawanfinance.vns@gmail.com
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};
