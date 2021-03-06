import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroModule } from "app/hero/hero.module";
import { HomeModule } from "app/home/home.module";
import { AuthModule } from "app/auth/auth.module";
import { DashboardModule } from "app/dashboard/dashboard.module";
import { ScoreboardModule } from "app/scoreboard/scoreboard.module";
import { PageNotFoundComponent } from "app/not-found.component";
import 'hammerjs';
import { RulesComponent } from './rules/rules.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusyModule } from 'angular2-busy';
import { tripReducer } from './shared/reducers/trip.reducer';
import { TripEffects } from './shared/effects/trip.effects';
import { configReducer } from './shared/reducers/config.reducer';
import { ConfigEffects } from "./shared/effects/config.effects";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    RulesComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BusyModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    FormsModule,
    CoreModule,
    HttpModule,
    AppRoutingModule,
    HomeModule,
    HeroModule,
    ScoreboardModule,
    DashboardModule,
    AuthModule,
    StoreModule.provideStore({tripReducer: tripReducer, configReducer: configReducer}),
    EffectsModule.run(TripEffects),
    EffectsModule.run(ConfigEffects),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
