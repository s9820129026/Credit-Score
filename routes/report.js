var router = require('express').Router();
var User = require('../models/user');
var AccoutDetails = require('../models/equifaxModels/AccountDetails');
var AccountSummary = require('../models/equifaxModels/AccountSummary');
var Disclaimer = require('../models/equifaxModels/Disclaimer');
var EnquirySummary = require('../models/equifaxModels/EnquirySummary');
var IDAndContactInfo = require('../models/equifaxModels/IDAndContactInfo');
var OtherKeyInd = require('../models/equifaxModels/OtherKeyInd');
var RecentActivities = require('../models/equifaxModels/RecentActivities');
var Score = require('../models/equifaxModels/Score');
var ScoringElements = require('../models/equifaxModels/ScoringElements');
var ReportoNO = require('../api/equifax');
var localStorage = require('node-localstorage');






router.get('/report', function(req, res, next){
  if(!req.user){
    res.render('accounts/error');
  }else{
    var IMPno = localStorage.IMPno;
    console.log(IMPno);
    User
        .findOne({ owner: req.user._id})
        .exec(function (err, foundUser){
            if(err) {
                return next(err);
            }
            AccoutDetails.findOne({ReportOrderNO:IMPno},function(err,accountdetails){
                if (err) return next (err);
                console.log(accountdetails)
            AccountSummary.findOne({ReportOrderNO:IMPno},function(err,accountsummaries){
                if (err) return next (err);

            Disclaimer.findOne({ReportOrderNO:IMPno},function(err,disclaimers){
                if (err) return next (err);

            EnquirySummary.findOne({ReportOrderNO:IMPno},function(err,enquirysummaries){
                if (err) return next (err);

            IDAndContactInfo.findOne({ReportOrderNO:IMPno},function(err,idandcontactinfos){
                if (err) return next (err);

            OtherKeyInd.findOne({ReportOrderNO:IMPno},function(err,otherkeyinds){
                if (err) return next (err);

            RecentActivities.findOne({ReportOrderNO:IMPno},function(err,recentactivities){
                if (err) return next (err);

            Score.findOne({ReportOrderNO:IMPno},function(err,scores){
                if (err) return next (err);

            ScoringElements.findOne({ReportOrderNO:IMPno},function(err,scoringelements){
                if (err) return next (err);


                res.render('accounts/report',{foundUser:foundUser,
                    accountdetails:accountdetails,
                    accountsummaries:accountsummaries,
                    disclaimers:disclaimers,
                    enquirysummaries:enquirysummaries,
                    idandcontactinfos:idandcontactinfos,
                    otherkeyinds:otherkeyinds,
                    recentactivities:recentactivities,
                    scores:scores,
                    scoringelements:scoringelements

            });
            });
            });
            });
            });
            });
            });
            });
            });
        });
    });
  }
});

module.exports = router;
