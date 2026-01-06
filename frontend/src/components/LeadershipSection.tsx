import { motion } from "framer-motion";
import { Counter } from "./Counter";
import NageshImage from "../assets/Gallery/image2.avif"
import SecondImage from "../assets/Gallery/image11.webp"

export const LeadershipSection = () => {
    const leaders = [
        {
            name: "Nagesh Shukla",
            imageUrl: NageshImage,
            title: "Managing Director",
            experience: "30+ years in financial services"
        },
        {
            name: "Madam",
            imageUrl: SecondImage,
            title: "Executive Director",
            experience: "25+ years in operations and compliance"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="bg-slate-100 box-border  py-20">
            <div className="box-border  max-w-screen-xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="box-border  text-center mb-16"
                >
                    <h2 className="text-slate-900 text-4xl font-bold box-border  leading-10 mb-4 font-inter">
                        Leadership Team
                    </h2>
                    <p className="text-gray-400 text-lg box-border  leading-7 max-w-2xl mx-auto">
                        Experienced professionals leading our organization with vision and
                        integrity
                    </p>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="box-border flex flex-wrap justify-center gap-8"
                >
                    {leaders.map((leader, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] box-border overflow-hidden rounded-lg group w-full max-w-sm"
                        >
                            <img
                                alt={leader.name}
                                src={leader.imageUrl}
                                className="box-border h-80 max-w-full object-cover w-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="box-border  p-6">
                                <h4 className="text-slate-900 text-xl font-semibold box-border  leading-7 mb-2 font-inter">
                                    {leader.name}
                                </h4>
                                <p className="text-slate-700 font-medium box-border  mb-2">
                                    {leader.title}
                                </p>
                                <p className="text-gray-400 text-sm box-border  leading-5">
                                    {leader.experience.match(/[0-9]/) ? (
                                        <>
                                            <Counter value={leader.experience.split(' ')[0]} /> {leader.experience.split(' ').slice(1).join(' ')}
                                        </>
                                    ) : (
                                        leader.experience
                                    )}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
