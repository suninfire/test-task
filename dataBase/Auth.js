const { Schema, model} = require('mongoose');

const authSchema = new Schema ({
  access_token: {type: String, required: true},
  refresh_token: { type: String, required: true},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps:true, // add two field : created and updated date
  versionKey: false // versionKey show how many times user was updated
});

module.exports = model('auth', authSchema);
