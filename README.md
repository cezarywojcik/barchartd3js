# Barchartd3.js #

## Description ##

Barchartd3.js is a javascript library that uses d3.v3 to make simple, interactive bar graphs. The opacity of each bar is determined by the data value to make the bar graph a clearer visual representation of the data. The default mouse events allow the user to click on a bar in order to zoom the bar graph to fit the clicked bar.

## Basic Usage ##

Barchartd3.js is a javascript library that uses d3.v3.js to help create interactive bar graphs. 

Here is the simplest example usage:

```html
<!doctype html>
<html>
	<head>
		<title>
			Barchart.js
		</title>
	</head>
	<body>
		<div id="barchart">
		</div>
		<script src="http://d3js.org/d3.v3.min.js"></script>
		<script src="barchartd3.js"></script>
		<script>
			var dataset = [13,25,41,33,52,38];
			var chart = barchart();
			d3.select("#barchart")
				.datum(dataset)
				.call(chart);
		</script>
	</body>
</html>
```

## Configuration ##

Configuring barchartd3.js is very simple. Barchartd3.js follows the d3 convetion of
chaining commands with closures. 
Below is an example of setting a custom width and height.

```javascript
	var dataset = [13,25,41,33,52,38];
	var chart = barchart()
		.settings("width", 800)
		.settings("height", 500);
	d3.select("#barchart")
		.datum(dataset)
		.call(chart);
```

The options for barchartd3.js are set using the settings function. 

## Settings ##

These are the settings available in barchartd3.js using the settings function.

* width - the width of the svg element

* height - the height of the svg element

* barpadding - the padding in between bars in pixels

* barcolor - the base color for an unselected bar

* barmouseovercolor - the color for a bar what a mouse hovers on it

* barclickcolor - the color of a bar if it is clicked and the mouse is over it

* fontfamily - the font for the axes labels and data labels

* fontsize - the font size for the axes labels and data labels

* yaxiswidth - the padding on the left side of the bar graph for the y axis

* xaxisheight - the padding on the bottom side of the bar graph for the x axis

* titleheight - the padding on the top side of the bar graph for the title

* gridcolor - the color for the grid lines in the background

* backgroundcolor - the background color of the svg element

* showdatalabels - boolean value for whether or not you want to display data labels

* showyaxis - boolean value for whether or not you want to display y axis

* showxaxis - boolean value for whether or not you want to display x axis

* interactive - boolean value for whether you want mouse interactivity in the bar graph

* yaxislabel - a string of the y axis label

* xaxislabels - array of values to label the bars; this array must be the same length as the data array OR contain just 1 value to label the entire axis

* axislabelfontsize - font size for the y and x axes labels

* axislabelfontcolor - font color for the y and x axes labels

* datalabelcolor - font color for data labels

* title - a string of the title of the graph

* titlesize - the font size of the title 

* titlecolor - the color of the title text

## Events ##

Additionally, you can override the default mouse events for a bar. Here is an example:

```javascript
	var chart = barchart()
		.events("mouseoverbar", function(d, i) {
			var bar = d3.select(this);
			console.log("raw bar: " + bar);
		});
```

The above example will trigger the `console.log` function every time the mouse is rolled over any bar in the bar graph. The function has optional arguments `d` and `i` that contain the data value in the bar and the position of the data value in the array, respectively. The `this` keyword contains the selection of the bar. Listed below are the three events available.

* mouseoverbar - onmouseover event on each bar

* mouseoutbar - onmouseout event on each bar

* mousedownbar - onmousedown event on each bar

## Additional Formatting ##

You are also free to format the bar graph using CSS stylesheets, which will override the settings created by barchartd3.js. Listed below are the classes available to you.

* .bar - each bar has this class

* .datalabel - each data label has this class

* .yaxis text - the labels on the y axis

* .yaxis line - the gridlines created by the y axis

* .xaxis text - the labels on the x axis

* .title text - the title text



## License ##

Copyright (c) 2013 Cezary Wojcik

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
