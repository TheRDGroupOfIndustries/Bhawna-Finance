import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Search, FileText, Calendar, Phone, IndianRupee, ChevronLeft, ChevronRight, Hash } from 'lucide-react';

export const AdminAllInvoicesSection = () => {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchInvoices = async () => {
        try {
            setLoading(true);
            const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await axios.get(`${backendUrl}/invoices?page=${page}&limit=10`);
            setInvoices(res.data.invoices);
            setTotalPages(res.data.pages);
        } catch (err) {
            console.error("Failed to fetch invoices", err);
            toast.error("Failed to load invoices");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, [page]);

    const filteredInvoices = invoices.filter(invoice =>
        invoice.receivedFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.receiptNo.includes(searchTerm) ||
        invoice.mobileNo.includes(searchTerm)
    );

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="max-w-8xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">All Invoices</h1>
                        <p className="text-slate-500">View and manage history of all generated receipts</p>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, no, or mobile..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C59D4F]/20 focus:border-[#C59D4F] outline-none w-full md:w-80"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Receipt No</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Recipient</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Mode</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-8 h-8 border-4 border-[#C59D4F] border-t-transparent rounded-full animate-spin"></div>
                                                <span>Loading invoices...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredInvoices.length > 0 ? (
                                    filteredInvoices.map((invoice) => (
                                        <tr key={invoice._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 font-medium text-slate-900">
                                                    <Hash className="w-4 h-4 text-[#C59D4F]" />
                                                    {invoice.receiptNo}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    {new Date(invoice.date).toLocaleDateString('en-GB')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-0.5">
                                                    <div className="font-medium text-slate-900">{invoice.receivedFrom}</div>
                                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Phone className="w-3 h-3" />
                                                        {invoice.phoneCode} {invoice.mobileNo}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-600 truncate max-w-[200px]">
                                                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                                                    {invoice.description}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1 font-semibold text-[#C59D4F]">
                                                    <IndianRupee className="w-4 h-4" />
                                                    {invoice.amount.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${invoice.modeOfPayment === 'UPI' ? 'bg-blue-50 text-blue-600' :
                                                    invoice.modeOfPayment === 'Cash' ? 'bg-green-50 text-green-600' :
                                                        'bg-orange-50 text-orange-600'
                                                    }`}>
                                                    {invoice.modeOfPayment}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                                            No invoices found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <p className="text-sm text-slate-500">
                            Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
