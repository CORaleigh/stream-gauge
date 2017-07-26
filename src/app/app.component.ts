import { Component } from '@angular/core';
import { StreamDataService } from './stream-data.service'; 
import * as d3 from 'd3/index';
import * as moment from 'moment'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StreamDataService]
})
export class AppComponent {
  constructor(private StreamDataService: StreamDataService) { }
}

