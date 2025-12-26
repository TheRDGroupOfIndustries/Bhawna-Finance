import { AboutHero } from "../components/AboutHero";
import { VisionMissionSection } from "../components/VisionMissionSection";
import { TimelineSection } from "../components/TimelineSection";
import { LeadershipSection } from "../components/LeadershipSection";
import { ComplianceSection } from "../components/ComplianceSection";


export const About = () => {
    return (
        <main className="box-border caret-transparent pt-20">
            <AboutHero />
            <VisionMissionSection />
            <TimelineSection />
            <LeadershipSection />
            <ComplianceSection />
        </main>
    );
};
