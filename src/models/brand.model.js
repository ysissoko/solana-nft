const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    name: String,
    verified: {
        type: Boolean,
        default: false
    },
    avatar: String,
    description: String,
    brand_story: String,
    brand_story_image: String
});

module.exports = mongoose.model("brand", BrandSchema);
