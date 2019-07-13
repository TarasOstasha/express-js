let mongoose = require('mongoose')

let Product = mongoose.model('Product', {
    created: { type: Date, default: Date.now },
    lastChange: { type: Date, default: Date.now },
    productName: String,
    categories: String,
    price: Number,
    description: String
});


module.exports = Product;








