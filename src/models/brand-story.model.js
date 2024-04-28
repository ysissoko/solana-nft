const mongoose = require("mongoose");

const BrandStorySchema = new mongoose.Schema({
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "brand"
    },
    image: string,
    swipe_text: String,
    date: {
        type: Date,
        default: Date.now
    },
    publishDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("brand_story", BrandStorySchema);
