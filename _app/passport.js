
// .env
//require('dotenv').config()

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
//var GoogleStrategy = require('passport-google-oauth').Strategy;
//import passportGoogle from 'passport-google-oauth'
// var TwitterStrategy = require('passport-twitter').Strategy;
// var GithubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
// var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../models/user.js');
let log = console.log


var config = {
    facebook: {
        clientID: '606330336522613', //process.env.FB_ID,  // '455174914848353',
        clientSecret: '2ac98be6f4897dee347d645f9e537b74', //process.env.FB_KEY, //'30a983716bd55cf5f36e1626fe3b20b8',
        callbackURL: 'http://localhost/auth/facebook/callback'//process.env.FB_CLB // 'http://r4.okm.pub:3600/auth/facebook/callback'
        // callbackURL: `${process.env.HOST}:3600/auth/facebook/callback`
    },
    twitter: {
        consumerKey: 'get_your_own',
        consumerSecret: 'get_your_own',
        callbackURL: "http://127.0.0.1:3600/auth/twitter/callback"
    },
    github: {
        clientID: 'get_your_own',
        clientSecret: 'get_your_own',
        callbackURL: "http://127.0.0.1:3600/auth/github/callback"
    },
    google: {
        clientID: '92005282075-9mhfnmoa0kve9gbhg46vvdpgcsl1ko9j.apps.googleusercontent.com', //process.env.GP_ID, //'706111676047-g5j86f7ipga7ant19ii0shaltrooac36.apps.googleusercontent.com',
        clientSecret: 'sIkzPyHKsbxkHIU6-xsZTbii', //process.env.GP_KEY, //'IdHthb-IWhRRyGtl1K5dNd38',
        // callbackURL: 'http://127.0.0.1:3600/auth/google/callback'
        callbackURL: 'https://tonyjoss.com/auth/google/callback'//process.env.GP_CLB //'http://r4.okm.pub:3600/auth/google/callback'
        // callbackURL: `${process.env.HOST}:3600/auth/google/callback`

    },
    instagram: {
        clientID: 'get_your_own',
        clientSecret: 'get_your_own',
        callbackURL: 'http://127.0.0.1:3600/auth/instagram/callback'
    }
};


//
// serialize and deserialize
//
passport.serializeUser(function (user, done) {
    log('serializeUser: ' + user._id);
    done(null, user._id);
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        log(user)
        if (!err) done(null, user)
        else done(err, null)
    });
})



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
    // clientID: config.google.clientID,
    // clientSecret: config.google.clientSecret,
    // callbackURL: config.google.callbackURL

    clientID: '92005282075-9mhfnmoa0kve9gbhg46vvdpgcsl1ko9j.apps.googleusercontent.com', //process.env.GP_ID, //'706111676047-g5j86f7ipga7ant19ii0shaltrooac36.apps.googleusercontent.com',
    clientSecret: 'sIkzPyHKsbxkHIU6-xsZTbii', //process.env.GP_KEY, //'IdHthb-IWhRRyGtl1K5dNd38',
    // callbackURL: 'http://127.0.0.1:3600/auth/google/callback'
    callbackURL: 'https://tonyjoss.com/auth/google/callback'//process.env.GP_CLB //'http://r4.okm.pub:3600/auth/google/callback'
    // callbackURL: `${process.env.HOST}:3600/auth/google/callback`

},
    function (request, accessToken, refreshToken, profile, done) {
        // log-s
        log('google profile: ', profile)
        // var-s
        var email = ''
        let id = profile.id
        let username = profile.displayName

        User.findOne({ 'google.id': profile.id }, function (err, user) {

            if (err) log(err)

            if (!err && user !== null) {
                done(null, user);
            } else {

                log(profile)

                if (profile.email) email = profile.email

                user = new User()

                user.google.id = id,
                    user.google.username = username,
                    user.google.email = email,
                    user.username = username,
                    user.email = email,
                    user.created = Date.now()
                user.wallets =
                    {
                        USD: {
                            balance: 0
                        }
                    }

                user.save(function (err) {
                    if (err) log(err)
                    else {
                        log("saving user ...");
                        done(null, user);
                    }
                })
            }
        })
    }
))

module.exports = passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
},
    function (accessToken, refreshToken, profile, done) {
        // logs
        log('facebook profile: '.info, profile)
        // var-s
        let email = ''
        let id = profile.id
        let username = profile.displayName

        User.findOne({ 'facebook.id': profile.id }, function (err, user) {

            if (err) log(err)

            if (!err && user !== null) done(null, user)
            else {

                if (profile.email) email = profile.email

                user = new User()

                user.facebook.id = id,
                    user.facebook.username = username,
                    user.facebook.email = email,
                    user.username = username,
                    user.firstName = username,
                    user.email = email,
                    user.created = Date.now()
                user.wallets =
                    {
                        USD: {
                            balance: 0
                        }
                    }

                user.save(function (err) {
                    if (err) log(err)
                    else {
                        log("saving user ...")
                        done(null, user)
                    }
                })

            }
        })
    }
))

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
