const log = console.log;
const User = require('../models/user.js');
const passport = require('passport');
//var hash = require('../controllers/crypto/hash');


module.exports.ctr = {

  // Здесь мы проверяем, передаем данные о пользователе в функцию верификации, котоую мы определили выше. 
  // Вообще, passport.authenticate() вызывает метод req.logIn автоматически, здесь же я указал это явно. Это добавляет удобство в отладке. Например, можно вставить сюда console.log(), чтобы посмотреть, что происходит...
  // При удачной авторизации данные пользователя будут храниться в req.user

  login: (req, res, next) => {
    log('login: ', req.body)
    setTimeout(() => {
      log('****')
      log('****')
      log('****')
      log('req.user', req.isAuthenticated(), req.user)
    }, 2000)

    //req.body.password = hash(req.body.password)
    req.body.email = req.body.username;
    passport.authenticate('local',
      (err, user, info) => {
          console.log(err, user, info)
        return err
          ? next(err)
          : user
            ? req.logIn(user, (err) => {
              return err
                ? next(err)
                : res.json('ok');
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
