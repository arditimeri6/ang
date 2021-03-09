import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import { BusinessType } from 'src/app/interfaces/businesstype.interface';
import { TokenService } from 'src/app/services/auth/token.service';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-business-data-register',
  templateUrl: './business-data-register.component.html',
  styleUrls: ['./business-data-register.component.scss']
})
export class BusinessDataRegisterComponent implements OnInit {
 validateRegisterUser = {
   email:null,
   verify_token:null,

 }
 form = {
  email:null,
  verify_token:null,
  business_type_id:null,
  title:null,
  passowrd:null,
  password_confirmation:null,
  name:null
 }
 error = {
  email:null,
  verify_token:null,
  business_type_id:null,
  title:null,
  passowrd:null,
  password_confirmation:null,
  name:null
 }
 businesses:BusinessType[];
  constructor(private authService:AuthService,
              private businessTypeService: BusinessTypeService,
              private tokenService: TokenService,
              private authenticateService:AuthenticateService,
              private businessService:BusinessService,
              private router:Router) { }

  ngOnInit() {
    this.validateRegisterUser.email = this.authService.getEmail();
    this.validateRegisterUser.verify_token = this.authService.getVerifyToken();
    if(this.validateRegisterUser.email !== null && this.validateRegisterUser.verify_token !== null){
      this.validRegister();
      this.form.verify_token = this.validateRegisterUser.verify_token;
      this.form.email =  this.validateRegisterUser.email;
    }
  }
   validRegister(){
    this.authService.validateRoute(this.validRegister).subscribe(
      data => this.handleValidData(data),
      error => this.handleValidError(error)
    )
   }
   handleValidData(data){
   this.businessTypeService.getBusinessType().subscribe(resp=>{
     this.handleBusinesses(resp);
   });
   }
   handleValidError(error){
    console.log(error);
   }
   handleBusinesses(resp){
     this.businesses = resp.data;
   }
   onSubmit(){
     this.authService.businessSignup(this.form).subscribe(
       data => this.registerHandleData(data),
       error => this.handleRegisterError(error)
     )
   }
   registerHandleData(data){

    this.tokenService.handle(data.token.original.access_token);
    this.authenticateService.changeAuthStatus(true);
    this.businessService.setBusiness(data.business);
    this.authService.removeVerifyToken();
    this.router.navigateByUrl('/dashboard/plans');
   }
   handleRegisterError(error){
    this.error = error.error.errors
    console.log(error);
   }
}
