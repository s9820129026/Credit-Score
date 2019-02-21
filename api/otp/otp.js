// var http = require("http");
// var router = require('express').Router();
// var User = require('../../models/user');
//
//
//
// router.post('/verification',function(req,res,body){
//
// var options = {
//   "method": "POST",
//   "hostname": "control.msg91.com",
//   "port": null,
//   "path": "/api/sendotp.php?authkey=220921Aco6Higalj5b25fbaa&sender=CreditKundali&mobile=(user.number)",
//   "headers": {}
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
//
// req.end();
// });
//
//
// module.exports = router;
