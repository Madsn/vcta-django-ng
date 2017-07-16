import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../models';


@Injectable()
export class ConfigService {

  private baseUrl: string = 'http://localhost:8000/api/config/';
  private headers: Headers = new Headers();

  constructor(private http : Http){
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  getConfigs(): Observable<Config[]>{
    console.log("getConfigs");
    return this.getAll();
  }

  getAll(): Observable<Config[]>{
    let configs$ = this.http
      .get(`${this.baseUrl}`, {headers: this.headers})
      .map(mapConfigs)
      .catch(this.handleError);
      return configs$;
  }
  handleError(error: any) {
    return Observable.throw(error.json().detail || 'Server error');
  }
}

function mapConfigs(response:Response): Config[]{
  // The response of the API has a results
  // property with the actual results
  let json = response.json();
  if (json) {
    return json.map(toConfig)
  } else {
    return [];
  }
}

function toConfig(r:any): Config{
  let config = <Config>({
    team_management_enabled: r.team_management_enabled,
    trip_management_enabled: r.trip_management_enabled,
    flash_message: r.flash_message,
    welcome_message: r.welcome_message
  });
  return config;
}
