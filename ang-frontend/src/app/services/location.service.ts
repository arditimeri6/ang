import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Config } from '../config';
import 'rxjs/Rx';
import { Observable, Subject } from 'rxjs/Rx';
import {  } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
   headers = new HttpHeaders({'Content-Type':'application/json'});
   
   private _refreshlocations = new Subject<any>();
   private _setdeleteditem = new Subject<any>();
   private _setDeleteResponse =  new Subject<any>();
  
   constructor(private http:HttpClient) { }

  getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(Config.url +'location')
  }

  addLocation(title:string){
    const body = JSON.stringify({title: title});
    return this.http.post(Config.url +'location', body, {headers:this.headers});
  }

  updateLocation(title:string, id:number){
    const body = JSON.stringify({title: title});
    return this.http.put(Config.url +'location/'+id, body, {headers:this.headers})
  }

  deleteLocation(id:number){
    return this.http.delete(Config.url +'location/'+id, {headers:this.headers});
  }
  
  returnSetDeletedItem():Observable<any>{
    return this._setdeleteditem.asObservable();
  }
  
  setDeletedItem(id:number, response){
    this._setdeleteditem.next(id);
    this._setDeleteResponse.next(response);
  }

  returnRefresLocations(): Observable<any> {
    return this._refreshlocations.asObservable();
 }
 returDeleteResponse(): Observable<any> {
  return this._setDeleteResponse.asObservable();
}

  refreshLocations():void{
    this._refreshlocations.next();
  }
}
