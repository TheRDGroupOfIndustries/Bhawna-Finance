import { motion } from "framer-motion";

export const ContactHero = () => {
    return (
        <section className="relative bg-[linear-gradient(to_right_bottom,rgb(11,31,59),rgb(47,74,109))] box-border caret-transparent pt-32 pb-20">
            <div className="absolute bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.1),rgba(0,0,0,0.2))] box-border caret-transparent inset-0"></div>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative box-border caret-transparent max-w-screen-xl text-center mx-auto px-8"
            >
                <h1 className="text-white text-5xl font-bold box-border caret-transparent leading-[48px] mb-6 font-inter md:text-6xl md:leading-[60px]">
                    Contact &amp; Support
                </h1>
                <p className="text-blue-100 text-xl box-border caret-transparent leading-[32.5px] max-w-screen-md mx-auto">
                    Get in touch with our expert team for personalized financial solutions
                    and dedicated support
                </p>
            </motion.div>
        </section>
    );
};
