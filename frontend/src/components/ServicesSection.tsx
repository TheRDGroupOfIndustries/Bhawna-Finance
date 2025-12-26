import { User, Building2, Home, Coins } from "lucide-react";
import { motion } from "framer-motion";

export const ServicesSection = () => {
    const services = [
        {
            title: "Personal Loans",
            description: "Quick approval for personal financial needs with competitive interest rates.",
            features: ["Minimal documentation", "Quick approval process", "Flexible repayment terms"],
            linkHref: "/loan-products",
            linkText: "Learn More →",
            icon: <User className="w-6 h-6 text-slate-900 transition-colors duration-300 group-hover:text-white" />,
            iconBg: "bg-slate-100",
        },
        {
            title: "Business Loans",
            description: "Fuel your business growth with tailored financing solutions.",
            features: ["Working capital loans", "Equipment financing", "Business expansion loans"],
            linkHref: "/loan-products",
            linkText: "Learn More →",
            icon: <Building2 className="w-6 h-6 text-slate-900 transition-colors duration-300 group-hover:text-white" />,
            iconBg: "bg-slate-100",
        },
        {
            title: "Loan Against Property",
            description: "Unlock the value of your property for various financial needs.",
            features: ["High loan amounts", "Lower interest rates", "Longer tenure options"],
            linkHref: "/loan-products",
            linkText: "Learn More →",
            icon: <Home className="w-6 h-6 text-slate-900 transition-colors duration-300 group-hover:text-white" />,
            iconBg: "bg-slate-100",
        },
        {
            title: "Gold Loans",
            description: "Instant liquidity against your gold ornaments and coins.",
            features: ["Instant approval", "Secure gold storage", "Flexible repayment"],
            linkHref: "/loan-products",
            linkText: "Learn More →",
            icon: <Coins className="w-6 h-6 text-slate-900 transition-colors duration-300 group-hover:text-white" />,
            iconBg: "bg-slate-100",
        },
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="bg-white py-20">
            <div className="max-w-screen-xl mx-auto px-8">
                {/* ServicesHeader */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-4">
                        <span className="text-white text-sm font-medium bg-slate-900 leading-5 px-4 py-2 rounded-full">
                            Our Services
                        </span>
                    </div>
                    <h2 className="text-slate-900 text-4xl font-bold leading-10 mb-4 font-inter md:text-5xl md:leading-[48px]">
                        Comprehensive Loan Products
                    </h2>
                    <p className="text-gray-400 text-lg leading-7 max-w-2xl mx-auto">
                        Tailored financial solutions with transparent terms and competitive
                        rates
                    </p>
                </motion.div>

                {/* ServicesGrid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="gap-x-8 grid grid-cols-1 gap-y-8 md:grid-cols-4"
                >
                    {services.map((service, index) => (
                        /* ServiceCard */
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative bg-white border border-slate-200 p-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                        >

                            <div className={`items-center ${service.iconBg} group-hover:bg-[#2D4363] flex h-14 justify-center w-14 mb-6 rounded-lg transition-all duration-300`}>
                                {service.icon}
                            </div>

                            <h3 className="text-slate-900 text-xl font-bold leading-7 mb-3 font-inter">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                {service.description}
                            </p>

                            <ul className="list-none mb-8 space-y-2 p-0">
                                {service.features.map((feature, fIndex) => (
                                    <li
                                        key={fIndex}
                                        className="text-gray-400 text-xs items-center flex leading-4"
                                    >
                                        <span className="bg-slate-400 block h-1 w-1 mr-2 rounded-full"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={service.linkHref}
                                className="text-slate-900 text-sm font-bold inline-flex items-center transition-colors hover:text-[#2D4363]"
                            >
                                {service.linkText}
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

