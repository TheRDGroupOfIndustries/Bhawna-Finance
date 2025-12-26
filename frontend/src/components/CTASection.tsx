import { SocialIcons } from "./SocialIcons";

export const CTASection = () => {
    return (
        <section className="bg-white box-border caret-transparent py-20">
            <div className="box-border caret-transparent max-w-4xl text-center mx-auto px-8">
                <h2 className="text-slate-900 text-4xl font-bold box-border caret-transparent leading-10 mb-6 font-inter md:text-5xl md:leading-[48px]">
                    Ready to Apply for a Loan?
                </h2>
                <p className="text-gray-400 text-lg box-border caret-transparent leading-[29.25px] max-w-2xl mb-10 mx-auto">
                    Get started with a simple application process and receive approval
                    within 48 hours. Our team is ready to help you achieve your financial
                    goals.
                </p>
                <button className="text-white text-lg font-medium items-center bg-orange-400 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] caret-transparent inline-flex h-14 justify-center leading-7 text-nowrap mb-16 px-8 py-4 rounded-bl rounded-br rounded-tl rounded-tr hover:bg-orange-500 hover:shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_4px_6px_-1px,rgba(0,0,0,0.1)_0px_2px_4px_-2px]">
                    Start Your Application
                </button>
                <SocialIcons />
            </div>
        </section>
    );
};
