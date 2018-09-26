function search()
{
    var impression = document.getElementById("impression").value;
    var params = "input=" + impression 

    var http = new XMLHttpRequest();
    var url = "search.php";
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function ()
    {
        if (http.readyState == 4 && http.status == 200) 
        {
            var data = http.responseText;
            load_result(data);
        }// if good response
    } // callback
    http.send(params);
}

function load_result(data)
{
    clean_results(data);
}

function clean_results(data)
{
    var value = document.querySelector('input[name=imageset]:checked').value;
    var impath = "../archv/thumbnails/"; 

    // first clear the results
    document.getElementById("results").innerHTML = "";
    var results = data.split(",");
    if (value == "all")
        var len = results.length;
    else
        var len = Number(value);

    var main = document.getElementById("results");

    for (var i = 0; i < len; i++) {
        var name = results[i].split(" ")[0];
        var dist = results[i].split(" ")[1];

        var res = document.createElement("div");
        var img = document.createElement("img");
        var desc = document.createElement("div");

        res.style.border =  "1px solid #333";
        res.style.marginRight =  "10px";
        res.style.marginBottom =  "10px";
        res.style.marginTop =  "10px";
        res.style.marginLeft =  "10px";

        img.src = impath + name;
        img.style.width =  "112px";
        img.style.height =  "112px";

        desc.innerHTML = "<center>" + name + "<br><i>distance: " + dist + "</i></center>";

        res.appendChild(img);
        res.appendChild(desc);
        main.appendChild(res);
      }
}
