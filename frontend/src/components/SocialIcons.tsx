import { Landmark, FileText, ShieldCheck } from "lucide-react";

export const SocialIcons = () => {
    const iconColor = "text-[#2D4363]";
    const iconSize = "w-6 h-6";

    return (
        <div className="items-center box-border caret-transparent flex justify-center mt-16">
            <div className="items-center bg-slate-100 box-border caret-transparent flex h-16 justify-center w-16 rounded-lg">
                <Landmark className={`${iconColor} ${iconSize}`} />
            </div>
            <div className="items-center bg-slate-100 box-border caret-transparent flex h-16 justify-center w-16 ml-12 rounded-lg">
                <FileText className={`${iconColor} ${iconSize}`} />
            </div>
            <div className="items-center bg-slate-100 box-border caret-transparent flex h-16 justify-center w-16 ml-12 rounded-lg">
                <ShieldCheck className={`${iconColor} ${iconSize}`} />
            </div>
        </div>
    );
};
