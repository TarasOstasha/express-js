let mongoose = require('mongoose')

let Transaction = mongoose.model('Transaction', {
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
});


module.exports = Transaction;








