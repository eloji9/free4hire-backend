const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    encryptedPassword: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^.+@.+\..+$/
    },
    image: {
        type: String,
        required:true,
        default: 'http://icons.iconarchive.com/icons/mahm0udwally/all-flat/256/User-icon.png'
    },
    adress: {type: String},
    phone:{type: String},
    role: {
        type: String,
        enum: ['client', 'worker'],
        required: true,
    },
    missions:[{
        type: Schema.Types.ObjectId,
        ref: "Mission",
    }],
    comments:[{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
    rating: {
        type: Number,
    },
    availabilities: [{
        type: Schema.Types.ObjectId,
        ref: "Availability",
    }],
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);


module.exports = User;