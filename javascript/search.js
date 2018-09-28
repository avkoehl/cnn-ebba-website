function search()
{
    var impression = document.getElementById("impression").value;
    document.getElementById("seed").src = "../archv/thumbnails/" + impression;
    var params = "input=" + impression 

    var http = new XMLHttpRequest();
    var url = "./php/search.php";
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

    var lists = [];
    lists.push(classifier(index, results));
    lists.push(classifier(10, results));
    lists.push(classifier(20, results));
    lists.push(classifier(40, results));
    lists.push(classifier(100, results));

    var classes = document.getElementById("knn");
    classes.innerHTML = "";
    for (var i = 0; i < lists.length; i++)
    {
        classes.appendChild(lists[i]);
    }

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

function classifier (count, results)
{
    var ul=document.createElement('ul');


    // at some point read in index as one of the cutoffs for the classifier
    var clusters_all = [];
    for (var i = 0; i < count; i++) {
        var name = results[i].split(" ")[0];
        clusters_all.push(clusterid[name]);
    }

    counts = {};
    for (var i = 0; i < count; i++){
        num = clusters_all[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }//for

    // iterate through the objects make an array of objects for all:
    // [ {cluster: count}, {cluster2: count} ...
    var arrcount = [];
    for (k in counts){
        obj = {id:k, count:counts[k]};
        arrcount.push(obj);
    }
    // sort these arrays by their counts
    // descending order
    arrcount.sort(function (a,b) {
        return b.count - a.count});

    var li=document.createElement('li');
    li.innerHTML = "k = " + count;
    ul.appendChild(li);
    for (var i = 0; i<Math.min(5, arrcount.length); i++)
    {
        var li=document.createElement('li');
        li.innerHTML= arrcount[i].id + ": " + arrcount[i].count;
        if (i == 0)
        {
            li.style.color = "red";
        }
        ul.appendChild(li);
    }

    return ul;
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
