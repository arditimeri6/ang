import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyBusinessRegisterComponent } from './business-register/verify-business-register/verify-business-register.component';
import { ConfirmBusinessRegisterComponent } from './business-register/confirm-business-register/confirm-business-register.component';
import { BusinessDataRegisterComponent } from './business-register/business-data-register/business-data-register.component';
import { BeforeLoginService } from 'src/app/services/auth/before-login.service';
import { LoginComponent } from './login/login.component';
import { UserChannelsComponent } from './user-channels/user-channels.component';
import { AfterLoginService } from 'src/app/services/auth/after-login.service';
import { VerifyUserRegisterComponent } from './user-register/verify-user-register/verify-user-register.component';
import { ConfirmUserRegisterComponent } from './user-register/confirm-user-register/confirm-user-register.component';
import { UserDataRegisterComponent } from './user-register/user-data-register/user-data-register.component';


const routes: Routes = [
  {path: 'vendor/verify', component:VerifyBusinessRegisterComponent, canActivate:[BeforeLoginService]},
  {path: 'vendor/confirm', component:ConfirmBusinessRegisterComponent, canActivate:[BeforeLoginService]},
  {path: 'vendor/register', component:BusinessDataRegisterComponent, canActivate:[BeforeLoginService]},
  {path: 'user/verify', component:VerifyUserRegisterComponent, canActivate:[BeforeLoginService]},
  {path: 'user/confirm', component:ConfirmUserRegisterComponent, canActivate:[BeforeLoginService]},
  {path: 'user/register', component:UserDataRegisterComponent, canActivate:[BeforeLoginService]},
  {path: 'login', component:LoginComponent, canActivate:[BeforeLoginService]},
  {path: 'channels', component:UserChannelsComponent,canActivate:[AfterLoginService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
