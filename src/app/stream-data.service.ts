import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; // https://stackoverflow.com/questions/37030963/angular-2-2-0-0-rc-1-property-map-does-not-exist-on-type-observableresponse
import { StreamData } from './stream-data'; 

@Injectable()
export class StreamDataService {

  constructor(private http: Http) { }
  getStreamData(): Observable<any[]> {
    return this.http
               .get('https://opendata.arcgis.com/datasets/e31372dad7484d76ba475090d2935bab_0.geojson')
               .map((res:Response) => res.json());
  }

}
