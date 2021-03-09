
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestPasswordResetComponent } from './components/signup/request-password-reset/request-password-reset.component';
import { ResponsePasswordResetComponent } from './components/signup/response-password-reset/response-password-reset.component';
import {SnotifyModule, ToastDefaults, SnotifyService} from 'ng-snotify';
import { BrowserModule } from '@angular/platform-browser';
import { ModulesComponent } from './components/modules/modules.component';
import { ModuleComponent } from './components/modules/module/module.component';
import { AddModuleComponent } from './components/modules/add-module/add-module.component';
import { HttpModule } from '@angular/http';
import { BusinesstypesComponent } from './components/businesstypes/businesstypes.component';
import { BusinesstypeComponent } from './components/businesstypes/businesstype/businesstype.component';
import { AddBusinesstypeComponent } from './components/businesstypes/add-businesstype/add-businesstype.component';
import { SingleModuleComponent } from './components/modules/single-module/single-module.component';
import { SingleBusinesstypeComponent } from './components/businesstypes/single-businesstype/single-businesstype.component';
import { LocationsComponent } from './components/dashboard/locations/locations.component';
import { LocationComponent } from './components/dashboard/locations/location/location.component';
import { AddLocationComponent } from './components/dashboard/locations/add-location/add-location.component';
import { TokenInterCeptorService } from './services/auth/token-interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from './components/auth/auth.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AdminModule } from './components/admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessProfilesComponent } from './components/business-profiles/business-profiles.component';
import { BusinessProfileComponent } from './components/business-profiles/business-profile/business-profile.component';
import { SingleBusinessProfileComponent } from './components/business-profiles/single-business-profile/single-business-profile.component';
import { CategorizedProfilesComponent } from './components/business-profiles/categorized-profiles/categorized-profiles.component';
import { BusinessProfilePlacesComponent } from './components/business-profiles/single-business-profile/business-profile-places/business-profile-places.component';
import { BusinessProfilePlaceComponent } from './components/business-profiles/single-business-profile/business-profile-places/business-profile-place/business-profile-place.component';
import { SingleBusinessProfilePlaceComponent } from './components/business-profiles/single-business-profile/business-profile-places/single-business-profile-place/single-business-profile-place.component';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, 
    MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, 
    MatSlideToggleModule, MatTableModule, MatIconModule, MatNativeDateModule, MatPaginatorModule } from '@angular/material';
import { BusinessProfileVideosComponent } from './components/business-profiles/single-business-profile/business-profile-videos/business-profile-videos.component';
import { BusinessProfileVideoComponent } from './components/business-profiles/single-business-profile/business-profile-videos/business-profile-video/business-profile-video.component';
import { YoutubeVideoComponent } from './components/business-profiles/single-business-profile/business-profile-videos/business-profile-video/youtube-video/youtube-video.component';
import { BusinessProfileTextboxComponent } from './components/business-profiles/single-business-profile/business-profile-textbox/business-profile-textbox.component';
import { BusinessProfileGalleryComponent } from './components/business-profiles/single-business-profile/business-profile-gallery/business-profile-gallery.component';
import { UserModule } from './components/user/user.module';
import { PreviewModule } from './components/preview/preview.module';



@NgModule({
 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    SnotifyModule,
    AuthModule,
    DashboardModule,
    AdminModule,
    UserModule,
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
    PreviewModule
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    RequestPasswordResetComponent,
    ResponsePasswordResetComponent,
    ModulesComponent,
    ModuleComponent,
    AddModuleComponent,
    BusinesstypesComponent,
    BusinesstypeComponent,
    AddBusinesstypeComponent,
    SingleModuleComponent,
    SingleBusinesstypeComponent,
    LocationsComponent,
    LocationComponent,
    AddLocationComponent,
    HomeComponent,
    HeaderComponent,
    BusinessProfilesComponent,
    BusinessProfileComponent,
    SingleBusinessProfileComponent,
    CategorizedProfilesComponent,
    BusinessProfilePlacesComponent,
    BusinessProfilePlaceComponent,
    SingleBusinessProfilePlaceComponent,
    BusinessProfileVideosComponent,
    BusinessProfileVideoComponent,
    YoutubeVideoComponent,
    BusinessProfileTextboxComponent,
    BusinessProfileGalleryComponent,
  ],
  
  providers: [
    {provide:'SnotifyToastConfig', useValue:ToastDefaults},
    SnotifyService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterCeptorService,
      multi:true
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
