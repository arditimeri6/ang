import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent implements OnInit {
public form = {
  email:null,
}
  constructor(private authService: AuthService,
            private notify: SnotifyService,
            private router: Router) { }

  ngOnInit() {

  }

  onSubmit(){
      this.notify.info('Wait..', {timeout:5000})
      this.authService.sendPasswordResetLink(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.notify.error(error.error.error)
      )
  }
  handleResponse(res){
    // let _router = this.router
    this.notify.success(res.data, {timeout:0})
    this.form.email = null;
    // _router.navigateByUrl('/response-password-reset');
  }
}
