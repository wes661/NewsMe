//Background images for hero banner
var bgArray = ["https://images8.alphacoders.com/710/710329.jpg", "https://pre00.deviantart.net/1cc5/th/pre/f/2015/148/6/6/geralt_andciri_by_astyco-d8v3wgq.png", "https://www.walldevil.com/wallpapers/a79/final-fantasy-wallpaper-children-advent-wallpapers.jpg", "https://cdn.suwalls.com/wallpapers/games/night-game-in-rocket-league-50581-1920x1080.jpg", "https://i.pinimg.com/originals/5c/8b/c0/5c8bc06cd1fb3afe93d02466f823847f.jpg", "https://images5.alphacoders.com/700/700496.jpg", "https://vignette.wikia.nocookie.net/callofduty/images/6/61/Wallpaper_call_of_duty_5_world_at_war.jpg/revision/latest?cb=20110122164150", "https://images2.alphacoders.com/865/thumb-1920-865215.jpg", "https://images2.alphacoders.com/865/thumb-1920-865215.jpg"]
//---------------------------

//Selects random url to be used as background
var randomBg;
function getRandombg(){
    randomBg = bgArray[Math.floor(Math.random()*bgArray.length)]
    $(".gameNews").css("background-image", "url(" + randomBg + ")")
}
//---------------------------

//variable to be referenced for viewing comments and writinf comments
var articleId;




//Main function for displaying all scraped articles as well as comment functions
function displayArticles(articles){
    $(".view").empty()
    articles.forEach(function(info){
        $(".view").append("<div class='block'>" + 
                            "<div class='columns'>" + 
                                "<div class='column is-12 article'>" + 
                                    "<h1>" + info.title + "</h1>" +
                                "<div class='columns'>" + 
                                    "<div class='column is-3'>" + "</div>" + 
                                    "<div class='column is-3'>" +
                                        "<button class='comments button' data-articleid=" + info._id + ">Comments <i class='fa fa-comment'></i></button>"+
                                    "</div>" + 
                                    "<div class='column is-3'>" +
                                        `<a class='link button' href=  ${info.link}  target='_blank'>Full Article <i class='fa fa-file-text'></i></a> 
                                    </div>` + 
                                    "<div class='column is-3'>" + "</div>" +   
                                "</div>" +    
                                "</div>" +                            
                            "</div>" +
                         "</div>" + "<hr>")
    });

    //runs a GET to display the comment modal and any comments on article
    $(".comments").click(function() {
        $("#comments").empty();
        articleId = $(this).attr("data-articleid")
        console.log(articleId);
        $.ajax({
            method: "GET",
            url: "articles/" + articleId
        })
        .then(function(data){
            console.log(data);
            for(let i =0; i<data.comments.length;i++ ){
            $("#comments").prepend(`<div class='commentView'><strong>${data.comments[i].name}</strong> <br> ${data.comments[i].comment}</div>
            <hr>`);
            }
        })
        $(".modal").addClass("is-active");  
    });
    //-----------------------
    
    //closes comment modal
    $(".delete").click(function() {
         $(".modal").removeClass("is-active");
    });
    //-----------------------

    //runs a POST to add new comment to article
      $(".addComment").click(function(){
        console.log(articleId);
        $.ajax({
            method: "POST",
            url: "/articles/" + articleId,
            data: {
                name: $(".commentName").val(),
                comment: $(".commentBody").val()
            }
        })
        .then(function(data){
        $("#comments").empty();
            console.log(data);
            for(let i =0; i<data.comments.length;i++ ){
            $("#comments").prepend(`<div class='commentView'><strong>${data.comments[i].name}</strong> <br> ${data.comments[i].comment}</div>
            <hr>`);
            }
            $(".commentBody").val('');
            $(".commentName").val('');
        })
    })
    //-----------------------
}
//---------------------------


//adds new random background and runs a GET and scrapes for articles then populates articles on page
$(document).ready(function(){
    getRandombg()
    $.get("/scrape", function(data){
        console.log(data);
    })
})
setTimeout(function(){
    console.log("done!");
    $.getJSON("/all", function(articles){
        displayArticles(articles);
    })
},1200);  
//---------------------------



