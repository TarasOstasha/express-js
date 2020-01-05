let mongoose = require('mongoose');

let session = mongoose.model('session', {
    created: { type: Date, default: Date.now },
    userId: String,
    appVersion: String,
    fingerPrint: String,
    random: String,
    ip: String
})

module.exports = session;