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
    fashionLine: String,
    model: String,
    modelType: String,
    _collection: String,
    size: Number,
    typeOfSize: [],
    selectedSize: Number,
    color: String,
    colorProducts: [],
    selectedColor: String,
    text: String,
    price: Number,
    stars: {
      public: Number,
      private: Number
    }
});


module.exports = Product;








