const mongoose = require("mongoose");

const userProductsSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    brand_product: { type: Schema.Types.ObjectId, ref: 'brand_product' }
});

module.exports = mongoose.model("user_product", userProductsSchema);
