import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";

export const AdminDashboardSection = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/stats`);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const formatCurrency = (amt: number) => {
        if (amt >= 10000000) return `₹${(amt / 10000000).toFixed(2)}Cr`;
        if (amt >= 100000) return `₹${(amt / 100000).toFixed(2)}L`;
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amt);
    };

    const stats = [
        { title: "Total Applications", value: data?.summary?.totalApplications || 0, change: "Since last month", color: "text-green-600", icon: "ri-article-line", path: "/admin/applications" },
        { title: "Under Review", value: data?.summary?.pendingCount || 0, change: "Requires action", color: "text-gray-600", icon: "ri-time-line", path: "/admin/applications?status=Under Review" },
        { title: "Total Approved", value: data?.summary?.approvedCount || 0, change: "Successful loans", color: "text-green-600", icon: "ri-checkbox-line", path: "/admin/applications?status=Approved" },
        { title: "Total Amount", value: formatCurrency(data?.summary?.totalAmount || 0), change: "Cumulative value", color: "text-green-600", icon: "ri-refund-2-line" }
    ];

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Approved': return 'text-green-800 bg-green-100';
            case 'Rejected': return 'text-red-800 bg-red-100';
            case 'Under Review': return 'text-yellow-800 bg-yellow-100';
            case 'Document Pending': return 'text-orange-800 bg-orange-100';
            default: return 'text-gray-800 bg-gray-100';
        }
    };

    const getTimeAgo = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
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
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="box-border  p-4 md:p-6 bg-gray-50 min-h-screen"
        >
            <div className="box-border  ">
                {/* Dashboard Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="items-center box-border  flex flex-wrap justify-between gap-y-4"
                >
                    <div className="box-border ">
                        <h2 className="text-slate-900 text-xl md:text-2xl font-bold box-border  leading-8 font-inter">
                            Dashboard Overview
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base box-border  mt-1 font-inter">
                            Monitor key metrics and recent activities
                        </p>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="box-border  gap-x-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 mt-6"
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                            onClick={() => (stat as any).path && navigate((stat as any).path)}
                            className={`bg-white box-border  border border-gray-200 p-6 rounded-lg border-solid transition-all duration-300 ${(stat as any).path ? 'cursor-pointer' : ''}`}
                        >
                            <div className="items-center box-border  flex justify-between">
                                <div className="box-border ">
                                    <p className="text-gray-600 text-sm font-medium box-border  leading-5 font-inter">
                                        {stat.title}
                                    </p>
                                    <p className="text-slate-900 text-2xl font-bold box-border  leading-8 mt-2 font-inter">
                                        {stat.value}
                                    </p>
                                    <p className={`${stat.color} text-xs md:text-sm box-border  leading-5 mt-1 font-medium font-inter`}>
                                        {stat.change}
                                    </p>
                                </div>
                                <div className="items-center bg-slate-900 box-border  flex h-12 justify-center w-12 rounded-lg shrink-0 ml-4 shadow-inner">
                                    <i className={`text-white text-xl box-border  block leading-none font-remixicon ${stat.icon}`}></i>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Content Grid */}
                <div className="box-border  grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Recent Applications */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white box-border  border border-gray-200 rounded-lg border-solid overflow-hidden lg:col-span-2 shadow-sm"
                    >
                        <div className="box-border  border-gray-200 p-6 border-b border-solid">
                            <div className="items-center box-border  flex justify-between">
                                <h3 className="text-slate-900 text-lg font-semibold box-border  leading-7 font-inter">
                                    Recent Applications
                                </h3>
                                <button
                                    onClick={() => navigate("/admin/applications")}
                                    className="text-[#C59D4F] text-sm font-medium bg-transparent  block leading-5 text-center p-0 hover:text-[#B38C3D] transition-colors cursor-pointer font-inter"
                                >
                                    View All
                                </button>
                            </div>
                        </div>
                        <div className="box-border  p-6">
                            <div className="box-border  space-y-4">
                                {loading ? (
                                    <div className="flex justify-center items-center py-20">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C59D4F]"></div>
                                    </div>
                                ) : data?.recentApplications?.length > 0 ? (
                                    data.recentApplications.map((app: any, idx: number) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ x: 5, backgroundColor: "#F9FAFB" }}
                                            onClick={() => navigate(`/admin/applications/${app._id}`)}
                                            className="items-center box-border  flex justify-between border border-gray-100 p-4 rounded-lg border-solid transition-colors cursor-pointer group"
                                        >
                                            <div className="items-center box-border  flex min-w-0">
                                                <div className="items-center bg-slate-900 box-border  flex h-10 w-10 shrink-0 justify-center rounded-full group-hover:scale-110 transition-transform">
                                                    <span className="text-white text-sm font-medium box-border  block leading-5 uppercase">
                                                        {app.firstName[0]}{app.lastName[0]}
                                                    </span>
                                                </div>
                                                <div className="box-border  ml-4 truncate">
                                                    <div className="text-slate-900 font-medium box-border  truncate font-inter">
                                                        {app.firstName} {app.lastName}
                                                    </div>
                                                    <div className="text-gray-600 text-xs md:text-sm box-border  leading-5 truncate font-inter">
                                                        ID: {app.applicationId.toUpperCase()} • {app.loanType}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box-border  text-right shrink-0 ml-4">
                                                <div className="text-slate-900 font-semibold box-border  text-sm md:text-base font-inter">
                                                    ₹{new Intl.NumberFormat('en-IN').format(app.loanAmount)}
                                                </div>
                                                <div className="items-center box-border  flex flex-col md:flex-row md:justify-end mt-1 gap-1 md:gap-2">
                                                    <span className={`${getStatusClass(app.status)} text-[10px] font-medium box-border  block leading-4 px-2 py-0.5 rounded-full whitespace-nowrap font-inter`}>
                                                        {app.status}
                                                    </span>
                                                    <span className="text-gray-500 text-[10px] box-border  block leading-4 whitespace-nowrap font-inter">
                                                        {getTimeAgo(app.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-gray-500 font-inter">
                                        No recent applications found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Actions & System Alerts */}
                    <div className="box-border  space-y-6 lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="bg-white box-border  border border-gray-200 p-6 rounded-lg border-solid shadow-sm"
                        >
                            <h3 className="text-slate-900 text-lg font-semibold box-border  leading-7 mb-4 font-inter">
                                Quick Actions
                            </h3>
                            <div className="box-border  space-y-3">
                                <button
                                    onClick={() => navigate("/admin/applications?status=Under Review")}
                                    className="items-center bg-transparent  flex justify-between text-center w-full border border-gray-200 p-3 rounded-lg border-solid hover:bg-gray-50 transition-colors group cursor-pointer"
                                >
                                    <div className="items-center box-border  flex">
                                        <i className="ri-eye-line text-[#C59D4F] text-lg mr-3"></i>
                                        <span className="text-slate-900 text-sm font-medium box-border  block leading-5 font-inter">
                                            Review Pending
                                        </span>
                                    </div>
                                    <span className="text-red-800 text-xs bg-red-100 box-border  block leading-4 px-2 py-1 rounded-full font-bold">
                                        {data?.summary?.pendingCount || 0}
                                    </span>
                                </button>
                                <button className="items-center bg-transparent  flex justify-between text-center w-full border border-gray-200 p-3 rounded-lg border-solid hover:bg-gray-50 transition-colors group cursor-pointer">
                                    <div className="items-center box-border  flex">
                                        <i className="ri-bar-chart-line text-[#C59D4F] text-lg mr-3"></i>
                                        <span className="text-slate-900 text-sm font-medium box-border  block leading-5 font-inter">
                                            Generate Report
                                        </span>
                                    </div>
                                    <i className="ri-arrow-right-s-line text-gray-400 text-lg group-hover:translate-x-1 transition-transform"></i>
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="bg-white box-border  border border-gray-200 p-6 rounded-lg border-solid shadow-sm"
                        >
                            <h3 className="text-slate-900 text-lg font-semibold box-border  leading-7 mb-4 font-inter">
                                System Alerts
                            </h3>
                            <div className="box-border  space-y-3">
                                <div className="bg-yellow-50 box-border  border border-yellow-200 p-3 rounded-lg border-solid">
                                    <div className="items-start box-border  flex">
                                        <i className="ri-alert-line text-yellow-600 text-lg mr-3 mt-0.5"></i>
                                        <div className="box-border ">
                                            <div className="text-yellow-800 text-sm font-bold box-border  leading-5 font-inter">
                                                High Volume Alert
                                            </div>
                                            <div className="text-yellow-700 text-xs box-border  leading-4 mt-1 font-inter">
                                                {data?.summary?.pendingCount || 0} applications pending review
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-blue-50 box-border  border border-blue-200 p-3 rounded-lg border-solid">
                                    <div className="items-start box-border  flex">
                                        <i className="ri-information-line text-blue-600 text-lg mr-3 mt-0.5"></i>
                                        <div className="box-border ">
                                            <div className="text-blue-800 text-sm font-bold box-border  leading-5 font-inter">
                                                System Update
                                            </div>
                                            <div className="text-blue-700 text-xs box-border  leading-4 mt-1 font-inter">
                                                Scheduled maintenance at 2:00 AM
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.main>
    );
};
