import { Component, OnInit } from '@angular/core';
import { StreamDataService } from './../stream-data.service'; 
import * as d3 from 'd3/index';
import * as moment from 'moment'; 


@Component({
  selector: 'chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css']
})
export class ChartViewComponent implements OnInit {

  data: any[]; 
  private host; // D3 object referebcing host dom object
  private svg; // SVG in which we will print our chart
  private margin; // Space between the svg borders and the actual chart graphic
  private width; // Component width
  private height; // Component height
  private xScale; // D3 scale in X
  private yScale; // D3 scale in Y
  private xAxis; // D3 X Axis
  private yAxis; // D3 Y Axis
  private htmlElement; // Host HTMLElement

  sites: any = {
    crabtreeEb: 'CRABTREE+CR+AT+EBENEZER+CHURCH+RD+NR+RALEIGH%2C',
    lrZeb: 'LITTLE+RIVER+NEAR+ZEBULON%2C'
  }


// ROCKY+BRANCH+BELOW+PULLEN+DRIVE+AT+RALEIGH%2C
// WALNUT+CREEK+AT+SUNNYBROOK+DRIVE+NR+RALEIGH%2C
// MARSH+CREEK+NEAR+NEW+HOPE%2C
// PIGEON+HOUSE+CR+AT+CAMERON+VILLAGE+AT+RALEIGH%2C
// BEAVERDAM+CREEK+AT+DAM+NEAR+CREEDMOOR%2C
// WHITE+OAK+CR+AT+MOUTH+NEAR+GREEN+LEVEL%2C
// SWIFT+CREEK+NEAR+MCCULLARS+CROSSROADS%2C
// SWIFT+CREEK+NEAR+APEX%2C
// CRABTREE+CR+AT+OLD+WAKE+FOREST+RD+AT+RALEIGH%2C
// CRABTREE+CREEK+AT+HWY+70+AT+RALEIGH%2C
// CRABTREE+CREEK+AT+ANDERSON+DRIVE+AT+RALEIGH%2C
// CRABTREE+CREEK+AT+US+1+AT+RALEIGH%2C
// NEUSE+RIVER+NEAR+FALLS%2C

  constructor(private streamDataService: StreamDataService) { }

  ngOnInit() {
    this.getStreamData(this.sites.crabtreeEb); 
  }

  getStreamData(site) {
    this.streamDataService.getStreamData(site).subscribe(
      data => {
        this.data = data; 
        console.log(data); 
      },
      err => {
        console.log(err); 
      }
    )
  }

  generateCharts() {
    var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%d-%b-%y");

    var x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    d3.tsv("data.tsv", function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
      return d;
    }, function(error, data) {
      if (error) throw error;

      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain(d3.extent(data, function(d) { return d.close; }));

      g.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
        .select(".domain")
          .remove();

      g.append("g")
          .call(d3.axisLeft(y))
        .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Price ($)");

      g.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);
        });
  }


}
