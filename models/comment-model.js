const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
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
        ref: "User",
        required: true
    },
    forWhom: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
    },
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);


module.exports = Comment;