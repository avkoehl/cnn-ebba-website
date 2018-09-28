function cluster_search()
{
    var impression = document.getElementById("cluster").value;
    var img = representatives[impression]
    document.getElementById("seed").src = "../archv/thumbnails/" + img;
    var params = "input=" + impression 

    var http = new XMLHttpRequest();
    var url = "./php/cluster_search.php";
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function ()
    {
        if (http.readyState == 4 && http.status == 200) 
        {
            var data = http.responseText;
            cluster_results(data);
            cluster_distance_plot(data);
        }// if good response
    } // callback
    http.send(params);
}

function cluster_results(data)
{
    var impath = "../archv/thumbnails/"; 

    // first clear the results
    document.getElementById("results").innerHTML = "";
    var results = data.split(",");
    var index = cluster_get_index(results)
    var len = results.length;
    len = 50;

    var main = document.getElementById("results");

    for (var i = 0; i < len; i++) {
        var name = results[i].split(" ")[0];
        var imgname = representatives[name]
        var dist = results[i].split(" ")[1];

        var res = document.createElement("div");
        var img = document.createElement("img");
        var desc = document.createElement("div");

        res.style.border =  "1px solid #333";
        if (i == index){
            res.style.border = "3px solid red";
        }
        res.style.marginRight =  "10px";
        res.style.marginBottom =  "10px";
        res.style.marginTop =  "10px";
        res.style.marginLeft =  "10px";

        img.src = impath + imgname;
        img.style.width =  "112px";
        img.style.height =  "112px";

        desc.innerHTML = "<center>" + name + "<br><i>distance: " + dist.substring(0,4) + "</i></center>";

        res.appendChild(img);
        res.appendChild(desc);
        main.appendChild(res);
    }
}

function cluster_get_index (results)
{
    var index = 0;
    var distances = [];
    var maxdistchange = 0;
    for(var i =0; i< results.length; i++) {
        distances.push(results[i].split(" ")[1]);

        if (i > 1) {
            dist = results[i].split(" ")[1];
            dchange = dist - results[i-1].split(" ")[1];
            if (dchange > maxdistchange){
                maxdistchange = dchange;
                index = i-1;
            }//if bigger
        }// if i > 1
    }// for
    return index;
}
