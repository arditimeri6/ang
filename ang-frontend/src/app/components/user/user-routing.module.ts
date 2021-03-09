import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterLoginService } from 'src/app/services/auth/after-login.service';
import { UserComponent } from './user.component';
import { EventsComponent } from './events/events.component';
import { ReservationsComponent } from './reservations/reservations.component';


const routes: Routes = [
  {path: '', component:UserComponent, canActivate:[AfterLoginService], children:[
    {path:'events', component:EventsComponent},
    {path:'reservations', component:ReservationsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
