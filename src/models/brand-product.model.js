const mongoose = require("mongoose");

const BrandProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    brand: {
        type: Schema.Types.ObjectId,
        ref: "brand"
    }
});

module.exports = mongoose.model("brand_product", BrandProductSchema);
