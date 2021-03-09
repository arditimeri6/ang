import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BusinessProfile } from 'src/app/interfaces/business-profile.interface';

@Component({
  selector: 'app-single-business-profile',
  templateUrl: './single-business-profile.component.html',
  styleUrls: ['./single-business-profile.component.scss']
})
export class SingleBusinessProfileComponent implements OnInit {
businessprofile:BusinessProfile;
slug:string = null;
  constructor(private businessService:BusinessService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSingleService();
  }

  getSingleService(){
  this.route.params
      .subscribe(
        (params: Params) =>{
          this.slug = params['slug'];
          this.businessService.getsinglebusinessesprofiles(this.slug).subscribe(resp=>{
            this.handleResponse(resp)
          }
        )
        }
      )
    }
  handleResponse(resp){
    this.businessprofile = resp.data;
  }
}
