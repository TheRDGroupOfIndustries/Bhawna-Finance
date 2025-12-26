import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="text-white bg-slate-900 box-border caret-transparent">
            {/* FooterMain */}
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-8 py-20">
                {/* FooterGrid */}
                <div className="box-border caret-transparent gap-x-8 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-8 md:grid-cols-[repeat(4,minmax(0px,1fr))]">
                    {/* Brand Column */}
                    <div className="box-border caret-transparent">
                        <img
                            alt="Bhawan Finance"
                            src="https://c.animaapp.com/mjjkhccduLAQMw/assets/76eff229625bfb3e8a551fcf4d0cc342.png"
                            className="box-border caret-transparent brightness-0 invert-[1] h-10 max-w-full"
                        />
                        <p className="text-white/70 text-sm box-border caret-transparent leading-[22.75px] mt-4">
                            RBI registered NBFC providing reliable lending solutions with
                            transparent processes and competitive rates for individuals and
                            businesses.
                        </p>
                        <p className="text-white/60 text-xs box-border caret-transparent leading-4 mt-4">
                            RBI Registration: N-14.03268
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div className="box-border caret-transparent">
                        <h3 className="text-white/50 text-xs font-medium box-border caret-transparent tracking-[0.6px] leading-4 uppercase mb-4 font-inter">
                            Quick Links
                        </h3>
                        <div className="box-border caret-transparent list-none pl-0">
                            {[
                                { to: "/about", text: "About Us" },
                                { to: "/loan-products", text: "Loan Products" },
                                { to: "/eligibility", text: "Eligibility" },
                                { to: "/contact", text: "Contact" },
                                { to: "/", text: "Careers" },
                            ].map((link, index) => (
                                <li
                                    key={index}
                                    className={
                                        index === 0
                                            ? "box-border caret-transparent"
                                            : "box-border caret-transparent mt-3"
                                    }
                                >
                                    <Link
                                        to={link.to}
                                        className="text-white/90 text-sm box-border caret-transparent leading-5 hover:text-white"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    </div>

                    {/* Resources Column */}
                    <div className="box-border caret-transparent">
                        <h3 className="text-white/50 text-xs font-medium box-border caret-transparent tracking-[0.6px] leading-4 uppercase mb-4 font-inter">
                            Resources
                        </h3>
                        <div className="box-border caret-transparent list-none pl-0">
                            {[
                                { to: "/", text: "FAQs" },
                                { to: "/", text: "EMI Calculator" },
                                { to: "/", text: "Terms & Conditions" },
                                { to: "/", text: "Privacy Policy" },
                                { to: "/", text: "Grievance Redressal" },
                            ].map((link, index) => (
                                <li
                                    key={index}
                                    className={
                                        index === 0
                                            ? "box-border caret-transparent"
                                            : "box-border caret-transparent mt-3"
                                    }
                                >
                                    <Link
                                        to={link.to}
                                        className="text-white/90 text-sm box-border caret-transparent leading-5 hover:text-white"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div className="box-border caret-transparent">
                        <h3 className="text-white/50 text-xs font-medium box-border caret-transparent tracking-[0.6px] leading-4 uppercase mb-4 font-inter">
                            Contact Info
                        </h3>
                        <div className="text-white/90 text-sm box-border caret-transparent leading-5">
                            <p className="box-border caret-transparent">
                                Bhawan Finance Ltd.
                                <br className="box-border caret-transparent" />
                                123 Financial District
                                <br className="box-border caret-transparent" />
                                Mumbai, Maharashtra 400001
                            </p>
                            <p className="box-border caret-transparent mt-3">+91 22 1234 5678</p>
                            <p className="box-border caret-transparent mt-3">
                                info@bhawanfinance.com
                            </p>
                            <p className="text-white/70 text-xs box-border caret-transparent leading-4 mt-3">
                                Mon-Fri: 9:00 AM - 6:00 PM
                                <br className="box-border caret-transparent" />
                                Sat: 9:00 AM - 2:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FooterBanner */}
            <div className="relative box-border caret-transparent overflow-hidden py-12">
                <div className="box-border caret-transparent text-center">
                    <h2 className="text-stone-300 text-5xl sm:text-7xl font-black box-border caret-transparent tracking-tighter sm:tracking-[-2px] leading-tight sm:leading-[5rem] font-inter md:text-8xl md:tracking-[-2.4px] md:leading-[96px] lg:text-9xl lg:tracking-[-3.2px] lg:leading-[128px]">
                        BHAWAN FINANCE
                    </h2>
                </div>
            </div>

            {/* FooterBottom */}
            <div className="box-border caret-transparent border-t border-solid border-white/10">
                {/* FooterBottomContent */}
                <div className="box-border caret-transparent max-w-screen-xl mx-auto px-8 py-6">
                    <div className="items-center box-border caret-transparent flex flex-col justify-between md:flex-row">
                        <p className="text-white/60 text-xs box-border caret-transparent leading-4">
                            © 2026 Bhawan Finance Ltd. All rights reserved.
                        </p>
                        <div className="items-center box-border caret-transparent flex mt-4 md:mt-0">
                            <Link
                                to="/terms"
                                className="text-white/60 text-xs box-border caret-transparent block leading-4 hover:text-white/80"
                            >
                                Terms
                            </Link>
                            <Link
                                to="/privacy"
                                className="text-white/60 text-xs box-border caret-transparent block leading-4 ml-6 hover:text-white/80"
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
