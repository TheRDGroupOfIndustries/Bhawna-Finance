import { MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { LOAN_DATA } from "./LoanFilterSection";

const DEFAULT_FORM_DATA = {
    name: "",
    email: "",
    countryCode: "IN",
    phoneCode: "+91",
    phone: "",
    inquiry_type: "",
    subject: "",
    message: "",
};

const COUNTRY_PHONE_LENGTHS: Record<string, number> = {
    IN: 10, US: 10, GB: 10, CA: 10, AU: 9,
    DE: 11, CN: 11, JP: 10, BR: 11, FR: 9,
    IT: 10, RU: 10, PH: 10, MY: 10, SG: 8,
    AE: 9, SA: 9, PK: 10, BD: 10, ID: 11
};

const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return "🌐";
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

export const ContactFormSection = () => {
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countries, setCountries] = useState<{ name: string, dial_code: string, code: string, flag: string }[]>([]);

    // Fetch countries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await axios.get("https://countriesnow.space/api/v0.1/countries/codes");
                if (!res.data.error) {
                    const formatted = res.data.data.map((c: any) => ({
                        ...c,
                        flag: getFlagEmoji(c.code)
                    })).sort((a: any, b: any) => a.name.localeCompare(b.name));

                    const india = formatted.find((c: any) => c.code === "IN");
                    const others = formatted.filter((c: any) => c.code !== "IN");
                    setCountries(india ? [india, ...others] : formatted);
                }
            } catch (err) {
                console.error("Failed to fetch countries", err);
                setCountries([
                    { name: "India", code: "IN", dial_code: "+91", flag: "🇮🇳" },
                    { name: "United States", code: "US", dial_code: "+1", flag: "🇺🇸" },
                    { name: "United Kingdom", code: "GB", dial_code: "+44", flag: "🇬🇧" }
                ]);
            }
        };
        fetchCountries();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let newValue = value;
        // Truncate phone number based on country and remove non-numeric characters
        if (name === "phone") {
            const targetLength = COUNTRY_PHONE_LENGTHS[formData.countryCode] || 10;
            newValue = value.replace(/\D/g, '').slice(0, targetLength);
        }

        setFormData(prev => ({ ...prev, [name]: newValue }));
        // Clear error when user changes the field
        if (validationErrors.includes(name)) {
            setValidationErrors(prev => prev.filter(err => err !== name));
        }
    };

    const handleCountryChange = (country: { code: string, dial_code: string }) => {
        setFormData(prev => ({
            ...prev,
            countryCode: country.code,
            phoneCode: country.dial_code,
            phone: prev.phone.slice(0, COUNTRY_PHONE_LENGTHS[country.code] || 10)
        }));
    };

    const fieldError = (name: string) => validationErrors.includes(name);

    const validateForm = () => {

        if (!formData.name.trim()) {
            toast.error("Please enter your full name");
            setValidationErrors(["name"]);
            return false;
        }
        if (!formData.email.trim()) {
            toast.error("Please enter your email address");
            setValidationErrors(["email"]);
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address");
            setValidationErrors(["email"]);
            return false;
        }
        if (!formData.phone.trim()) {
            toast.error("Please enter your phone number");
            setValidationErrors(["phone"]);
            return false;
        }
        const targetLength = COUNTRY_PHONE_LENGTHS[formData.countryCode] || 10;
        if (formData.phone.length !== targetLength) {
            toast.error(`Phone number for ${formData.countryCode} must be exactly ${targetLength} digits`);
            setValidationErrors(["phone"]);
            return false;
        }
        if (!formData.inquiry_type) {
            toast.error("Please select an inquiry type");
            setValidationErrors(["inquiry_type"]);
            return false;
        }
        if (!formData.subject.trim()) {
            toast.error("Please enter a subject");
            setValidationErrors(["subject"]);
            return false;
        }
        if (!formData.message.trim()) {
            toast.error("Please enter your message");
            setValidationErrors(["message"]);
            return false;
        }
        setValidationErrors([]);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success("Message sent successfully! We'll get back to you soon.");
            setFormData(DEFAULT_FORM_DATA);
        } catch (error) {
            toast.error("Failed to send message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const locations = [
        {
            title: "Varanasi Office",
            addressLine1: "Vishwanath Katra, Bhikharipur",
            addressLine2: "Varanasi - 221004 (U.P.)",
            phones: ["7800276002", "+91 8400260002, 7054949473 (Office)"],
        },
    ];

    return (
        <section className="bg-white box-border  py-24">
            <div className="box-border  max-w-screen-xl mx-auto px-8">
                <div className="box-border  gap-x-20 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-16 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
                    {/* FormSection */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="box-border "
                    >
                        <h2 className="text-[#111F3B] text-3xl font-bold box-border  leading-9 mb-4 font-inter">
                            Send Us a Message
                        </h2>
                        <p className="text-slate-600 text-lg font-medium box-border  mb-10">
                            Fill out the form below and our team will get back to you within 24
                            hours.
                        </p>
                        <form className="box-border " onSubmit={handleSubmit}>
                            <div className="box-border  gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-6 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
                                <div className="box-border ">
                                    <label className="text-slate-700 text-sm font-semibold box-border  block leading-5 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        placeholder="Enter your full name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`text-sm box-border leading-5 w-full border px-4 py-3 rounded-xl border-solid bg-slate-50/50 focus:bg-white focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] outline-none transition-all ${fieldError("name") ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                                    />
                                </div>
                                <div className="box-border ">
                                    <label className="text-slate-700 text-sm font-semibold box-border  block leading-5 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        placeholder="Enter your email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`text-sm box-border leading-5 w-full border px-4 py-3 rounded-xl border-solid bg-slate-50/50 focus:bg-white focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] outline-none transition-all ${fieldError("email") ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                                    />
                                </div>
                            </div>
                            <div className="box-border  gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-6 mt-6 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
                                <div className="box-border ">
                                    <label className="text-slate-700 text-sm font-semibold box-border  block leading-5 mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            name="phoneCode"
                                            value={`${formData.countryCode}|${formData.phoneCode}`}
                                            onChange={(e) => {
                                                const [code, dial_code] = e.target.value.split('|');
                                                handleCountryChange({ code, dial_code });
                                            }}
                                            className="w-20 px-2 py-3 rounded-xl border border-slate-200 focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] focus:outline-none text-sm bg-slate-50/50 appearance-none"
                                        >
                                            {countries.length > 0 ? (
                                                countries.map((c, idx) => (
                                                    <option key={`${c.code}-${idx}`} value={`${c.code}|${c.dial_code}`}>
                                                        {c.flag} {c.dial_code}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="IN|+91">🇮🇳 +91</option>
                                            )}
                                        </select>
                                        <input
                                            placeholder="Enter your phone number"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            maxLength={COUNTRY_PHONE_LENGTHS[formData.countryCode] || 10}
                                            className={`flex-1 text-sm box-border leading-5 w-full border px-4 py-3 rounded-xl border-solid bg-slate-50/50 focus:bg-white focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] outline-none transition-all ${fieldError("phone") ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                                        />
                                    </div>
                                </div>
                                <div className="box-border ">
                                    <label className="text-slate-700 text-sm font-semibold box-border  block leading-5 mb-2">
                                        Inquiry Type *
                                    </label>
                                    <select
                                        name="inquiry_type"
                                        value={formData.inquiry_type}
                                        onChange={handleChange}
                                        className={`text-sm bg-slate-50/50 leading-[normal] w-full border px-4 py-3 rounded-xl focus:bg-white focus:border-[#C59D4F] outline-none transition-all ${fieldError("inquiry_type") ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                                    >
                                        <option value="">Select Inquiry Type</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Customer Support</option>
                                        <optgroup label="Loan Products">
                                            {Object.keys(LOAN_DATA).map((key) => (
                                                <option key={key} value={key}>
                                                    {LOAN_DATA[key as keyof typeof LOAN_DATA].title}
                                                </option>
                                            ))}
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                            <div className="box-border  mt-6">
                                <label className="text-slate-700 text-sm font-semibold box-border  block leading-5 mb-2">
                                    Subject *
                                </label>
                                <input
                                    placeholder="Brief subject of your inquiry"
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`text-sm box-border leading-5 w-full border px-4 py-3 rounded-xl border-solid bg-slate-50/50 focus:bg-white focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] outline-none transition-all ${fieldError("subject") ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                                />
                            </div>
                            <div className="box-border  mt-6">
                                <label className="text-slate-700 text-sm font-semibold box-border  block leading-5 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Please describe your inquiry in detail..."
                                    className={`text-sm box-border leading-5 w-full border px-4 py-3 rounded-xl border-solid bg-slate-50/50 focus:bg-white focus:border-[#C59D4F] focus:ring-1 focus:ring-[#C59D4F] outline-none transition-all min-h-[120px] ${fieldError("message") ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                                ></textarea>
                                <p className="text-slate-500 text-xs box-border  leading-4 mt-1">
                                    {formData.message.length}/500 characters
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className={`text-white font-bold bg-[#111F3B] hover:bg-slate-800  text-center w-full mt-8 px-6 py-4 rounded-xl shadow-lg transition-all cursor-pointer ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* LocationsSection */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="box-border "
                    >
                        <h2 className="text-[#111F3B] text-3xl font-bold box-border  leading-9 mb-4 font-inter">
                            Our Locations
                        </h2>
                        <p className="text-slate-600 text-lg font-medium box-border  mb-10">
                            Visit our offices for personalized service and document verification.
                        </p>
                        <div className="box-border  space-y-8">
                            {locations.map((loc, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-50/50 box-border  p-6 rounded-2xl border border-slate-100"
                                >
                                    <h3 className="text-[#111F3B] text-xl font-semibold box-border  leading-7 mb-4 font-inter">
                                        {loc.title}
                                    </h3>
                                    <div className="box-border  space-y-4">
                                        <div className="items-start box-border  flex">
                                            <MapPin className="text-[#2F4A6D] w-5 h-5 mt-1 shrink-0" />
                                            <div className="box-border  ml-4">
                                                <p className="text-[#111F3B] font-semibold box-border ">
                                                    {loc.addressLine1}
                                                </p>
                                                <p className="text-slate-600 box-border ">
                                                    {loc.addressLine2}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {loc.phones.map((phone, pIdx) => (
                                                <div key={pIdx} className="items-center box-border  flex">
                                                    <Phone className="text-[#2F4A6D] w-5 h-5 shrink-0" />
                                                    <p className="text-[#111F3B] box-border  ml-4">
                                                        {phone}
                                                    </p>
                                                </div>
                                            ))}
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
                            className="bg-slate-50/50 box-border  mt-8 p-6 rounded-2xl border border-slate-100"
                        >
                            <h3 className="text-[#111F3B] text-xl font-semibold box-border  leading-7 mb-4 font-inter">
                                Find Us on Map
                            </h3>
                            <div className="aspect-video box-border  overflow-hidden rounded-xl shadow-inner border border-slate-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14430.4194474773!2d82.9463427!3d25.2847124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e319965d13735%3A0x696b055376176378!2sBhikharipur%2C%20Varanasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1716350000000"
                                    title="Bhawan Finance Varanasi Office Location"
                                    className="box-border  h-full w-full border-0"
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
