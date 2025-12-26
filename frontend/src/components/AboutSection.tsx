import { motion } from "framer-motion";
import { Counter } from "./Counter";

export const AboutSection = () => {
    return (
        <section className="bg-slate-900 box-border caret-transparent py-20">
            <div className="box-border caret-transparent max-w-screen-xl mx-auto px-8">
                <div className="items-center box-border caret-transparent gap-x-12 grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-y-12 md:grid-cols-[repeat(3,minmax(0px,1fr))]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="box-border caret-transparent col-end-auto col-start-auto md:col-end-[span_2] md:col-start-[span_2]"
                    >
                        <div className="box-border caret-transparent inline-block">
                            <span className="text-white text-sm font-medium bg-slate-700 box-border caret-transparent leading-5 px-4 py-2 rounded-full">
                                About Bhawan Finance
                            </span>
                        </div>
                        <h2 className="text-white text-4xl font-bold box-border caret-transparent leading-[45px] max-w-2xl mt-6 font-inter md:text-5xl md:leading-[48px]">
                            Building Financial Trust Since 1998
                        </h2>
                        <div className="text-white/90 box-border caret-transparent leading-[26px] max-w-2xl mt-6">
                            <p className="box-border caret-transparent">
                                As a Reserve Bank of India registered Non-Banking Financial Company,
                                Bhawan Finance has been a trusted partner in providing comprehensive
                                lending solutions for over two decades.
                            </p>
                            <p className="box-border caret-transparent mt-4">
                                Our commitment to transparency, competitive pricing, and
                                customer-centric approach has helped thousands of individuals and
                                businesses achieve their financial goals through our diverse range
                                of loan products.
                            </p>
                            <p className="box-border caret-transparent mt-4">
                                We maintain the highest standards of regulatory compliance and
                                ethical lending practices, ensuring our customers receive reliable
                                and professional financial services.
                            </p>
                        </div>
                        <p className="text-white/70 text-sm box-border caret-transparent leading-5 mt-6">
                            Licensed and regulated by the Reserve Bank of India | NBFC
                            Registration: N-14.03268
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="box-border caret-transparent text-center md:text-left"
                    >
                        <div className="box-border caret-transparent text-center md:text-left">
                            <div className="text-white text-8xl font-bold box-border caret-transparent leading-[96px] text-center font-ui_serif md:text-9xl md:leading-[128px] md:text-left">
                                <Counter value="25+" />
                            </div>
                            <p className="text-white/80 text-lg box-border caret-transparent leading-7 text-center mt-2 md:text-left">
                                Years of Excellence
                            </p>
                            <p className="text-white/70 box-border caret-transparent text-center mt-1 md:text-left">
                                Serving <Counter value="50,000+" /> Customers
                            </p>
                        </div>
                        <button className="text-white hover:text-black text-lg font-medium items-center bg-transparent caret-transparent inline-flex h-14 justify-center leading-7 text-center text-nowrap border mt-6 px-8 py-4 rounded-bl rounded-br rounded-tl rounded-tr border-solid border-white hover:bg-white transition-colors duration-300">
                            Our Story
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
