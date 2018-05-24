// Dependencies
var express = require("express");
// var mongojs = require("mongojs");
var logger = require("morgan");
var request = require("request");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");

var db = require("./models")

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

// var databaseUrl = "newsdb";
// var collections = ["game_news"];

// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error){
//     console.log("Database Error", error);
// });

app.get("/", function(req, res){
    res.send("Get request is working!")
});

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
        // console.log(html);
             
        $("h2.c-entry-box--compact__title").each(function(i, element){

            var article = {
                link : $(element).children().attr("href"),
                title : $(element).children().text()
            }

            // console.log(title);
            // console.log(link);
            

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













// Listen on port 8080
app.listen(PORT, function() {
    console.log("App running on port" + PORT + "!");
  });
  