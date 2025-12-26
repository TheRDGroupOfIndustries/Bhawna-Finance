import { motion } from "framer-motion";

export const EligibilityHero = () => {
    return (
        <section className="relative bg-[linear-gradient(to_right_bottom,rgb(11,31,59),rgb(47,74,109))] box-border caret-transparent pt-24 pb-16 md:pt-32 md:pb-20">
            <div className="absolute bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.1),rgba(0,0,0,0.2))] box-border caret-transparent inset-0"></div>
            <div className="absolute bg-[url('https://readdy.ai/api/search-image?query=Professional%20financial%20consultation%20office%20with%20modern%20banking%20interior%2C%20clean%20corporate%20environment%2C%20financial%20documents%20and%20calculator%20on%20desk%2C%20professional%20lighting%2C%20business%20atmosphere%2C%20minimalist%20design&width=1920&height=800&seq=eligibility-hero&orientation=landscape')] bg-cover box-border caret-transparent opacity-10 bg-center inset-0"></div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative box-border caret-transparent max-w-screen-xl text-center mx-auto px-6 md:px-8"
            >
                <h1 className="text-white text-3xl font-bold box-border caret-transparent leading-9 mb-6 font-inter md:text-6xl md:leading-[60px]">
                    Loan Eligibility &amp;{" "}
                    <br className="text-3xl box-border caret-transparent leading-9 md:text-6xl md:leading-[60px]" />
                    <span className="text-orange-400 text-3xl box-border caret-transparent leading-9 md:text-6xl md:leading-[60px]">
                        Application Process
                    </span>
                </h1>
                <p className="text-white/90 text-lg box-border caret-transparent leading-relaxed max-w-screen-md mb-8 mx-auto md:text-xl md:leading-[32.5px]">
                    Understand our simple eligibility criteria and streamlined application
                    process. Get pre-approved in minutes with our digital-first approach to
                    lending.
                </p>
                <div className="box-border caret-transparent gap-x-4 flex flex-col justify-center gap-y-4 md:flex-row">
                    <button className="text-white text-lg font-medium items-center bg-orange-400 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] caret-transparent flex h-14 justify-center leading-7 text-nowrap px-8 py-4 rounded-xl md:rounded-bl md:rounded-br md:rounded-tl md:rounded-tr hover:bg-orange-500 hover:shadow-lg transition-all duration-300">
                        Check Eligibility Now
                    </button>
                    <button className="text-white text-lg font-medium items-center bg-transparent caret-transparent flex h-14 justify-center leading-7 text-nowrap border border-solid border-white px-8 py-4 rounded-xl md:rounded-bl md:rounded-br md:rounded-tl md:rounded-tr hover:bg-white/10 hover:text-white transition-all duration-300">
                        Download Checklist
                    </button>
                </div>
            </motion.div>
        </section>
    );
};
