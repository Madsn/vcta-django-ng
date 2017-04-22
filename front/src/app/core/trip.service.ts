import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Trip } from './core.models';

@Injectable()
export class TripService {

  private baseUrl: string = 'http://localhost:8000/api/trip/';
  private headers: Headers = new Headers();

  constructor(private http : Http){
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  getAll(): Observable<Trip[]>{
    let trips$ = this.http
      .get(`${this.baseUrl}`, {headers: this.headers})
      .map((r) => r.json());
      return trips$;
  }

  save(t: Trip): Observable<Trip>{
    return this.http
      .post(`${this.baseUrl}`, JSON.stringify(t), {headers: this.headers}).map((r) => r.json());
  }

  delete(id: Number): Observable<Response>{
    return this.http
      .delete(`${this.baseUrl}${id}`);
  }
}
