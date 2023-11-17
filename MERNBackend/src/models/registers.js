const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
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
    password:{
        type: String,
        required: true,

    },
    confirmpassword:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
},
{timestamps: true}
)

const Register = mongoose.model("register", UserSchema);

module.exports = Register;



