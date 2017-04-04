import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "app/not-found.component";
import { HeroComponent } from "app/hero/hero.component";

const appRoutes: Routes = [
  //{ path: '', redirectTo: '/hero', pathMatch: 'full' },
  { path: 'hero', component: HeroComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }