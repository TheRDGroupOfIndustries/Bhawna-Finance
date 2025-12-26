import { ApplyHero } from "../components/ApplyHero";
import { LoanApplicationFormSection } from "../components/LoanApplicationFormSection";
import { ApplyHelpSection } from "../components/ApplyHelpSection";

export const ApplyNow = () => {
    return (
        <main className="box-border caret-transparent pt-20">
            <ApplyHero />
            <LoanApplicationFormSection />
            <ApplyHelpSection />
        </main>
    );
};
