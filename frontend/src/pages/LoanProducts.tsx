import { LoanProductHero } from "../components/LoanProductHero";
import { LoanFilterSection } from "../components/LoanFilterSection";
import { LoanRatesSection } from "../components/LoanRatesSection";
import { LoanCTASection } from "../components/LoanCTASection";

export const LoanProducts = () => {
    return (
        <main className="box-border caret-transparent pt-20">
            <LoanProductHero />
            <LoanFilterSection />
            <LoanRatesSection />
            <LoanCTASection />
        </main>
    );
};
