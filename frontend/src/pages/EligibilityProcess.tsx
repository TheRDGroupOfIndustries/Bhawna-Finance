import { EligibilityHero } from "../components/EligibilityHero";
import { EligibilityRequirements } from "../components/EligibilityRequirements";
import { DetailedProcessSection } from "../components/DetailedProcessSection";
import { DocumentsRequiredSection } from "../components/DocumentsRequiredSection";
import { ApplicationTimeline } from "../components/ApplicationTimeline";
import { EligibilityCalculator } from "../components/EligibilityCalculator";
import { EligibilityFAQSection } from "../components/EligibilityFAQSection";

export const EligibilityProcess = () => {
    return (
        <main className="box-border caret-transparent pt-20">
            <EligibilityHero />
            <EligibilityRequirements />
            <DetailedProcessSection />
            <DocumentsRequiredSection />
            <ApplicationTimeline />
            <EligibilityCalculator />
            <EligibilityFAQSection />
        </main>
    );
};
