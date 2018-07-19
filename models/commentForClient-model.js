const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentForClientSchema = new Schema({
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
        ref: "Worker",
        required: true
    },
    forWhom: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    rating: {
        type: Number,
    },
},{
    timestamps: true
});

const CommentForClient = mongoose.model('CommentForClient', commentForClientSchema);


module.exports = CommentForClient;