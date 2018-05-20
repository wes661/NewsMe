// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");

// Initialize Express
var app = express();

app.use(express.static("public"));

//Data base info
var databaseUrl = "newsdb";
var collections = ["game_news"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error){
    console.log("Database Error", error);
});

app.get("/", function(req, res){
    res.send("Get request is working!")
});

app.get("/all", function(req, res){
    db.game_news.find({}, function(error, data){
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
             
        // $("div.c-entry-box--compact__image").each(function(i, element){
        //     var image = $(element).children().attr("src");

        //     db.game_news.insert({
        //         "image": image
        //     }, function(err, inserted){
        //         if(err){
        //             console.log(err);
        //         }
        //         else{
        //             console.log(inserted);
        //         }
        //     })
        // })
        $("h2.c-entry-box--compact__title").each(function(i, element){
            var link = $(element).children().attr("href");
            var title = $(element).children().text();

            // console.log(title);
            // console.log(link);
           

            db.game_news.insert({
                "title": title,
                "link": link
            },
            {upsert:true}, 
                function(err, inserted){
                if(err){
                    console.log(err);
                }
                else {
                    console.log(inserted); 
                }
            })
        });
    });
  res.send("Scrape Complete");  
  res.end();

  
});













// Listen on port 8080
app.listen(8080, function() {
    console.log("App running on port 8080!");
  });
  