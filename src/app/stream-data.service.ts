import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; // https://stackoverflow.com/questions/37030963/angular-2-2-0-0-rc-1-property-map-does-not-exist-on-type-observableresponse
import { StreamData } from './stream-data'; 

@Injectable()
export class StreamDataService {

  constructor(private http: Http) { }
  getStreamData(site?: string): Observable<any[]> {
    return this.http
               .get('http://services.arcgis.com/v400IkDOw1ad7Yad/ArcGIS/rest/services/USGS_Stream_Gauge_History_Read_Only/FeatureServer/0/query?where=siteName%3D%27' + site + '+NC%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=siteName%2CsiteID%2CdateTime%2Cvalue&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=dateTime&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=pjson&token=')
               .map((res:Response) => res.json());
  }

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