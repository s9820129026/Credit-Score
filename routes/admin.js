var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConf = require('../config/passport');
var request = require('request');
const async = require('async');
var path = require('path');
var qs = require("querystring");
var http = require("http");
var randomstring = require("randomstring");
const httpStatus = require('http-status');
const lodash = require("lodash");
const otpService = require("./../core/otpService");



//Admin signup
router.get('/admin%20signup-developer%20rights',function(req,res,next){
  res.render('signup/admin',{
        errors: req.flash('errors')
      });
});

router.post('/admin%20signup-developer%20rights',function(req,res,next){
  var user = new User();
  admin = req.body;
  user.email = admin.email;
  user.password = admin.password;
  User.findOne({
            email: req.body.email
          },
          function (err, existingUser) {

            if (existingUser) {
              req.flash(
                "errors",
                "Account with that email address already exists"
              );
              return res.redirect("/admin%20signup-developer%20rights");
            }
            else
            {
                user.save(function(err,found){
                  if(err)return(err)
                  console.log(found)
                res.redirect('/');
              });
            }
          });
        });



module.exports = router;
