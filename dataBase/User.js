const { Schema, model} = require('mongoose');

const userSchema = new Schema ({
    // description of the scheme:
    name: { type: String, trim: true, required:true},  //trim true - cut spaces, require true - required field
    age: {type: Number, default: 18 },
    email: { type: String, trim: true, lowercase: true, required:true, unique:true},  // lowercase all
    cars: {
        type: [Schema.Types.ObjectId],
        ref: 'car',
        select: false
    }
}, {
    // description of the additional options :
    timestamps:true, // add two field : created and updated
    versionKey: false // versionKey show how many times user was updated
})

module.exports = model('user', userSchema);
