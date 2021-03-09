import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ReservationsComponent } from './reservations/reservations.component';
import { EventsComponent } from './events/events.component';
import { UserComponent } from './user.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { ReservationComponent } from './reservations/reservation/reservation.component';


@NgModule({
  declarations: [
    ReservationsComponent, 
    EventsComponent, 
    UserComponent, 
    UserSidebarComponent, ReservationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
