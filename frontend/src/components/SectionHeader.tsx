
type SectionHeaderProps = {
    title: string;
    description: string;
};

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
    return (
        <div className="box-border caret-transparent text-center mb-12">
            <h2 className="text-slate-900 text-4xl font-bold box-border caret-transparent leading-10 mb-4 font-inter">
                {title}
            </h2>
            <p className="text-gray-400 text-lg box-border caret-transparent leading-7 max-w-2xl mx-auto">
                {description}
            </p>
        </div>
    );
};
