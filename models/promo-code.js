let mongoose = require('mongoose');

let PromoCode = mongoose.model('PromoCode', {
    created: { type: Date, default: Date.now },
    expired: { type: Date, required: true },
    code: String,
    description: String,
    discount: Number
});


module.exports = PromoCode;