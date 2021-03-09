import { Component, OnInit, Input } from '@angular/core';
import { ProfilePlace } from 'src/app/interfaces/profile-place.interface';
import { PlaceService } from 'src/app/services/place.service';
import { Place } from 'src/app/interfaces/place.inteface';

@Component({
  selector: 'app-business-profile-places',
  templateUrl: './business-profile-places.component.html',
  styleUrls: ['./business-profile-places.component.scss']
})
export class BusinessProfilePlacesComponent implements OnInit {
 @Input() slug:any;
 places:Place[];
  constructor(private placeService:PlaceService) { }

  ngOnInit() {
    this.getPlaces();
  }
  getPlaces(){
    this.placeService.getSingleProfilePlace(this.slug).subscribe(resp=>{
      this.handleResponse(resp);
    })
  }

  handleResponse(resp){
    this.places  = resp.data;
    // console.log(this.places);
  }
}
