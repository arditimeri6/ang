import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PreviewComponent } from './preview.component';
import { AfterLoginService } from 'src/app/services/auth/after-login.service';
import { PreviewBusinessComponent } from './preview-business/preview-business.component';

const routes: Routes = [
    {path: '', component:PreviewComponent, canActivate:[AfterLoginService], children:[
        {path:'business-profile/:slug', component:PreviewBusinessComponent, canActivate:[AfterLoginService]},
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PreviewRoutingModule { }
