import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenService } from './auth/token.service';
import { BusinessService } from './business.service';
import { Subject, Observable } from 'rxjs';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private _refreshlist = new Subject<any>();
  private _refreshtrashlist = new Subject<any>();
  private _refreshDeletedList = new Subject<any>();
  private _returnDeleteResponse = new Subject<any>();
  private _refreshForceDeleteList = new Subject<any>();
  private _returnForceDeletedResponse = new Subject<any>();

  pageurl = '/places';
  business = this.businessService.returnBusiness();
  headers = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient,
    private tokenService: TokenService,
    private businessService:BusinessService) { }


updateBusiness(business){
  this.business = business;
}
get(){

      return this.http.get(Config.url +'business/'+ this.business + this.pageurl)
  }

getSingle(id:number){

    return this.http.get(Config.url +'business/'+ this.business + this.pageurl +'/'+id)
}
add(data){
    return this.http.post(Config.url +'business/'+ this.business + this.pageurl, data, {headers:this.headers} ) 
}

update(data, id){
  return this.http.put(Config.url +'business/'+ this.business + this.pageurl+'/'+id, data, {headers:this.headers}); 
}

softdelete(id:number){
  return this.http.delete(Config.url +'business/'+ this.business + this.pageurl+'/'+ id); 
}

getTrashed(){
  return this.http.get(Config.url +'business/'+ this.business + this.pageurl+'/trashed');
}

restoreDeleted(id:number){
  return this.http.post(Config.url +'business/'+ this.business + this.pageurl+'/trashed/'+id, {headers:this.headers}) 
}

forceDelete(id:number){
  return this.http.delete(Config.url +'business/'+ this.business +this.pageurl+'/trashed/'+id); 
}

returnRefresList(): Observable<any> {
  return this._refreshlist.asObservable();
}

refreshLists():void{
  this._refreshlist.next();
}
returnRefresTrashList(): Observable<any> {
  return this._refreshtrashlist.asObservable();
}
refresTrashList():void{
  this._refreshtrashlist.next();
}

refreshDeleteList(data, id):void{
  this._refreshDeletedList.next(id);
  this._returnDeleteResponse.next(data);
}

returnRefreshDeletedList(){
  return this._refreshDeletedList.asObservable();
}

returnDeleteResponse(){
  return this._returnDeleteResponse.asObservable();
}

refreshForceDeleteList(data, id):void{
  this._refreshForceDeleteList.next(id);
  this._returnForceDeletedResponse.next(data);
}

returnRefreshForceDeletedList(){
  return this._refreshForceDeleteList.asObservable();
}
returnForceDeletedResponse(){
  return this._returnForceDeletedResponse.asObservable();
}
getSingleProfilePlace(slug){
  return this.http.get(Config.url +'businessprofilessingleplace/'+ slug)
}
  getSinglePlace(slug, place){
    return this.http.get(Config.url +'businessprofilessingleplace/'+ slug +'/'+ place)
  }
}
