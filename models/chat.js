let mongoose = require('mongoose');

let chat = mongoose.model('chat', {
    created: { type: Date, default: Date.now },
    userId: String,
    text: String,
    session: String,
    date: String,
    role: String,
    img: String
})

module.exports = chat;