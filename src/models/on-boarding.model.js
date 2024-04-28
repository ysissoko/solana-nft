const mongoose = require("mongoose");

const OnBoardingSchema = new mongoose.Schema({
    title: String,
    image: String,
    describe: String
});

module.exports = mongoose.model("on_boarding", OnBoardingSchema);
