import { motion } from "framer-motion";

interface PageHeroProps {
    title: string;
    description: string;
}

export const PageHero = ({ title, description }: PageHeroProps) => {
    return (
        <section className="relative bg-[linear-gradient(to_right_bottom,rgb(11,31,59),rgb(47,74,109))] box-border pt-32 pb-20 overflow-hidden">
            {/* Background elements */}
            <div className="absolute bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.1),rgba(0,0,0,0.2))] box-border inset-0"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C59D4F]/10 rounded-full -ml-32 -mb-32 blur-2xl"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative box-border max-w-screen-xl text-center mx-auto px-8"
            >
                <div className="inline-block mb-6">
                    <span className="text-[#C59D4F] text-xs font-bold tracking-[3px] uppercase">
                        Bhawan Finance
                    </span>
                    <div className="h-0.5 w-12 bg-[#C59D4F] mx-auto mt-2"></div>
                </div>
                <h1 className="text-white text-5xl font-bold box-border leading-[48px] mb-6 font-inter md:text-6xl md:leading-[60px]">
                    {title}
                </h1>
                <p className="text-blue-100 text-lg md:text-xl box-border leading-[1.6] max-w-screen-md mx-auto font-medium">
                    {description}
                </p>
            </motion.div>
        </section>
    );
};
