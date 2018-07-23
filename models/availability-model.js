const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
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
},{
    timestamps: true
});

const Availability = mongoose.model('Availability', availabilitySchema);


module.exports = Availability;