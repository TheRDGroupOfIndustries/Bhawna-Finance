import { AdminHeader } from "./AdminHeader";

type AdminMainContentProps = {
    isCollapsed: boolean;
    onToggleSidebar: () => void;
    onToggleMobile: () => void;
    children: React.ReactNode;
};

export const AdminMainContent = ({ isCollapsed, onToggleSidebar, onToggleMobile, children }: AdminMainContentProps) => {
    return (
        <div className={`box-border caret-transparent transition-all duration-300 ease-in-out min-h-screen bg-gray-50 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
            <AdminHeader onToggle={onToggleSidebar} onToggleMobile={onToggleMobile} />
            {children}
        </div>
    );
};
