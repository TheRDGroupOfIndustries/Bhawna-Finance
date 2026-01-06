import { Search, Loader2, CheckCircle2, Clock, FileSearch, ShieldCheck, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../apiConfig";

const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return "🌐";
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const COUNTRY_PHONE_LENGTHS: Record<string, number> = {
    IN: 10, US: 10, GB: 10, CA: 10, AU: 9,
    DE: 11, CN: 11, JP: 10, BR: 11, FR: 9,
    IT: 10, RU: 10, PH: 10, MY: 10, SG: 8,
    AE: 9, SA: 9, PK: 10, BD: 10, ID: 11
};

export const TrackingFormSection = () => {
    const [applicationId, setApplicationId] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneCode, setPhoneCode] = useState("+91");
    const [countryCode, setCountryCode] = useState("IN");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
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

    const handlePhoneChange = (val: string) => {
        const targetLength = COUNTRY_PHONE_LENGTHS[countryCode] || 10;
        const sanitized = val.replace(/\D/g, '').slice(0, targetLength);
        setPhone(sanitized);
    };

    const handleCountryChange = (val: string) => {
        const [code, dial] = val.split('|');
        setCountryCode(code);
        setPhoneCode(dial);
        // Re-truncate existing phone if needed
        const targetLength = COUNTRY_PHONE_LENGTHS[code] || 10;
        setPhone(prev => prev.slice(0, targetLength));
    };

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!applicationId || !phone) {
            toast.error("Please enter both Application ID and Phone Number");
            return;
        }

        const targetLength = COUNTRY_PHONE_LENGTHS[countryCode] || 10;
        if (phone.length !== targetLength) {
            toast.error(`Phone number for ${countryCode} must be exactly ${targetLength} digits`);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/track`, {
                applicationId,
                phone
            });
            setResult(response.data.data);
            toast.success("Application details found!");
        } catch (error: any) {
            console.error("Tracking error:", error);
            toast.error(error.response?.data?.message || "Failed to find application. Please check your details.");
            setResult(null);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Pending': return <Clock className="w-6 h-6 text-amber-500" />;
            case 'Under Review': return <FileSearch className="w-6 h-6 text-blue-500" />;
            case 'Document Pending': return <ShieldCheck className="w-6 h-6 text-orange-500" />;
            case 'Approved': return <CheckCircle2 className="w-6 h-6 text-green-500" />;
            case 'Rejected': return <CreditCard className="w-6 h-6 text-red-500" />;
            case 'Disbursed': return <ShieldCheck className="w-6 h-6 text-indigo-500" />;
            default: return <Clock className="w-6 h-6 text-slate-400" />;
        }
    };

    return (
        <section className="bg-slate-100 py-16 min-h-[600px]">
            <div className="max-w-3xl mx-auto px-6">
                <div className="flex flex-col gap-8">
                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white shadow-xl p-8 rounded-2xl border border-slate-200"
                    >
                        <form onSubmit={handleTrack}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <label className="text-slate-900 text-sm font-semibold block leading-5 mb-2">
                                    Application ID
                                </label>
                                <input
                                    placeholder="Enter your application ID (e.g., BF24121234)"
                                    type="text"
                                    value={applicationId}
                                    onChange={(e) => setApplicationId(e.target.value)}
                                    className="text-sm leading-5 w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#C59D4F] focus:border-transparent outline-none transition-all"
                                />
                                <p className="text-gray-400 text-xs leading-4 mt-2">
                                    You can find your application ID in the confirmation email
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="mt-6"
                            >
                                <label className="text-slate-900 text-sm font-semibold block leading-5 mb-2">
                                    Registered Phone Number
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={`${countryCode}|${phoneCode}`}
                                        onChange={(e) => handleCountryChange(e.target.value)}
                                        className="w-24 px-2 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C59D4F] focus:border-transparent outline-none text-sm bg-white appearance-none"
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
                                        value={phone}
                                        onChange={(e) => handlePhoneChange(e.target.value)}
                                        maxLength={COUNTRY_PHONE_LENGTHS[countryCode] || 10}
                                        className="flex-1 text-sm leading-5 w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#C59D4F] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </motion.div>

                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="text-white text-lg font-bold items-center bg-[#C59D4F] hover:bg-[#B38C3D] shadow-lg border-none flex cursor-pointer h-14 justify-center leading-7 text-nowrap w-full mt-8 px-8 py-4 rounded-xl transition-all disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                                ) : (
                                    <Search className="mr-2 w-5 h-5" />
                                )}
                                Track Now
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Result Section */}
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white shadow-xl p-8 rounded-2xl border border-slate-200"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Application ID</p>
                                        <h3 className="text-2xl font-black text-slate-900">{result.applicationId}</h3>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                                        {getStatusIcon(result.status)}
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Current Status</p>
                                            <p className="text-sm font-bold text-slate-700">{result.status}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                                    {result.statusHistory.map((history: any, idx: number) => (
                                        <div key={idx} className="relative pl-8">
                                            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${history.status === result.status ? 'bg-[#C59D4F]' : 'bg-slate-300'}`}>
                                                {history.status === result.status && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <p className={`font-bold text-sm ${history.status === result.status ? 'text-slate-900' : 'text-slate-500'}`}>{history.status}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium">
                                                        {new Date(history.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                                    {history.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-top border-slate-100 border-t flex items-center justify-between text-xs font-semibold">
                                    <span className="text-slate-400 uppercase tracking-wide">Applicant Name</span>
                                    <span className="text-slate-900 uppercase">{result.firstName} {result.lastName}</span>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl h-full flex flex-col items-center justify-center p-12 text-center"
                            >
                                <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                                    <FileSearch className="w-10 h-10 text-slate-300" />
                                </div>
                                <h4 className="text-slate-900 font-bold text-lg mb-2">Track Application</h4>
                                <p className="text-slate-400 text-sm max-w-[240px]">Enter your details to see the current status of your loan application.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
