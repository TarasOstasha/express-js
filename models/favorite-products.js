let mongoose = require('mongoose')

let Favorites = mongoose.model('Favorites', {
    created: { type: Date, default: Date.now },
    lastChange: { type: Date, default: Date.now },
    productId: String,
    userId: String
});


module.exports = Favorites;