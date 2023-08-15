const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    picture:{
        type: String,
    },
    cases: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cases",
    }
},{timestamps: true})

const userModel = mongoose.model("users", UserSchema)

module.exports = userModel