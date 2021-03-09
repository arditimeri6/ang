import { Component, OnInit } from '@angular/core';
import { AdminBusinessesService } from 'src/app/services/admin-businesses.service';

@Component({
  selector: 'app-preview-photogallery',
  templateUrl: './preview-photogallery.component.html',
  styleUrls: ['./preview-photogallery.component.scss']
})
export class PreviewPhotogalleryComponent implements OnInit {

    photogallery;
    
    constructor(private business:AdminBusinessesService) {  
        this.business.getPhotoGallery$.subscribe((business: any) => {
            this.photogallery = null;
            this.business.getBusinessPhotoGallery(business).subscribe( (photogallery: any) => {
                this.photogallery = photogallery.data;
            })
        })
    }

    ngOnInit() {
    }

}
