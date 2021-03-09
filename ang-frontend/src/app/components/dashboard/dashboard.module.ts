import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PlansComponent } from './plans/plans.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PhotogalleriesComponent } from './photogalleries/photogalleries.component';
import { AddPhotogalleryComponent } from './photogalleries/add-photogallery/add-photogallery.component';
import { TrashedPhotogalleryComponent } from './photogalleries/trashed-photogallery/trashed-photogallery.component';
import { PhotogalleryComponent } from './photogalleries/photogallery/photogallery.component';
import { VideogalleriesComponent } from './videogalleries/videogalleries.component';
import { AddVideogalleryComponent } from './videogalleries/add-videogallery/add-videogallery.component';
import { MediaComponent } from './media/media.component';
import { FormsModule } from '@angular/forms';
import { VideogalleryComponent } from './videogalleries/videogallery/videogallery.component';
import { TrashedVideogalleryComponent } from './videogalleries/trashed-videogallery/trashed-videogallery.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { PlacesComponent } from './places/places.component';
import { PlaceComponent } from './places/place/place.component';
import { AddPlaceComponent } from './places/add-place/add-place.component';
import { TrashedPlaceComponent } from './places/trashed-place/trashed-place.component';
import { InfosComponent } from './infos/infos.component';
import { UsersComponent } from './users/users.component';
import localeFr from '@angular/common/locales/sq';
import { OffersComponent } from './offers/offers.component';
import { AddOfferComponent } from './offers/add-offer/add-offer.component';
import { OfferComponent } from './offers/offer/offer.component';
import { TrashedOfferComponent } from './offers/trashed-offer/trashed-offer.component';
import { SinglePlaceComponent } from './places/single-place/single-place.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendars/calendar/calendar.component';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule, MatDatepickerIntl} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgxImageCompressService} from 'ngx-image-compress';
import { DragDropDirective } from 'src/app/directives/drag-drop.directive';
import { EventTypesComponent } from './event-types/event-types.component';
import { AddEventTypesComponent } from './event-types/add-event-types/add-event-types.component';
import { UserPermissionsComponent } from './users/user-permissions/user-permissions.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { ArchiveUserComponent } from './users/archive-user/archive-user.component';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule,
    MatFormFieldModule, MatRadioModule, MatSelectModule, MatSliderModule, 
    MatSlideToggleModule, MatTableModule, MatIconModule, MatPaginatorModule } from '@angular/material';
import { EditUserPermissionsComponent } from './users/user-permissions/edit-user-permissions/edit-user-permissions.component';
import { UserSendInvitationComponent } from './users/user-send-invitation/user-send-invitation.component';
import { PlanComponent } from './plans/plan/plan.component';

// import { DraganddropdirectiveDirective } from 'src/app/directives/draganddropdirective.directive';
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    DashboardComponent, 
    SidebarComponent, 
    PlansComponent, 
    SettingsComponent, 
    ProfileComponent, 
    PhotogalleriesComponent, 
    AddPhotogalleryComponent, 
    TrashedPhotogalleryComponent, 
    PhotogalleryComponent, 
    VideogalleriesComponent, 
    AddVideogalleryComponent, 
    MediaComponent, 
    VideogalleryComponent, 
    TrashedVideogalleryComponent, 
    TextAreaComponent, 
    PlacesComponent,
    PlaceComponent, 
    AddPlaceComponent, 
    TrashedPlaceComponent, 
    InfosComponent, 
    UsersComponent, 
    OffersComponent, 
    AddOfferComponent, 
    OfferComponent, 
    TrashedOfferComponent, 
    SinglePlaceComponent, 
    CalendarsComponent,
    CalendarComponent,
    DragDropDirective,
    EventTypesComponent,
    AddEventTypesComponent,
    UserPermissionsComponent,
    EditUserComponent,
    DeleteUserComponent,
    ArchiveUserComponent,
    EditUserPermissionsComponent,
    UserSendInvitationComponent,
    PlanComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTableModule,
    MatIconModule, 
    MatNativeDateModule, 
    MatPaginatorModule,
    DragDropModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  
  providers: [NgxImageCompressService],
})
export class DashboardModule { }
