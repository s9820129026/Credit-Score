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




//admin dashboard
router.get('/admin-dashboard',function(req,res,next){
  if(!req.user){
    res.render('accounts/error');
  }else{
  res.render('pages/admin-dashboard',{
        errors: req.flash('errors')
      });
    }
});


//agent dashboard
router.get('/agent-dashboard',function(req,res,next){
  res.render('pages/agent-dashboard',{
        errors: req.flash('errors')
      });
});


//sub agent dashboard
router.get('/sub-agent-dashboard',function(req,res,next){
  res.render('pages/subagent-dashboard',{
        errors: req.flash('errors')
      });
});


module.exports = router;
