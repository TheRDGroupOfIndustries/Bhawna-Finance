import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export const ContactCardsSection = () => {
    const cards = [
        {
            icon: Phone,
            iconVariant: "bg-[#111F3B]",
            title: "Phone Support",
            description: "Speak directly with our loan specialists",
            primaryText: "+91 98765 43210",
            secondaryText: "Mon-Fri: 9:00 AM - 6:00 PM",
            tertiaryText: "Sat: 9:00 AM - 2:00 PM",
        },
        {
            icon: Mail,
            iconVariant: "bg-[#2F4A6D]",
            title: "Email Support",
            description: "Send us your queries and documents",
            primaryText: "info@bhawanfinance.com",
            secondaryText: "Response within 24 hours",
            tertiaryText: "Document submission accepted",
        },
        {
            icon: MapPin,
            iconVariant: "bg-[#C59D4F]",
            title: "Branch Visit",
            description: "Meet our team in person",
            primaryText: "Schedule Appointment",
            secondaryText: "Personal consultation available",
            tertiaryText: "Document verification on-site",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section className="bg-slate-50/50 box-border caret-transparent py-24">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="box-border caret-transparent gap-x-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8"
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.1)" }}
                            className="bg-white shadow-xl box-border caret-transparent text-center border border-slate-100 p-8 rounded-2xl border-solid h-full transition-all duration-300"
                        >
                            <motion.div
                                initial={{ scale: 0.8 }}
                                whileInView={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className={`items-center box-border caret-transparent flex h-16 justify-center w-16 mb-8 mx-auto rounded-full shadow-md ${card.iconVariant}`}
                            >
                                <card.icon className="text-white w-6 h-6" />
                            </motion.div>
                            <h3 className="text-[#111F3B] text-xl font-bold box-border caret-transparent leading-7 mb-4 font-inter">
                                {card.title}
                            </h3>
                            <p className="text-slate-600 font-medium box-border caret-transparent mb-6">
                                {card.description}
                            </p>
                            <div className="box-border caret-transparent pt-6 border-t border-slate-50">
                                <p className="text-[#111F3B] text-lg font-bold box-border caret-transparent leading-7">
                                    {card.primaryText}
                                </p>
                                <div className="space-y-1 mt-3">
                                    <p className="text-slate-500 font-medium text-sm box-border caret-transparent leading-5">
                                        {card.secondaryText}
                                    </p>
                                    <p className="text-slate-500 font-medium text-sm box-border caret-transparent leading-5">
                                        {card.tertiaryText}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
