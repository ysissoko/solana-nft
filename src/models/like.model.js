const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("like", LikeSchema);

