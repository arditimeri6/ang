import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private AuthServices: AuthenticateService) { }
    
public form = {
  email: null,
  name: null,
  password: null,
  password_confirmation: null,
  role_id:2,
};
public error = [];
ngOnInit() {
}
onSubmit() {
return this.authService.signup(this.form).subscribe(
data => this.handleResponse(data),
error => this.handleError(error)
);
}
handleResponse(data) {
  console.log(data);
}
handleError(error) {
  this.error = error.error.errors;
}

}
