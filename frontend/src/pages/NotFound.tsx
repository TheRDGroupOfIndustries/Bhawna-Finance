import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith("/admin");

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Animated 404 Icon/Number */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1
                    }}
                    className="relative"
                >
                    <h1 className="text-[12rem] md:text-[18rem] font-black leading-none select-none text-[#111F3B]/5">
                        404
                    </h1>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="bg-white p-8 rounded-full shadow-2xl shadow-[#C59D4F]/20 border border-[#C59D4F]/10">
                            <i className="ri-error-warning-line text-7xl text-[#C59D4F] animate-pulse"></i>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Text Content */}
                <div className="space-y-4">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 font-inter"
                    >
                        Page Not Found
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-slate-500 max-w-md mx-auto text-lg"
                    >
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </motion.p>
                </div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    <button
                        onClick={() => navigate(isAdminPath ? "/admin" : "/")}
                        className="w-full sm:w-auto px-8 py-3.5 bg-[#111F3B] text-white font-bold rounded-xl shadow-xl shadow-[#111F3B]/20 hover:bg-[#1a2f5a] transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <i className="ri-home-4-line text-lg"></i>
                        Back to {isAdminPath ? "Admin Dashboard" : "Home"}
                    </button>
                    {!isAdminPath && (
                        <button
                            onClick={() => navigate("/contact")}
                            className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#111F3B] font-bold rounded-xl border-2 border-slate-200 hover:border-[#C59D4F] hover:text-[#C59D4F] transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <i className="ri-customer-service-2-line text-lg"></i>
                            Contact Support
                        </button>
                    )}
                </motion.div>

                {/* Breadcrumbs/Helper Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-8 flex items-center justify-center space-x-6 text-sm font-medium text-slate-400"
                >
                    <span className="cursor-default flex items-center gap-1">
                        <i className="ri-shield-check-line"></i> Secure Portal
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                    <span className="cursor-default flex items-center gap-1">
                        <i className="ri-verified-badge-line"></i> Registered NBFC
                    </span>
                </motion.div>
            </div>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C59D4F]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#111F3B]/5 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
};
