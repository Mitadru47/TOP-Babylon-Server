const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    dateJoined: { type: Date, required: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: { type: String, required: true },

    username: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.virtual("url").get(function (){
    return "/users/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);