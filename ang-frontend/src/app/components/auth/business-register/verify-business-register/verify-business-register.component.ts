import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-business-register',
  templateUrl: './verify-business-register.component.html',
  styleUrls: ['./verify-business-register.component.scss']
})
export class VerifyBusinessRegisterComponent implements OnInit {
form = {
  email:null,
}
error = {
  email:null,
}
  constructor(private authService:AuthService,
              private router:Router) { }

  ngOnInit() {
  }
  onSubmit(){
    this.authService.sendVerificationEmail(this.form).subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    )
  }

  handleData(data){
    this.authService.setEmail(this.form.email);
    this.router.navigateByUrl('auth/vendor/confirm');
  }
  handleError(error){
    this.error = error.error.errors
  }
}
