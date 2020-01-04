let mongoose = require('mongoose');

let chat = mongoose.model('chat', {
    created: { type: Date, default: Date.now },
    userId: 'string',
    text: 'string',
    date: 'string',
    role: 'string',
    img: 'string'
})

module.exports = chat;