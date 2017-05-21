//Parameters for API call
var params = {
    "apikey": apikey.marvel,
    "format": "comic",
    "formatType": "comic",
    "noVariants" : true,
    "dateDescriptor": "thisWeek",
    "orderBy": "title",
    "limit": 20
};

var featParams = {
    "apikey": apikey.marvel,
    "format": "comic",
    "formatType": "comic",
    "noVariants": true,
    "orderBy": "issueNumber",
    "limit": 20
};


//make request to Marvel API for this week's issues
$.ajax({
    url: "http://gateway.marvel.com/v1/public/comics",

    data: params,

    type: "GET",

    dataType: "json"
}).done(function (results) {
    var parent = document.getElementById('new-slidee');
    if (results.code == 200) {
        //for each result
        for (var i = 0; i < results.data.count; i++) {
            var comic = results.data.results[i];
            //create <li>
            var li = document.createElement("li");
            //apend image with thumbnail
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
            //apend to <ul> slidee
            parent.appendChild(li);
        }

        createSlys('#newFrame');

    }
}).fail(function () {
    //for each comic, show the X for failure to load
    $('.new-comic-fail').each(
        function () {
            $(this).show();
        }
    );
});

//make request to Marvel API for featured selection
$.ajax({
    url: "http://gateway.marvel.com/v1/public/series/" + featComic.id +"/comics",

    data: featParams,

    type: "GET",

    dataType: "json"
}).done(function (results) {
    var parent = document.getElementById('feat-slidee');
    if (results.code == 200) {
        //for each result
        for (var i = 0; i < results.data.count; i++) {
            var comic = results.data.results[i];
            //create <li>
            var li = document.createElement("li");
            //append image with thumbnail
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
            //apend to <ul> slidee
            parent.appendChild(li);
        }

        createSlys('#featFrame');

    }
}).fail(function () {
    $('.feat-comic-fail').each(
        function () {
            $(this).show();
        }
    );
});