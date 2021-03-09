import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-business-register',
  templateUrl: './confirm-business-register.component.html',
  styleUrls: ['./confirm-business-register.component.scss']
})
export class ConfirmBusinessRegisterComponent implements OnInit {
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
      this.router.navigateByUrl('auth/vendor/register');
    }
    handleError(error){
      this.error = error.error.errors
      console.log(error);
    }
}
