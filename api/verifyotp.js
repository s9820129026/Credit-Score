var qs = require("querystring");
var http = require("http");
var router = require('express').Router();
var User = require('../models/user');





router.post('/verify', function(req, res, next){
      var otp = new Otp();
      otp.otpowner = req.user._id;
      otp.otp = req.body.otpverify;
      otp.save(function(err){
        if (err) return next  (err);
      });
     User.findOne({ email: req.body.email }, function (err, ok) {
      if (err) return next(err);

      Otp.findOne({otpowner: req.user._id}, function (err, oh){

        if (err) return next (err);
        var num = user.number;
        var otp = otp.otp;
var options = {
  "method": "POST",
  "hostname": "control.msg91.com",
  "port": null,
  "path": "/api/verifyRequestOTP.php?authkey=220921Aco6Higalj5b25fbaa&mobile=" +num+"&otp=" +otp,
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});
res.redirect ('/form-page');
req.write(qs.stringify({}));

req.end();

      });
     });
});

module.exports = router;
