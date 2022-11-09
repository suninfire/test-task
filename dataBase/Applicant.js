const { Schema, model} = require('mongoose');

const applicantSchema = new Schema ({
  email: { type: String, trim: true, lowercase: true, required:true, unique:true},
  categories: { type: [String], required:true}, //nodejs, angular, javascript, react
  japaneseKnowledge: { type: Boolean, required:true},
  level: { type: String, required:true}, //junior, middle, senior

}, {

  timestamps:true,
  versionKey: false
});


module.exports = model('applicant', applicantSchema);
