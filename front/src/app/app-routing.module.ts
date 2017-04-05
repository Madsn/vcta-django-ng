import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from "app/hero/hero.component";
import { HeroModule } from "app/hero/hero.module";
import { AppComponent } from "app/app.component";
import { HomeModule } from "app/home/home.module";
import { HomeComponent } from "app/home/home.component";

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
