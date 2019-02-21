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




//sub-agent signup
router.get('/sub-agent%20signup-agent%20rights',function(req,res,next){
  res.render('signup/subagent',{
        errors: req.flash('errors')
      });
});


router.post('/sub-agent%20signup-agent%20rights',function(req,res,next){
 agent = req.body;
  var user = new User();
  user.Sub_Agent_Owner = req.user._id;
  user.Sub_Agent_Owner_Type = req.user.role;
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
              return res.redirect("/sub-agent%20signup-agent%20rights");
            }
            else
            {
              user.save(function(err,found)
              {
                if(err)return(err)
                console.log(found)
                res.redirect('/agent-dashboard')
              });
            }
          });
        });




module.exports = router;
