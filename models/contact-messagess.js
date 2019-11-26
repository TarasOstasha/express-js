let mongoose = require('mongoose');

let ContactMessage = mongoose.model('ContactMessage', {
    created: { type: Date, default: Date.now },
    userId: 'string',
    email: 'string',
    name: 'string',
    subject: 'string',
    message: 'string'
})

module.exports = ContactMessage;