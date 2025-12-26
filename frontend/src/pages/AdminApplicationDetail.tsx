import { useState } from "react";
import { AdminSidebar } from "../components/adminSections/AdminSidebar";
import { AdminMainContent } from "../components/adminSections/AdminMainContent";
import { AdminApplicationDetailSection } from "../components/adminSections/AdminApplicationDetailSection";

export const AdminApplicationDetail = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="box-border caret-transparent bg-gray-50 min-h-screen">
            <AdminSidebar
                isCollapsed={isSidebarCollapsed}
                isMobileOpen={isMobileMenuOpen}
                onCloseMobile={() => setIsMobileMenuOpen(false)}
            />
            <AdminMainContent
                isCollapsed={isSidebarCollapsed}
                onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                onToggleMobile={() => setIsMobileMenuOpen(true)}
            >
                <AdminApplicationDetailSection />
            </AdminMainContent>
        </div>
    );
};
