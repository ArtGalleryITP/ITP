const Payment = require("../Model/paymentModel");
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/payment-slips/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Only images and PDFs are allowed!');
        }
    }
}).single('paymentSlip');

// @desc    Create a new payment
// @route   POST /api/payments
exports.createPayment = async (req, res) => {
    upload(req, res, async function(err) {
        if (err) {
            return res.status(400).json({ message: err });
        }

        try {
            const { auctionId, fullName, address, date, email, phoneNumber } = req.body;
            
            const payment = new Payment({
                auctionId,
                fullName,
                address,
                date,
                email,
                phoneNumber,
                paymentSlip: req.file ? req.file.path : null
            });

            await payment.save();
            res.status(201).json(payment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

// @desc    Get all payments
// @route   GET /api/payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('auctionId', 'name highestBid')
            .sort({ createdAt: -1 });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get payment by ID
// @route   GET /api/payments/:id
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('auctionId', 'name highestBid');
        
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update payment status
// @route   PUT /api/payments/:id
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete payment
// @route   DELETE /api/payments/:id
exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 