import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HeroRoutingModule } from './hero-routing.module';
import { HeroComponent } from "./hero.component";
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
    SharedModule,
    HeroRoutingModule
  ],
  providers: [],
})
export class HeroModule { }
