import { Injectable } from '@angular/core';
import { DataBinding, WebSocketDataBindingService } from 'ng2-django-channels-data-binding';
import { Trip } from './core.models';

interface Hero {
  id: any;
  name: String;
}

@Injectable()
export class WebsocketService {
  constructor(private webSocketDataBindingService: WebSocketDataBindingService) {
    /*
    webSocketDataBindingService.subscribe(
      // Django Channels Demultiplexer Stream
      'hero',
      // Django model
      'hero_service.hero',
      (payload: DataBinding) => {
        if(payload.action === 'create') {
          console.log(payload);
        } else if(payload.action === 'update') {
          console.log(payload);
        } else if(payload.action === 'delete') {
          console.log(payload);
        } else {
          console.log(payload);
        }
      }
    );
    */
    webSocketDataBindingService.subscribe(
      // Django Channels Demultiplexer Stream
      'trip',
      // Django model
      'vcta_service.trip',
      (payload: DataBinding) => {
        if(payload.action === 'create') {
          console.log(payload);
        } else if(payload.action === 'update') {
          console.log(payload);
        } else if(payload.action === 'delete') {
          console.log(payload);
        } else {
          console.log(payload);
        }
      }
    );
  }

  create(trip: Trip): void {
    this.webSocketDataBindingService.create(
      'trip', 'trip_service.trip', {'user': trip.user, 'date': trip.date, 'distance': trip.distance});
  }

  update(trip: Trip): void {
    this.webSocketDataBindingService.update(
      'trip', 'trip_service.trip', trip.id, {'user': trip.user, 'date': trip.date, 'distance': trip.distance});
  }

  delete(trip: Trip): void {
    this.webSocketDataBindingService.delete(
      'trip', 'trip_service.trip', trip.id);
  }

}
