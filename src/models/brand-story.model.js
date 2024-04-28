const mongoose = require("mongoose");

const BrandStorySchema = new mongoose.Schema({
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "brand"
    },
    image: string,
    swipe_text: String
});

module.exports = mongoose.model("brand_story", BrandStorySchema);
