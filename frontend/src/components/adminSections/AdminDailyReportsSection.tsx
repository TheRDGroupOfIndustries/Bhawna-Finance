import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { toast } from "react-toastify";

export const AdminDailyReportsSection = () => {
    const [stats, setStats] = useState({
        total: 0,
        underReview: 0,
        approved: 0,
        rejected: 0,
        totalAmount: 0
    });
    const [loading, setLoading] = useState(true);
    const [todayApps, setTodayApps] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_BASE_URL);
                const allApps = response.data.data;

                const today = new Date().toDateString();
                const filtered = allApps.filter((app: any) => new Date(app.createdAt).toDateString() === today);

                setTodayApps(filtered);
                setStats({
                    total: filtered.length,
                    underReview: filtered.filter((a: any) => a.status === "Under Review").length,
                    approved: filtered.filter((a: any) => a.status === "Approved").length,
                    rejected: filtered.filter((a: any) => a.status === "Rejected").length,
                    totalAmount: filtered.reduce((acc: number, curr: any) => acc + curr.loanAmount, 0)
                });
            } catch (error) {
                console.error("Error fetching daily stats:", error);
                toast.error("Failed to load daily report data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const statCards = [
        { label: "Today's Applications", value: stats.total, icon: "ri-file-list-3-line", color: "bg-blue-500" },
        { label: "Total Loan Value", value: `₹${new Intl.NumberFormat('en-IN').format(stats.totalAmount)}`, icon: "ri-money-dollar-circle-line", color: "bg-emerald-500" },
        { label: "Approved Today", value: stats.approved, icon: "ri-checkbox-circle-line", color: "bg-green-500" },
        { label: "Under Review", value: stats.underReview, icon: "ri-time-line", color: "bg-amber-500" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 md:p-8 space-y-8"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-slate-900 text-2xl font-bold font-inter">Daily Performance Report</h2>
                    <p className="text-gray-600 mt-1">Real-time update of today's application flow</p>
                </div>
                <div className="text-right">
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Report Date</div>
                    <div className="text-slate-900 font-bold">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg`}>
                                <i className={`${card.icon} text-2xl`}></i>
                            </div>
                        </div>
                        <div className="text-gray-500 text-sm font-medium mb-1 font-inter">{card.label}</div>
                        <div className="text-slate-900 text-2xl font-bold font-inter">{card.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50">
                    <h3 className="text-slate-900 text-lg font-bold font-inter">Recent Applications (Today)</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Applicant</th>
                                <th className="px-6 py-4">Loan Type</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C59D4F] mx-auto"></div>
                                    </td>
                                </tr>
                            ) : todayApps.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No applications received today yet.</td>
                                </tr>
                            ) : (
                                todayApps.slice(0, 5).map((app) => (
                                    <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900">{app.firstName} {app.lastName}</div>
                                            <div className="text-xs text-gray-500">ID: {app.applicationId}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium capitalize">{app.loanType}</td>
                                        <td className="px-6 py-4 text-sm font-bold">₹{new Intl.NumberFormat('en-IN').format(app.loanAmount)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                app.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(app.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {todayApps.length > 5 && (
                    <div className="p-4 bg-gray-50 text-center">
                        <button className="text-[#C59D4F] text-sm font-bold hover:underline">View All Today's Activity</button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
