const express = require('express');
const router = express.Router();
var cors = require('cors');
const fs = require('fs');
const myFs = require('../lib/fs');
const myFilters = require('../lib/filters');
const myRequest = require('../lib/req-func');
var passport = require('passport');
const User = require('../models/user')



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
  console.log(req.a);
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
const lS = require('../controllers/local-strategy').ctr; // !!!!!!!!!
router.post('/login', lS.login); // actual
router.get('/logout', lS.logout);

router.get('/profile',
  //require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    console.log('isAuth', req.isAuthenticated())
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
})

router.get('/*', cors(), (req, res)=>{
  res.redirect('/index.html');
})




module.exports = router;


//show error mesages(this user is exist) in angular
//login with facebook
//remind how to transfer server from angular to express

