function displayNews(news){
    $(".view").empty()

    news.forEach(function(info){
        $(".view").append("<div class='block'>" + 
                            "<div class='columns'>" + 
                                "<div class='column is-12'>" + 
                                    "<h1>" + info.title + "</h1>" +
                                "<div class='columns'>" + 
                                    "<div class='column is-3'>" + "</div>" + 
                                    "<div class='column is-3'>" +
                                        "<a class='comments' href='#'" + ">Comments <i class='fa fa-comment'></i></a>"+
                                    "</div>" + 
                                    "<div class='column is-3'>" +
                                        "<a class='link' href=" + info.link + ">Full Article <i class='fa fa-file-text'></i></a>"+ 
                                    "</div>" + 
                                    "<div class='column is-3'>" + "</div>" +   
                                "</div>" +    
                                "</div>" +                            
                            "</div>" +
                         "</div>" + "<hr>")  
    });
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
},1000)    