const { Schema, model} = require('mongoose');
const tokenService = require('../services/token.service');

const userSchema = new Schema ({
  // description of the scheme:
  name: { type: String, trim: true, required:true}, //trim true - cut spaces, require true - required field
  age: {type: Number, default: 18 },
  password:{type: String, required: true},
  email: { type: String, trim: true, lowercase: true, required:true, unique:true}, // lowercase all
  avatar: { type: String, default: ' '},
  cars: {
    type: [Schema.Types.ObjectId],
    ref: 'car',
    select: false
  }
}, {
  // description of the additional options :
  timestamps:true, // add two field : created and updated
  versionKey: false // versionKey show how many times user was updated
});

userSchema.statics = { // for schema // THIS - SCHEMA
  testStatic() {
    console.log('--------------------------------');
    console.log(this);
    console.log('--------------------------------');
  },

  async createUserWithHashPassword(userObject = {}) {
    const hashPassword = await tokenService.hashPassword(userObject.password);

    return this.create({...userObject, password: hashPassword });
  }
};
    
userSchema.methods = { // for single record// THIS - RECORD
  testMethod() {
    console.log('--------------------------------');
    console.log(this);
    console.log('--------------------------------');
  },

  async checkIsPasswordSame(password) {
    await tokenService.comparePasswords(password, this.password);
  }
};

module.exports = model('user', userSchema);
