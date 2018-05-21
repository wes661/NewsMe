
var bgArray = ["https://images8.alphacoders.com/710/710329.jpg", "https://pre00.deviantart.net/1cc5/th/pre/f/2015/148/6/6/geralt_andciri_by_astyco-d8v3wgq.png", "https://www.walldevil.com/wallpapers/a79/final-fantasy-wallpaper-children-advent-wallpapers.jpg", "https://cdn.suwalls.com/wallpapers/games/night-game-in-rocket-league-50581-1920x1080.jpg", "https://i.pinimg.com/originals/5c/8b/c0/5c8bc06cd1fb3afe93d02466f823847f.jpg", "https://images5.alphacoders.com/700/700496.jpg", "https://vignette.wikia.nocookie.net/callofduty/images/6/61/Wallpaper_call_of_duty_5_world_at_war.jpg/revision/latest?cb=20110122164150", "https://images2.alphacoders.com/865/thumb-1920-865215.jpg", "https://images2.alphacoders.com/865/thumb-1920-865215.jpg"]

var randomBg;



function getRandombg(){
    randomBg = bgArray[Math.floor(Math.random()*bgArray.length)]
    $(".gameNews").css("background-image", "url(" + randomBg + ")")
}

function displayNews(news){
    $(".view").empty()

    news.forEach(function(info){
        $(".view").append("<div class='block'>" + 
                            "<div class='columns'>" + 
                                "<div class='column is-12 article'>" + 
                                    "<h1>" + info.title + "</h1>" +
                                "<div class='columns'>" + 
                                    "<div class='column is-3'>" + "</div>" + 
                                    "<div class='column is-3'>" +
                                        "<button class='comments button'" + ">Comments <i class='fa fa-comment'></i></button>"+
                                    "</div>" + 
                                    "<div class='column is-3'>" +
                                        "<a class='link button' href=" + info.link + ">Full Article <i class='fa fa-file-text'></i></a>"+ 
                                    "</div>" + 
                                    "<div class='column is-3'>" + "</div>" +   
                                "</div>" +    
                                "</div>" +                            
                            "</div>" +
                         "</div>" + "<hr>")
                        // "<div class='modal'>" + 
                        //     "<div class='modal-background'>" + 
                        //         "<div class='modal-content'>" + 

                        //         "</div>" +
                        //     "</div>" +
                        // "</div>")  
    });
    $(".comments").click(function(){
        $.getJSON("/all", function(comments){
            for(i = 0; i < comments.length; i++){
                console.log(comments[i].comments);
            }
            
        })
    })
}

$(document).ready(function(){
    getRandombg()
    console.log(randomBg);
    $.get("/scrape", function(data){
        console.log(data);
       
    })
})
setTimeout(function(){
    console.log("done!");
    $.getJSON("/all", function(stories){
        displayNews(stories);
    })
},1100);  

