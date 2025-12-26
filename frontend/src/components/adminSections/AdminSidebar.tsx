import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AdminSidebar = ({ isCollapsed, isMobileOpen, onCloseMobile }: { isCollapsed: boolean; isMobileOpen: boolean; onCloseMobile: () => void }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // State to track which submenus are open
    const [openSubmenus, setOpenSubmenus] = useState<string[]>(
        location.pathname.startsWith("/admin/applications") ? ["Loan Applications"] : []
    );

    const toggleSubmenu = (label: string) => {
        if (openSubmenus.includes(label)) {
            setOpenSubmenus(openSubmenus.filter(l => l !== label));
        } else {
            setOpenSubmenus([...openSubmenus, label]);
        }
    };

    const handleNav = (path: string) => {
        navigate(path);
        onCloseMobile();
    };

    const isDashboard = location.pathname === "/admin";
    const isApplications = location.pathname.startsWith("/admin/applications");

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onCloseMobile}
            ></div>

            {/* Sidebar Container */}
            <div className={`fixed bg-slate-900 box-border caret-transparent h-full transition-all duration-300 ease-in-out z-50 left-0 top-0 
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
                ${isCollapsed ? 'md:w-20' : 'w-64'}`}
            >
                {/* Sidebar Header */}
                <div className={`items-center box-border caret-transparent flex h-16 justify-between md:justify-center border-slate-700 border-b border-solid px-4 md:px-0 ${isCollapsed ? 'md:px-2' : ''}`}>
                    <div
                        onClick={() => handleNav("/admin")}
                        className="items-center box-border caret-transparent flex cursor-pointer"
                    >
                        <div className="items-center bg-orange-400 box-border caret-transparent flex h-8 justify-center w-8 rounded-lg shrink-0">
                            <span className="text-white text-sm font-bold box-border caret-transparent block leading-5">
                                BF
                            </span>
                        </div>
                        {(!isCollapsed || isMobileOpen) && (
                            <span className="text-white text-lg font-semibold box-border caret-transparent block leading-7 font-inter ml-3 whitespace-nowrap">
                                Admin Center
                            </span>
                        )}
                    </div>
                    {/* Mobile Close Button */}
                    <button onClick={onCloseMobile} className="md:hidden text-gray-400 hover:text-white transition-colors">
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>

                {/* Sidebar Nav */}
                <nav className="box-border caret-transparent mt-6 overflow-y-auto max-h-[calc(100vh-160px)]">
                    {/* Dashboard Overview NavItem Inlined */}
                    <div className="box-border caret-transparent">
                        <div
                            onClick={() => handleNav("/admin")}
                            className={`${isDashboard ? "text-white items-center bg-blue-950/50 box-border caret-transparent flex px-4 py-3 border-l-4 border-orange-400" : "text-gray-300 items-center box-border caret-transparent flex px-4 py-3 hover:text-white hover:bg-blue-950 transition-colors duration-200 cursor-pointer border-l-4 border-transparent"} ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''}`}
                        >
                            <i className={`text-lg transition-colors duration-200 block leading-none ${isCollapsed && !isMobileOpen ? 'mr-0' : 'mr-3'} ri-layout-grid-line`}></i>
                            {(!isCollapsed || isMobileOpen) && (
                                <span className="text-sm font-medium box-border caret-transparent block basis-[0%] grow leading-5">
                                    Dashboard Overview
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Loan Applications NavItemWithSubmenu Inlined */}
                    <div className="box-border caret-transparent">
                        <div
                            onClick={() => !isCollapsed && toggleSubmenu("Loan Applications")}
                            className={`text-gray-300 items-center box-border caret-transparent flex ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : 'px-4'} py-3 hover:text-white hover:bg-blue-950 transition-colors duration-200 cursor-pointer`}
                        >
                            <i className={`text-lg box-border caret-transparent block leading-none ${isCollapsed && !isMobileOpen ? 'mr-0' : 'mr-3'} ri-article-line`}></i>
                            {(!isCollapsed || isMobileOpen) && (
                                <>
                                    <span className="text-sm font-medium box-border caret-transparent block basis-[0%] grow leading-5">
                                        Loan Applications
                                    </span>
                                    <i className={`text-sm box-border caret-transparent block leading-5 font-remixicon transition-transform duration-200 ${openSubmenus.includes("Loan Applications") ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                                </>
                            )}
                        </div>
                        {openSubmenus.includes("Loan Applications") && (!isCollapsed || isMobileOpen) && (
                            <div className="bg-slate-800/50 box-border caret-transparent">
                                {[
                                    { label: "Pending Review", icon: "ri-time-line", active: isApplications },
                                    { label: "Approved", icon: "ri-check-line", active: false },
                                    { label: "Rejected", icon: "ri-close-line", active: false },
                                    { label: "Disbursed", icon: "ri-money-dollar-circle-line", active: false }
                                ].map((sub) => (
                                    <div
                                        key={sub.label}
                                        onClick={() => handleNav("/admin/applications")}
                                        className={`text-gray-300 items-center box-border caret-transparent flex ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : 'pl-12 pr-4'} py-3 hover:text-white hover:bg-blue-950 transition-colors duration-200 cursor-pointer ${sub.active ? 'text-white bg-blue-900/40' : ''}`}
                                    >
                                        <i className={`text-lg block leading-none ${isCollapsed && !isMobileOpen ? 'mr-0' : 'mr-3'} ${sub.icon}`}></i>
                                        {(!isCollapsed || isMobileOpen) && (
                                            <span className="text-sm font-medium box-border caret-transparent block basis-[0%] grow leading-5">
                                                {sub.label}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Static NavItems Inlined */}
                    {[
                        { label: "User Management", icon: "ri-user-line" },
                        { label: "Staff & Permissions", icon: "ri-group-line" }
                    ].map((item) => (
                        <div key={item.label} className="box-border caret-transparent">
                            <div className={`text-gray-300 items-center box-border caret-transparent flex px-4 py-3 hover:text-white hover:bg-blue-950 transition-colors duration-200 cursor-pointer border-l-4 border-transparent ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''}`}>
                                <i className={`text-lg transition-colors duration-200 block leading-none ${isCollapsed && !isMobileOpen ? 'mr-0' : 'mr-3'} ${item.icon}`}></i>
                                {(!isCollapsed || isMobileOpen) && (
                                    <span className="text-sm font-medium box-border caret-transparent block basis-[0%] grow leading-5">
                                        {item.label}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Reports NavItemWithSubmenu Inlined */}
                    <div className="box-border caret-transparent">
                        <div
                            onClick={() => !isCollapsed && toggleSubmenu("Reports & Analytics")}
                            className={`text-gray-300 items-center box-border caret-transparent flex ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : 'px-4'} py-3 hover:text-white hover:bg-blue-950 transition-colors duration-200 cursor-pointer`}
                        >
                            <i className={`text-lg box-border caret-transparent block leading-none ${isCollapsed && !isMobileOpen ? 'mr-0' : 'mr-3'} ri-bar-chart-2-line`}></i>
                            {(!isCollapsed || isMobileOpen) && (
                                <>
                                    <span className="text-sm font-medium box-border caret-transparent block basis-[0%] grow leading-5">
                                        Reports & Analytics
                                    </span>
                                    <i className={`text-sm box-border caret-transparent block leading-5 font-remixicon transition-transform duration-200 ${openSubmenus.includes("Reports & Analytics") ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                                </>
                            )}
                        </div>
                        {openSubmenus.includes("Reports & Analytics") && (!isCollapsed || isMobileOpen) && (
                            <div className="bg-slate-800/50 box-border caret-transparent">
                                {[
                                    { label: "Daily Reports", icon: "ri-calendar-line" },
                                    { label: "Financial Overview", icon: "ri-pie-chart-line" },
                                    { label: "Staff Performance", icon: "ri-line-chart-line" }
                                ].map((sub) => (
                                    <div
                                        key={sub.label}
                                        className={`text-gray-300 items-center box-border caret-transparent flex ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : 'pl-12 pr-4'} py-3 hover:text-white hover:bg-blue-950 transition-colors duration-200 cursor-pointer`}
                                    >
                                        <i className={`text-lg block leading-none ${isCollapsed && !isMobileOpen ? 'mr-0' : 'mr-3'} ${sub.icon}`}></i>
                                        {(!isCollapsed || isMobileOpen) && (
                                            <span className="text-sm font-medium box-border caret-transparent block basis-[0%] grow leading-5">
                                                {sub.label}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="box-border caret-transparent">
                        <div className={`text-gray-300 items-center box-border caret-transparent flex px-4 py-3 hover:text-white hover:bg-blue-950 transition-colors duration-200 cursor-pointer border-l-4 border-transparent ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''}`}>
                            <i className={`text-lg transition-colors duration-200 block leading-none ${isCollapsed && !isMobileOpen ? 'mr-0' : 'mr-3'} ri-settings-4-line`}></i>
                            {(!isCollapsed || isMobileOpen) && (
                                <span className="text-sm font-medium box-border caret-transparent block basis-[0%] grow leading-5">
                                    System Settings
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Mobile Only Action Buttons */}
                    <div className="md:hidden px-4 mt-6 space-y-3">
                        <button className="w-full text-white text-sm bg-orange-400 py-3 rounded-lg hover:bg-orange-500 transition-colors">
                            Export Data
                        </button>
                        <button className="w-full text-white text-sm bg-transparent border border-white/20 py-3 rounded-lg hover:bg-white/10 transition-colors">
                            Generate Report
                        </button>
                    </div>
                </nav>

                {/* Sidebar Footer */}
                <div className="absolute box-border caret-transparent border-slate-700 p-4 border-t border-solid bottom-0 inset-x-0 bg-slate-900">
                    <div className={`items-center box-border caret-transparent flex ${(isCollapsed && !isMobileOpen) ? 'justify-center' : ''}`}>
                        <div className="items-center bg-slate-700 box-border caret-transparent flex h-8 justify-center w-8 rounded-full shrink-0">
                            <i className="ri-user-line text-white text-sm"></i>
                        </div>
                        {(!isCollapsed || isMobileOpen) && (
                            <div className="box-border caret-transparent ml-3 overflow-hidden">
                                <div className="text-white text-sm font-medium box-border caret-transparent leading-5 font-inter truncate">
                                    Admin User
                                </div>
                                <div className="text-gray-400 text-xs box-border caret-transparent leading-4 font-inter truncate">
                                    System Administrator
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
