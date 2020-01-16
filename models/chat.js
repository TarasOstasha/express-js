let mongoose = require('mongoose');

let Chat = mongoose.model('chat', {
    created: { type: Date, default: Date.now },
    userName: String,
    userId: String,
    text: String,
    session: String,
    date: String,
    role: String,
    img: String,
    isRead: Boolean,
    isReadManager: Boolean,
    isReadClient: Boolean,
})

module.exports = Chat;