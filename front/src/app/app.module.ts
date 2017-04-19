import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    HttpModule,
    AppRoutingModule,
    HomeModule,
    HeroModule,
    ScoreboardModule,
    DashboardModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
