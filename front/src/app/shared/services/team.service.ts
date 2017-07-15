import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Team } from '../models';


@Injectable()
export class TeamService {

  private baseUrl: string = 'http://localhost:8000/api/team/';
  private headers: Headers = new Headers();

  constructor(private http : Http){
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  getTeams(): Observable<Team[]>{
    return this.getAll();
  }

  getAll(): Observable<Team[]>{
    let teams$ = this.http
      .get(`${this.baseUrl}`, {headers: this.headers})
      .map(mapTeams)
      .catch(this.handleError);
      return teams$;
  }

  save(t: Team): Observable<Team>{
    return this.http
      .post(`${this.baseUrl}`, JSON.stringify({
        id: t.id,
        name: t.name,
        captain: t.captain,
      }), {headers: this.headers})
      .map((r) => toTeam(r.json()))
      .catch(this.handleError);
  }

  delete(id: Number): Observable<Number>{
    return this.http
      .delete(`${this.baseUrl}${id}`)
      .map((r) => { return id })
      .catch(this.handleError);
  }

  handleError(error: any) {
    return Observable.throw(error.json().detail || 'Server error');
  }
}

function mapTeams(response:Response): Team[]{
  // The response of the API has a results
  // property with the actual results
  let json = response.json();
  if (json) {
    return json.map(toTeam)
  } else {
    return [];
  }
}

function toTeam(r:any): Team{
  let team = <Team>({
    id: r.id,
    name: r.name,
    captain: r.captain
  });
  return team;
}
