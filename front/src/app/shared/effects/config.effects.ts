import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { ConfigService } from "../services/config.service";
import { GET_CONFIGS, GET_CONFIGS_ERROR, GET_CONFIGS_SUCCESS } from "../reducers/config.reducer";

@Injectable()
export class ConfigEffects {
  constructor( private actions$ : Actions,
               private configService : ConfigService ) {
  }

  @Effect() getConfigs$ = this.actions$
    .ofType(GET_CONFIGS)
    .switchMap(action =>
      this.configService.getConfigs()
           .map(configs => ({type: GET_CONFIGS_SUCCESS, payload: configs}))
           .catch(() => Observable.of({type: GET_CONFIGS_ERROR})));
}
