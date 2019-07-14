let mongoose = require('mongoose')

let Product = mongoose.model('Product', {
    created: { type: Date, default: Date.now },
    lastChange: { type: Date, default: Date.now },
    productName: String,
    categories: String,
    price: Number,
    description: String,
    img: String,
    imgSport: String,
    // fashionLine: String,
    // model: String,
    // modelType: String,
    // collection: String,
    // size: Number,
    // typeOfSize: Number,
    // selectedSize: Number,
    // color: String,
    // colorProducts: String,
    // selectedColor: String,
    // text: String,
    // price: Number,
    // stars: {
    //   public: Number,
    //   privite: Number
    // }
});


module.exports = Product;








