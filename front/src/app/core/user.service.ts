import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './core.models';

@Injectable()
export class UserService {

  private baseUrl: string = 'http://localhost:8000/api/user/';
  private headers: Headers = new Headers();

  constructor(private http : Http){
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  get(): Observable<User> {
    return this.http
      .get(`${this.baseUrl}1`, {headers: this.headers}) // TODO
      .map((r) => r.json())
      .catch(this.handleError);
  }

  handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
