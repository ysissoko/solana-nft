const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand"
    },
    date: {
        type: mongoose.Types.ObjectId,
        default: Date.now
    },
    image: String,
    details: { 
        type: mongoose.Types.ObjectId,
        ref: "post_details"
    }
})

module.exports = mongoose.model("post", PostSchema);
