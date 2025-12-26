import { HeroSection } from "../components/HeroSection";
import { StatsSection } from "../components/StatsSection";
import { ServicesSection } from "../components/ServicesSection";
import { ProcessSection } from "../components/ProcessSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { AboutSection } from "../components/AboutSection";
import { CTASection } from "../components/CTASection";

export const Home = () => {
    return (
        <main className="box-border caret-transparent">
            <HeroSection />
            <StatsSection />
            <ServicesSection />
            <ProcessSection />
            <TestimonialsSection />
            <AboutSection />
            <CTASection />
        </main>
    );
};
