import { MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";

export const ContactFormSection = () => {
    const locations = [
        {
            title: "Head Office",
            addressLine1: "123 Financial District",
            addressLine2: "Mumbai, Maharashtra 400001",
            phone: "+91 98765 43210",
            hours: "Mon-Fri: 9:00 AM - 6:00 PM",
        },
        {
            title: "Delhi Branch",
            addressLine1: "456 Business Hub",
            addressLine2: "New Delhi, Delhi 110001",
            phone: "+91 98765 43211",
            hours: "Mon-Fri: 9:00 AM - 6:00 PM",
        },
    ];

    return (
        <section className="bg-white box-border caret-transparent py-24">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-8">
                <div className="box-border caret-transparent gap-x-20 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-16 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
                    {/* FormSection */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="box-border caret-transparent"
                    >
                        <h2 className="text-[#111F3B] text-3xl font-bold box-border caret-transparent leading-9 mb-4 font-inter">
                            Send Us a Message
                        </h2>
                        <p className="text-slate-600 text-lg font-medium box-border caret-transparent mb-10">
                            Fill out the form below and our team will get back to you within 24
                            hours.
                        </p>
                        <form className="box-border caret-transparent">
                            <div className="box-border caret-transparent gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-6 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
                                <div className="box-border caret-transparent">
                                    <label className="text-slate-700 text-sm font-semibold box-border caret-transparent block leading-5 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        placeholder="Enter your full name"
                                        type="text"
                                        name="name"
                                        className="text-sm box-border caret-transparent leading-5 w-full border border-slate-200 px-4 py-3 rounded-xl border-solid bg-slate-50/50 focus:bg-white focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] outline-none transition-all"
                                    />
                                </div>
                                <div className="box-border caret-transparent">
                                    <label className="text-slate-700 text-sm font-semibold box-border caret-transparent block leading-5 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        placeholder="Enter your email"
                                        type="email"
                                        name="email"
                                        className="text-sm box-border caret-transparent leading-5 w-full border border-slate-200 px-4 py-3 rounded-xl border-solid bg-slate-50/50 focus:bg-white focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="box-border caret-transparent gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-6 mt-6 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
                                <div className="box-border caret-transparent">
                                    <label className="text-slate-700 text-sm font-semibold box-border caret-transparent block leading-5 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        placeholder="Enter your phone number"
                                        type="tel"
                                        name="phone"
                                        className="text-sm box-border caret-transparent leading-5 w-full border border-slate-200 px-4 py-3 rounded-xl border-solid bg-slate-50/50 focus:bg-white focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] outline-none transition-all"
                                    />
                                </div>
                                <div className="box-border caret-transparent">
                                    <label className="text-slate-700 text-sm font-semibold box-border caret-transparent block leading-5 mb-2">
                                        Inquiry Type
                                    </label>
                                    <select
                                        name="inquiry_type"
                                        className="text-sm bg-slate-50/50 caret-transparent leading-[normal] w-full border border-slate-200 px-4 py-3 rounded-xl focus:bg-white focus:border-[#C59D4F] outline-none transition-all"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="personal_loan">Personal Loan</option>
                                        <option value="business_loan">Business Loan</option>
                                        <option value="home_loan">Home Loan</option>
                                        <option value="vehicle_loan">Vehicle Loan</option>
                                        <option value="support">Customer Support</option>
                                    </select>
                                </div>
                            </div>
                            <div className="box-border caret-transparent mt-6">
                                <label className="text-slate-700 text-sm font-semibold box-border caret-transparent block leading-5 mb-2">
                                    Subject *
                                </label>
                                <input
                                    placeholder="Brief subject of your inquiry"
                                    type="text"
                                    name="subject"
                                    className="text-sm box-border caret-transparent leading-5 w-full border border-slate-200 px-4 py-3 rounded-xl border-solid bg-slate-50/50 focus:bg-white focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] outline-none transition-all"
                                />
                            </div>
                            <div className="box-border caret-transparent mt-6">
                                <label className="text-slate-700 text-sm font-semibold box-border caret-transparent block leading-5 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    placeholder="Please describe your inquiry in detail..."
                                    className="text-sm box-border caret-transparent leading-5 w-full border border-slate-200 px-4 py-3 rounded-xl border-solid bg-slate-50/50 focus:bg-white focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] outline-none transition-all min-h-[120px]"
                                ></textarea>
                                <p className="text-slate-500 text-xs box-border caret-transparent leading-4 mt-1">
                                    0/500 characters
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="text-white font-bold bg-[#111F3B] hover:bg-slate-800 caret-transparent text-center w-full mt-8 px-6 py-4 rounded-xl shadow-lg transition-all cursor-pointer"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* LocationsSection */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="box-border caret-transparent"
                    >
                        <h2 className="text-[#111F3B] text-3xl font-bold box-border caret-transparent leading-9 mb-4 font-inter">
                            Our Locations
                        </h2>
                        <p className="text-slate-600 text-lg font-medium box-border caret-transparent mb-10">
                            Visit our offices for personalized service and document verification.
                        </p>
                        <div className="box-border caret-transparent space-y-8">
                            {locations.map((loc, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-50/50 box-border caret-transparent p-6 rounded-2xl border border-slate-100"
                                >
                                    <h3 className="text-[#111F3B] text-xl font-semibold box-border caret-transparent leading-7 mb-4 font-inter">
                                        {loc.title}
                                    </h3>
                                    <div className="box-border caret-transparent space-y-4">
                                        <div className="items-start box-border caret-transparent flex">
                                            <MapPin className="text-[#2F4A6D] w-5 h-5 mt-1 shrink-0" />
                                            <div className="box-border caret-transparent ml-4">
                                                <p className="text-[#111F3B] font-semibold box-border caret-transparent">
                                                    {loc.addressLine1}
                                                </p>
                                                <p className="text-slate-600 box-border caret-transparent">
                                                    {loc.addressLine2}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="items-center box-border caret-transparent flex">
                                            <Phone className="text-[#2F4A6D] w-5 h-5 shrink-0" />
                                            <p className="text-[#111F3B] box-border caret-transparent ml-4">
                                                {loc.phone}
                                            </p>
                                        </div>
                                        <div className="items-center box-border caret-transparent flex">
                                            <Clock className="text-[#2F4A6D] w-5 h-5 shrink-0" />
                                            <p className="text-[#111F3B] box-border caret-transparent ml-4">
                                                {loc.hours}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-slate-50/50 box-border caret-transparent mt-8 p-6 rounded-2xl border border-slate-100"
                        >
                            <h3 className="text-[#111F3B] text-xl font-semibold box-border caret-transparent leading-7 mb-4 font-inter">
                                Find Us on Map
                            </h3>
                            <div className="aspect-video box-border caret-transparent overflow-hidden rounded-xl shadow-inner border border-slate-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9999999999995!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNTInMzkuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
                                    title="Bhawan Finance Office Location"
                                    className="box-border caret-transparent h-full w-full border-0"
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
