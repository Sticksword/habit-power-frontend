import Component from '@ember/component';
import layout from '../../templates/components/charts/arrow-chart';
import tip from 'd3-tip';

// Import the D3 packages we want to use
import { select, selectAll } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { csv } from 'd3-fetch';
import { axisLeft, axisTop } from 'd3-axis';
import { nest } from 'd3-collection';
import { symbol, symbolTriangle } from 'd3-shape';
import { max, min } from 'd3-array';


// inspiration: https://bl.ocks.org/jadiehm/9b4fe461333368fcbbcc1c5cdff7f0ba
export default Component.extend({
  layout,

  tagName: 'svg',
  classNames: ['arrow-chart'],

  width: 500,
  height: 400,

  attributeBindings: ['width', 'height'],

  didInsertElement() {
    this.draw();
  },

  draw() {
    var promises = [];
    promises.push(csv("/assets/states.csv"));
    Promise.all(promises).then(ready);

    let plot = select(this.element);

    var stateName = "PA";

    // Margin conventions
    var margin = { top: 50, right: 10, bottom: 15, left: 110 };

    var width = this.get('width') - margin.left - margin.right,
        height = this.get('height') - margin.top - margin.bottom;

    //Appends the svg to the chart-container div
    var svg = plot.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Creates the xScale
    var xScale = scaleLinear()
        .range([0, width]);

    //Creates the yScale
    var y0 = scaleBand()
        .rangeRound([height, 0], 0.2)
        .domain(["York", "Wyoming", "Westmoreland"]);

    //Defines the y axis styles
    var yAxis = axisLeft()
      .scale(y0)
      .tickSize(-width)
      .tickPadding(8)
      .ticks(5);

    //Defines the x axis styles
    var xAxis = axisTop()
      .scale(xScale)
      .tickSize(height)
      .tickPadding(8)
      .tickFormat(Math.abs);

    function ready(allPromiseData) {
      var data = allPromiseData.firstObject;
      //Organizes the data
      data.forEach(function(d) {
        d.year = +d.year;
        d.margin = +d.margin;
      });

      var chartData = data.filter(function(d) {
        return d.state === stateName;
      });

      var dataByCounty = nest()
          .key(function(d) { return d.county; })
          .entries(chartData);

      var maxmargin = max(data, function(d) { return d.margin; });
      var minmargin = min(data, function(d) { return d.margin; });

      // xScale.domain([minmargin, maxmargin]);
      xScale.domain([-50, 50]);

      var repRectangle = svg.append("rect")
        .attr("x", width/2)
        .attr("y", 0)
        .attr("width", width/2)
        .attr("height", height)
        .attr("class", "repRect");

      var demRectangle = svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width/2)
        .attr("height", height)
        .attr("class", "demRect");

      //Appends the y axis
      var yAxisGroup = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("g")
        .classed("bolded", function(d) {return d == 'York' || d == 'Luzerne'});

      //Appends the x axis
      var xAxisGroup = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("g")
        .classed("g-baseline", function(d) {return d == 0});

      //Move axis lables
      selectAll('.y.axis text')
        .attr("transform", "translate(-100,0)")

      var countyGroup = svg.selectAll(".g-county-group")
          .data(dataByCounty)
          .enter()
          .append("g")
          .attr("class", function(d) { return "g-county-group " })
          .attr("transform", function(d) {
            return "translate(0," + (y0(d.key) + y0.bandwidth()/2) + ")";
          });

      var countyArrows = countyGroup.append("path")
          .attr("transform", function(d) {
            if (d.values[1].margin > d.values[0].margin) {
              return "translate(" + xScale(d.values[1].margin) + "," + -1 + ") rotate(-30)";
            }

            if (d.values[1].margin < d.values[0].margin) {
              return "translate(" + xScale(d.values[1].margin) + "," + -1 + ") rotate(30)";
            }

          })
          .attr("d", symbol().type(symbolTriangle).size(20));


      var countyLines = countyGroup.append("line")
          .attr("x1", function(d) { return xScale(d.values[0].margin); })
          .attr("x2", function(d) { return xScale(d.values[1].margin); });

      //Appends lables
      var demLabel = svg.append("text")
        .text("Dem. lead")
        .attr("class", "partylabel")
        .attr("x", 0)
        .attr("y", -30)
        .attr("transform", "translate(0,0)");

      var repLabel = svg.append("text")
        .text("Rep. lead")
        .attr("class", "partylabel")
        .attr("x", width/2)
        .attr("y", -30)
        .attr("transform", "translate(0,0)");
    }
  }
})
