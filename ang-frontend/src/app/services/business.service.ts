import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './auth/token.service';
import { Config } from '../config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
private shareBusinessData = new Subject<string[]>();
shareBusiness = this.shareBusinessData.asObservable();
  constructor(private http: HttpClient,
    private tokenService: TokenService) { }
    
  get(){
      return this.http.get(Config.url +'userBusinesses')
  }
  getActive(){
    return this.http.get(Config.url +'business/'+ this.returnBusiness());
  }

  updateLogo(logo:File){
    let formData = new FormData();   
    if(logo){
      formData.append('logo', logo, logo.name);
    }
    return this.http.post(Config.url +'businesslogo/'+ this.returnBusiness(), formData);
  }
  setBusiness(business){
    localStorage.setItem('business_active', business);
  }

  removeBusiness(){
    localStorage.removeItem('business_active');
  }
  returnBusiness(){
    return localStorage.getItem('business_active');
  }
  handleBusinessActiveData(resp){
    this.shareBusinessData.next(resp);
  }

  getbusinessesprofiles(){
    return this.http.get(Config.url +'businessprofiles');
  }
  getsinglebusinessesprofiles(slug){
    return this.http.get(Config.url +'businessprofiles/'+slug);
  }
  getcategorizedprofiles(){
    return this.http.get(Config.url +'categorizedprofiles');
  }
}
