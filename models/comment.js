const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },

    dateCreated: { type: Date, required: true },
    dateEdited: { type: Date, required: true },

    title: { type: String, required: true },
    body: { type: String, required: true }
});

CommentSchema.virtual("url").get(function (){
    return "/posts/" + this.post._id + "/comments/" + this._id;
});

module.exports = mongoose.model("Comment", CommentSchema);