import { PageHero } from "../components/PageHero";
import { motion } from "framer-motion";

export const PrivacyPage = () => {
    const sections = [
        {
            title: "Information We Collect",
            content: "We collect personal information necessary to provide our financial services. This includes but is not limited to: your name, contact details, Aadhar and PAN numbers, income details, bank statements, and employment information. We also collect digital data such as device ID and IP address when you use our website."
        },
        {
            title: "How We Use Your Data",
            content: "Your data is used to: assess your loan eligibility, process applications, verify identity (KYC), communicate with you about your account, improve our services, and comply with regulatory requirements set by the RBI and other authorities."
        },
        {
            title: "Data Security",
            content: "Bhawan Finance implements stringent security measures to protect your personal information from unauthorized access, alteration, or disclosure. We use industry-standard encryption protocols and secure servers to host your data."
        },
        {
            title: "Sharing of Information",
            content: "We do not sell your personal data. We only share information with third parties (such as credit bureaus, banking partners, and regulator bodies) as required for loan processing, identity verification, or legal compliance."
        },
        {
            title: "User Rights",
            content: "You have the right to access the personal information we hold about you and request corrections if necessary. You may also opt-out of marketing communications at any time by contacting our support team."
        },
        {
            title: "Cookies",
            content: "Our website uses cookies to enhance your browsing experience and analyze site traffic. You can manage your cookie preferences through your browser settings."
        },
        {
            title: "Updates to Policy",
            content: "Bhawan Finance reserves the right to update this Privacy Policy at any time. Significant changes will be notified via our website or email."
        }
    ];

    return (
        <div className="bg-white">
            <PageHero
                title="Privacy Policy"
                description="Your privacy is of paramount importance to us. This policy explains how we collect, use, and safeguard your personal information."
            />

            <section className="py-20">
                <div className="max-w-4xl mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="prose prose-slate max-w-none"
                    >
                        <p className="text-slate-600 text-lg mb-12 font-medium italic">
                            Last Updated: January 1, 2026
                        </p>

                        <div className="space-y-16">
                            {sections.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-1.5 h-8 bg-[#C59D4F] rounded-full"></div>
                                        <h2 className="text-2xl font-bold text-slate-900 font-inter">
                                            {section.title}
                                        </h2>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed text-lg pl-5">
                                        {section.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-20 p-10 bg-[#111F3B] rounded-3xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                            <h3 className="text-xl font-bold mb-4 relative z-10">Data Protection Officer</h3>
                            <p className="text-white/80 leading-relaxed relative z-10">
                                If you have any questions or grievances regarding our privacy practices, please contact our Data Protection Officer at:
                                <br /><br />
                                <strong>Grievance Office, Bhawan Finance</strong><br />
                                Vishwanath Katra, Bhikharipur, Varanasi - 221004<br />
                                Email: bhawanfinance.vns@gmail.com<br />
                                Phone: +91 8400260002
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
