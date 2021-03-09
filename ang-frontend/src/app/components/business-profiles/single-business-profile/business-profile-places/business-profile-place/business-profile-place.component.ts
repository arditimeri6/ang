import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/interfaces/place.inteface';

@Component({
  selector: 'app-business-profile-place',
  templateUrl: './business-profile-place.component.html',
  styleUrls: ['./business-profile-place.component.scss']
})
export class BusinessProfilePlaceComponent implements OnInit {
@Input() place:Place;
  constructor() { }

  ngOnInit() {
   
  }

}
