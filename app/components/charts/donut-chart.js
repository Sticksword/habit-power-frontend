import Component from '@ember/component';
import layout from '../../templates/components/charts/donut-chart';
import tip from 'd3-tip';

// Import the D3 packages we want to use
import { select, selectAll } from 'd3-selection';
import { pie, arc } from 'd3-shape';
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
import { csv } from 'd3-fetch';
import { axisLeft, axisTop } from 'd3-axis';
import { nest } from 'd3-collection';
import { symbol, symbolTriangle } from 'd3-shape';
import { max, min } from 'd3-array';
import { schemePastel1 } from 'd3-scale-chromatic';


// inspiration: https://codepen.io/zakariachowdhury/pen/EZeGJy
export default Component.extend({
  layout,

  tagName: 'svg',
  classNames: ['donut-chart'],

  width: 350,
  height: 350,

  attributeBindings: ['width', 'height'],

  didInsertElement() {
    this.draw();
  },

  draw() {
    var data = [
      {name: "USA", value: 40},
      {name: "UK", value: 20},
      {name: "Canada", value: 30},
      {name: "Maxico", value: 10},
    ];
    var text = "";

    var margin = { top: 0, right: 0, bottom: 0, left: 0 };

    var chartWidth = this.get('width') - margin.left - margin.right,
        chartHeight = this.get('height') - margin.top - margin.bottom;
    var thickness = 90;

    var radius = Math.min(chartWidth, chartHeight) / 2;
    var color = scaleOrdinal(schemePastel1);

    var svg = select(this.element)
      .append('svg')
      .attr('class', 'pie')
      .attr('width', this.get('width'))
      .attr('height', this.get('height'));

    var g = svg.append('g')
      .attr('transform', 'translate(' + (chartWidth / 2 + margin.left) + ',' + (chartHeight / 2 + margin.top) + ')');

    var myArc = arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);

    var myPie = pie()
      .value(function(d) { return d.value; })
      .sort(null);

    var path = g.selectAll('path')
      .data(myPie(data))
      .enter()
      .append("g")
      .on("mouseover", function(d) {
          let g = select(this)
            .style("cursor", "pointer")
            .style("fill", "red")
            .append("g")
            .attr("class", "text-group");

          g.append("text")
            .attr("class", "name-text")
            .text(`${d.data.name}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '-1.2em');

          g.append("text")
            .attr("class", "value-text")
            .text(`${d.data.value}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '.6em');
        })
      .on("mouseout", function(d) {
          select(this)
            .style("cursor", "none")
            .style("fill", color(this._current))
            .select(".text-group").remove();
        })
      .append('path')
      .attr('d', myArc)
      .attr('fill', function(d,i) {
        return color(i);
      })
      .each(function(d, i) { this._current = i; });


      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .text(text);
  }
});

