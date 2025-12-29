import { Search, Loader2, CheckCircle2, Clock, FileSearch, ShieldCheck, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../apiConfig";

export const TrackingFormSection = () => {
    const [applicationId, setApplicationId] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!applicationId || !phone) {
            toast.error("Please enter both Application ID and Phone Number");
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
                                <input
                                    placeholder="Enter your 10-digit phone number"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="text-sm leading-5 w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#C59D4F] focus:border-transparent outline-none transition-all"
                                />
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
