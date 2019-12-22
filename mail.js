var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
//var transporter = nodemailer.createTransport('smtps://tdeveloper241%40gmail.com:december22@@smtp.gmail.com');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'tdeveloper241@gmail.com',
           pass: 'december22@'
       }
   });

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
    to: 'tonyjoss1990@gmail.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});


