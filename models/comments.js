var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    name: String,
    comment: String
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;