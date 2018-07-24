const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^.+@.+\..+$/
    },
    adress: {
        type: String
    },
    phone:{
        type: String
    },
    role: {
        type: Boolean,
        required: true
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
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);


module.exports = User;