// Dependencies
var express = require("express");
var logger = require("morgan");
var request = require("request");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");

//Requiring exported models as db
var db = require("./models");

//Port for heoku to use or just use 8080
var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

//Data base info
var databaseUri = "mongodb://localhost/game_news"

if(process.env.MONGODB_URI){
    mongoose.connect(process.env.MONGODB_URI);
}
else{
    mongoose.connect(databaseUri);
}



//
app.get("/all", function(req, res){
    db.Article.find({}, function(error, data){
        if(error) {
            console.log(error);
        }
        else{
            res.json(data);
        }
    })

})

app.get("/scrape", function(req, res){
    request("https://www.theverge.com/games", function(error, response, html){
        var $ = cheerio.load(html);
       
             
        $("h2.c-entry-box--compact__title").each(function(i, element){

            var article = {
                link : $(element).children().attr("href"),
                title : $(element).children().text()
            }

            

            db.Article.create(article)
            .then(function(dbArticle){
                console.log(dbArticle);
            })
            .catch(function(err){
                return res.json(err);
            })
        });
    });
  res.send("Scrape Complete");  
  
});

app.get("/articles/:id", function(req, res){
    db.Article.findOne({_id: req.params.id})
    .populate("comment")
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

app.post("/articles/:id", function(req, res){
    console.log(req.body);
    db.Comment.create(req.body)
    .then(function(dbComment){
        console.log(dbComment);
        return db.Article.findOneAndUpdate(
            {_id: req.params.id}, 
            { commentId: dbComment._id},
            { comment: req.body},
            { new: true});
    })
    .then(function(dbArticle){
        res.json
    })
    .catch(function(err){
        res.json(err);
    });
});













// Listen on port 8080
app.listen(PORT, function() {
    console.log("App running on port" + PORT + "!");
  });
  