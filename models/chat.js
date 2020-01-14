let mongoose = require('mongoose');

let Chat = mongoose.model('chat', {
    created: { type: Date, default: Date.now },
    userId: String,
    text: String,
    session: String,
    date: String,
    role: String,
    img: String,
    isRed: Boolean
})

module.exports = Chat;