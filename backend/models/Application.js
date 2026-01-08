const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    applicationId: { type: String, unique: true },
    loanType: { type: String, required: true },
    loanAmount: { type: Number, required: true },
    tenure: { type: Number, required: true },
    purpose: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    pan: { type: String, required: true },
    aadhar: { type: String, required: true },
    gender: { type: String, required: true },
    branch: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    employmentType: { type: String, required: true },
    companyName: { type: String },
    designation: { type: String },
    experience: { type: String },
    income: { type: Number, required: true },
    existingEmi: { type: Number, default: 0 },
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifsc: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Under Review', 'Document Pending', 'Approved', 'Rejected', 'Disbursed'],
        default: 'Under Review'
    },
    assignedTo: { type: String, default: 'Unassigned' },
    documents: [{
        name: String,
        category: String,
        url: String,
        status: { type: String, default: 'Uploaded' },
        date: { type: Date, default: Date.now }
    }],
    notes: [{
        user: String,
        role: String,
        text: String,
        color: String,
        date: { type: Date, default: Date.now }
    }],
    statusHistory: [{
        status: String,
        actor: String,
        description: String,
        date: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

// Pre-save hook to generate tracking ID
applicationSchema.pre('save', async function () {
    if (!this.applicationId) {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const random = Math.floor(1000 + Math.random() * 9000); // 4 digit random
        this.applicationId = `BF${year}${month}${random}`;

        // Initialize status history if empty
        if (this.statusHistory.length === 0) {
            this.statusHistory.push({
                status: 'Under Review',
                actor: 'System',
                description: 'Application submitted and received successfully.',
                date: new Date()
            });
        }
    }
});

module.exports = mongoose.model('Application', applicationSchema);
