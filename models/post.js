const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moment = require("moment");

const PostSchema = new Schema({

    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    
    dateCreated: { type: Date, required: true },
    dateEdited: { type: Date, required: true},
    
    title: { type: String, required: true },
    body: { type: String, required: true }
});

PostSchema.virtual("url").get(function (){
    return "/posts/" + this._id;
});

PostSchema.virtual("momentDateEdited").get(function (){ 
    return moment(this.dateEdited).format('LLL'); 
});

PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Post", PostSchema);