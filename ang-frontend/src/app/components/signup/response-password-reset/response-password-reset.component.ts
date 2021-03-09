import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Snotify, SnotifyService } from 'ng-snotify';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-response-password-reset',
  templateUrl: './response-password-reset.component.html',
  styleUrls: ['./response-password-reset.component.scss']
})
export class ResponsePasswordResetComponent implements OnInit {
public error =[]; 
public form = {
  email:null,
  password:null,
  password_confirmation:null,
  token:null,
}

constructor(private route:ActivatedRoute,
            private authService: AuthService,
            private router: Router,
            private Notify: SnotifyService) { 
  route.queryParams.subscribe(params=>{
    this.form.token = params['token'];
  })
}


ngOnInit() {
}
onSubmit(){
    console.log(this.form);
    this.authService.changePassword(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
    )
}
handleResponse(data){
    console.log(data);
    
    let _router = this.router
    _router.navigateByUrl('/login')
    //   this.Notify.confirm('Done!, Now login with new Password',{
    //     buttons:[
    //       {
    //         text:'Okay',
    //         action: toaster =>{
    //           _router.navigateByUrl('/login'),
    //           this.Notify.remove(toaster.id)
    //         }
    //       },
    //     ]
    //   })
}
handleError(error){
    this.error = error.error.errors;
}
}
