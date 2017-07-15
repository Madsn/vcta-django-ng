import { NgModule } from '@angular/core';

import { TripService } from './trip.service';
import { UserService } from './user.service';
import { TeamService } from './team.service';
import { WebsocketService } from './websocket.service';


export const SERVICES = [
  TripService,
  UserService,
  TeamService,
  WebsocketService
];


@NgModule({
  imports: [],
  declarations: SERVICES,
  exports: SERVICES
})
export class ServiceModule { }
