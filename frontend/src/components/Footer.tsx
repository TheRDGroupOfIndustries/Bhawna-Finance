import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"

export const Footer = () => {
    return (
        <footer className="text-white bg-slate-900 box-border ">
            {/* FooterMain */}
            <div className="box-border  max-w-screen-xl mx-auto px-8 py-20">
                {/* FooterGrid */}
                <div className="box-border  gap-x-8 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-8 md:grid-cols-[repeat(4,minmax(0px,1fr))]">
                    {/* Brand Column */}
                    <div className="box-border ">
                        <img
                            alt="Bhawan Finance"
                            src={Logo}
                            className="box-border  brightness-0 invert-[1] h-10 max-w-full"
                        />
                        <p className="text-white/70 text-sm box-border  leading-[22.75px] mt-4">
                            RBI registered NBFC providing reliable lending solutions with
                            transparent processes and competitive rates for individuals and
                            businesses.
                        </p>
                        <p className="text-[#C59D4F] text-sm font-medium italic mt-2">
                            "Hum Aapke Sath Hain..."
                        </p>
                        <p className="text-white/60 text-xs box-border  leading-4 mt-4">
                            RBI Registration: N-14.03268
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div className="box-border ">
                        <h3 className="text-white/50 text-xs font-medium box-border  tracking-[0.6px] leading-4 uppercase mb-4 font-inter">
                            Quick Links
                        </h3>
                        <div className="box-border  list-none pl-0">
                            {[
                                { to: "/about", text: "About Us" },
                                { to: "/loan-products", text: "Loan Products" },
                                { to: "/eligibility", text: "Eligibility" },
                                { to: "/gallery", text: "Gallery" },
                                { to: "/contact", text: "Contact" },
                                { to: "/apply-now", text: "Apply for Loan" },
                            ].map((link, index) => (
                                <li
                                    key={index}
                                    className={
                                        index === 0
                                            ? "box-border "
                                            : "box-border  mt-3"
                                    }
                                >
                                    <Link
                                        to={link.to}
                                        className="text-white/90 text-sm box-border  leading-5 hover:text-white"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    </div>

                    {/* Resources Column */}
                    <div className="box-border ">
                        <h3 className="text-white/50 text-xs font-medium box-border  tracking-[0.6px] leading-4 uppercase mb-4 font-inter">
                            Resources
                        </h3>
                        <div className="box-border  list-none pl-0">
                            {[
                                { to: "/faq", text: "FAQs" },
                                { to: "/terms", text: "Terms & Conditions" },
                                { to: "/privacy", text: "Privacy Policy" },
                            ].map((link, index) => (
                                <li
                                    key={index}
                                    className={
                                        index === 0
                                            ? "box-border "
                                            : "box-border  mt-3"
                                    }
                                >
                                    <Link
                                        to={link.to}
                                        className="text-white/90 text-sm box-border  leading-5 hover:text-white"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div className="box-border ">
                        <h3 className="text-white/50 text-xs font-medium box-border  tracking-[0.6px] leading-4 uppercase mb-4 font-inter">
                            Contact Info
                        </h3>
                        <div className="text-white/90 text-sm box-border  leading-5">
                            <p className="box-border ">
                                Bhawan Finance
                                <br className="box-border " />
                                Vishwanath Katra, Bhikharipur,
                                <br className="box-border " />
                                Varanasi - 221004 (U.P.)
                            </p>
                            <p className="box-border  mt-3">+91 8400260002, 7054949473</p>
                            <p className="box-border  mt-3">
                                bhawanfinance.vns@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FooterBanner */}
            <div className="relative box-border  overflow-hidden py-12">
                <div className="box-border  text-center">
                    <h2 className="text-stone-300 text-5xl sm:text-7xl font-black box-border  tracking-tighter sm:tracking-[-2px] leading-tight sm:leading-[5rem] font-inter md:text-8xl md:tracking-[-2.4px] md:leading-[96px] lg:text-9xl lg:tracking-[-3.2px] lg:leading-[128px]">
                        BHAWAN FINANCE
                    </h2>
                </div>
            </div>

            {/* FooterBottom */}
            <div className="box-border  border-t border-solid border-white/10">
                {/* FooterBottomContent */}
                <div className="box-border  max-w-screen-xl mx-auto px-8 py-6">
                    <div className="items-center box-border  flex flex-col justify-between md:flex-row">
                        <p className="text-white/60 text-xs box-border  leading-4">
                            © 2026 Bhawan Finance. All rights reserved.
                        </p>
                        <div className="items-center box-border  flex mt-4 md:mt-0">
                            <Link
                                to="/terms"
                                className="text-white/60 text-xs box-border  block leading-4 hover:text-white/80"
                            >
                                Terms
                            </Link>
                            <Link
                                to="/privacy"
                                className="text-white/60 text-xs box-border  block leading-4 ml-6 hover:text-white/80"
                            >
                                Privacy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
