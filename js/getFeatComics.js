var featParams = {
    "apikey": apikey.marvel,
    "format": "comic",
    "formatType": "comic",
    "orderBy": "issueNumber",
    "limit": 100
};

$.ajax({
    url: "http://gateway.marvel.com/v1/public/series/" + featComic.id + "/comics",

    data: featParams,

    type: "GET",

    dataType: "json"
}).done(function (results) {
    if (results.code == 200) {
        //save results to global variable
        outputDivs(results.data.results, results.data.count);
        $('.slide-viewer').show();
        $('.fake-slide-viewer').css("display", "none");
    }
}).fail(function (status) {
    console.log(status);
});

function outputDivs(resp, len) {
    //keep a running count
    var liNum = 0,
        ulNum = 0,
        divNum = 1,
        liMax = 5,
        ulMax = 3;
    var ul = document.createElement("ul"),
        div = document.createElement("div");
    div.className = "slide slide-" + divNum;
    var slideGroup = document.getElementById("slide-group");

    //for each result
    for (var i = 0; i < len; i++) {
        var comic = resp[i];
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = comic.thumbnail.path + "/portrait_xlarge" + "." + comic.thumbnail.extension;
        li.appendChild(img);
        //append title with link
        var p = document.createElement("p");
        var a = document.createElement("a");
        a.href = comic.urls[0].url;
        a.innerHTML = comic.title;
        p.appendChild(a);
        li.appendChild(p);

        if (liNum < liMax) {
            ul.appendChild(li);
            liNum++;
        }
        else {
            if (ulNum < ulMax) {
                div.appendChild(ul);
                ulNum++;
            }
            else {
                slideGroup.appendChild(div);
                div = document.createElement("div");
                divNum++;
                div.className = "slide slide-" + divNum;
                div.appendChild(ul);
                ulNum = 1;
            }
            ul = document.createElement("ul");
            ul.appendChild(li);
            liNum = 1;
        }
    }
    if (ulNum < ulMax) {
        div.appendChild(ul);
        ulNum++;
    }
    else {
        slideGroup.appendChild(div);
        div = document.createElement("div");
        divNum++;
        div.className = "slide slide-" + divNum;
        div.appendChild(ul);
        slideGroup.appendChild(div);
    }
    
    buildSlider();
}