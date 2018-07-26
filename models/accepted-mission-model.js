const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const acceptedMissionSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: "Mission",
        required: true,
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: "Mission",
        required: true,
    },
    clientValidation:{
        type: Boolean,
        default: false
    },
    workerValidation:{
        type: Boolean,
        default: false
    },
},{
    timestamps: true
});

const ValidateMission = mongoose.model("ValidateMission", acceptedMissionSchema);

module.exports = ValidateMission;