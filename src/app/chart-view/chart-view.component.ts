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

  sites: any = {
    crabtreeEb: 'CRABTREE+CR+AT+EBENEZER+CHURCH+RD+NR+RALEIGH%2C',
    lrZeb: 'LITTLE+RIVER+NEAR+ZEBULON%2C',
    rbbpd: 'ROCKY+BRANCH+BELOW+PULLEN+DRIVE+AT+RALEIGH%2C', 
    wcasd: 'WALNUT+CREEK+AT+SUNNYBROOK+DRIVE+NR+RALEIGH%2C',
    mcnnh: 'MARSH+CREEK+NEAR+NEW+HOPE%2C',
    phcacv: 'PIGEON+HOUSE+CR+AT+CAMERON+VILLAGE+AT+RALEIGH%2C',
    bcadnc: 'BEAVERDAM+CREEK+AT+DAM+NEAR+CREEDMOOR%2C',
    wocamngl: 'WHITE+OAK+CR+AT+MOUTH+NEAR+GREEN+LEVEL%2C',
    scnmc: 'SWIFT+CREEK+NEAR+MCCULLARS+CROSSROADS%2C',
    scna: 'SWIFT+CREEK+NEAR+APEX%2C',
    ccaowf: 'CRABTREE+CR+AT+OLD+WAKE+FOREST+RD+AT+RALEIGH%2C',
    ccah70: 'CRABTREE+CREEK+AT+HWY+70+AT+RALEIGH%2C',
    ccaad: 'CRABTREE+CREEK+AT+ANDERSON+DRIVE+AT+RALEIGH%2C',
    ccaus1: 'CRABTREE+CREEK+AT+US+1+AT+RALEIGH%2C',
    nrnf: 'NEUSE+RIVER+NEAR+FALLS%2C'
  }


  constructor(private streamDataService: StreamDataService) { }

  ngOnInit() {
    this.getStreamData(this.sites.crabtreeEb); 
  }

  getStreamData(site) {
    this.streamDataService.getStreamData(site).subscribe(
      data => {
        this.data = data; 
        this.generateCharts(data); 
        console.log(data); 
      },
      err => {
        console.log(err); 
      }
    )
  }

  generateCharts(things){
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

  

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.dateTime); })
        .y(function(d) { return y(d.value); });
    

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
     
    draw(things);

    function draw(data) {
    
    console.log(data["features"]); 
    var data = data["features"];
    
    // format the data
    data.forEach(function(d) { 
        d.dateTime = +d["attributes"]["dateTime"];
        d.value = +d["attributes"]["value"];
    });
    console.log(data); 
    // sort years ascending
    data.sort(function(a, b){
        return a["attributes"]["value"]-b["attributes"]["value"];
        })
    
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.dateTime; }));
    y.domain([0, d3.max(data, function(d) {
        return Math.max(d.value); })]);
    
    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);
   

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
    }

}


}
