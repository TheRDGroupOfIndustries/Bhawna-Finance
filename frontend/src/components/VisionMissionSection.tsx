import { Eye, Target } from "lucide-react";
import { motion } from "framer-motion";

export const VisionMissionSection = () => {
    return (
        <section className="bg-slate-100 box-border caret-transparent py-20">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-8">
                <div className="box-border caret-transparent gap-x-12 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-12 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
                    {/* Vision Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] box-border caret-transparent p-8 rounded-lg"
                    >
                        <div className="items-center bg-[#2D4363] box-border caret-transparent flex h-12 justify-center w-12 mb-6 rounded-lg">
                            <Eye className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-slate-900 text-2xl font-bold box-border caret-transparent leading-8 mb-4 font-inter">
                            Our Vision
                        </h3>
                        <p className="text-gray-400 box-border caret-transparent leading-[26px]">
                            To be the most trusted and preferred NBFC in India, known for our ethical practices, innovative financial solutions, and unwavering commitment to customer success.
                        </p>
                    </motion.div>

                    {/* Mission Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] box-border caret-transparent p-8 rounded-lg"
                    >
                        <div className="items-center bg-[#2D4363] box-border caret-transparent flex h-12 justify-center w-12 mb-6 rounded-lg">
                            <Target className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-slate-900 text-2xl font-bold box-border caret-transparent leading-8 mb-4 font-inter">
                            Our Mission
                        </h3>
                        <p className="text-gray-400 box-border caret-transparent leading-[26px]">
                            To provide accessible, transparent, and competitive financial solutions that empower individuals and businesses to achieve their goals while maintaining the highest standards of integrity.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
