const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema({
        sortUser: String,
        username: String,
        email: String,
        password: String,
        walletAmount: {
            type: Number,
            default: 0
        }, 
        tasks:  [],
}, {timestamps: true});


UserSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", UserSchema);
