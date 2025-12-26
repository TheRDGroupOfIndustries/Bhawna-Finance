import { TrackingHero } from "../components/TrackingHero";
import { TrackingFormSection } from "../components/TrackingFormSection";
import { DemoSection } from "../components/DemoSection";

export const TrackApplication = () => {
    return (
        <main className="box-border caret-transparent pt-20">
            <TrackingHero />
            <TrackingFormSection />
            <DemoSection />
        </main>
    );
};
