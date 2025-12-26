import { ContactHero } from "../components/ContactHero";
import { ContactCardsSection } from "../components/ContactCardsSection";
import { ContactFormSection } from "../components/ContactFormSection";
import { ContactFAQSection } from "../components/ContactFAQSection";

export const ContactSupport = () => {
    return (
        <main className="box-border caret-transparent pt-20">
            <ContactHero />
            <ContactCardsSection />
            <ContactFormSection />
            <ContactFAQSection />
        </main>
    );
};
