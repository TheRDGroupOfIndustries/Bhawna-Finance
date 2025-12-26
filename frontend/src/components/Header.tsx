import { Logo } from "./Logo";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu when location changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    const navLinks = [
        { title: "Home", path: "/" },
        { title: "About Us", path: "/about" },
        { title: "Loan Products", path: "/loan-products" },
        { title: "Eligibility & Process", path: "/eligibility" },
        { title: "Contact & Support", path: "/contact" },
    ];

    return (
        <>
            <header
                className={`fixed box-border z-50 top-0 inset-x-0 transition-all duration-300 ${isScrolled || isMenuOpen ? "bg-white shadow-md" : "bg-transparent"
                    }`}
            >
                <div className="box-border max-w-screen-xl mx-auto px-6 md:px-8">
                    <div className="items-center box-border flex h-20 justify-between">
                        <Link to="/" className="z-50">
                            <Logo />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="items-center box-border hidden xl:flex">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-slate-700 font-medium box-border block ml-8 hover:text-orange-500 transition-colors ${location.pathname === link.path ? "text-orange-500" : ""
                                        }`}
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop Buttons & Mobile Toggle */}
                        <div className="items-center box-border flex">
                            <div className="hidden xl:flex items-center">
                                <Link
                                    to="/track-application"
                                    className="text-slate-900 text-sm font-medium items-center bg-transparent flex h-10 justify-center leading-5 text-center text-nowrap border border-slate-900 px-4 py-2 rounded-lg border-solid hover:text-white hover:bg-slate-900 transition-all"
                                >
                                    Track Application
                                </Link>
                                <Link
                                    to="/apply-now"
                                    className="text-white text-sm font-medium items-center bg-orange-400 shadow-sm flex h-10 justify-center leading-5 text-center text-nowrap ml-3 px-4 py-2 rounded-lg hover:bg-orange-500 hover:shadow-md transition-all active:scale-95"
                                >
                                    Apply Now
                                </Link>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 ml-2 xl:hidden text-slate-700 hover:text-slate-900 focus:outline-none z-50"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 xl:hidden transition-all duration-300 ${isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Menu Content */}
                <div
                    className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transition-transform duration-300 flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex-1 flex flex-col pt-24 px-8 pb-8">
                        <nav className="flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-xl font-semibold text-slate-900 hover:text-orange-500 transition-colors ${location.pathname === link.path ? "text-orange-500" : ""
                                        }`}
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-auto space-y-4">
                            <Link
                                to="/track-application"
                                className="w-full text-slate-900 text-lg font-medium flex h-14 items-center justify-center border border-slate-900 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Track Application
                            </Link>
                            <Link
                                to="/apply-now"
                                className="w-full text-white text-lg font-medium flex h-14 items-center justify-center bg-orange-400 rounded-xl shadow-lg hover:bg-orange-500 active:scale-[0.98] transition-all"
                            >
                                Apply Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
