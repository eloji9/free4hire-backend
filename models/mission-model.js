const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const missionSchema = new Schema({
    type: {
        type: String,
        enum: ['cleaner', 'babysitter', 'petsitter', 'personnal driver'],
        required: true,
    },
    adress: {
        string: { type: String },
        lat: { type: Number },
        long: { type: Number }
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    price:{
        type: Number,
        required: true,
    }
},{
    timestamps: true
});

const Mission = mongoose.model('Mission', missionSchema);


module.exports = Mission;