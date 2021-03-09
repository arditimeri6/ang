import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingleBusinessProfileComponent } from './components/business-profiles/single-business-profile/single-business-profile.component';
import { BusinessProfilesComponent } from './components/business-profiles/business-profiles.component';
import { SingleBusinessProfilePlaceComponent } from './components/business-profiles/single-business-profile/business-profile-places/single-business-profile-place/single-business-profile-place.component';
import { RequestPasswordResetComponent } from './components/signup/request-password-reset/request-password-reset.component';
import { ResponsePasswordResetComponent } from './components/signup/response-password-reset/response-password-reset.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  { path: 'auth', loadChildren: './components/auth/auth.module#AuthModule'},
  { path: 'dashboard', loadChildren: './components/dashboard/dashboard.module#DashboardModule'},
  { path: 'admin', loadChildren: './components/admin/admin.module#AdminModule'},
  { path: 'user', loadChildren: './components/user/user.module#UserModule'},
  { path: 'preview', loadChildren: './components/preview/preview.module#PreviewModule'},
  { path: 'home', component:HomeComponent },
  { path: 'profiles', component:BusinessProfilesComponent},
  { path: 'profiles/:slug', component:SingleBusinessProfileComponent},
  { path: 'profiles/:slug/:place', component:SingleBusinessProfilePlaceComponent},
  { path: 'request-password-reset', component:RequestPasswordResetComponent},
  { path: 'response-password-reset', component:ResponsePasswordResetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
