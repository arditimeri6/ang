import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { BusinessProfile } from 'src/app/interfaces/business-profile.interface';

@Component({
  selector: 'app-business-profiles',
  templateUrl: './business-profiles.component.html',
  styleUrls: ['./business-profiles.component.scss']
})
export class BusinessProfilesComponent implements OnInit {
  businessesprofiles:BusinessProfile[];
  constructor(private businessService:BusinessService) { }

  ngOnInit() {
  this.getBusinesses();
  }

  getBusinesses(){
    this.businessService.getbusinessesprofiles().subscribe(resp=>{
      this.handleResponse(resp);
    });
  }
  handleResponse(resp){
    this.businessesprofiles = resp.data;
    
  }
}
