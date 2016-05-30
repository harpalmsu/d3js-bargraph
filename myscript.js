
var margin = { top : 20, right : 10, bottom : 100, left : 40},
	width = 960 - margin.right - margin.left,
	height = 600 - margin.top - margin.bottom;

var svg = d3.select('body')
	.append('svg')
	.attr({
		"width"  : width + margin.right + margin.left,
		"height" : height + margin.top + margin.bottom
	})
	.append('g')
		.attr("transform","translate("+ margin.left + ',' + margin.right + ')');

//defining tip
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Scale:</strong> <span style='color:red'>" + d.scale + "</span>";
  })
  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  svg.call(tip);

//define x y scale
var xScale = d3.scale.ordinal()
	.rangeRoundBands([0,width],0.2, 0.2);

var yScale = d3.scale.linear()
	.range([height,0]);

//define axis
var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left");

//load data from csv file
d3.csv("expertise.csv",function(error,data){
	if(error) console.log("Error: data not loaded");

data.forEach(function(d){
	d.scale = + d.scale;
	d.technology = d.technology;
//	console.log(d.scale + " " + d.technology);
});

// specify domain of x and y scale

xScale.domain(data.map(function(d){return  d.technology;}) );
yScale.domain([0, d3.max(data, function(d){return d.scale; }) ] );

//draw the bar
svg.selectAll('rect')
	.data(data)
	.enter()
	.append('rect')
	.attr("class", "bar")
	.attr("height",0)
	.attr("y",height)
//	.transition().duration(3000)
	.on('mouseover', tip.show)
	.on('mouseout', tip.hide)
//	.delay(function(d,i){ return i * 200;} )
	.attr({
		"x" : function(d) { return xScale(d.technology); },
	 	"y" : function(d) { return yScale(d.scale); },
		"width" : xScale.rangeBand(),
		"height": function(d) { return height - yScale(d.scale); }
	});

//draw axis
svg.append("g")
	.attr("class","x axis")
	.attr("transform","translate(0," + height + ")")
	.call(xAxis)
	.selectAll('text')
	.attr("transform","rotate(-68)")
	.attr("dx","-.8em")
	.attr("dy",".25em")
	.style("text-anchor","end");

svg.append("g")
	.attr("class","y axis")

//	.text("Frequency")
	.call(yAxis);



});

