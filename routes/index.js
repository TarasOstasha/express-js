const express = require('express');
const router = express.Router();
var cors = require('cors');
const fs = require('fs');
const myFs = require('../lib/fs');
const myFilters = require('../lib/filters');
const myRequest = require('../lib/req-func');
var passport = require('passport');
const User = require('../models/user')
const Product = require('../models/product');
const log = console.log


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
  console.log('test form route', req.files)
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
// const todos = [
//       {
//         'id': 1,
//         'title': 'to do my home work',
//         'completed': false,
//         'editing': false
//       },
//       {
//         'id': 2,
//         'title': 'to do my exersises',
//         'completed': false,
//         'editing': false
//       },
//       {
//         'id': 3,
//         'title': 'to do my lundry',
//         'completed': false,
//         'editing': false
//       },
//     ]
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



// facebook
// 
router.get('/api/auth/facebook', passport.authenticate('facebook'), (req, res) => { });
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => res.redirect('/'));









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
      username: req.body.email,
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

router.get('/session-info', cors(), (req, res) => {
  res.json({ user: req.user })
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
    let user_folder = './public/uploads/' //+ productId
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
  console.log('user-voute')
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
  DBquery.productName = { $in: [ re ] } // search exactly value
  if(breadCrumbs[0] !== '') DBquery.breadCrumbs = { "$all": breadCrumbs }  // find method instead $all
  const products = await Product.find(DBquery);
  res.json(products);
})
//save edit product in component ProductComponent
router.put('/edit-product', cors(), async (req, res) => {
  console.log('SIZES!!!', req.body.sizes)
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
  console.log('!!!!!!!!!!product', product, editedSize)
  res.json('okayyy');
})

//redirect all get request to index.html. Must be the last!!!!!!!!!!!!!!!
router.get('/*', cors(), (req, res) => {
  res.redirect('/index.html');
});



module.exports = router;


//show error mesages(this user is exist) in angular
//login with facebook
//remind how to transfer server from angular to express

