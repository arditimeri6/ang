import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewRoutingModule } from './preview-routing.module';
import { FormsModule } from '@angular/forms';
import { PreviewBusinessComponent } from './preview-business/preview-business.component';
import { PreviewTextboxComponent } from './preview-business/preview-textbox/preview-textbox.component';
import { PreviewPhotogalleryComponent } from './preview-business/preview-photogallery/preview-photogallery.component';
import { PreviewVideogalleryComponent } from './preview-business/preview-videogallery/preview-videogallery.component';
import { PreviewPlacesComponent } from './preview-business/preview-places/preview-places.component';
import { PreviewVideoComponent } from './preview-business/preview-videogallery/preview-video/preview-video.component';
import { PreviewComponent } from './preview.component';


@NgModule({
    imports: [
        CommonModule,
        PreviewRoutingModule,
        FormsModule,
    ],
    declarations: [
        PreviewBusinessComponent, 
        PreviewTextboxComponent, 
        PreviewPhotogalleryComponent,
        PreviewVideogalleryComponent, 
        PreviewPlacesComponent, 
        PreviewVideoComponent,
        PreviewComponent
    ],
})

export class PreviewModule { }