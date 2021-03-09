import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profile:any;
  loggedin = false;
  business = null;
  constructor(private authService:AuthService,
              private authenticateServices: AuthenticateService,
              private businessService:BusinessService,
              private router:Router) { 
              this.authenticateServices.authStatus.subscribe(value => this.loggedin = value);
                if(this.loggedin == true){
                  this.getProfile();
                  this.businessService.shareBusiness.subscribe(resp => this.businessActive(resp));
                }
              
              }
businessActive(resp){
  this.business = resp.data;
}
  ngOnInit() {
  
  }
  
  getProfile(){
    this.authService.showProfile().subscribe(resp=>{
      this.profile = resp;
    })
  }
    logOut(){
      this.authService.logout().subscribe(resp=>{
        this.handleLogoutResponse();
      });
    }
    handleLogoutResponse(){
      this.authenticateServices.changeAuthStatus(false);
      this.router.navigateByUrl('/auth/login');
    }
}
