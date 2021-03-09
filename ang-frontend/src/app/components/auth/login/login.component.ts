import { Component, OnInit, AfterViewInit, AfterContentChecked, OnChanges } from '@angular/core';
// import { TokenService } from 'src/app/services/token.service';
// import { AuthService } from 'src/app/services/auth.service';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/auth/token.service';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private AuthServices: AuthenticateService,
    private route:ActivatedRoute) { 

    }

// tslint:disable-next-line:member-ordering
public form = {
  email: null,
  password: null
};

public verifyForm = {
  email:null, 
  verify_token:null
};

public error: null;

ngOnInit() {
 
  this.verifyUser();
}
verifyUser(){
  this.route.queryParams.subscribe(params =>{
    this.verifyForm.verify_token = params['verify_token'];
     this.verifyForm.email = params['email'];
    
  });
}
onSubmit() {
  return this.authService.login(this.form).subscribe(
  data => this.handleResponse(data),
  error => this.handleError(error)
  );
}


handleResponse(data) {
this.tokenService.handle(data.access_token);
this.AuthServices.changeAuthStatus(true);
this.router.navigateByUrl('/auth/channels');
}

handleError(error) {
this.error = error.error.error;
}

}
