const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    receiptType: { type: String, required: true },
    receiptNo: { type: String, required: true },
    date: { type: Date, default: Date.now },
    countryCode: { type: String, default: 'IN' },
    phoneCode: { type: String, default: '+91' },
    mobileNo: { type: String, required: true },
    receivedFrom: { type: String, required: true },
    description: { type: String, required: true },
    theSumOf: { type: String, required: true },
    amount: { type: Number, required: true },
    modeOfPayment: { type: String, required: true },
    signature: { type: String }, // Store as Base64 string from frontend for now
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
