import { SectionHeader } from "./SectionHeader";
import { User, Briefcase, Home, Info } from "lucide-react";
import { motion } from "framer-motion";


export const EligibilityRequirements = () => {
    const categories = [
        {
            variant: "bg-blue-50/50 border-blue-100",
            title: "Personal Loan",
            icon: User,
            requirements: [
                { label: "Age", value: "21-60 years" },
                { label: "Income", value: "₹25,000+ per month" },
                { label: "Employment", value: "2+ years experience" },
                { label: "Credit Score", value: "650+ CIBIL score" },
                { label: "Residence", value: "Indian citizen/resident" },
                { label: "Bank Account", value: "6+ months old" },
            ],
            buttonText: "Check Eligibility",
        },
        {
            variant: "bg-green-50/50 border-green-100",
            title: "Business Loan",
            icon: Briefcase,
            requirements: [
                { label: "Business Age", value: "2+ years operational" },
                { label: "Annual Turnover", value: "₹10 lakhs minimum" },
                {
                    label: "Business Type",
                    value: "Proprietorship/Partnership/Pvt Ltd",
                },
                { label: "Credit Score", value: "700+ CIBIL score" },
                { label: "Financial Records", value: "ITR for last 2 years" },
                { label: "Bank Statements", value: "12 months statements" },
            ],
            buttonText: "Check Eligibility",
        },
        {
            variant: "bg-orange-50/50 border-orange-100",
            title: "Home Loan",
            icon: Home,
            requirements: [
                { label: "Age", value: "21-65 years" },
                { label: "Income", value: "₹40,000+ per month" },
                { label: "Employment", value: "3+ years experience" },
                { label: "Credit Score", value: "750+ CIBIL score" },
                { label: "Down Payment", value: "20% of property value" },
                { label: "Property", value: "Clear title documents" },
            ],
            buttonText: "Check Eligibility",
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section className="bg-gray-50 box-border  py-12 md:py-20">
            <div className="box-border  max-w-screen-xl mx-auto px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <SectionHeader
                        title="Eligibility Requirements"
                        description="Our eligibility criteria are designed to be transparent and achievable. Check the specific requirements for each loan type below."
                    />
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="box-border  gap-x-8 gap-y-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                >
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`box-border  p-6 md:p-8 rounded-xl border-2 border-solid transition-all duration-300 hover:shadow-lg ${category.variant}`}
                        >
                            <div className="box-border  text-center mb-8">
                                <div className="items-center bg-[#111F3B] box-border  flex h-14 w-14 md:h-16 md:w-16 mb-4 mx-auto rounded-full justify-center">
                                    <category.icon className="text-white w-7 h-7 md:w-8 md:h-8" />
                                </div>
                                <h3 className="text-slate-900 text-xl md:text-2xl font-bold box-border  leading-8 font-inter">
                                    {category.title}
                                </h3>
                            </div>
                            <div className="box-border ">
                                {category.requirements.map((requirement, i) => (
                                    <div
                                        key={i}
                                        className={`items-center box-border  flex justify-between py-3 ${i < category.requirements.length - 1
                                            ? "border-gray-200 border-b border-solid"
                                            : ""
                                            }`}
                                    >
                                        <span className="text-gray-600 font-medium box-border  block text-sm md:text-base">
                                            {requirement.label}
                                        </span>
                                        <span className="text-slate-900 text-xs md:text-sm font-semibold box-border  block leading-5 text-right ml-4">
                                            {requirement.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="box-border  text-center mt-8">
                                <a href="#EligibilityCalculator" className="text-white font-bold bg-[#111F3B]  block w-full px-0 py-4 rounded-lg hover:bg-slate-800 transition-colors duration-300 cursor-pointer text-center">
                                    {category.buttonText}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                {/* ImportantNote */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white shadow-sm box-border  border border-slate-100 mt-12 md:mt-16 p-6 md:p-8 rounded-xl border-solid"
                >
                    <div className="items-start box-border  flex">
                        <div className="items-center bg-[#C59D4F] box-border  flex shrink-0 h-10 w-10 md:h-12 md:w-12 justify-center rounded-full">
                            <Info className="text-white w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div className="box-border  ml-4 md:ml-6">
                            <h4 className="text-slate-900 text-base md:text-lg font-bold box-border  leading-7 mb-2 font-inter">
                                Important Note
                            </h4>
                            <p className="text-gray-600 text-sm md:text-base box-border  leading-relaxed md:leading-[26px]">
                                Meeting the eligibility criteria does not guarantee loan approval.
                                Final approval depends on comprehensive credit assessment, document
                                verification, and our internal risk evaluation process. We reserve
                                the right to request additional documentation or modify terms based
                                on individual cases.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
