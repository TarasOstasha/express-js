
// .env
//require('dotenv').config()

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
//var GoogleStrategy = require('passport-google-oauth').Strategy;
//import passportGoogle from 'passport-google-oauth'
// var TwitterStrategy = require('passport-twitter').Strategy;
// var GithubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
// var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../models/user.js');
let log = console.log
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


//
// serialize and deserialize
//
passport.serializeUser((user, done) => {
    log('serializeUser: ' + user._id);
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        (!err) ? done(null, user) : done(err, null);
    });
})

async function createUser(strategy, profile, done) {

    const newUser = new User({
        userName: profile.displayName,
        created: Date.now(),
        wallets: {
            USD: {
                balance: 0
            }
        }
    });

    if (strategy == 'google') {
        const email = profile.emails[0].value;
        newUser.email = email;
        newUser.google = {
            id: profile.id,
            userName: profile.displayName,
            email: email,
        }
    }

    if (strategy == 'facebook') {
        const email = (profile.email) ? profile.email : '';
        newUser.email = email;
        newUser.facebook = {
            id: profile.id,
            userName: profile.displayName,
            email: email
        }
    }

    await newUser.save();
    done(null, newUser);
    log("USER SAVED !!!");
}

//
// LocalStrategys
//
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (username, password, done) {
    User.findOne({ username: username }, function (err, user) { // request to data base
        return err
            ? done(err)
            : user
                ? password === user.password
                    ? done(null, user)
                    : done(null, false, { message: 'Incorrect password.' })
                : done(null, false, { message: 'Incorrect username.' });
    });
}));

passport.use(new GoogleStrategy({
    clientID: '92005282075-90e7p38q48s6vvq6er9hk92k9jh56tcn.apps.googleusercontent.com',
    clientSecret: 'SATBdfSYF_tMPF65sJIukSxF',
    callbackURL: 'https://tonyjoss.com/auth/google/callback',
    //clientID: process.env.GP_ID, //'706111676047-g5j86f7ipga7ant19ii0shaltrooac36.apps.googleusercontent.com',
    //clientSecret: process.env.GP_KEY, //'IdHthb-IWhRRyGtl1K5dNd38',
    //callbackURL: process.env.GP_CLB, //'http://r4.okm.pub:3600/auth/google/callback'
    passReqToCallback: true
  },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        log('google profile: '.info, profile);
        const user = await User.findOne({ 'google.id': profile.id });
  
        (user)
          ? done(null, user)
          : createUser('google', profile, done);
  
      } catch (error) {
        log(error)
      }
    }
  ))
  
  module.exports = passport.use(new FacebookStrategy({
    clientID: '606330336522613', //process.env.FB_ID,  // '455174914848353',
    clientSecret: '2ac98be6f4897dee347d645f9e537b74', //process.env.FB_KEY, //'30a983716bd55cf5f36e1626fe3b20b8',
    callbackURL: 'https://tonyjoss.com/auth/facebook/callback',//process.env.FB_CLB // 'http://r4.okm.pub:3600/auth/facebook/callback'
    // clientID: process.env.FB_ID,  // '455174914848353',
    // clientSecret: process.env.FB_KEY, //'30a983716bd55cf5f36e1626fe3b20b8',
    // callbackURL: process.env.FB_CLB, // 'http://r4.okm.pub:3600/auth/facebook/callback'
    profileFields: ['id', 'displayName', 'link', 'email', 'name', 'picture.type(large)']
    // passReqToCallback : true,
  },
    async (accessToken, refreshToken, profile, done) => {
      try {
        log('facebook profile: '.info, profile);
        const user = await User.findOne({ 'facebook.id': profile.id });
  
        (user)
          ? done(null, user)
          : createUser('facebook', profile, done);
  
      } catch (error) {
        log(error)
      }
    }
  ))


//////////////////////////
// passport.use(new TwitterStrategy({
//   consumerKey: config.twitter.consumerKey,
//   consumerSecret: config.twitter.consumerSecret,
//   callbackURL: config.twitter.callbackURL
// },
//   function (accessToken, refreshToken, profile, done) {
//     User.findOne({ oauthID: profile.id }, function (err, user) {
//       if (err) {
//         console.log(err);  // handle errors!
//       }
//       if (!err && user !== null) {
//         done(null, user);
//       } else {
//         user = new User({
//           oauthID: profile.id,
//           name: profile.displayName,
//           created: Date.now()
//         });
//         user.save(function (err) {
//           if (err) {
//             console.log(err);  // handle errors!
//           } else {
//             console.log("saving user ...");
//             done(null, user);
//           }
//         });
//       }
//     });
//   }
// ));

// passport.use(new GithubStrategy({
//   clientID: config.github.clientID,
//   clientSecret: config.github.clientSecret,
//   callbackURL: config.github.callbackURL
// },
//   function (accessToken, refreshToken, profile, done) {
//     User.findOne({ oauthID: profile.id }, function (err, user) {
//       if (err) {
//         console.log(err);  // handle errors!
//       }
//       if (!err && user !== null) {
//         done(null, user);
//       } else {
//         user = new User({
//           oauthID: profile.id,
//           name: profile.displayName,
//           created: Date.now()
//         });
//         user.save(function (err) {
//           if (err) {
//             console.log(err);  // handle errors!
//           } else {
//             console.log("saving user ...");
//             done(null, user);
//           }
//         });
//       }
//     });
//   }
// ));




// passport.use(new GoogleStrategy({
//   clientID:     config.google.clientID,
//   clientSecret: config.google.clientSecret,
//   callbackURL:  config.google.callbackURL
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     log('google profile: '.info, profile)

//     User.findOne({ oauthID: profile.id }, function(err, user) {
//       if(err) {
//         console.log(err);  // handle errors!
//       }
//       if (!err && user !== null) {
//         done(null, user);
//       } else {
//         user = new User({
//           oauthID:  profile.id,
//           username: profile.displayName,
//           email:    profile.email,
//           password: 'Not has. Because it Passport registration.',
//           created: Date.now()
//         });
//         user.save(function(err) {
//           if(err) {
//             console.log(err);  // handle errors!
//           } else {
//             console.log("saving user ...");
//             done(null, user);
//           }
//         });
//       }
//     });
//   }
// ));

// passport.use(new InstagramStrategy({
//   clientID: config.instagram.clientID,
//   clientSecret: config.instagram.clientSecret,
//   callbackURL: config.instagram.callbackURL
// },
//   function (accessToken, refreshToken, profile, done) {
//     User.findOne({ oauthID: profile.id }, function (err, user) {
//       if (err) {
//         console.log(err);  // handle errors!
//       }
//       if (!err && user !== null) {
//         done(null, user);
//       } else {
//         user = new User({
//           oauthID: profile.id,
//           name: profile.displayName,
//           created: Date.now()
//         });
//         user.save(function (err) {
//           if (err) {
//             console.log(err);  // handle errors!
//           } else {
//             console.log("saving user ...");
//             done(null, user);
//           }
//         });
//       }
//     });
//   }
// ));
