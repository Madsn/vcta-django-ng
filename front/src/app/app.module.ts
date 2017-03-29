import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2DjangoChannelsDataBindingModule, WebSocketDataBindingService } from 'ng2-django-channels-data-binding';
import { Ng2DjangoChannelsDemultiplexingModule } from 'ng2-django-channels-demultiplexing';

import { AppComponent } from './app.component';
import { WebsocketService } from './websocket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // Specify library as an import and configure the WebSocket URL
    Ng2DjangoChannelsDataBindingModule,
    Ng2DjangoChannelsDemultiplexingModule.forRoot({websocket_url: 'ws://127.0.0.1:8000/api/ws'})
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
