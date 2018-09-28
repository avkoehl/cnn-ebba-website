function cluster_distance_plot(data)
{
  document.getElementById("plot10").innerHTML = "";
  document.getElementById("plot30").innerHTML = "";
  document.getElementById("plotall").innerHTML = "";

  // get distances
  var index = 0;
  var results = data.split(',');
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

  cluster_plot10(index, distances);
  cluster_plot30(index, distances);
  cluster_plot(index, distances);
}

function cluster_plot (index, distances)
{
  var pwidth = 500;
  var pheight = 300;

  var num = distances.length;
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
  var svg = d3.select("#plotall").append("svg")
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

  svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", xScale(index) )
    .attr("cy", yScale(distances[index]) )
    .attr("r", 5)
}

function cluster_plot10 (index, distances)
{
  var pwidth = 500;
  var pheight = 300;

  var num = 10 
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
  var svg = d3.select("#plot10").append("svg")
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

  svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", xScale(index) )
    .attr("cy", yScale(distances[index]) )
    .attr("r", 5)
}

function cluster_plot30 (index, distances)
{
  var pwidth = 500;
  var pheight = 300;

  var num = 30 
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
  var svg = d3.select("#plot30").append("svg")
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

  svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", xScale(index) )
    .attr("cy", yScale(distances[index]) )
    .attr("r", 5)
}

