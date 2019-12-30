let mongoose = require('mongoose');

let TransactionArchive = mongoose.model('TransactionArchive', {
    created: { type: Date, default: Date.now },
    lastChange: { type: Date, default: Date.now },
    totalPrice: Number,
    items: [],
    currency: String,
    businessName: String,
    productName: String,
    customerEmail: String,
    customerName: String,
    status: { type: String, default: 'intend' },
    paymentIntent: {}
}) 

module.exports = TransactionArchive;