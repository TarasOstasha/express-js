const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'tonyjoss1990@gmail.com',
        pass: 'ostasha19901102'
    },
    connectionTimeout: 1 * 60 * 1000
});

module.exports = {
    send: (from, to, subject, html) => {

        let mailOptions = { from, to, subject, html }

        transporter.sendMail(mailOptions, (err, res) => {
            if (err) console.log('Error: ', err)
            else console.log('Email Sent: ', res)
        })
    }
    //send('tdeveloper241@gmail.com', 'tonyjoss1990@gmail.com', 'important', '<h1>hello world</h1>')
}
