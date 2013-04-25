/*
 * Name: Barchartd3.js
 * Dependencies: d3.v3
 * Author: Cezary Wojcik
 * www.cezarywojcik.com
 */

function barchart(selection){

	// ---- [ default settings ] -----------------------------------------------

	var settings = {
		width: 600,
		height: 400,
		barpadding: 1,
		barcolor: "#424242",
		barmouseovercolor: "#cc9933",
		barclickcolor: "#009999",
		fontfamily: "sans-serif",
		fontsize: "12px",
		yaxiswidth: 40,
		xaxisheight: 30,
		titleheight:30,
		gridcolor: "#c0c0c0",
		backgroundcolor: "#ffffff",
		showdatalabels: true,
		showyaxis: true,
		showxaxis: true,
		interactive: true,
		yaxislabel: "",
		xaxislabels: [],
		axislabelfontsize: "16px",
		axislabelfontcolor: "#000000",
		datalabelcolor: "#FFFFFF",
		title: "",
		titlesize: "20px",
		titlecolor: "#000000"
	};

	// ---- [ events ] ---------------------------------------------------------

	var events = {
		mouseoverbar: function(d) {
			var bar = d3.select(this);
			var clicked = bar.attr("clicked");
			var tempopacity = bar.attr("opacity");
			bar.attr("tempopacity", tempopacity)
				.attr("opacity", 1);
			if (!clicked) {
				bar.attr("fill", settings.barmouseovercolor);
			} else {
				bar.attr("fill", settings.barclickcolor);
			}
		},
		mouseoutbar: function(d) {
			var bar = d3.select(this);
			var clicked = bar.attr("clicked");
			if (true) {
				var tempopacity = bar.attr("tempopacity");
				bar.attr("fill", settings.barcolor)
					.attr("opacity", tempopacity)
					.attr("tempopacity", null);
			}
		},
		mousedownbar: function(d) {
			var bar = d3.select(this);
			var clicked = bar.attr("clicked");
			if (clicked){
				bar.attr("clicked", null);
				chart.setscale();
				chart.normalize();
			} else {
				chart.removeclicked();
				bar.attr("clicked", "true")
					.attr("fill", settings.barclickcolor);
				chart.scaleto(d);
			}
		}
	};
	
	// ---- [ getter/setters ] -------------------------------------------------

	chart.settings = function(setting, value){
		if (arguments.length === 1) {
			return settings[setting];
		}
		settings[setting] = value;
		return chart;
	}

	chart.events = function(event, func){
		if (arguments.length === 1) {
			return events[event];
		}
		events[event] = func;
		return chart;
	}
	
	// ---- [ chart creation ] -------------------------------------------------

	function chart(selection){
		selection.each(function(data){
			// ---- [ checking data labels array ] -------------------------------
			if (!(settings.xaxislabels.length === 0
				|| settings.xaxislabels.length === 1 
				|| settings.xaxislabels.length === data.length)) {
				throw new Error("Data Labels are configured incorrectly.");
			}

			// ---- [ var setup ] ------------------------------------------------
			var max = Math.max.apply(null, data);
			var bardim = {
				width: settings.width
					-settings.yaxiswidth+settings.barpadding,
				height: settings.height
					-settings.xaxisheight-settings.titleheight
			}
			var barwidth = (bardim.width+settings.barpadding)/data.length 
					- settings.barpadding;
			var yscale = d3.scale.linear()
				.domain([0, max])
				.range([0, bardim.height]);
			var xscale = d3.scale.linear()
				.domain([0, data.length])
				.range([0, bardim.width]);
			var yaxis = d3.svg.axis()	
				.scale(yscale.copy().domain([max, 0]))
				.orient("left");
			var xaxis = d3.svg.axis()
				.scale(xscale)
				.orient("bottom");
			
			// ---- [ functions ] ------------------------------------------------
			var animdur = function(d){
				return yscale(d)*5;
			}

			// ---- [ svg setup ] ------------------------------------------------
			var svg = d3.select(this)
				.selectAll("svg")
				.data([data]);

			var enter = svg.enter().append("svg");

			svg.attr("width", settings.width)
				.attr("height", settings.height)
				.style("background-color", settings.backgroundcolor);

			// ---- [ groups ] ---------------------------------------------------
			var xaxisgroup = svg.append("g")
				.attr("class", "xaxis");
			var yaxisgroup = svg.append("g")
				.attr("class", "yaxis");
			var bargroup = svg.append("g")
				.attr("class", "databars");
			var datalabelgroup = svg.append("g")
				.attr("class", "datalabels");
			var titlegroup = svg.append("g")
				.attr("class", "title");

			// ---- [ commence d3 ] ----------------------------------------------
			bargroup.selectAll("rect")
				.data(data)
				.enter()
				.append("rect")
				.attr("x", function(d, i){return xscale(i)+settings.yaxiswidth;})
				.attr("y", bardim.height+settings.titleheight)
				.attr("height", function(d){return 0;})
				.attr("width", barwidth)
				.attr("fill", settings.barcolor)
				.attr("class", "bar");
			if (settings.interactive) {
				bargroup.selectAll("rect")
					.style("cursor", "pointer");
			}

			if (settings.showdatalabels) {
				datalabelgroup.selectAll("text")
					.data(data)
					.enter()
					.append("text")
					.text(function(d){return d;})
					.style("font-family", settings.fontfamily)
					.style("font-size", settings.fontsize)
					.attr("fill", settings.datalabelcolor)
					.attr("text-anchor", "middle")
					.attr("x", function(d, i){return xscale(i)
						+barwidth/2+settings.yaxiswidth})
					.attr("y", bardim.height+settings.titleheight)
					.attr("class", "datalabel");
			}

			if (settings.showyaxis) {
				yaxisgroup
					.attr("transform", "translate(" + settings.yaxiswidth 
						+ "," + settings.titleheight + ")")
					.attr("class", "yaxis")
					.attr("fill", settings.axislabelfontcolor)
					.style("font-size", settings.fontsize)
					.style("font-family", settings.fontfamily)
					.call(yaxis.tickSize(-1*bardim.width,0,0));
				yaxisgroup
					.append("text")
					.text(settings.yaxislabel)
					.attr("text-anchor", "middle")
					.attr("fill", settings.axislabelfontcolor)
					.style("font-size", settings.axislabelfontsize)
					.style("font-family", settings.fontfamily)
					.attr("x", -1*(bardim.height+settings.titleheight)/2)
					.attr("y", -1*settings.yaxiswidth/2-10)
					.attr("transform", "rotate(270)");
			}

			if (settings.showxaxis) {
				var scale = d3.scale.linear()
					.domain([0, settings.xaxislabels.length])
					.range([0, bardim.width]);
				var axis = d3.svg.axis()
					.scale(scale)
					.orient("bottom");
				xaxisgroup
					.attr("transform", 
						"translate(" + (settings.yaxiswidth+barwidth/2) + 
						"," + (bardim.height+settings.titleheight+5) + ")")
					.attr("class", "xaxis")
					.attr("fill", settings.axislabelfontcolor)
					.style("font-size", settings.axislabelfontsize)
					.style("font-family", settings.fontfamily)
					.call(axis.tickSize(0,0,0)
						.ticks(settings.xaxislabels.length)
						.tickFormat(function(d, i) {
							return settings.xaxislabels[i];
						}));
				if (settings.xaxislabels.length === 1) {
					xaxisgroup.selectAll("text")
						.attr("x", bardim.width/2-barwidth/2);
				}
			}

			titlegroup
				.append("rect")
				.attr("x", settings.yaxiswidth)
				.attr("y", 0)
				.attr("width", bardim.width)
				.attr("height", settings.titleheight)
				.attr("fill", settings.backgroundcolor);
			titlegroup
				.append("text")
				.attr("fill", settings.titlecolor)
				.text(settings.title)
				.attr("text-anchor", "middle")
				.style("font-size", settings.titlesize)
				.style("font-family", settings.fontfamily)
				.attr("x", settings.width/2)
				.attr("y", settings.titleheight/2);

			// ---- [ call mouse events ] ----------------------------------------
			if (settings.interactive) {
				bargroup.selectAll("rect")
					.data(data)
					.on("mouseover", events.mouseoverbar)
					.on("mouseout", events.mouseoutbar)
					.on("mousedown", events.mousedownbar);
			}

			// ---- [ usable functions ] -----------------------------------------
			chart.setscale = function() {
				yscale = d3.scale.linear()
					.domain([0, max])
					.range([0, bardim.height]);
				yaxis = d3.svg.axis()	
					.scale(yscale.copy().domain([max, 0]))
					.orient("left");
				return chart;
			}

			chart.removeclicked = function() {
				bargroup.selectAll("rect")
					.filter(function(){
						return d3.select(this).attr('clicked') == "true";
					})
					.attr('clicked', null);
			}

			// ---- [ update functions ] -----------------------------------------
			chart.normalize = function(d) {
				bargroup.selectAll("rect")
					.transition()
					.duration(function(d){return animdur(d);})
					.attr("height", function(d){return yscale(d);})
					.attr("y", function(d){return bardim.height-yscale(d)
						+settings.titleheight})
					.filter(function(){
						return d3.select(this).attr('clicked') != "true";
					})
					.attr("opacity", function(d){return .3+d/max*.7})
					.attr("fill", settings.barcolor);
				if (settings.showdatalabels) {
					datalabelgroup.selectAll("text")
						.transition()
						.duration(function(d){return animdur(d);})
						.attr("y", function(d){return bardim.height-yscale(d)+15
							+settings.titleheight});
				}
				if (settings.showyaxis) {
					yaxisgroup
						.transition()
						.duration(animdur(d ? d : max))
						.call(yaxis.tickSize(-1*bardim.width,0,0));
					yaxisgroup
						.selectAll("line")
						.style("stroke", settings.gridcolor)
				}

				return chart;
			}

			chart.scaleto = function(d) {
				yscale = d3.scale.linear()
					.domain([0, d])
					.range([0, bardim.height]);
				yaxis = d3.svg.axis()	
					.scale(yscale.copy().domain([d, 0]))
					.orient("left");
				this.normalize(d);
				return chart;
			}

			// ---- [ normalize at start ] ---------------------------------------
			chart.normalize();
		});
	}

	// ---- [ return for closure ] ---------------------------------------------

	return chart;
}