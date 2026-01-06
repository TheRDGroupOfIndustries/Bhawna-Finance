import { GallerySection } from "../components/GallerySection";
import { useEffect } from "react";
import { motion } from "framer-motion";

export const Gallery = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Gallery | Bhawan Finance - Our Work in Focus";
    }, []);

    return (
        <main className="pt-20">
            {/* Gallery Hero Section */}
            <section className="bg-slate-900 py-24 md:py-32 px-6 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0 right-0 w-1/2 h-full bg-[#C59D4F]/10 skew-x-12 translate-x-1/2"
                ></motion.div>
                <div className="max-w-screen-xl mx-auto relative z-10">
                    <div className="max-w-3xl m-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
                        >
                            Bhawan Finance <span className="text-[#C59D4F]">Gallery</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-slate-300 text-lg md:text-2xl leading-relaxed"
                        >
                            A visual journey through our offices, our dedicated team, and our commitment to serving your financial needs in Varanasi and beyond.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Main Gallery Section */}
            <GallerySection />

            {/* Call to Action */}
            <section className="bg-white py-24 px-6 border-t border-slate-100">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                        Ready to Start Your Financial Journey?
                    </h2>
                    <p className="text-slate-600 mb-10 text-lg md:text-xl">
                        Our experts are here to help you find the perfect loan solution for your personal or business needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/apply-now"
                            className="bg-[#C59D4F] hover:bg-[#B38C3D] text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg hover:shadow-[#C59D4F]/30"
                        >
                            Apply for a Loan
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/contact"
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg hover:shadow-black/30"
                        >
                            Contact Support
                        </motion.a>
                    </div>
                </motion.div>
            </section>
        </main>
    );
};
