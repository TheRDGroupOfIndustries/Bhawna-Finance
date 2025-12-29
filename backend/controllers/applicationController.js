const Application = require('../models/Application');
const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        // Remove spaces from app password if present
        pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s/g, '') : ''
    }
});

// Professional Email Template
const getConfirmationEmailTemplate = (data) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b; }
                .header { background-color: #C59D4F; color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
                .content { background-color: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-radius: 0 0 12px 12px; }
                .app-id { background-color: #fff; border: 2px dashed #C59D4F; padding: 15px; text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold; color: #B38C3D; }
                .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #64748b; }
                .button { background-color: #111F3B; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 20px; font-weight: bold; }
                .details { margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                .detail-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Bhawan Finance</h1>
                    <p>Financial Excellence, Simplified</p>
                </div>
                <div class="content">
                    <h2>Hello ${data.firstName},</h2>
                    <p>Thank you for choosing Bhawan Finance. We've successfully received your application for a <strong>${data.loanType}</strong>.</p>
                    
                    <p>Your application is currently under review by our credit assessment team. You can track your real-time status using the Application ID below:</p>
                    
                    <div class="app-id">${data.applicationId}</div>
                    
                    <center>
                        <a href="https://bhawan-finance.vercel.app/track-application" class="button">Track Your Application Status</a>
                    </center>

                    <div class="details">
                        <h3>Application Summary:</h3>
                        <div class="detail-row"><span>Loan Amount:</span> <strong>₹${data.loanAmount.toLocaleString('en-IN')}</strong></div>
                        <div class="detail-row"><span>Tenure:</span> <strong>${data.tenure} Months</strong></div>
                        <div class="detail-row"><span>Purpose:</span> <strong style="text-transform: capitalize;">${data.purpose.replace(/-/g, ' ')}</strong></div>
                    </div>

                    <p style="margin-top:25px;">Our credit assessment representative will reach out to you within 24-48 business hours for the next steps.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Bhawan Finance Ltd. All rights reserved.</p>
                    <p>This is an automated message, please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

// Submit a new application
exports.submitApplication = async (req, res) => {
    try {
        const newApplication = new Application(req.body);
        const savedApplication = await newApplication.save();

        // Send confirmation email
        try {
            await transporter.sendMail({
                from: '"Bhawan Finance" <no-reply@bhawanfinance.com>',
                to: savedApplication.email,
                subject: `Application Received - ${savedApplication.applicationId}`,
                html: getConfirmationEmailTemplate(savedApplication)
            });
            console.log('Confirmation email sent to:', savedApplication.email);
        } catch (emailError) {
            console.error('Email sending failed:', emailError.message);
            // We don't fail the request if email fails, but we log it
        }

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: {
                applicationId: savedApplication.applicationId,
                _id: savedApplication._id
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error submitting application',
            error: error.message
        });
    }
};

// Track application status
exports.trackApplication = async (req, res) => {
    try {
        const { applicationId, phone } = req.body;

        if (!applicationId || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Application ID and Phone number are required'
            });
        }

        const application = await Application.findOne({
            applicationId: applicationId.toUpperCase().trim(),
            phone: phone.trim()
        });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'No application found with the provided details'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                applicationId: application.applicationId,
                firstName: application.firstName,
                lastName: application.lastName,
                loanType: application.loanType,
                loanAmount: application.loanAmount,
                status: application.status,
                statusHistory: application.statusHistory,
                createdAt: application.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error tracking application',
            error: error.message
        });
    }
};

// Get all applications (Admin)
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching applications',
            error: error.message
        });
    }
};

// Get application stats (Admin Dashboard)
exports.getApplicationStats = async (req, res) => {
    try {
        const stats = await Application.aggregate([
            {
                $group: {
                    _id: null,
                    totalApplications: { $sum: 1 },
                    totalAmount: { $sum: '$loanAmount' },
                    approvedCount: {
                        $sum: { $cond: [{ $eq: ['$status', 'Approved'] }, 1, 0] }
                    },
                    pendingCount: {
                        $sum: { $cond: [{ $eq: ['$status', 'Under Review'] }, 1, 0] }
                    }
                }
            }
        ]);

        const recentApplications = await Application.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            data: {
                summary: stats[0] || { totalApplications: 0, totalAmount: 0, approvedCount: 0, pendingCount: 0 },
                recentApplications
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching stats',
            error: error.message
        });
    }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, remarks } = req.body;

        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Add to history
        application.statusHistory.push({
            status,
            actor: 'Admin', // In a real app, this would be the logged-in user
            description: remarks || `Status changed to ${status}`,
            date: new Date()
        });

        application.status = status;
        const updatedApplication = await application.save();

        res.status(200).json({
            success: true,
            message: 'Status updated successfully',
            data: updatedApplication
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating status',
            error: error.message
        });
    }
};

// Add internal note
exports.addNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, role, user, color } = req.body;

        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        application.notes.push({
            user: user || 'Admin User',
            role: role || 'General',
            text,
            color: color || 'bg-slate-600',
            date: new Date()
        });

        const updatedApplication = await application.save();

        res.status(200).json({
            success: true,
            message: 'Note added successfully',
            data: updatedApplication
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error adding note',
            error: error.message
        });
    }
};

// Get single application detail
exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }
        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error fetching application details',
            error: error.message
        });
    }
};
