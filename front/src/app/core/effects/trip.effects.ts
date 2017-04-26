import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { GET_TRIPS, GET_TRIPS_SUCCESS, GET_TRIPS_ERROR } from '../reducers/trip.reducer';
import { TripService } from '../services/trip.service';

@Injectable()
export class TripsEffects {
  constructor( private actions$ : Actions,
               private tripService : TripService ) {
  }

  @Effect() getTrips$ = this.actions$
    .ofType(GET_TRIPS)
    .switchMap(action =>
      this.tripService.getTrips()
           .map(trips => ({type: GET_TRIPS_SUCCESS, payload: trips}))
           .catch(() => Observable.of({type: GET_TRIPS_ERROR})));
}
