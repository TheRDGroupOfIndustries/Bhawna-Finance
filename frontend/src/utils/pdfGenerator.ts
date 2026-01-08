import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/logo.png";

export const generateApplicationPDF = (app: any) => {
    const doc = new jsPDF();
    const title = "Loan Application";
    const date = new Date().toLocaleDateString();

    // Add Logo
    // Center logo: (210 - 20) / 2 = 95
    doc.addImage(logo, 'PNG', 95, 5, 20, 20);

    // Set header
    doc.setFontSize(20);
    doc.setTextColor(197, 157, 79); // #C59D4F
    doc.text("BHAWAN FINANCE", 105, 32, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(51, 51, 51);
    doc.text(title, 105, 42, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${date}`, 105, 49, { align: "center" });

    // Horizontal Line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 54, 190, 54);

    // Basic Information Table
    const basicInfo = [
        ["Application ID", app.applicationId || app._id],
        ["Current Status", app.status],
        ["Submission Date", new Date(app.createdAt).toLocaleString()],
        ["Assigned To", app.assignedTo || "Unassigned"],
    ];

    autoTable(doc, {
        startY: 62,
        head: [["Field", "Value"]],
        body: basicInfo,
        theme: "striped",
        headStyles: { fillColor: [197, 157, 79] },
        margin: { left: 20, right: 20 },
    });

    // Applicant Details Table
    const applicantInfo = [
        ["Full Name", `${app.firstName} ${app.lastName}`],
        ["Email", app.email],
        ["Phone", app.phone],
        ["Date of Birth", app.dob ? new Date(app.dob).toLocaleDateString() : "N/A"],
        ["Gender", app.gender || "N/A"],
        ["Branch", app.branch || "N/A"],
        ["PAN Number", app.pan || "N/A"],
        ["Aadhar Number", app.aadhar || "N/A"],
    ];

    doc.setFontSize(14);
    doc.setTextColor(51, 51, 51);
    doc.text("Applicant Details", 20, (doc as any).lastAutoTable.finalY + 15);

    autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [["Field", "Value"]],
        body: applicantInfo,
        theme: "grid",
        headStyles: { fillColor: [51, 51, 51] },
        margin: { left: 20, right: 20 },
    });

    // Address Details
    const addressInfo = [
        ["Address", app.address || "N/A"],
        ["City", app.city || "N/A"],
        ["State", app.state || "N/A"],
        ["PIN Code", app.pinCode || "N/A"],
    ];

    doc.setFontSize(14);
    doc.text("Address Information", 20, (doc as any).lastAutoTable.finalY + 15);

    autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [["Region", "Details"]],
        body: addressInfo,
        theme: "striped",
        headStyles: { fillColor: [197, 157, 79] },
        margin: { left: 20, right: 20 },
    });

    // Loan & Employment Details Table
    const loanInfo = [
        ["Loan Type", app.loanType],
        ["Loan Amount", `INR ${new Intl.NumberFormat("en-IN").format(app.loanAmount)}`],
        ["Tenure", `${app.tenure} Months`],
        ["Employment Type", app.employmentType],
        ["Company Name", app.companyName || "N/A"],
        ["Designation", app.designation || "N/A"],
        ["Monthly Income", `INR ${new Intl.NumberFormat("en-IN").format(app.income)}`],
        ["Existing EMI", `INR ${new Intl.NumberFormat("en-IN").format(app.existingEmi || 0)}`],
        ["Purpose", app.purpose || "N/A"],
    ];

    doc.setFontSize(14);
    doc.text("Loan & Occupation", 20, (doc as any).lastAutoTable.finalY + 15);

    autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [["Loan Parameter", "Details"]],
        body: loanInfo,
        theme: "grid",
        headStyles: { fillColor: [51, 51, 51] },
        margin: { left: 20, right: 20 },
    });

    // Banking Details
    const bankingInfo = [
        ["Bank Name", app.bankName || "N/A"],
        ["Account Number", app.accountNumber || "N/A"],
        ["IFSC Code", app.ifsc || "N/A"],
    ];

    doc.setFontSize(14);
    doc.text("Banking Information", 20, (doc as any).lastAutoTable.finalY + 15);

    autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [["Field", "Value"]],
        body: bankingInfo,
        theme: "striped",
        headStyles: { fillColor: [197, 157, 79] },
        margin: { left: 20, right: 20 },
    });

    // Uploaded Documents
    if (app.documents && app.documents.length > 0) {
        doc.addPage();
        doc.setFontSize(16);
        doc.text("Uploaded Documents", 105, 20, { align: "center" });

        const docBody = app.documents.map((d: any) => [
            d.name,
            d.category,
            d.status,
            new Date(d.date).toLocaleDateString()
        ]);

        autoTable(doc, {
            startY: 30,
            head: [["Name", "Category", "Status", "Date"]],
            body: docBody,
            theme: "grid",
            headStyles: { fillColor: [51, 51, 51] },
            margin: { left: 20, right: 20 },
        });
    }

    // Internal Notes
    if (app.notes && app.notes.length > 0) {
        doc.setFontSize(16);
        doc.text("Internal Notes", 20, (doc as any).lastAutoTable.finalY + 15);

        const notesBody = app.notes.map((n: any) => [
            `${n.role} (${n.user || "N/A"})`,
            n.text,
            new Date(n.date).toLocaleString()
        ]);

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 20,
            head: [["Author", "Note", "Date"]],
            body: notesBody,
            theme: "striped",
            headStyles: { fillColor: [197, 157, 79] },
            styles: { cellPadding: 5 },
            columnStyles: { 1: { cellWidth: 100 } },
            margin: { left: 20, right: 20 },
        });
    }

    // Status History
    if (app.statusHistory && app.statusHistory.length > 0) {
        if ((doc as any).lastAutoTable.finalY > 200) doc.addPage();
        else doc.text("", 20, (doc as any).lastAutoTable.finalY + 15);

        doc.setFontSize(16);
        doc.text("Status History Timeline", 105, (doc as any).lastAutoTable.finalY + 10, { align: "center" });

        const historyBody = app.statusHistory.map((h: any) => [
            new Date(h.date).toLocaleString(),
            h.status,
            h.description || "N/A",
            h.actor || "System"
        ]);

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 15,
            head: [["Date", "Status", "Description", "Actor"]],
            body: historyBody,
            theme: "grid",
            headStyles: { fillColor: [51, 51, 51] },
            margin: { left: 20, right: 20 },
        });
    }

    // Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: "center" });
        doc.text("Bhawan Finance - Confidential", 105, 290, { align: "center" });
    }

    doc.save(`Application_${app.applicationId || app._id}.pdf`);
};
