import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data-register',
  templateUrl: './user-data-register.component.html',
  styleUrls: ['./user-data-register.component.scss']
})
export class UserDataRegisterComponent implements OnInit {
  validateRegisterUser = {
    email:null,
    verify_token:null,
 
  }
  form = {
   email:null,
   verify_token:null,
   passowrd:null,
   password_confirmation:null,
   name:null
  }
  error = {
   email:null,
   verify_token:null,
   passowrd:null,
   password_confirmation:null,
   name:null
  }
   constructor(private authService:AuthService,
               private tokenService: TokenService,
               private authenticateService:AuthenticateService,
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
    // console.log(data);
    }
    
    handleValidError(error){
      this.authService.removeVerifyToken();
      this.router.navigateByUrl('/home');
    }
    onSubmit(){
      this.authService.signup(this.form).subscribe(
        data => this.registerHandleData(data),
        error => this.handleRegisterError(error)
      )
    }
    registerHandleData(data){
     this.tokenService.handle(data.access_token);
     this.authenticateService.changeAuthStatus(true);
     this.authService.removeVerifyToken();
     this.router.navigateByUrl('/home');
    }

    handleRegisterError(error){
     this.error = error.error.errors;
    }

}
