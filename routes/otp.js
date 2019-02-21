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





//get-otpverify
router.post('/get-otp',async (req, res) => {
  const mobilelogin = req.body.number;
await otpService.sendSMSOTP("+91", mobilelogin);
res.redirect("/otp-verify");
});




//verify-otp
router.get('/otp-verify',function(req,res,next){
  if(!req.user){
    res.render('accounts/error');
  }else{
  User.findOne({
    _id: req.user._id
  },
  function (err, user) {
    if (err) return next(err);

    const viewData = {
      user: user,
      message: req.flash("verifyMessage")
    };
  res.render('accounts/otp-verify',{viewData});
    }
  );
}
});

router.post('/otp-verify',function(req,res,next){
User.findOne({
  _id:req.user._id
},
function(err,user){
  if (err) return (err)
var Phone_number = user.mobile_number;
var otp = req.body.otpverify;
  otpService
    .veryfySMSOTP("+91", Phone_number, otp)
    .then(response => {
      switch (response.message) {
        case "otp_verified":
          if (req.session.inChangePAssword) {
            res.redirect("/chnage-password");
            res.end();
          } else {
            if(user.User_Sub_Agent_Owner_Type == 'Agent-monthly'){
              res.redirect('/')
            }
            res.redirect("/form%20page-user%20fill-details%20needed-report");
            res.end();
          }
          break;

        case "already_verified":
          res.redirect("/form%20page-user%20fill-details%20needed-report");
          res.end();
          break;

        case "otp_not_verified":
          req.flash("verifyMessage", "Wrong OTP");
          res.redirect("/otp-verify");
          res.end();
          break;

        case "invalid_otp":
          req.flash("verifyMessage", "Wrong OTP");
          res.redirect("/otp-verify");
          res.end();
          break;

        default:
          req.flash("verifyMessage", "Wrong OTP");
          res.redirect("/otp-verify");
          res.end();
          break;
      }
    })
    .catch(err => {
      req.flash("verifyMessage", "varification fail");
      res.redirect("/otp-verify");
      res.end();
    });
  });
});



module.exports = router;
