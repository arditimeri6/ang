import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Config } from '../config';
import 'rxjs/Rx';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { TokenService } from './auth/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BusinessService } from './business.service';

@Injectable({
  providedIn: 'root'
})
export class TextboxService {
  headers = new HttpHeaders({'Content-Type':'application/json'});
  pageurl = '/textbox';
  business = this.businessService.returnBusiness();
  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private businessService:BusinessService) { }

updateBusiness(business){
  this.business = business;
}
 get(){
   return this.http.get(Config.url +'business/'+ this.business + this.pageurl)
}

add(data){
  return this.http.post(Config.url +'business/'+ this.business + this.pageurl, data, {headers:this.headers})
}

getSingleText(slug){
  return this.http.get(Config.url +'businessprofilestext/'+ slug)
}
}
