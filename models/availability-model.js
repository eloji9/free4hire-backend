const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
    type: {
        type: String,
        enum: ['cleaner', 'babysitter', 'petsitter', 'personnal driver'],
        required: true,
    },
    adress: {
        type: String
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: "Worker",
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