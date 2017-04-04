import { Injectable } from '@angular/core';
import { DataBinding, WebSocketDataBindingService } from 'ng2-django-channels-data-binding';

interface Hero {
  id: any;
  name: String;
}

@Injectable()
export class WebsocketService {
  constructor(private webSocketDataBindingService: WebSocketDataBindingService) {
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
  }

  private create(hero: Hero): void {
    this.webSocketDataBindingService.create(
      'hero', 'hero_service.hero', {'name': hero.name});
  }

  private update(hero: Hero): void {
    this.webSocketDataBindingService.update(
      'hero', 'hero_service.hero', hero.id, {'name': hero.name});
  }

  delete(hero: Hero): void {
    this.webSocketDataBindingService.delete(
      'hero', 'hero_service.hero', hero.id);
  }

  public clicked(): void {
    const hero = {name: 'test', id: 0};
    this.create(hero);
  }
}