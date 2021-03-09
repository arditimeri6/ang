import { Component, OnInit, Input } from '@angular/core';
import { BusinessProfile } from 'src/app/interfaces/business-profile.interface';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {
  @Input() businessprofile:BusinessProfile[];
  constructor() { }

  ngOnInit() {
    //  console.log(this.businessprofile)
  }

}
