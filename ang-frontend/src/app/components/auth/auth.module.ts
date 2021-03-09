import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { VerifyBusinessRegisterComponent } from './business-register/verify-business-register/verify-business-register.component';
import { ConfirmBusinessRegisterComponent } from './business-register/confirm-business-register/confirm-business-register.component';
import { BusinessDataRegisterComponent } from './business-register/business-data-register/business-data-register.component';
import {FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserChannelsComponent } from './user-channels/user-channels.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserDataRegisterComponent } from './user-register/user-data-register/user-data-register.component';
import { ConfirmUserRegisterComponent } from './user-register/confirm-user-register/confirm-user-register.component';
import { VerifyUserRegisterComponent } from './user-register/verify-user-register/verify-user-register.component';


@NgModule({
  declarations: [
      VerifyBusinessRegisterComponent, 
      ConfirmBusinessRegisterComponent, 
      BusinessDataRegisterComponent,
      LoginComponent, 
      UserChannelsComponent, UserRegisterComponent, UserDataRegisterComponent, ConfirmUserRegisterComponent, VerifyUserRegisterComponent
    ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
