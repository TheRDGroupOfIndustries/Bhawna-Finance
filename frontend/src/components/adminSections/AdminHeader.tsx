export const AdminHeader = ({ onToggle, onToggleMobile }: { onToggle: () => void; onToggleMobile: () => void }) => {
    return (
        <header className="items-center bg-white box-border  flex h-16 justify-between border-gray-200 px-4 md:px-6 border-b border-solid sticky top-0 z-30">
            {/* Header Left */}
            <div className="items-center box-border  flex">
                <button
                    onClick={onToggle}
                    className="bg-transparent  hidden md:block text-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer mr-2 transition-colors"
                >
                    <i className="ri-menu-2-line text-gray-600 text-xl"></i>
                </button>

                {/* Mobile BF Logo and Admin Text */}
                <div className="flex md:hidden items-center bg-[#C59D4F] h-8 w-8 justify-center rounded-lg mr-3 shrink-0">
                    <span className="text-white text-sm font-bold">BF</span>
                </div>
                <span className="text-slate-900 text-lg font-semibold md:hidden">Admin</span>

                <div className="box-border  ml-0 md:ml-0 hidden md:block">
                    <h1 className="text-slate-900 text-lg md:text-xl font-semibold box-border  leading-tight md:leading-7 font-inter">
                        Admin Control Center
                    </h1>
                    <p className="text-gray-500 text-xs md:text-sm box-border  leading-tight md:leading-5 mt-0.5 font-inter">
                        Bhawan Finance Management System
                    </p>
                </div>
            </div>

            {/* Header Right */}
            <div className="items-center box-border  flex">
                <div className="flex items-center space-x-1 sm:space-x-2">
                    {/* Inlined NotificationButton */}
                    <div className="relative box-border ">
                        <button className="bg-transparent  text-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                            <i className="ri-notification-3-line text-gray-600 text-xl"></i>
                            <span className="absolute text-white text-[10px] items-center bg-red-500 box-border  flex h-4 justify-center leading-none w-4 rounded-full right-0.5 top-0.5">
                                3
                            </span>
                        </button>
                    </div>

                    {/* Inlined UserProfile */}
                    <div className="items-center box-border  flex border-gray-200 ml-2 md:ml-4 pl-2 md:pl-4 border-l border-solid">
                        <div className="box-border  text-right hidden lg:block">
                            <div className="text-slate-900 text-sm font-medium box-border  leading-5 font-inter">
                                Rajesh Kumar
                            </div>
                            <div className="text-gray-500 text-xs box-border  leading-4 font-inter">
                                System Admin
                            </div>
                        </div>
                        <div className="items-center bg-slate-700 box-border  flex h-8 justify-center w-8 ml-3 rounded-full cursor-pointer hover:bg-slate-800 transition-colors">
                            <i className="ri-user-line text-white text-sm"></i>
                        </div>
                    </div>

                    <button
                        onClick={onToggleMobile}
                        className="bg-transparent  flex md:hidden text-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                        <i className="ri-menu-line text-gray-600 text-xl"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};
