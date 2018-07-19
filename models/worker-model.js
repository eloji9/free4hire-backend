const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workerSchema = new Schema({
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
    availabilities: [{
        type: Schema.Types.ObjectId,
        ref: "Availability",
    }],
    missions:[{
        type: Schema.Types.ObjectId,
        ref: "Mission",
    }],
    comments:[{
        type: Schema.Types.ObjectId,
        ref: "CommentForWorker",
    }],
    rating: [{
        type: Number,
    }],
},{
    timestamps: true
});

const Worker = mongoose.model('Worker', workerSchema);


module.exports = Worker;