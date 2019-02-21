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





//agent signup
router.get('/agent%20signup-admin%20rights',function(req,res,next){
  res.render('signup/agent',{
        errors: req.flash('errors')
      });
});


router.post('/agent%20signup-admin%20rights',function(req,res,next){
 agent = req.body;
  var user = new User();
  user.Agent_type = agent.Agent_type;
  user.Agent_name = agent.name;
  user.mobile_number = agent.number;
  user.gender = agent.gender;
  user.location = agent.location;
  user.email = agent.email;
  user.password = agent.password1;
  user.role = agent.role;
  User.findOne({
            email: req.body.email
          },
          function (err, existingUser) {

            if (existingUser) {
              req.flash(
                "errors",
                "Account with that email address already exists"
              );
              return res.redirect("/agent%20signup-admin%20rights");
            }
            else
            {
                user.save(function(err,found)
                {
                    if(err)return(err)
                    console.log(found)
                    res.redirect('/admin-dashboard')
                  });
                }
              });
            });



router.get('/agent%20mon-bill%20signup-admin%20rights',function(req,res,next){
  res.render('signup/agent-monthly',{
        errors: req.flash('errors')
      });
});

router.post('/agent%20mon-bill%20signup-admin%20rights',function(req,res,next){
 agent = req.body;
  var user = new User();
  user.Agent_type = agent.Agent_type;
  user.Agent_name = agent.name;
  user.mobile_number = agent.number;
  user.gender = agent.gender;
  user.location = agent.location;
  user.email = agent.email;
  user.password = agent.password1;
  user.role = agent.role;
  User.findOne({
            email: req.body.email
          },
          function (err, existingUser) {

            if (existingUser) {
              req.flash(
                "errors",
                "Account with that email address already exists"
              );
              return res.redirect("/agent%20mon-bill%20signup-admin%20rights");
            }
            else
            {
                user.save(function(err,found)
                {
                    if(err)return(err)
                    console.log(found)
                    res.redirect('/admin-dashboard')
                  });
                }
              });
            });



module.exports = router;
