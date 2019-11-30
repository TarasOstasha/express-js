let mongoose = require('mongoose');

let ContactMessageArchive = mongoose.model('ContactMessageArchive', {
    created: { type: Date, default: Date.now },
    userId: 'string',
    email: 'string',
    name: 'string',
    subject: 'string',
    message: 'string'
})

module.exports = ContactMessageArchive;