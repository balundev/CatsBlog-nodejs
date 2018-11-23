const mongoose = require("mongoose");

/// comment schema
const commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);