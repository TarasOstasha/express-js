let mongoose = require('mongoose');

let Session = mongoose.model('session', {
    created: { type: Date, default: Date.now },
    userId: String,
    appVersion: String,
    fingerPrint: String,
    random: String,
    ip: String
})

module.exports = Session;