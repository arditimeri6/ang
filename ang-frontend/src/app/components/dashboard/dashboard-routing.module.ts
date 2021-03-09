import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AfterLoginService } from 'src/app/services/auth/after-login.service';
import { PlansComponent } from './plans/plans.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { MediaComponent } from './media/media.component';
import { PlacesComponent } from './places/places.component';
import { InfosComponent } from './infos/infos.component';
import { UsersComponent } from './users/users.component';
import { SinglePlaceComponent } from './places/single-place/single-place.component';
import { EventTypesComponent } from './event-types/event-types.component';


const routes: Routes = [
            {path: '', component:DashboardComponent, canActivate:[AfterLoginService], children:[
            {path:'media', component:MediaComponent, canActivate:[AfterLoginService]},
            {path:'plans', component:PlansComponent, canActivate:[AfterLoginService]},
            {path:'settings', component:SettingsComponent, canActivate:[AfterLoginService]},
            {path:'infos', component:InfosComponent, canActivate:[AfterLoginService]},
            {path:'users', component:UsersComponent, canActivate:[AfterLoginService]},
            {path:'profile', component:ProfileComponent, canActivate:[AfterLoginService]},
            {path:'places', component:PlacesComponent, canActivate:[AfterLoginService]},
            {path:'places/:id', component:SinglePlaceComponent, canActivate:[AfterLoginService]},
            {path:'event-types', component:EventTypesComponent, canActivate:[AfterLoginService]}
          ]},
        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
