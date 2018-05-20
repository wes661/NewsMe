function displayNews(news){
    $(".view").empty()

    news.forEach(function(info){
        $(".view").append("<h1>" + info.title + "</h1>" +
        "<a href=" + info.link + ">Read more</a>" + "<hr>");
    })
}

$(document).ready(function(){
    $.get("/scrape", function(data){
        console.log(data);
       
    })
})
setTimeout(function(){
    console.log("done!");
    $.getJSON("/all", function(stories){
        displayNews(stories);
    })
},1500)    