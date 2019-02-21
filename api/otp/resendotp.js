// var qs = require("querystring");
// var http = require("http");
// var router = require('express').Router();
//
//
// router.post('/#',function(req,res,body){
// var options = {
//   "method": "POST",
//   "hostname": "control.msg91.com",
//   "port": null,
//   "path": "/api/retryotp.php?authkey=&mobile=&retrytype=",
//   "headers": {
//     "content-type": "application/x-www-form-urlencoded"
//   }
// };
//
// var req = http.request(options, function (res) {
//   var chunks = [];
//
//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });
//
//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });
//
// req.write(qs.stringify({}));
// req.end();
// });
//
// module.exports = router;
