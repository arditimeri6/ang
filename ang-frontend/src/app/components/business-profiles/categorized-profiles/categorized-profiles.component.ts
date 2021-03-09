import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { CategorizedProfile } from 'src/app/interfaces/categorized-profile.interface';

@Component({
  selector: 'app-categorized-profiles',
  templateUrl: './categorized-profiles.component.html',
  styleUrls: ['./categorized-profiles.component.scss']
})
export class CategorizedProfilesComponent implements OnInit {
  categorizedprofiles:CategorizedProfile[];
  constructor(private businessService:BusinessService) { }

  ngOnInit() {
    this.getCategorizedProfile();
  }
  getCategorizedProfile(){
      this.businessService.getcategorizedprofiles().subscribe(resp=>{
          this.handleResponse(resp);
      });
  }
  handleResponse(resp){
    this.categorizedprofiles = resp.data;
    // console.log(this.categorizedprofiles);
  }
}
