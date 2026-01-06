import { PageHero } from "../components/PageHero";
import { motion } from "framer-motion";

export const TermsPage = () => {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using the website of Bhawan Finance (hereinafter referred to as 'the Company'), you agree to comply with and be bound by the following terms and conditions of use. If you do not agree to these terms, please refrain from using this website."
        },
        {
            title: "2. Eligibility to Use",
            content: "You must be at least 18 years of age and a resident of India to apply for any financial products or services mentioned on this website. By using this site, you warrant that you possess the legal authority to enter into a binding agreement."
        },
        {
            title: "3. Accuracy of Information",
            content: "While Bhawan Finance strives to provide accurate and up-to-date information, the Company does not warrant the completeness or accuracy of any information on the site. Interest rates, loan terms, and eligibility criteria are subject to change without prior notice as per Company policy and regulatory guidelines."
        },
        {
            title: "4. Loan Application and Approval",
            content: "Submission of a loan application through this website does not guarantee approval. The approval of any loan is at the sole discretion of Bhawan Finance and is subject to credit assessment, verification of documents, and compliance with RBI guidelines. The Company reserves the right to reject any application without assigning any reason."
        },
        {
            title: "5. Intellectual Property",
            content: "All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Bhawan Finance and is protected by Indian and international copyright laws. Unauthorized use, reproduction, or distribution is strictly prohibited."
        },
        {
            title: "6. Limitation of Liability",
            content: "Bhawan Finance shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services or website. This includes, but is not limited to, loss of data, loss of business, or any financial loss."
        },
        {
            title: "7. Governing Law",
            content: "These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Varanasi, Uttar Pradesh."
        }
    ];

    return (
        <div className="bg-white">
            <PageHero
                title="Terms & Conditions"
                description="Please read these terms carefully before using our services. They outline your rights, responsibilities, and our commitment to you."
            />

            <section className="py-20">
                <div className="max-w-4xl mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="prose prose-slate max-w-none"
                    >
                        <p className="text-slate-600 text-lg mb-12 font-medium italic">
                            Effective Date: January 1, 2026
                        </p>

                        <div className="space-y-12">
                            {sections.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-inter">
                                        {section.title}
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        {section.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-20 p-8 bg-slate-50 rounded-2xl border border-slate-100 italic">
                            <p className="text-slate-500">
                                For any clarifications regarding these terms, please contact our legal department at bhawanfinance.vns@gmail.com or visit our office at Vishwanath Katra, Bhikharipur, Varanasi.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
