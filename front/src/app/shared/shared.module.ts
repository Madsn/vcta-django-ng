import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2DjangoChannelsDataBindingModule, WebSocketDataBindingService } from 'ng2-django-channels-data-binding';
import { Ng2DjangoChannelsDemultiplexingModule } from 'ng2-django-channels-demultiplexing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SERVICES } from './services';
import { COMPONENTS } from './components';
import { tripReducer } from './reducers/trip.reducer';
import { TripEffects } from './effects/trip.effects';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    Ng2DjangoChannelsDataBindingModule,
    Ng2DjangoChannelsDemultiplexingModule.forRoot({websocket_url: 'ws://127.0.0.1:8000/api/ws'}),
    StoreModule.provideStore({tripReducer}),
    EffectsModule.run(TripEffects),
  ],
  declarations: [COMPONENTS],
  providers: [SERVICES],
  exports: [COMPONENTS]
})
export class SharedModule { }
