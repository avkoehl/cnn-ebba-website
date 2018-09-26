function distance_plots(data)
{
    document.getElementById("plot50").innerHTML = "";
    document.getElementById("plot200").innerHTML = "";
    document.getElementById("plot16000").innerHTML = "";

    // make three plots of the distances
    // add red dot where the decision point is
    // display all three to help decide which tab user wants to look at (50, 200..)

    // get distances
    var index = 0;
    var results = data.split(',');
    var distances = []
    for(var i =0; i< results.length; i++) {
        distances.push(results[i].split(" ")[1]);
    }
    plot_50(distances);
    plot_200(distances);
    plot_16000(distances);
}

function plot_50 (distances)
{
    var pwidth = 400;
    var pheight = 300;

    var num = 50;
    var margin = {top: 50, right: 50, bottom: 50, left: 50}
        , width = pwidth - margin.left - margin.right // Use the window's width 
        , height = pheight - margin.top - margin.bottom; // Use the window's height

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([0, num]) // input
        .range([0, width]); // output

    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([0, 1]) // input 
        .range([height, 0]); // output 

    // 7. d3's line generator
    var line = d3.line()
        .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    var dataset = []
    for (var i=0; i < num; i++)
    {
        dataset[i] = {y:  distances[i] };
    }

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("#plot50").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

}

function plot_200 (distances)
{
    var pwidth = 400;
    var pheight = 300;

    var num = 200;
    var margin = {top: 50, right: 50, bottom: 50, left: 50}
        , width = pwidth - margin.left - margin.right // Use the window's width 
        , height = pheight - margin.top - margin.bottom; // Use the window's height

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([0, num]) // input
        .range([0, width]); // output

    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([0, 1]) // input 
        .range([height, 0]); // output 

    // 7. d3's line generator
    var line = d3.line()
        .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    var dataset = []
    for (var i=0; i < num; i++)
    {
        dataset[i] = {y:  distances[i] };
    }

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("#plot200").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

}

function plot_16000 (distances)
{
    var pwidth = 400;
    var pheight = 300;

    var num = 16000;
    var margin = {top: 50, right: 50, bottom: 50, left: 50}
        , width = pwidth - margin.left - margin.right // Use the window's width 
        , height = pheight - margin.top - margin.bottom; // Use the window's height

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([0, num]) // input
        .range([0, width]); // output

    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([0, 1]) // input 
        .range([height, 0]); // output 

    // 7. d3's line generator
    var line = d3.line()
        .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    var dataset = []
    for (var i=0; i < num; i++)
    {
        dataset[i] = {y:  distances[i] };
    }

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("#plot16000").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

}

