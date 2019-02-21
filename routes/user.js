var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
// var passportConf = require('../config/passport');
var request = require('request');
const async = require('async');
var path = require('path');
var qs = require("querystring");
var http = require("http");
var randomstring = require("randomstring");
const httpStatus = require('http-status');
const lodash = require("lodash");
const otpService = require("./../core/otpService");






//login
router.get('/login', function (req, res) {
  if (req.user) return res.redirect('/');
  res.render('accounts/login', { message: req.flash('loginMessage') });
});


router.post('/login',
        passport.authenticate('local-login', {
            failureRedirect: '/login',
            failureFlash: true
          }),(req,res,user) => {
            User.findOne({ email: req.body.email },async(err,user)=>{
              console.log(user)
                    if(user.role === 'Agent')
                    {
                      user.online = 'true';
                      user.save(function(err,found)
                            {
                        if (err) return next(err);
                          }
                        );
                      res.redirect('/agent-dashboard');

                    }
                    else if(user.role === 'Agent-monthly')
                    {
                        user.online = 'true';
                        user.save(function(err,found)
                        {
                          if (err) return next(err);
                        }
                      );
                    res.redirect('/agent-dashboard');
                    }
                    else if(user.role === 'Sub-Agent')
                    {
                        user.online = 'true';
                        user.save(function(err,found)
                        {
                          if (err) return next(err);
                        }
                      );
                    res.redirect('/sub-agent-dashboard');
                    }
                    else if(user.role === 'User')
                    {
                          user.online = 'true';
                          user.save(function(err,found)
                          {
                            if (err) return next(err);
                          }
                        );
                    res.redirect('/otp-verify');
                    }
                    else
                    {
                    res.redirect('/admin-dashboard');
                    console.log(user)
                    }
                });
              });






//logout
router.get('/logout', function (req, res, next) {
  User.findOne({ email: req.user.email },(err,user)=>{
    console.log(user.role)
  if(user.role === 'Agent'){
    User.findOne({email:req.user.email},function(err,founds){
      founds.online = 'false'
      founds.save(function(err){
        if (err) return next(err);
    });
  });
  req.logout();
  res.redirect('/');
}else if(user.role === 'Agent-monthly'){
    User.findOne({email:req.user.email},function(err,founds){
      founds.online = 'false'
      founds.save(function(err){
        if (err) return next(err);
    });
  });
  req.logout();
  res.redirect('/');
  }else if(user.role === 'Sub-Agent'){
    User.findOne({email:req.user.email},function(err,founds){
      founds.online = 'false'
      founds.save(function(err){
        if (err) return next(err);
    });
  });
  req.logout();
  res.redirect('/');
  }else if(user.role === 'User'){
    User.findOne({email:req.user.email},function(err,founds){
      founds.online = 'false'
      founds.save(function(err){
        if (err) return next(err);
    });
  });
  req.logout();
  res.redirect('/');
  }else{
    req.logout();
    res.redirect('/');
  }
  });




});





module.exports = router;
