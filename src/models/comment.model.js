const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now
    },
    body: String
});

module.exports = mongoose.model("comment", CommentSchema);
