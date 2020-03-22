const express = require("express");

const router = express.Router();
const PORT = 8000;
const app = express();

var cors = require('cors');
const mail = require('./mail');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))




//chunk 2
//data parsing
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use('/', router);



router.post('/email', cors(), (req,res)=>{
    //send email here
    console.log('Data', req.body)
    mail.send( 'tonyjoss1990@gmail.com' , req.body.email, 'Greetings!', `
     <p>
        Thanks for visiting my page. I will reach out to you shortly.
     </p>
    `);
    mail.send(req.body.email, 'tonyjoss1990@gmail.com', 'customer request', `
        <span>${req.body.name}</span><br>
        <span>${req.body.email}</span><br>
        <span>${req.body.phone}</span><br>
        <span>${req.body.proposition}</span>
    `);
    res.json({
        message: 'message received!!!'
    })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});


