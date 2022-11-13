const { Schema, model} = require('mongoose');
const {categoryEnum, levelEnum} = require('../constants');

const positionSchema = new Schema ({
  category: { type: String,enum: Object.values(categoryEnum), required:true, lowercase: true, trim: true },
  level: { type: String, required:true, lowercase: true, enum: Object.values(levelEnum), trim: true },
  company: { type: String, required:true }, 
  description: { type: String }, 
  japaneseRequired: { type: Boolean, required:true },

}, {

  timestamps:true,
  versionKey: false
});


module.exports = model('position', positionSchema);
