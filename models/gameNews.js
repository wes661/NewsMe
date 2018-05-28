//Model for articles to be stored
var mongoose = require("mongoose");

var Schema = mongoose.Schema 

var gameArticleSchema = new Schema({

    title: {
        type: String, 
        unique: true,
        required: true
    },

    link:{
        type: String,
        required: true
    },
    
    //relation to comments model
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
    
});

var Article = mongoose.model("Article", gameArticleSchema);

module.exports = Article;