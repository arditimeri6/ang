import { Component, OnInit } from '@angular/core';
import { AdminBusinessesService } from 'src/app/services/admin-businesses.service';

@Component({
  selector: 'app-preview-videogallery',
  templateUrl: './preview-videogallery.component.html',
  styleUrls: ['./preview-videogallery.component.scss']
})
export class PreviewVideogalleryComponent implements OnInit {

    videogallery;

    constructor(private business:AdminBusinessesService) {
        this.business.getVideoGallery$.subscribe((business: any) => {
            this.videogallery = null;
            this.business.getBusinessVideoGallery(business).subscribe((videogallery: any) => {
                this.videogallery = videogallery.data;
            })
        })
    }

    ngOnInit() {
    }

}
