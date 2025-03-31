const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    username: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    }
},{
    timestamps:true,
})

module.exports = mongoose.model("User", userSchema);