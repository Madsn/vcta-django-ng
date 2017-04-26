import { NgModule } from '@angular/core';

import { UserStatsComponent } from './user-stats';

export const COMPONENTS = [
  UserStatsComponent
];


@NgModule({
  imports: [],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
