import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { Upload, Download, Hash, Calendar, Phone, User, FileText, Type, IndianRupee, CreditCard } from 'lucide-react';
import logo from '../../assets/logo.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return "🌐";
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

export const AdminInvoiceGeneratorSection = () => {
    const [formData, setFormData] = useState({
        receiptType: '',
        address: 'Vishwanath katra, Bhikharipur, Varanasi',
        receiptNo: '',
        date: new Date().toISOString().split('T')[0],
        phoneCode: '+91',
        mobileNo: '',
        receivedFrom: '',
        description: '',
        theSumOf: '',
        amount: '',
        modeOfPayment: '',
        signature: null as string | null
    });

    const [countries, setCountries] = useState<{ name: string, dial_code: string, code: string, flag: string }[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await axios.get("https://countriesnow.space/api/v0.1/countries/codes");
                if (!res.data.error) {
                    const formatted = res.data.data.map((c: any) => ({
                        ...c,
                        flag: getFlagEmoji(c.code)
                    })).sort((a: any, b: any) => a.name.localeCompare(b.name));

                    const india = formatted.find((c: any) => c.code === "IN");
                    const others = formatted.filter((c: any) => c.code !== "IN");
                    setCountries(india ? [india, ...others] : formatted);
                }
            } catch (err) {
                console.error("Failed to fetch countries", err);
                setCountries([{ name: "India", code: "IN", dial_code: "+91", flag: "🇮🇳" }]);
            }
        };
        fetchCountries();
    }, []);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors.includes(name)) {
            setErrors(prev => prev.filter(err => err !== name));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, signature: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const required = ['receiptType', 'receiptNo', 'mobileNo', 'receivedFrom', 'description', 'theSumOf', 'amount', 'modeOfPayment'];
        const newErrors = required.filter(field => !formData[field as keyof typeof formData]);

        if (newErrors.length > 0) {
            setErrors(newErrors);
            toast.error(`Please fill in all mandatory fields`);
            return false;
        }

        if (!/^\d{10}$/.test(formData.mobileNo)) {
            setErrors(['mobileNo']);
            toast.error("Mobile number must be exactly 10 digits");
            return false;
        }

        return true;
    };

    const generatePDF = () => {
        if (!validateForm()) return;

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a5'
        });

        // Add Logo - Fixed width and height (square)
        doc.addImage(logo, 'PNG', 10, 10, 15, 15);

        // Add Background Logo (Watermark) - Large, Colored and Faded
        try {
            const gState = new (doc as any).GState({ opacity: 0.08 });
            doc.setGState(gState);
            doc.addImage(logo, 'PNG', 65, 45, 80, 80);
            doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
        } catch (e) {
            console.warn("Watermark failed", e);
        }

        // Top-right Receipt Type Label
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.text(formData.receiptType, 195, 15, { align: 'right' });
        doc.setFont('helvetica', 'normal');

        // Header
        doc.setFontSize(24);
        doc.setTextColor(19, 31, 56); // Dark blue/slate
        doc.text('BHAWAN FINANCE', 105, 35, { align: 'center' });

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(formData.address, 105, 42, { align: 'center' });

        // Line separator
        doc.setLineWidth(0.5);
        doc.line(10, 48, 200, 48);

        // Content
        const formattedDate = formData.date.split('-').reverse().join('-');
        doc.setFontSize(11);
        doc.text(`Receipt no :  ${formData.receiptNo}`, 20, 58);
        doc.text(`Date : ${formattedDate}`, 140, 58);
        doc.text(`MOB : ${formData.phoneCode} ${formData.mobileNo}`, 140, 65);

        doc.text('Received from :', 20, 75);
        doc.setFont('helvetica', 'bold');
        doc.text(formData.receivedFrom, 55, 75);
        doc.setLineWidth(0.1);
        doc.line(55, 76, 130, 76);

        doc.setFont('helvetica', 'normal');
        doc.text('Description :', 20, 85);
        doc.text(formData.description, 55, 85);
        doc.line(55, 86, 130, 86);

        doc.text('The sum of :', 20, 95);
        doc.text(formData.theSumOf, 55, 95);
        doc.line(55, 96, 130, 96);

        doc.setFont('helvetica', 'bold');
        doc.text('Amount :', 140, 95);
        doc.text(`${formData.amount}/-`, 160, 95);
        doc.line(160, 96, 190, 96);

        doc.setFont('helvetica', 'normal');
        doc.text('Mode of Payment :', 20, 110);

        // Mode of Payment Checkboxes in PDF
        const modes = ['Cash', 'Cheque', 'UPI'];
        let startX = 60;
        modes.forEach(mode => {
            doc.text(mode, startX, 110);
            const textWidth = doc.getTextWidth(mode);
            const checkboxX = startX + textWidth + 2; // 2mm gap after text

            // Draw a box for checkbox
            doc.rect(checkboxX, 106, 4, 4);

            if (formData.modeOfPayment === mode) {
                // If selected, add a "checkmark" look
                doc.setLineWidth(0.5);
                doc.line(checkboxX + 0.5, 108, checkboxX + 1.5, 109.5);
                doc.line(checkboxX + 1.5, 109.5, checkboxX + 3.5, 106.5);
                doc.setLineWidth(0.1);
            }
            startX += 30;
        });

        // Signature
        if (formData.signature) {
            doc.addImage(formData.signature, 'PNG', 160, 115, 30, 15);
        }
        doc.setFont('helvetica', 'bold');
        doc.text('Signature', 170, 135);
        doc.line(160, 130, 190, 130);

        doc.save(`Invoice_${formData.receiptNo || 'draft'}.pdf`);
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Invoice Generator</h1>
                    <p className="text-slate-500">Create and download official Bhawan Finance receipts</p>
                </div>

                <div className="flex justify-center">
                    {/* Form Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-2xl w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Type size={16} className="text-[#C59D4F]" />
                                    Receipt Type
                                </label>
                                <input
                                    type="text"
                                    name="receiptType"
                                    value={formData.receiptType}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/[0-9]/g, '');
                                        setFormData(prev => ({ ...prev, receiptType: val }));
                                        if (errors.includes('receiptType')) setErrors(prev => prev.filter(err => err !== 'receiptType'));
                                    }}
                                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 outline-none transition-all ${errors.includes('receiptType') ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-slate-200 focus:ring-[#C59D4F]/20 focus:border-[#C59D4F]'}`}
                                    placeholder="e.g. OFFICIAL RECEIPT"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Hash size={16} className="text-[#C59D4F]" />
                                    Receipt No.
                                </label>
                                <input
                                    type="text"
                                    name="receiptNo"
                                    value={formData.receiptNo}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        setFormData(prev => ({ ...prev, receiptNo: val }));
                                        if (errors.includes('receiptNo')) setErrors(prev => prev.filter(err => err !== 'receiptNo'));
                                    }}
                                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 outline-none transition-all ${errors.includes('receiptNo') ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-slate-200 focus:ring-[#C59D4F]/20 focus:border-[#C59D4F]'}`}
                                    placeholder="009"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Calendar size={16} className="text-[#C59D4F]" />
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C59D4F]/20 focus:border-[#C59D4F] outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Phone size={16} className="text-[#C59D4F]" />
                                    Mobile Number
                                </label>
                                <div className="flex gap-3">
                                    <div className="relative">
                                        <select
                                            name="phoneCode"
                                            value={formData.phoneCode}
                                            onChange={handleInputChange}
                                            className="w-24 px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C59D4F]/20 focus:border-[#C59D4F] outline-none text-sm bg-white appearance-none cursor-pointer pr-8"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'right 0.5rem center',
                                                backgroundSize: '1rem'
                                            }}
                                        >
                                            {countries.map((c, idx) => (
                                                <option key={`${c.code}-${idx}`} value={c.dial_code}>
                                                    {c.flag} {c.dial_code}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <input
                                        type="tel"
                                        name="mobileNo"
                                        value={formData.mobileNo}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            setFormData(prev => ({ ...prev, mobileNo: val }));
                                            if (errors.includes('mobileNo')) setErrors(prev => prev.filter(err => err !== 'mobileNo'));
                                        }}
                                        className={`flex-1 px-4 py-2.5 border rounded-xl focus:ring-2 outline-none transition-all ${errors.includes('mobileNo') ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-slate-200 focus:ring-[#C59D4F]/20 focus:border-[#C59D4F]'}`}
                                        placeholder="10 digit number"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <User size={16} className="text-[#C59D4F]" />
                                    Name (Received From)
                                </label>
                                <input
                                    type="text"
                                    name="receivedFrom"
                                    value={formData.receivedFrom}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 outline-none transition-all ${errors.includes('receivedFrom') ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-slate-200 focus:ring-[#C59D4F]/20 focus:border-[#C59D4F]'}`}
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <FileText size={16} className="text-[#C59D4F]" />
                                    Description
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 outline-none transition-all ${errors.includes('description') ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-slate-200 focus:ring-[#C59D4F]/20 focus:border-[#C59D4F]'}`}
                                    placeholder="e.g. Loan Processing Fee"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Type size={16} className="text-[#C59D4F]" />
                                    Amount in Words (The Sum Of)
                                </label>
                                <input
                                    type="text"
                                    name="theSumOf"
                                    value={formData.theSumOf}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/[0-9]/g, '');
                                        setFormData(prev => ({ ...prev, theSumOf: val }));
                                        if (errors.includes('theSumOf')) setErrors(prev => prev.filter(err => err !== 'theSumOf'));
                                    }}
                                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 outline-none transition-all ${errors.includes('theSumOf') ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-slate-200 focus:ring-[#C59D4F]/20 focus:border-[#C59D4F]'}`}
                                    placeholder="e.g. Ten Thousand Only"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <IndianRupee size={16} className="text-[#C59D4F]" />
                                    Amount (Numeric)
                                </label>
                                <input
                                    type="text"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        setFormData(prev => ({ ...prev, amount: val }));
                                        if (errors.includes('amount')) setErrors(prev => prev.filter(err => err !== 'amount'));
                                    }}
                                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 outline-none transition-all ${errors.includes('amount') ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-slate-200 focus:ring-[#C59D4F]/20 focus:border-[#C59D4F]'}`}
                                    placeholder="10000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <CreditCard size={16} className="text-[#C59D4F]" />
                                    Mode of Payment
                                </label>
                                <div className="relative">
                                    <select
                                        name="modeOfPayment"
                                        value={formData.modeOfPayment}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 outline-none transition-all appearance-none bg-white cursor-pointer pr-10 ${errors.includes('modeOfPayment') ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-slate-200 focus:ring-[#C59D4F]/20 focus:border-[#C59D4F]'}`}
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23C59D4F' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'right 1rem center',
                                            backgroundSize: '1.25rem'
                                        }}
                                    >
                                        <option value="">Select Mode</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="UPI">UPI</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Upload size={16} className="text-[#C59D4F]" />
                                    Upload Signature
                                </label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#C59D4F] hover:bg-[#C59D4F]/5 transition-all group"
                                >
                                    {formData.signature ? (
                                        <div className="relative group">
                                            <img src={formData.signature} alt="Signature Preview" className="h-16 object-contain" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">Change Signature</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="bg-slate-50 p-3 rounded-full mb-3 group-hover:bg-[#C59D4F]/10 transition-colors">
                                                <Upload className="w-6 h-6 text-slate-400 group-hover:text-[#C59D4F]" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700">Click to upload signature image</span>
                                            <p className="text-[11px] text-slate-400 mt-1">Recommended size: 300x150px (Transparent PNG)</p>
                                        </>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={generatePDF}
                            className="w-full mt-10 bg-[#C59D4F] hover:bg-slate-900 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-[#C59D4F]/20 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <Download className="w-5 h-5" />
                            Generate Official PDF Receipt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
