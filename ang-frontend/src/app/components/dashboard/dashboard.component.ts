import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { TokenService } from 'src/app/services/auth/token.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BusinessService } from 'src/app/services/business.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 verify_token:string;
 user_id;
 profileVerification = true;
 public form ={
  user_id:null, 
  verify_token:null,

 }
  constructor(private businessService:BusinessService) { 
      
    }

  ngOnInit() {
    this.getBusinessActive();
  }
  getBusinessActive(){
    this.businessService.getActive().subscribe(resp=>{
     this.handleBusinessActive(resp);
    });
  }
 
  handleBusinessActive(resp){
    this.businessService.handleBusinessActiveData(resp);
  }
}
