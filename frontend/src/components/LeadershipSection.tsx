import { motion } from "framer-motion";
import { Counter } from "./Counter";

export const LeadershipSection = () => {
    const leaders = [
        {
            name: "Rajesh Bhawan",
            imageUrl: "https://readdy.ai/api/search-image?query=professional%20Indian%20businessman%20in%20formal%20suit%2C%20corporate%20executive%20portrait%2C%20confident%20business%20leader%2C%20modern%20office%20background&width=300&height=400&seq=leader001&orientation=portrait",
            title: "Chairman & Managing Director",
            experience: "30+ years in financial services"
        },
        {
            name: "Sunita Bhawan",
            imageUrl: "https://readdy.ai/api/search-image?query=professional%20Indian%20businesswoman%20in%20formal%20attire%2C%20corporate%20executive%20portrait%2C%20confident%20female%20leader%2C%20modern%20office%20setting&width=300&height=400&seq=leader002&orientation=portrait",
            title: "Executive Director",
            experience: "25+ years in operations and compliance"
        },
        {
            name: "Amit Sharma",
            imageUrl: "https://readdy.ai/api/search-image?query=professional%20Indian%20CFO%20in%20business%20suit%2C%20finance%20executive%20portrait%2C%20corporate%20professional%2C%20modern%20office%20environment&width=300&height=400&seq=leader003&orientation=portrait",
            title: "Chief Financial Officer",
            experience: "20+ years in finance and risk management"
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
        <section className="bg-slate-100 box-border caret-transparent py-20">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="box-border caret-transparent text-center mb-16"
                >
                    <h2 className="text-slate-900 text-4xl font-bold box-border caret-transparent leading-10 mb-4 font-inter">
                        Leadership Team
                    </h2>
                    <p className="text-gray-400 text-lg box-border caret-transparent leading-7 max-w-2xl mx-auto">
                        Experienced professionals leading our organization with vision and
                        integrity
                    </p>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="box-border caret-transparent gap-x-8 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-8 md:grid-cols-[repeat(3,minmax(0px,1fr))]"
                >
                    {leaders.map((leader, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] box-border caret-transparent overflow-hidden rounded-lg group"
                        >
                            <img
                                alt={leader.name}
                                src={leader.imageUrl}
                                className="box-border caret-transparent h-64 max-w-full object-cover w-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="box-border caret-transparent p-6">
                                <h4 className="text-slate-900 text-xl font-semibold box-border caret-transparent leading-7 mb-2 font-inter">
                                    {leader.name}
                                </h4>
                                <p className="text-slate-700 font-medium box-border caret-transparent mb-2">
                                    {leader.title}
                                </p>
                                <p className="text-gray-400 text-sm box-border caret-transparent leading-5">
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
