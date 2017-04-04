import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { HeroModule } from "app/hero/hero.module";
import { HeroComponent } from "app/hero/hero.component";
import { AppRoutingModule } from "app/app-routing.module";
import { PageNotFoundComponent } from "app/not-found.component";


@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HeroModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
