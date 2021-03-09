import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterCeptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (!!token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).do((event: any) => {
      if (event instanceof HttpResponse) {
        return event;
      }
    },(err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authService.refreshToken().subscribe(resp=>{
            this.responseToken(resp);
          })
        }
      }
    });
  }

  responseToken(resp){
   
    this.tokenService.handle(resp.access_token);
  }


  constructor(private authService: AuthService,
            private tokenService: TokenService) { }

}
