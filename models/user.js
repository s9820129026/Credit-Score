var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

/* The user schema attributes / characteristics / fields */
var UserSchema = new Schema({
  Agent_type :String,
  Agent_name : String,
  Sub_Agent : String,
  mobile_number : Number,
  gender:String,
  location:String,
  docs1:String,
  docs2:String,
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String,
  Sub_Agent_Owner :{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  Sub_Agent_Owner_Type:String,
  User_Sub_Agent_Owner :{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  User_Sub_Agent_Owner_Type:String,
  User_Owner :{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  role:String,
  online:String,
});

/*  Hash the password before we even save it to the database */
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/* compare password in the database and the one that the user type in */
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', UserSchema);
