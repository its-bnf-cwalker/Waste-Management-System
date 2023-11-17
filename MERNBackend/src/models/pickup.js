const mongoose = require("mongoose")

const PickupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    tel:{
        type: Number,
        required: true,
        unique: true,
    },
    date:{
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
    add:{
        type: String,
        required: true,
        unique:true,
    },
    extra:{
        type: String,
    },
    typewst:{
        type: String,
        required: true,
    },
    approxwt:{
        type: String,
        required: true,
    }
})

const pickup = mongoose.model("pickup", PickupSchema);

module.exports = pickup;


