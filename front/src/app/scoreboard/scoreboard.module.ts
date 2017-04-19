import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { ScoreboardComponent } from './scoreboard.component';

@NgModule({
  imports: [
    CommonModule,
    ScoreboardRoutingModule
  ],
  declarations: [ScoreboardComponent]
})
export class ScoreboardModule { }
