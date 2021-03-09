import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Config } from 'src/app/config';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient,
              private tokenService:TokenService) { }

  sendVerificationEmail(data){
    return this.http.post(Config.url + 'verify', data);
  }

  confirmRegistration(data){
    return this.http.post(Config.url + 'confirm', data);
  }

  validateRoute(data){
    return this.http.post(Config.url + 'registervalidation', data);
  }

  setEmail(email){
    localStorage.setItem('email_verify', email);
  }
  removeEmail(){
    localStorage.removeItem('email_verify');
  }
  getEmail(){
    return localStorage.getItem('email_verify');
  }
  setVerifyToken(verify_token){
    localStorage.setItem('verify_token', verify_token);
  }
  removeVerifyToken(){
    localStorage.removeItem('verify_token');
  }
  getVerifyToken(){
    return localStorage.getItem('verify_token');
  }

  signup( data ) {
    return this.http.post(Config.url + 'signup', data);
}
businessSignup(data){
    return this.http.post(Config.url + 'business', data);
}

login( data ) {
    return this.http.post(Config.url + 'login', data);
}

logout(){
  const token = this.tokenService.get();
  this.tokenService.remove();
  return this.http.post(Config.url + 'logout?token=' + token + '', token);
}
showProfile() {
    const token = this.tokenService.get();
    return this.http.post(Config.url + 'me?token=' + token + '', token );
}

sendPasswordResetLink(data){
  return this.http.post(Config.url+ 'password/email', data);
}

changePassword(data){
  return this.http.post(Config.url+ 'password/reset', data);
}

verifyProfile(data){
  return this.http.post(Config.url+ 'verify', data);
}

refreshToken(){
  return this.http.post(Config.url+'refresh', {headers:this.headers})
}
}
