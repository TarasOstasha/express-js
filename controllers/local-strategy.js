const log = console.log;
const User = require('../models/user.js');
const passport = require('passport');
//var hash = require('../controllers/crypto/hash');


module.exports = {

  // Здесь мы проверяем, передаем данные о пользователе в функцию верификации, котоую мы определили выше. 
  // Вообще, passport.authenticate() вызывает метод req.logIn автоматически, здесь же я указал это явно. Это добавляет удобство в отладке. Например, можно вставить сюда console.log(), чтобы посмотреть, что происходит...
  // При удачной авторизации данные пользователя будут храниться в req.user

  login: (req, res, next) => {
    //req.body.password = hash(req.body.password)
    //req.body.email = req.body.username;
    passport.authenticate('local',
      (err, user, info) => {
          console.log(err, user, info)
        return err
          ? next(err)
          : user
            ? req.logIn(user, (err) => {
              return err
                ? next(err)
                : res.json({ok: true, user});
            })
            : res.json('no');
      }
    )(req, res, next);
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  }
}

// function okResponse_user(user) {
//     res.json({ok: true, user})
// }

