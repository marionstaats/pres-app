const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
        amount: Number,
        username: String,
}, {timestamps: true});


module.exports = mongoose.model("Payment", PaymentSchema);
