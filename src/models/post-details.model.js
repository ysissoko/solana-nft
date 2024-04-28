const mongoose = require("mongoose");

const ContentSchema = {
    type: String,
    link: String,
    alt: String,
    text: String
};

const PostDetailsSchema = new mongoose.Schema({
    content: [ContentSchema]
});

module.exports = mongoose.model("post_details", PostDetailsSchema);
