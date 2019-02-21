var router = require('express').Router();
var User = require('../models/user');

//home
router.get('/',function(req,res){
  res.render('main/home');
});




//error page
router.get('/error',function(req,res,next){
  res.render('accounts/error');
});

//equifax form
// router.get('/equifax', function (req, res, next){
//   res.render('apiforms/FORM47');
// });




//form-page
router.get('/form%20page-user%20fill-details%20needed-report',function(req,res,next){
  res.render('accounts/form-page');
});

module.exports = router;
