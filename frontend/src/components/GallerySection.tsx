import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import image1 from "../assets/Gallery/image1.avif"
import image2 from "../assets/Gallery/image2.avif"
import image3 from "../assets/Gallery/image3.avif"
import image4 from "../assets/Gallery/image4.webp"
import image5 from "../assets/Gallery/image5.avif"
import image6 from "../assets/Gallery/image6.avif"
import image7 from "../assets/Gallery/image7.jpg"
import image8 from "../assets/Gallery/image8.jpg"
import image9 from "../assets/Gallery/image9.avif"
import image10 from "../assets/Gallery/image10.avif"
import image11 from "../assets/Gallery/image11.webp"
import image12 from "../assets/Gallery/image12.jpg"

export const GallerySection = () => {
    const allImages = [
        image1, image2, image3, image4, image5, image6,
        image7, image8, image9, image10, image11, image12,
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "circOut"
            }
        }
    };

    return (
        <section className="relative box-border caret-transparent flex flex-col items-center py-12 md:py-24 bg-white overflow-hidden">
            <div className="relative box-border w-full max-w-screen-xl mx-auto px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="text-[#C59D4F] text-xs md:text-sm font-bold tracking-[2.16px] leading-[18px] uppercase mb-2 md:mb-4">
                        Visual Showcase
                    </div>
                    <h2 className="text-3xl md:text-5xl leading-tight uppercase font-bold text-slate-900 mb-12 font-inter">
                        Our Work In <span className="text-[#C59D4F]">Focus</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col gap-y-12 w-full"
                >
                    {/* Masonry Layout Using CSS Columns */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {allImages.map((imageUrl, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                                className="break-inside-avoid group relative overflow-hidden rounded-2xl bg-slate-50 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-zoom-in"
                            >
                                <motion.img
                                    src={imageUrl}
                                    alt={`Bhawan Finance Gallery ${index + 1}`}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
