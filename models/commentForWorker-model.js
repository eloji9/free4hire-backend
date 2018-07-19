const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentForWorkerSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    forWhom: {
        type: Schema.Types.ObjectId,
        ref: "Worker",
        required: true
    },
    rating: {
        type: Number,
    },
},{
    timestamps: true
});

const CommentForWorker = mongoose.model('CommentForWorker', commentForWorkerSchema);


module.exports = CommentForWorker;