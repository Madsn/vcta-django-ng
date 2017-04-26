import { NgModule } from '@angular/core';

import { TripService } from './trip.service';
import { UserService } from './user.service';
import { WebsocketService } from './websocket.service';


export const SERVICES = [
  TripService,
  UserService,
  WebsocketService
];


@NgModule({
  imports: [],
  declarations: SERVICES,
  exports: SERVICES
})
export class ServiceModule { }
