import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2DjangoChannelsDataBindingModule, WebSocketDataBindingService } from 'ng2-django-channels-data-binding';
import { Ng2DjangoChannelsDemultiplexingModule } from 'ng2-django-channels-demultiplexing';

import { HeroRoutingModule } from './hero-routing.module';
import { WebsocketService } from './websocket.service';
import { HeroComponent } from "app/hero/hero.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: 'heroes', component: HeroComponent }
];

@NgModule({
  declarations: [
    HeroComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HeroRoutingModule,
    // Specify library as an import and configure the WebSocket URL
    Ng2DjangoChannelsDataBindingModule,
    Ng2DjangoChannelsDemultiplexingModule.forRoot({websocket_url: 'ws://127.0.0.1:8000/api/ws'})
  ],
  providers: [WebsocketService],
})
export class HeroModule { }
