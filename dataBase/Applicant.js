const { Schema, model} = require('mongoose');
const {categoryEnum,levelEnum} = require('../constants');

const applicantSchema = new Schema ({
  email: { type: String, trim: true, lowercase: true, required:true, unique:true},
  categories: { type: [String],enum: Object.values(categoryEnum), required:true,trim: true, lowercase: true},
  japaneseKnowledge: { type: Boolean, required:true},
  level: { type: String,enum: Object.values(levelEnum), required:true,trim: true, lowercase: true},

}, {

  timestamps:true,
  versionKey: false
});


module.exports = model('applicant', applicantSchema);
