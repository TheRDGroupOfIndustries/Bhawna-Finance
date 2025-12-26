import { useNavigate } from "react-router-dom";

export const AdminDashboardSection = () => {
    const navigate = useNavigate();

    const stats = [
        { title: "Total Applications", value: "2,847", change: "+12.5% from last month", color: "text-green-600", icon: "ri-article-line" },
        { title: "Pending Review", value: "156", change: "+8 from yesterday", color: "text-gray-600", icon: "ri-time-line" },
        { title: "Approved Today", value: "23", change: "+15.2% from yesterday", color: "text-green-600", icon: "ri-checkbox-line" },
        { title: "Total Disbursed", value: "₹45.2Cr", change: "+18.7% from last month", color: "text-green-600", icon: "ri-refund-2-line" }
    ];

    const applications = [
        { id: "BF2024156", name: "Priya Sharma", initials: "PS", type: "Personal Loan", amount: "₹5,00,000", status: "Under Review", time: "2 hours ago", statusClass: "text-yellow-800 bg-yellow-100" },
        { id: "BF2024155", name: "Amit Patel", initials: "AP", type: "Business Loan", amount: "₹15,00,000", status: "Document Pending", time: "4 hours ago", statusClass: "text-orange-800 bg-orange-100" },
        { id: "BF2024154", name: "Sunita Devi", initials: "SD", type: "Gold Loan", amount: "₹2,50,000", status: "Approved", time: "6 hours ago", statusClass: "text-green-800 bg-green-100" },
        { id: "BF2024153", name: "Rahul Singh", initials: "RS", type: "Property Loan", amount: "₹25,00,000", status: "Under Review", time: "8 hours ago", statusClass: "text-yellow-800 bg-yellow-100" }
    ];

    return (
        <main className="box-border caret-transparent p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="box-border caret-transparent ">
                {/* Dashboard Header */}
                <div className="items-center box-border caret-transparent flex flex-wrap justify-between gap-y-4">
                    <div className="box-border caret-transparent">
                        <h2 className="text-slate-900 text-xl md:text-2xl font-bold box-border caret-transparent leading-8 font-inter">
                            Dashboard Overview
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base box-border caret-transparent mt-1 font-inter">
                            Monitor key metrics and recent activities
                        </p>
                    </div>
                    <div className="items-center box-border caret-transparent flex gap-3">
                        <select className="text-xs md:text-sm bg-zinc-100 caret-transparent block leading-[normal] border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-400">
                            <option>Last 30 days</option>
                            <option>Last 7 days</option>
                            <option>Today</option>
                        </select>
                        <button className="text-white text-xs md:text-sm bg-orange-400 caret-transparent block leading-5 text-center px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors cursor-pointer font-inter">
                            Refresh Data
                        </button>
                    </div>
                </div>

                {/* Stats Grid Inlined */}
                <div className="box-border caret-transparent gap-x-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 mt-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white box-border caret-transparent border border-gray-200 p-6 rounded-lg border-solid hover:shadow-md transition-shadow duration-300">
                            <div className="items-center box-border caret-transparent flex justify-between">
                                <div className="box-border caret-transparent">
                                    <p className="text-gray-600 text-sm font-medium box-border caret-transparent leading-5 font-inter">
                                        {stat.title}
                                    </p>
                                    <p className="text-slate-900 text-2xl font-bold box-border caret-transparent leading-8 mt-2 font-inter">
                                        {stat.value}
                                    </p>
                                    <p className={`${stat.color} text-xs md:text-sm box-border caret-transparent leading-5 mt-1 font-medium font-inter`}>
                                        {stat.change}
                                    </p>
                                </div>
                                <div className="items-center bg-slate-900 box-border caret-transparent flex h-12 justify-center w-12 rounded-lg shrink-0 ml-4">
                                    <i className={`text-white text-xl box-border caret-transparent block leading-none font-remixicon ${stat.icon}`}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="box-border caret-transparent grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Recent Applications Inlined */}
                    <div className="bg-white box-border caret-transparent border border-gray-200 rounded-lg border-solid overflow-hidden lg:col-span-2">
                        <div className="box-border caret-transparent border-gray-200 p-6 border-b border-solid">
                            <div className="items-center box-border caret-transparent flex justify-between">
                                <h3 className="text-slate-900 text-lg font-semibold box-border caret-transparent leading-7 font-inter">
                                    Recent Applications
                                </h3>
                                <button
                                    onClick={() => navigate("/admin/applications")}
                                    className="text-orange-400 text-sm font-medium bg-transparent caret-transparent block leading-5 text-center p-0 hover:text-orange-500 transition-colors cursor-pointer"
                                >
                                    View All
                                </button>
                            </div>
                        </div>
                        <div className="box-border caret-transparent p-6">
                            <div className="box-border caret-transparent space-y-4">
                                {applications.map((app, idx) => (
                                    <div key={idx} className="items-center box-border caret-transparent flex justify-between border border-gray-100 p-4 rounded-lg border-solid hover:bg-gray-50 transition-colors cursor-pointer">
                                        <div className="items-center box-border caret-transparent flex min-w-0">
                                            <div className="items-center bg-slate-900 box-border caret-transparent flex h-10 w-10 shrink-0 justify-center rounded-full">
                                                <span className="text-white text-sm font-medium box-border caret-transparent block leading-5">
                                                    {app.initials}
                                                </span>
                                            </div>
                                            <div className="box-border caret-transparent ml-4 truncate">
                                                <div className="text-slate-900 font-medium box-border caret-transparent truncate font-inter">
                                                    {app.name}
                                                </div>
                                                <div className="text-gray-600 text-xs md:text-sm box-border caret-transparent leading-5 truncate font-inter">
                                                    {app.id} • {app.type}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-border caret-transparent text-right shrink-0 ml-4">
                                            <div className="text-slate-900 font-semibold box-border caret-transparent text-sm md:text-base font-inter">
                                                {app.amount}
                                            </div>
                                            <div className="items-center box-border caret-transparent flex flex-col md:flex-row md:justify-end mt-1 gap-1 md:gap-2">
                                                <span className={`${app.statusClass} text-[10px] font-medium box-border caret-transparent block leading-4 px-2 py-0.5 rounded-full whitespace-nowrap font-inter`}>
                                                    {app.status}
                                                </span>
                                                <span className="text-gray-500 text-[10px] box-border caret-transparent block leading-4 whitespace-nowrap font-inter">
                                                    {app.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Inlined */}
                    <div className="box-border caret-transparent space-y-6 lg:col-span-1">
                        <div className="bg-white box-border caret-transparent border border-gray-200 p-6 rounded-lg border-solid">
                            <h3 className="text-slate-900 text-lg font-semibold box-border caret-transparent leading-7 mb-4 font-inter">
                                Quick Actions
                            </h3>
                            <div className="box-border caret-transparent space-y-3">
                                <button className="items-center bg-transparent caret-transparent flex justify-between text-center w-full border border-gray-200 p-3 rounded-lg border-solid hover:bg-gray-50 transition-colors group cursor-pointer">
                                    <div className="items-center box-border caret-transparent flex">
                                        <i className="ri-eye-line text-orange-400 text-lg mr-3"></i>
                                        <span className="text-slate-900 text-sm font-medium box-border caret-transparent block leading-5 font-inter">
                                            Review Pending
                                        </span>
                                    </div>
                                    <span className="text-red-800 text-xs bg-red-100 box-border caret-transparent block leading-4 px-2 py-1 rounded-full font-bold">
                                        156
                                    </span>
                                </button>
                                <button className="items-center bg-transparent caret-transparent flex justify-between text-center w-full border border-gray-200 p-3 rounded-lg border-solid hover:bg-gray-50 transition-colors group cursor-pointer">
                                    <div className="items-center box-border caret-transparent flex">
                                        <i className="ri-bar-chart-line text-orange-400 text-lg mr-3"></i>
                                        <span className="text-slate-900 text-sm font-medium box-border caret-transparent block leading-5 font-inter">
                                            Generate Report
                                        </span>
                                    </div>
                                    <i className="ri-arrow-right-s-line text-gray-400 text-lg group-hover:translate-x-1 transition-transform"></i>
                                </button>
                                <button className="items-center bg-transparent caret-transparent flex justify-between text-center w-full border border-gray-200 p-3 rounded-lg border-solid hover:bg-gray-50 transition-colors group cursor-pointer">
                                    <div className="items-center box-border caret-transparent flex">
                                        <i className="ri-user-add-line text-orange-400 text-lg mr-3"></i>
                                        <span className="text-slate-900 text-sm font-medium box-border caret-transparent block leading-5 font-inter">
                                            Add New User
                                        </span>
                                    </div>
                                    <i className="ri-arrow-right-s-line text-gray-400 text-lg group-hover:translate-x-1 transition-transform"></i>
                                </button>
                            </div>
                        </div>

                        {/* System Alerts Inlined */}
                        <div className="bg-white box-border caret-transparent border border-gray-200 p-6 rounded-lg border-solid">
                            <h3 className="text-slate-900 text-lg font-semibold box-border caret-transparent leading-7 mb-4 font-inter">
                                System Alerts
                            </h3>
                            <div className="box-border caret-transparent space-y-3">
                                <div className="bg-yellow-50 box-border caret-transparent border border-yellow-200 p-3 rounded-lg border-solid">
                                    <div className="items-start box-border caret-transparent flex">
                                        <i className="ri-alert-line text-yellow-600 text-lg mr-3 mt-0.5"></i>
                                        <div className="box-border caret-transparent">
                                            <div className="text-yellow-800 text-sm font-bold box-border caret-transparent leading-5 font-inter">
                                                High Volume Alert
                                            </div>
                                            <div className="text-yellow-700 text-xs box-border caret-transparent leading-4 mt-1 font-inter">
                                                156 applications pending review
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-blue-50 box-border caret-transparent border border-blue-200 p-3 rounded-lg border-solid">
                                    <div className="items-start box-border caret-transparent flex">
                                        <i className="ri-information-line text-blue-600 text-lg mr-3 mt-0.5"></i>
                                        <div className="box-border caret-transparent">
                                            <div className="text-blue-800 text-sm font-bold box-border caret-transparent leading-5 font-inter">
                                                System Update
                                            </div>
                                            <div className="text-blue-700 text-xs box-border caret-transparent leading-4 mt-1 font-inter">
                                                Scheduled maintenance at 2:00 AM
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
