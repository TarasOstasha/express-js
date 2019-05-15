const express = require('express');
const router = express.Router();
const fs = require('fs');
const myFs = require('../lib/fs');
const myFilters = require('../lib/filters');
const myRequest = require('../lib/req-func');



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


// Get aboute us
router.get('/about-us', function (req, res, next) {
  res.render('about-us', { title: 'hello world', list: ['a', 'b'] });
});
const todos = [
      {
        'id': 1,
        'title': 'to do my home work',
        'completed': false,
        'editing': false
      },
      {
        'id': 2,
        'title': 'to do my exersises',
        'completed': false,
        'editing': false
      },
      {
        'id': 3,
        'title': 'to do my lundry',
        'completed': false,
        'editing': false
      },
    ]
router.get('/todos', function (req, res, next) {
  res.json(todos);
});



module.exports = router;


