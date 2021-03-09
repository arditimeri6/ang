import { Injectable } from '@angular/core';
import { BusinessService } from './business.service';
import { TokenService } from './auth/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  pageurl = '/calendar';
  business = this.businessService.returnBusiness();
  headers = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient,
    private tokenService: TokenService,
    private businessService:BusinessService) { }


updateBusiness(business){
  this.business = business;
}

  get(id:number){
      return this.http.get(Config.url +'business/'+ this.business +'/places/'+ id + this.pageurl)
  }
  
  update(data, id:number, calendar_id){
     return this.http.put(Config.url +'business/'+ this.business +'/places/'+ id + this.pageurl +'/'+ calendar_id, data, {headers:this.headers})
  }

  requestReservation(data, place){
   return this.http.post(Config.url +'calendarreservation/'+ place, data, {headers:this.headers})
  }

  getUserReservation(){
    return this.http.get(Config.url +'usercalendars');
  }
}
