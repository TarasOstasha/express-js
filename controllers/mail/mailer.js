const nodemailer = require('nodemailer');
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'tdeveloper241@gmail.com',
        pass: 'december22@'
    },
    connectionTimeout: 1 * 60 * 1000
})
// version 2
// let transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'tdeveloper241@gmail.com',
//         pass: 'december22@'
//     },
//     tls: {
//         rejectUnauthorized: false
//     },
//     connectionTimeout: 1 * 60 * 1000
// })
module.exports = {

send: (from, to, subject, html)=>{

        let mailOptions = { from, to, subject, html }
    
        transporter.sendMail( mailOptions, (err, res) => {
            if (err) console.log('Error: ', err)
            else console.log('Email Sent: ', res)
        })
    }
//send('tdeveloper241@gmail.com', 'tonyjoss1990@gmail.com', 'important', '<h1>hello world</h1>')
}