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




//user from sub-Agent_type
router.get('/users%20by%20sub-agent',function(req,res,next){
  res.render('signup/user-sub-agent',{
        errors: req.flash('errors')
      });
});


router.post('/users%20by%20sub-agent',function(req,res,next){
 agent = req.body;
  var user = new User();
  user.User_Owner = req.user._id;
  user.User_Sub_Agent_Owner = req.user.Sub_Agent_Owner;
  user.User_Sub_Agent_Owner_Type = req.user.Sub_Agent_Owner_Type;
  user.Agent_name = agent.name;
  user.mobile_number = agent.number;
  user.gender = agent.gender;
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
              return res.redirect("/users%20by%20sub-agent");
            }
            else
            {
                user.save(function(err,found)
                {
                  if(err)return(err)
                  console.log(found)
                  res.redirect('/sub-agent-dashboard');
                });
              }
            });
          });



module.exports = router;
