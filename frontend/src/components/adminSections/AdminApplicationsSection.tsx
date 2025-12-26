import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const AdminApplicationsSection = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const applications = [
        { id: 'BF2024156', date: 'Jan 15, 2024, 10:30 am', priority: 'Medium', priorityClass: 'bg-yellow-100 text-yellow-800', name: 'Priya Sharma', phone: '+91 98765 43210', type: 'Personal Loan', amount: '₹5,00,000', status: 'Under Review', statusClass: 'bg-yellow-100 text-yellow-800', assignee: 'Rajesh Kumar', updated: 'Jan 15, 2024, 02:20 pm' },
        { id: 'BF2024155', date: 'Jan 15, 2024, 08:15 am', priority: 'High', priorityClass: 'bg-red-100 text-red-800', name: 'Amit Patel', phone: '+91 87654 32109', type: 'Business Loan', amount: '₹15,00,000', status: 'Document Pending', statusClass: 'bg-orange-100 text-orange-800', assignee: 'Sunita Devi', updated: 'Jan 15, 2024, 12:45 pm' },
        { id: 'BF2024154', date: 'Jan 14, 2024, 04:45 pm', priority: 'Low', priorityClass: 'bg-green-100 text-green-800', name: 'Sunita Devi', phone: '+91 76543 21098', type: 'Gold Loan', amount: '₹2,50,000', status: 'Approved', statusClass: 'bg-green-100 text-green-800', assignee: 'Amit Singh', updated: 'Jan 15, 2024, 09:30 am' },
        { id: 'BF2024153', date: 'Jan 14, 2024, 02:20 pm', priority: 'High', priorityClass: 'bg-red-100 text-red-800', name: 'Rahul Singh', phone: '+91 65432 10987', type: 'Property Loan', amount: '₹25,00,000', status: 'Under Review', statusClass: 'bg-yellow-100 text-yellow-800', assignee: 'Priya Sharma', updated: 'Jan 15, 2024, 11:15 am' },
        { id: 'BF2024152', date: 'Jan 14, 2024, 11:30 am', priority: 'Low', priorityClass: 'bg-green-100 text-green-800', name: 'Meera Gupta', phone: '+91 54321 09876', type: 'Personal Loan', amount: '₹3,00,000', status: 'Rejected', statusClass: 'bg-red-100 text-red-800', assignee: 'Rajesh Kumar', updated: 'Jan 14, 2024, 05:45 pm' },
    ];

    const toggleAll = () => {
        if (selectedRows.length === applications.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(applications.map(app => app.id));
        }
    };

    const toggleRow = (id: string) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-8 space-y-6"
        >
            {/* PageHeader Inlined */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-slate-900 text-2xl font-bold font-inter">
                        Loan Application Management
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Review and process incoming loan requests
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex-1 sm:flex-none text-slate-700 font-semibold bg-white border border-slate-300 px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center">
                        <i className="ri-download-2-line mr-2"></i>
                        Export Data
                    </button>
                    <button className="flex-1 sm:flex-none text-white font-semibold bg-orange-400 px-5 py-2.5 rounded-lg hover:bg-orange-500 transition-all shadow-sm shadow-orange-200">
                        Bulk Actions
                    </button>
                </div>
            </div>

            {/* FilterSection Inlined */}
            <div className="bg-white border border-gray-200 mt-6 p-6 rounded-xl shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <label className="text-slate-700 text-sm font-semibold block mb-2">Search</label>
                        <div className="relative">
                            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                            <input
                                placeholder="Name, ID, or phone..."
                                type="text"
                                className="w-full border border-gray-300 pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-slate-700 text-sm font-semibold block mb-2">Status</label>
                        <div className="relative">
                            <select className="w-full bg-slate-50 border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none appearance-none cursor-pointer">
                                <option>All Status</option>
                                <option>Under Review</option>
                                <option>Document Pending</option>
                                <option>Approved</option>
                                <option>Rejected</option>
                                <option>Disbursed</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg"></i>
                        </div>
                    </div>
                    <div>
                        <label className="text-slate-700 text-sm font-semibold block mb-2">Loan Type</label>
                        <div className="relative">
                            <select className="w-full bg-slate-50 border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none appearance-none cursor-pointer">
                                <option>All Types</option>
                                <option>Personal Loan</option>
                                <option>Business Loan</option>
                                <option>Property Loan</option>
                                <option>Gold Loan</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg"></i>
                        </div>
                    </div>
                    <div>
                        <label className="text-slate-700 text-sm font-semibold block mb-2">Date Range</label>
                        <div className="relative">
                            <select className="w-full bg-slate-50 border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none appearance-none cursor-pointer">
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last 3 months</option>
                                <option>Custom Range</option>
                            </select>
                            <i className="ri-calendar-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 overflow-hidden rounded-xl shadow-sm">
                {/* TableHeader Inlined */}
                <div className="box-border caret-transparent border-gray-200 p-6 border-b border-solid bg-white">
                    <div className="items-center box-border caret-transparent flex justify-between">
                        <h3 className="text-slate-900 text-lg font-semibold box-border caret-transparent leading-7 font-inter">
                            Applications ({applications.length})
                        </h3>
                    </div>
                </div>

                {/* TableWrapper Inlined */}
                <div className="box-border caret-transparent overflow-x-auto">
                    <table className="caret-transparent w-full border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="box-border caret-transparent align-middle">
                                <th className="font-bold box-border caret-transparent text-left align-middle px-6 py-4">
                                    <input
                                        type="checkbox"
                                        className="accent-slate-900 h-4 w-4 cursor-pointer"
                                        checked={selectedRows.length === applications.length && applications.length > 0}
                                        onChange={toggleAll}
                                    />
                                </th>
                                <th className="text-gray-500 text-xs font-semibold tracking-wider leading-4 text-left uppercase align-middle px-6 py-4">
                                    Application
                                </th>
                                <th className="text-gray-500 text-xs font-semibold tracking-wider leading-4 text-left uppercase align-middle px-6 py-4">
                                    Applicant / Phone
                                </th>
                                <th className="text-gray-500 text-xs font-semibold tracking-wider leading-4 text-left uppercase align-middle px-6 py-4">
                                    Loan Details
                                </th>
                                <th className="text-gray-500 text-xs font-semibold tracking-wider leading-4 text-left uppercase align-middle px-6 py-4">
                                    Status
                                </th>
                                <th className="text-gray-500 text-xs font-semibold tracking-wider leading-4 text-left uppercase align-middle px-6 py-4">
                                    Assigned To
                                </th>
                                <th className="text-gray-500 text-xs font-semibold tracking-wider leading-4 text-left uppercase align-middle px-6 py-4 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applications.map((app, idx) => (
                                <tr key={idx} className={`hover:bg-gray-50 transition-colors ${selectedRows.includes(app.id) ? 'bg-blue-50/30' : ''}`}>
                                    <td className="px-6 py-4 align-middle">
                                        <input
                                            type="checkbox"
                                            className="accent-slate-900 h-4 w-4 cursor-pointer"
                                            checked={selectedRows.includes(app.id)}
                                            onChange={() => toggleRow(app.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-900 text-sm font-semibold">{app.id}</div>
                                        <div className="text-gray-500 text-xs mt-1">{app.date}</div>
                                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-2 ${app.priorityClass}`}>
                                            {app.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-900 text-sm font-medium">{app.name}</div>
                                        <div className="text-gray-500 text-xs mt-1">{app.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-900 text-sm font-medium">{app.type}</div>
                                        <div className="text-slate-900 text-sm font-bold mt-1">{app.amount}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="inline-block">
                                            <select className={`text-xs font-semibold px-3 py-1.5 rounded-full border-none focus:ring-2 focus:ring-slate-900 ${app.statusClass}`}>
                                                <option>Under Review</option>
                                                <option>Document Pending</option>
                                                <option>Approved</option>
                                                <option>Rejected</option>
                                                <option>Disbursed</option>
                                            </select>
                                        </div>
                                        <div className="text-gray-400 text-[10px] mt-2 block">
                                            Last update: {app.updated}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <span className="text-slate-700 text-sm font-medium">{app.assignee}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => navigate(`/admin/applications/${app.id}`)}
                                                title="View Details"
                                                className="p-2 text-slate-600 hover:text-white hover:bg-slate-900 rounded-lg transition-all cursor-pointer"
                                            >
                                                <i className="ri-eye-line text-lg"></i>
                                            </button>
                                            <button title="Edit" className="p-2 text-orange-500 hover:text-white hover:bg-orange-500 rounded-lg transition-all">
                                                <i className="ri-edit-line text-lg"></i>
                                            </button>
                                            <button title="Download Documents" className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all">
                                                <i className="ri-download-line text-lg"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Inlined */}
                <div className="box-border caret-transparent border-gray-200 px-6 py-4 border-t border-solid bg-white">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-gray-700 text-sm box-border caret-transparent leading-5">
                            Showing 1 to 5 of 5 results
                        </div>
                        <div className="items-center box-border caret-transparent flex space-x-2">
                            <button className="text-sm bg-transparent border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                Previous
                            </button>
                            <button className="text-white text-sm bg-slate-900 px-4 py-2 rounded-lg">
                                1
                            </button>
                            <button className="text-sm bg-transparent border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
