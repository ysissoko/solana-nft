const mongoose = require("mongoose");

const NoficationSchema = new mongoose.Schema({
    color: String,
    title: String,
    date: {
        type: Date,
        default: Date.now
    },
    readed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("notification", NoficationSchema);
