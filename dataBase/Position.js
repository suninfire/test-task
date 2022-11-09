const { Schema, model} = require('mongoose');

const positionSchema = new Schema ({
    category: { type: String, required:true, lowercase: true }, //nodejs, angular, javascript, react
    level: { type: String, required:true, lowercase: true }, //junior, middle, senior
    company: { type: String, required:true }, 
    description: { type: String }, 
    japaneseRequired: { type: Boolean, required:true },

}, {

    timestamps:true,
    versionKey: false
});


module.exports = model('position', positionSchema);
