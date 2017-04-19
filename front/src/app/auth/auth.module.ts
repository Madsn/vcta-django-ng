import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule
  ],
  declarations: [LoginComponent, SignupComponent, AuthComponent]
})
export class AuthModule { }
