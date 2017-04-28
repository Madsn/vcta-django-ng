import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Trip } from '../models';
import * as moment from "moment";

Date.prototype.toJSON = function() { return moment(this).format('YYYY-MM-DD');};

@Injectable()
export class TripService {

  private baseUrl: string = 'http://localhost:8000/api/trip/';
  private headers: Headers = new Headers();

  constructor(private http : Http){
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  getTrips(): Observable<Trip[]>{
    return this.getAll();
  }

  getAll(): Observable<Trip[]>{
    console.log('getAll called');
    let trips$ = this.http
      .get(`${this.baseUrl}`, {headers: this.headers})
      .map(mapTrips)
      .catch(this.handleError);
      console.log(trips$);
      return trips$;
  }

  save(t: Trip): Observable<Trip>{
    return this.http
      .post(`${this.baseUrl}`, JSON.stringify({
        id: t.id,
        distance: t.distance.toString().replace(',','.'),
        date: moment(t.date).format('YYYY-MM-DD'),
        user: t.user,
        last_updated: t.last_updated,
      }), {headers: this.headers})
      .map((r) => toTrip(r.json()))
      .catch(this.handleError);
  }

  delete(id: Number): Observable<Number>{
    return this.http
      .delete(`${this.baseUrl}${id}`)
      .map((r) => { console.log(r.url.toString()); let x = r.url.toString().replace("http://localhost:8000/api/trip/", ""); console.log(x); return x; })
      .catch(this.handleError);
  }

  handleError(error: any) {
    console.log('handleError');
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}

function mapTrips(response:Response): Trip[]{
  // The response of the API has a results
  // property with the actual results
  let json = response.json();
  if (json) {
    return json.map(toTrip)
  } else {
    return [];
  }
}

function toTrip(r:any): Trip{
  let trip = <Trip>({
    id: r.id,
    date: r.date,
    distance: parseFloat(r.distance),
    last_updated: r.last_updated,
    user: r.user
  });
  return trip;
}
