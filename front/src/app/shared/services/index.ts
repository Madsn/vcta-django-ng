import { NgModule } from '@angular/core';

import { TripService } from './trip.service';
import { UserService } from './user.service';
import { TeamService } from './team.service';
import { ConfigService } from './config.service';
import { WebsocketService } from './websocket.service';


export const SERVICES = [
  TripService,
  UserService,
  TeamService,
  ConfigService,
  WebsocketService
];


@NgModule({
  imports: [],
  declarations: SERVICES,
  exports: SERVICES
})
export class ServiceModule { }
