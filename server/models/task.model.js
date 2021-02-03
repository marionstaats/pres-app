const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
        //User & shopper
        username: { type: String, required: true },
        shopperId: { type: String },
        pickedup: { type: Boolean, default: false },
        completed: { type: Boolean, default: false },

        //Mandatory info
        relationship: { type: String, required: true, trim: true },
        nameReceiver: { type: String, required: true, trim: true },
        genderReceiver: { type: String, required: true },
        occasion: { type: String, trim: true },
        dateDelivery: { type: Date, required: true },
        placeDelivery: { type: String, required: true, trim: true },
        budget: { type: Number, required: true },

        //Sliders/radiobutton:
        approvalNeeded: { type: Boolean, default: true },
        wrapped: { type: Boolean, default: true },
        acceptAnyUser: { type: Boolean, default: false },
        postcard: { type: Boolean, default: false },

        //Optional:
        suggestions: { type: String, trim: true },
        notBuy: { type: String, trim: true },
        interestsReceiver: { type: String, trim: true },
        note: { type: String }
    }, { timestamps: true }

);

module.exports = mongoose.model("Task", TaskSchema);