function search()
{
    var impression = document.getElementById("impression").value;
    document.getElementById("seed").src = "../archv/thumbnails/" + impression;
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

    var slider = false;

    if (document.getElementById("moreInformation").checked){
        slider = true;
    }

    if (slider) {
        results(data);
        distance_plots(data);
    }//if slider checked

    else {
        clean_results(data);
        distance_plots(data);
    }

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

function results(data)
{
    var value = document.querySelector('input[name=imageset]:checked').value;
    var impath = "../archv/thumbnails/"; 
    var results = data.split(",");
    var index = get_index(results);

    var c = clusterid[results[0].split(" ")[0]];
    var cluster = clusters[c].split(",");

    // first clear the results
    document.getElementById("results").innerHTML = "";
    if (value == "all")
        var len = results.length;
    else
        var len = Number(value);

    var main = document.getElementById("results");

    classifier(results);

    for (var i = 0; i < len; i++) {
        var name = results[i].split(" ")[0];
        var dist = results[i].split(" ")[1];

        var res = document.createElement("div");
        var img = document.createElement("img");
        var desc = document.createElement("div");

        if (cluster.includes(name)){
            res.style.backgroundColor =  " #0074d9";
        }

        if (i == index)
        {
            res.style.border = " 3px solid red";
        }
        res.style.marginRight =  "10px";
        res.style.marginBottom =  "10px";
        res.style.marginTop =  "10px";
        res.style.marginLeft =  "10px";

        img.src = impath + name;
        img.style.width =  "112px";
        img.style.height =  "112px";

        desc.innerHTML = "<center>" + name + "<br><i>distance: " + dist + "</i>" + "<br><i>clusterid: " + clusterid[name] + "</center>";

        res.appendChild(img);
        res.appendChild(desc);
        main.appendChild(res);
    }


}

function classifier (results)
{
    var clusters_all = [];
    for (var i = 0; i < results.length; i++) {
        var name = results[i].split(" ")[0];
        clusters_all.push(clusterid[name]);
    }

    counts_50 = {};
    counts_200 = {};
    counts_all = {};
    for (var i = 0; i < results.length; i++){
        num = clusters_all[i];
        if (i < 50){
            counts_50[num] = counts_50[num] ? counts_50[num] + 1 : 1;
        }
        if (i < 200) {
            counts_200[num] = counts_200[num] ? counts_200[num] + 1 : 1;
        }
    }//for

    // iterate through the two objects make an array of objects for both:
    // [ {cluster: count}, {cluster2: count} ...
    // sort these arrays by their counts
    // print min(5, arraylen)

}

function get_index (results)
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
