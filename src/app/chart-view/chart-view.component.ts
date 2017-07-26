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

  sites: object = {
    crabtreeEb: 'CRABTREE+CR+AT+EBENEZER+CHURCH+RD+NR+RALEIGH%2C',
    lrZeb: 'LITTLE+RIVER+NEAR+ZEBULON%2C', 
    
  }


  constructor(private streamDataService: StreamDataService) { }

  ngOnInit() {
    this.getStreamData(); 
  }

  getStreamData() {
    this.streamDataService.getStreamData().subscribe(
      data => {
        this.data = data; 
        console.log(data); 
      },
      err => {
        console.log(err); 
      }
    )
  }


}
