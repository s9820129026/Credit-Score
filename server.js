// requiring a file
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');
var request = require('request');
var async = require('async');
var NodeRSA = require('node-rsa');
const crypto = require('crypto');
const sign = crypto.createSign('RSA-SHA512');
var payumoney = require('payumoney-node');
var path = require('path');
var schedule = require('node-schedule');
// const logger = require('./logger');
var partials = require('express-partials');
var fs = require('fs');
// const expressWinston=require('express-winston');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})



// requiring a js file
var secret = require('./config/secret');
var User = require('./models/user');



// defining a variable
var app = express();
app.use(morgan(':method :url :response-time'))



// connecting a database
mongoose.connect(secret.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});



// Middleware
app.use(partials());
app.use(express.static(__dirname + '/public'));
app.set('apiforms', path.join(__dirname, 'apiforms'));
app.use(morgan('dev'));
app.use(morgan('combined', {stream: accessLogStream}))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new MongoStore({ url: secret.database, autoReconnect: true}),
  cookie: {maxAge:300 * 60 * 1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.session = req.session;
  next();
});




// app.use(cartLength);

app.set('view engine', 'ejs');




// creating a routes defining in variable

var userRoutes = require('./routes/user');
var mainRoutes = require('./routes/main');
var adminRoutes = require('./routes/admin');
var agentRoutes = require('./routes/agent');
var subagentRoutes = require('./routes/subagent');
var usersubagentRoutes = require('./routes/usersubagent');
var otpRoutes = require('./routes/otp');
var dashboardRoutes = require('./routes/dashboard');
var equifaxRoutes = require('./api/equifax');
var reportRoutes = require('./routes/report');

// // // calling use using variable
// app.use(otpRoutes);
app.use(userRoutes);
app.use(mainRoutes);
app.use(adminRoutes);
app.use(agentRoutes);
app.use(subagentRoutes);
app.use(usersubagentRoutes);
app.use(otpRoutes);
app.use(dashboardRoutes);
app.use(equifaxRoutes);
app.use(reportRoutes);


app.use(function(req, res, next){
    res.status(404).render('accounts/error', {title: "Sorry, page not found"});
});




// hosting a server
app.listen(secret.port, function(err) {
  if (err) throw err;
  console.log("Server is Running on port " + secret.port);
});
