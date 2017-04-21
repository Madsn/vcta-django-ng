import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { ScoreboardComponent } from './scoreboard.component';

@NgModule({
  imports: [
    CommonModule,
    ScoreboardRoutingModule,
    NgbModule
  ],
  declarations: [ScoreboardComponent]
})
export class ScoreboardModule { }
