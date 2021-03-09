import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-confirm-user-register',
  templateUrl: './confirm-user-register.component.html',
  styleUrls: ['./confirm-user-register.component.scss']
})
export class ConfirmUserRegisterComponent implements OnInit {
  form = {
    email:null,
    verify_token:null,
  }
  error = {
    email:null,
    verify_token:null,
  }
    constructor(private authService:AuthService,
                private router:Router) { }
  
    ngOnInit() {
      this.form.email = this.authService.getEmail();
    }

    onSubmit(){
      this.authService.confirmRegistration(this.form).subscribe(
        data => this.handleData(data),
        error => this.handleError(error)
      )
    }
  
    handleData(data){
      this.authService.setVerifyToken(data.verify_token);
      this.router.navigateByUrl('auth/user/register');
    }
    handleError(error){
      this.error = error.error.errors
      console.log(error);
    }
}
