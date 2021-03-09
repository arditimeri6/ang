import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AfterLoginService } from 'src/app/services/auth/after-login.service';
import { PlansComponent } from './plans/plans.component';
import { UsersComponent } from './users/users.component';
import { UserBusinessesComponent } from './user-businesses/user-businesses.component';
import { BusinessTypesComponent } from './business-types/business-types.component';
import { ModulesComponent } from './modules/modules.component';
import { BusinessComponent } from './business/business.component';
import { EventTypesComponent } from './event-types/event-types.component';


const routes: Routes = [
  {path: '', component:AdminComponent, canActivate:[AfterLoginService], children:[
    {path:'plans', component:PlansComponent},
    {path:'users', component:UsersComponent},
    {path:'businesses', component:BusinessComponent},
    {path:'user-businesses', component:UserBusinessesComponent},
    {path:'business-types', component:BusinessTypesComponent},
    {path:'modules', component:ModulesComponent},
    {path:'event-types', component:EventTypesComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
