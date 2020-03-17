const express = require('express');
const router = express.Router();
var cors = require('cors');
const fs = require('fs');
const pfs = fs.promises;
const myFs = require('../lib/fs');
const myFilters = require('../lib/filters');
const myRequest = require('../lib/req-func');
var passport = require('passport');
const User = require('../models/user')
const Product = require('../models/product');
const log = console.log
const ContactMessage = require('../models/contact-messages');
const ContactMessageArchive = require('../models/contact-messages-archive');
const Transaction = require('../models/transaction');
const TransactionArchive = require('../models/transaction-archive');
const Chat = require('../models/chat');
const mailer = require('../controllers/mail/mailer');
const bcrypt = require('bcrypt');
const Session = require('../models/session');
var path = require("path");
const PromoCode = require('../models/promo-code');


router.get('/all-users', (req, res, next) => {
  User.find({}, function (err, users) {
      res.send(users);
  });
});


router.get('/user', (req, res, next) => {
  res.send(req.user);
});


router.get('/clean', (req, res, next) => {
  User.remove({}, () => { }); // !!!!!!!!!!!!!!!!!!!!!!
  res.send('clean');
});


router.get('/send-mail', (req, res, next) => {
  mailer.send(
      'Vitaliy <we.js.clan@gmail.com> ', // from
      'shadespiritenator@gmail.com', // to
      'Nodemailer test', // subject
      'Hello Gmail 2- ' + new Date(), // text
  )
  console.dir(req.headers)
  console.dir(req.rawHeaders)
  res.send({ m: 'Hello!' })
});

const cards = [
  {
    productName: 'product1',
    _id: 1,
    img: 'assets/img/sws1.png',
    imgSport: 'assets/img/nike_Logo_White.png',
    fashionLine: 'FAS',
    model: 'Hartbee',
    modelType: 'sport',
    collection: 'Basket Ball Collection',
    size: 'size',
    typeOfSize: [7, 8, 9, 10, 11],
    selectedSize: 8,
    color: 'color',
    colorProducts: ['orange', 'green', 'yellow'],
    selectedColor: 'orange',
    text: 'description',
    price: 1,
    stars: {
      public: 50,
      privite: 35.5
    }
  }
];

router.post('/upload', function (req, res) {
  //console.log('test form route', req.files)
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('public/img/products/filename.jpeg', function (err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
/* GET home page. */
router.get('/', async function (req, res) {
  try {
    const data = await myFs.readFile('./views/includes/header/header.json');
    const header_json = JSON.parse(data);
    const photos = await myFs.readdir('./public/albumes/');
    const filteredPhotos = myFilters.imgFilter(photos);
    res.render('index',
      {
        title: 'myApp',
        header_json,
        photos: filteredPhotos
      }
    );
  } catch (error) { myRequest.errorPage(res, error) };

});

//ensureAuthenticated
// Get aboute us
router.get('/about-us', function (req, res, next) {
  res.render('about-us', { title: 'hello world', list: ['a', 'b'] });
});

router.get('/todos', cors(), function (req, res, next) {
  fs.readFile('task.json', 'UTF-8', (err, todosjSON) => {
    const todos = JSON.parse(todosjSON);
    res.json(todos);
  })
});

router.post('/todos', cors(), function (req, res, next) {
  //console.log(req.a);
  const task = req.body;
  const taskJson = JSON.stringify(task);
  fs.writeFile('task.json', taskJson, (err) => {
    if (err) {
      console.log('error', err)
    } else {
      console.log('succsessfull');
    }
  });
  res.json('ok');
});

//question
router.get('/search', cors(), function (req, res, next) {
  const search = req.query.search;
  //fs.writeFile('product.json', JSON.stringify(cards), ()=>{}); 
  fs.readFile('product.json', 'UTF-8', (err, productjSON) => { //get products
    // console.log(productjSON);
    if (err) {
      console.log(err);
    }
    let product = JSON.parse(productjSON);
    product = product.filter((product) => {
      var patt = new RegExp(search);
      const inTitle = patt.test(product.title);
      //console.log('title', inTitle)
      const inDescription = patt.test(product.text);
      //console.log('descr', inDescription)
      return (inTitle || inDescription)
    });

    res.json(product);
  })
});

router.post('/search', cors(), function (req, res, next) {
  res.json(cards);
});

router.get('/products', cors(), function (req, res, next) {
  //console.log('get product is working')
  Product.find().then((products) => {
    res.json({ ok: true, products: products })
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/product/:id', cors(), function (req, res, next) {
  //console.log(req.params.id);
  const _id = req.params.id;
  Product.findOne({ _id }).then((product) => {
    res.json({ ok: true, product: product })
  }).catch((err) => {
    console.log(err);
  });
});

const successRedirect = '/main';
const failureRedirect = '/auth/login';
const redirects = { successRedirect, failureRedirect }


//
// facebook
// 
router.get(
  '/api/auth/facebook',
  passport.authenticate('facebook'),
  (req, res) => { }
);
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', redirects),
  (req, res) => { }
);

// facebook
// 
//router.get('/api/auth/facebook', passport.authenticate('facebook'), (req, res) => { });
//router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => res.redirect('/'));


  //
// google
//
router.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', redirects),
  (req, res) => { }
);




// router.post('/login', cors(), passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
//   console.log('req body', req.body );
//   console.log('req user', req.user);
//   //res.json('ok');
//   res.redirect('/test');
// });
// router.get('/test', cors(), (req, res)=>{
//   console.log(req.user);
//   res.json(req.user);
// })
///////////////////////////////////////////////////////
//                                                   //
//                   local strategy                  //
//                                                   //
///////////////////////////////////////////////////////

// Auth system
const lS = require('../controllers/local-strategy'); // !!!!!!!!!
router.post('/login', lS.login); // actual
router.get('/logout', lS.logout);

router.get('/profile',
  //require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    //console.log('isAuth', req.isAuthenticated())
    res.render('profile', { user: req.user });
  });

router.get('/login', (req, res) => {
  res.render('login');

})


router.post('/register', cors(), async (req, res) => {
  try {
    const username = req.body.email;
    const user = await User.findOne({ username: username }); // request to data base
    if (user) return res.json({ ok: false, message: 'this user already exist' });

    const new_user = new User({
      role: 'user',
      userName: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    new_user.save()
    res.json({ ok: true })
  } catch (error) {
    console.log(error)
    res.json({ ok: false, message: error })
  }
});



//get all users
router.get('/users', cors(), async (req, res) => {
  try {
    const users = await User.find({}); // request to data base    
    res.json({ ok: true, users })

  } catch (error) {
    res.json({ ok: false, message: error })
  }
});

router.post('/categories', cors(), (req, res) => {
  //console.log(req.body, 'categories from server');
  const categories = req.body;
  const categoiesJson = JSON.stringify(categories);
  fs.writeFile('app-settings/product-categories.json', categoiesJson, (err) => {
    if (err) {
      console.log('error', err)
    } else {
      console.log('succsessfull');
    }
  });
  res.json({ ok: true });

})
router.get('/categories', cors(), function (req, res, next) {
  //console.log('touch route');
  fs.readFile('app-settings/product-categories.json', 'UTF-8', (err, categoriesjSON) => { //get categories
    console.log(categoriesjSON, 'from server');
    if (err) {
      console.log(err);
    }

    let category = JSON.parse(categoriesjSON);


    res.json(category);
  })
});

router.post('/products', cors(), async (req, res) => {
  try {
    //console.log(req.body)
    const product = new Product(req.body);
    await product.save()
    res.json({ ok: true });
  } catch (error) {
    res.json({ ok: false, message: error });
  }

})



//
// upload file
//

router.post('/upload2', async (req, res) => {
  log('Upload');
  try {
    // var-s
    let productId = 'test';
    let load_type = req.body.load_type
    let user_folder = './public/uploads' //+ productId
    let path = user_folder + '/' + req.body.name
    // Logs
    log(req.body)
    // log(`req.body:`.info)
    // log('TYPE '.info, req.body.load_type)
    // create General Folder ?
    if (!fs.existsSync('./public/uploads')) {
      fs.mkdirSync('./public/uploads')
    }
    // create User Folder ?
    if (!fs.existsSync(user_folder)) {
      fs.mkdirSync(user_folder)
    }
    // Algorithm of uploading
    if (load_type == 'new') {
      log('new', path, req.body);
      // Write File
      fs.writeFile(path, req.body.data, 'binary', (err) => {
        log(err, 'this is error')
        if (err) {
          res.json({
            msg: 'error in "upload" - 1 ',
            error: err
          })
          throw err
        }
        else res.json({ msg: 'success' })
      })
    }
    else if (load_type == 'append') {
      log('áppend');
      // Append part of file
      fs.appendFile(path, req.body.data, 'binary', (err) => {
        if (err) {
          res.json({
            msg: 'error in "upload" -2 ',
            error: err
          })
          throw err
        }
        else res.json({ msg: 'success' })
      })
    }
  } catch (err) {
    console.log(err);
    //error(e, req, res, 500, 'Cannot upload file or fragment! ')
  }
})

// user statistic
const viewedProduct = {}
setInterval(async () => {
  for (let id in viewedProduct) {
    // 1) update data base counter
    const product = await Product.findByIdAndUpdate({
      _id: id
    }, {
        $inc: {
          views: viewedProduct[id]
        }
      })
    // clear back end counter
    viewedProduct[id] = 0;
    //console.log(id, viewedProduct[id], product)
  }
}, 1000)
router.post('/user-statistic', cors(), function (req, res, next) {
  const id = req.body.productId;
  if (!viewedProduct[id]) viewedProduct[id] = 1
  else viewedProduct[id]++
  res.json('ok');
});


router.post('/user-voute', cors(), async function (req, res) {
  //console.log('user-voute')
  const voute = req.body;
  //step 1 
  const product = await Product.findOneAndUpdate({
    _id: voute.productId
  }, {
      $pull: {
        "stars.voutes": {
          id: voute.user._id
        }
      }
    })
  let publicCounter = 0;
  // step 2 recalc public voutes
  product.stars.voutes.map((voute) => publicCounter += voute.voute)
  //step 3 
  await Product.findOneAndUpdate({
    _id: voute.productId
  }, {
      "stars.public": publicCounter,
      $push: {
        "stars.voutes": {
          id: voute.user._id,
          voute: voute.voute
        }
      }
    })

  res.json('ok');
})

router.get('/mega-search', cors(), async (req, res) => {
  //req.query.breadCrumbs += ' '; // fixed query string, add space after the last query element
  //console.log('!BREADCRUMBS', req.query.breadCrumbs + '...');
  const breadCrumbs = req.query.breadCrumbs.split(',');
  //console.log('!BREADCRUMBS', breadCrumbs);

  // const proucts = await Product.find({
  //   productName: req.query.keywords
  // })
  //const products = await Product.find({ "productName:": { "$regex": `${req.query.keywords}*` } }) //example, the same like 416 line

  //db.users.find({awards: {$elemMatch: {award:'National Medal', year:1975}}})
  const re = new RegExp(req.query.keywords, "g");
  let DBquery = {}
  DBquery.productName = { $in: [re] } // search exactly value
  if (breadCrumbs[0] !== '') DBquery.breadCrumbs = { "$all": breadCrumbs }  // find method instead $all
  const products = await Product.find(DBquery);
  res.json(products);
})
//save edit product in component ProductComponent
router.put('/edit-product', cors(), async (req, res) => {
  //console.log('SIZES!!!', req.body.sizes)
  const productObj = req.body; // get all product object (state)
  const editedName = productObj.productName; //  get productName from user side
  const editedSize = productObj.sizes; // get sizes array
  const editPrice = productObj.price; // get size
  const editDescription = productObj.description; // get description
  const editColor = productObj.colorProducts; //get new color
  const product = await Product.findByIdAndUpdate(productObj, {
    productName: editedName,
    price: editPrice,
    sizes: editedSize,
    description: editDescription,
    colorProducts: editColor
  }, { new: true });
  //console.log('!!!!!!!!!!product', product, editedSize)
  res.json('okayyy');
})

router.post('/contacts-mail', cors(), async (req, res) => {
  try {
    //console.log('request body from server side', req.body)
    const new_message = new ContactMessage({
      userId: req.body.userId,
      email: req.body.email,
      name: req.body.name,
      subject: req.body.subject,
      message: req.body.message
    });
    new_message.save();
    res.json('ok');
    //res.json({new_message}) // I NEED THIS OBJ GET IN ADMIN-MESSAGES COMPONENT
  } catch (error) {
    console.log(error, 'something went wrong');
    res.json('something went wrong on server');
  }
})

router.get('/admin-notifications', cors(), async (req, res) => {
  try {
    // find method which return quantity of collection mongo DB
    const notificationAmount = await ContactMessage.count();
    const notificationAmountArchive = await ContactMessageArchive.count();
    const transactionAmount = await Transaction.count();
    const unreadMsg = await Chat.find({ isReadManager: undefined });
    const unreadMsgAmount = unreadMsg.length;
    res.json({
      notificationAmount,
      notificationAmountArchive,
      transactionAmount,
      unreadMsgAmount
    });
  } catch (error) {
    console.log(error, 'something went wrong');
    res.json('something went wrong on server');
  }
})

router.get('/admin-messages/:page', cors(), async (req, res) => {
  const page = req.params.page;
  const size = +req.query.size || 30;
  //console.log('size', size);
  const adminMessages = await ContactMessage
    .find({})
    .limit(size)
    .skip(size * page - size); // get chunk of messages
  // console.log(req.params.page);
  res.json({
    adminMessages
  })
})

router.put('/move-to-archive-admin-messages', cors(), async (req, res) => {
  try {
    const _id = req.body._id;
    const adminMessage = await ContactMessage.findOne({ _id });
    const adminMessageArchive = new ContactMessageArchive({
      userId: adminMessage.userId,
      email: adminMessage.email,
      name: adminMessage.name,
      subject: adminMessage.subject,
      message: adminMessage.message
    });
    adminMessageArchive.save();
    await ContactMessage.findByIdAndDelete({ _id });
    //console.log('adminMessage', adminMessage)
    res.json({ adminMessage });
  } catch (error) {
    console.log(error);
    res.json('something went wrong on server');
  }
})

// move from transaction to archive
router.put('/transaction-archive', cors(), async (req, res) => {
  try {
    const _id = req.body._id;
    const transaction = await Transaction.findOne({ _id });
    const transactionArchive = new TransactionArchive({
      _id: transaction._id,
      customerName: transaction.customerName,
      customerEmail: transaction.customerEmail,
      productName: transaction.productName,
      totalPrice: transaction.totalPrice,
      status: transaction.status
    })
    transactionArchive.save();
    await Transaction.findByIdAndDelete({ _id });
    //console.log(transaction, '- transaction');
    res.json({ transaction })
  } catch (error) {
    console.log(error);
    res.json('something went wrong on server');
  }
})

// move from archive transaction back to transaction
router.put('/archive-to-transaction', cors(), async (req, res) => {
  try {
    const _id = req.body._id;
    //console.log(_id);
    const transactionArchive = await TransactionArchive.findOne({ _id });
    const transaction = new Transaction({
      _id: transactionArchive._id,
      customerName: transactionArchive.customerName,
      customerEmail: transactionArchive.customerEmail,
      productName: transactionArchive.productName,
      totalPrice: transactionArchive.totalPrice,
      status: transactionArchive.status
    })
    transaction.save();
    await TransactionArchive.findByIdAndDelete({ _id });
    //console.log(transaction, '- transaction');
    res.json({ transactionArchive })
  } catch (error) {
    console.log(error);
    res.json('something went wrong on server');
  }
})

// admin messages archive
router.get('/admin-messages-archive/:page', cors(), async (req, res) => {
  try {
    const page = req.params.page;
    const size = +req.query.size || 30;
    const adminMessageFromArchive = await ContactMessageArchive.find({}).limit(size).skip(size * page - size);
    res.json({ adminMessageFromArchive })
  } catch (error) {
    console.log(error);
    res.json('something went wrong on server');
  }
})

// transaction archive page
router.get('/admin-transactions-archive/:page', cors(), async (req, res) => {
  try {
    const page = req.params.page;
    const size = +req.query.size || 30;
    const adminTransactionsFromArchive = await TransactionArchive.find({}).limit(size).skip(size * page - size);
    res.json({ adminTransactionsFromArchive })
  } catch (error) {
    console.log(error);
    res.json('something went wrong on server');
  }
})

router.get('/universal-search/:page', cors(), async (req, res) => {
  try {
    const page = req.params.page;
    const size = +req.query.size || 30;
    const queries = req.query;
    const collection = {
      ContactMessageArchive,
      ContactMessage,
      Transaction
    }
    const regularExp = new RegExp(queries.query, "g");
    let DBquery = {
      $or: []
    }
    let fieldsData = queries.fields.split(',');
    fieldsData.forEach((item, index, arr) => {
      DBquery.$or.push({
        [item]: regularExp //using [] fot item to get value from variable
      })
    })
    const documents = await collection[queries.fromModel].find(DBquery).limit(size).skip(size * page - size);
    const amount = await collection[queries.fromModel].find(DBquery).count();
    res.json({ documents, amount });
  } catch (error) {
    console.log(error);
    res.json('something went wrong on server');
  }
})

//leave it fo future
// router.get('/all/:model/:page', cors(), async (req, res)=>{

// })

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_ehdqOsyApE9vD2SR7ZJeAJ8M00ZpRuVV5y');

const calculateOrderAmount = totalPrice => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return +totalPrice * 100;
};
router.post('/payment_intents', async (req, res) => {
  try {
    // 1 step
    let { currency, items, totalPrice } = req.body;
    const transaction = new Transaction(req.body);
    await transaction.save();
    // 2 step
    const paymentIntent = await stripe.paymentIntents.create({ //token
      amount: calculateOrderAmount(totalPrice),
      currency
    });
    await Transaction.findOneAndUpdate({
      _id: transaction._id
    }, {
        status: 'intend (stage 2)',
        paymentIntent // paymentIntent: paymentIntent
      })
    //console.log('paymentIntent', paymentIntent);
    return res.json(paymentIntent);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
// 3 step
router.post('/payment-intense-approve', async (req, res) => {
  try {
    //console.log('payment-intense-approve', req.body)
    const transaction = await Transaction.findOneAndUpdate({
      "paymentIntent.id": req.body.paymentIntend_forStatus.id
    }, {
        status: 'success'
      })
    mailer.send('tdeveloper241@gmail.com', transaction.customerEmail, 'MEGASHOP: Your order has been submitted',
      `
      <p>Your Price is ${transaction.totalPrice}</p>
      <p>Product name is ${transaction.productName}</p>
    `)
    res.json({
      ok: true,
      message: 'Transaction Success'
    });
    //console.log(transaction, 'stage 3!!!!')
  } catch (error) {
    console.log(error)
  }
})
// PAYPAL Approve
router.post('/paypal-approve', async(req, res)=>{
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    mailer.send('garbiche.bucket@gmail.com', transaction.customerEmail, 'ExampleShop: Your order has been submitted',
    `
    <p>Your Price is ${transaction.totalPrice}</p>
    <p>Product name is ${transaction.productName}</p>
  `)
  res.json({
    ok: true,
    message: 'Transaction Success'
  });
  } catch (error) {
    console.log(error)
  }
})

// finger print mechanism
router.post('/session', async (req, res) => {
  try {
    const systemInfo = req.body;
    const random = Math.random();
    const fingerPrint = await bcrypt.hash(systemInfo.appVersion + random, 10);
    const session = new Session({
      //userId: String,
      appVersion: systemInfo.appVersion,
      fingerPrint: fingerPrint,
      random: random,
      ip: req.ip
    })
    session.save();
    res.json({ session: fingerPrint });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

router.get('/session-info', cors(), (req, res) => {
  res.json({ user: req.user })
});

router.get('/get-user-info-if-logged', async (req, res) => {
  try {
    console.log(req.user)
    if(req.user) {
      var user = {
        firstName: req.user.firstName,
        userName: req.user.userName,
        isLogged: true
      }
    } else {
      var user = {
        isLogged: false
      }
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

router.get('/img-urls-slider', async (req, res) => {
  try {
    dataImg = [];
    var files = fs.readdirSync(module.parent.path + '/public/uploads/slider-main-page/');
    // remove system file - .DS_Store
    if(files[0] == '.DS_Store') files.splice(0,1);
    files.map((img) => {
      const currentImg = { img: 'uploads/slider-main-page/' + img }
      dataImg.push(currentImg)
    })
    res.json(dataImg)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})
//promo code
router.post('/create-promo-code', async(req, res)=>{
  try {
    const promo = new PromoCode(req.body).save();
    res.json({ ok : true, promo });
    console.log('promo code')
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})
// promo code params
router.get(['/promo-code/:code', '/promo-code'], async(req,res)=>{
  try {
    const promo = await PromoCode.findOne({
      code: req.params.code
    })
    res.json(  promo )
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})


//redirect all get request to index.html. Must be the last!!!!!!!!!!!!!!!
router.get('/*', async (req, res, next) => {
  console.log('726', req.user, new Date())
  const html = await pfs.readFile('new-front/dist/new-front/index.html');
  res.end(html);
  // res.redirect('/index.html');
});

module.exports = router;



//add messages when payment have been confirmed 

//show error mesages(this user is exist) in angular
//login with facebook
//remind how to transfer server from angular to express

