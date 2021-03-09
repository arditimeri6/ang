import { Component, OnInit } from '@angular/core';
import { AdminBusinessesService } from 'src/app/services/admin-businesses.service';

@Component({
  selector: 'app-preview-places',
  templateUrl: './preview-places.component.html',
  styleUrls: ['./preview-places.component.scss']
})
export class PreviewPlacesComponent implements OnInit {

    places;

    constructor(private business:AdminBusinessesService) { 
        this.business.getPlaces$.subscribe((business: any) => {
            this.places = null;
            this.business.getBusinessPlaces(business).subscribe( (places: any) => {
                this.places = places.data;
            })
        })
    }

    ngOnInit() {
    }

}
