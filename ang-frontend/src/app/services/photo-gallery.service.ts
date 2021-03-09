import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Config } from '../config';
import 'rxjs/Rx';
import { TokenService } from './auth/token.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BusinessService } from './business.service';
@Injectable({
  providedIn: 'root'
})
export class PhotoGalleryService {

  private _refreshlist = new Subject<any>();
  private _refreshtrashlist = new Subject<any>();
  private _refreshDeletedList = new Subject<any>();
  private _returnDeleteResponse = new Subject<any>();
  private _refreshForceDeleteList = new Subject<any>();
  private _returnForceDeletedResponse = new Subject<any>();

  pageurl = '/photogallery';
 
  headers = new HttpHeaders({'Content-Type':'application/json'});
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
   
add(place, banner, imagepath:File){
 
    let formData = new FormData();   
    if(imagepath){
    formData.append('imagepath', imagepath, imagepath.name);
    }
    if(place){
      formData.append('place_id', place);
    }
    if(banner){
      formData.append('banner', banner);
    }
    return this.http.post(Config.url +'business/'+ this.business + this.pageurl, formData)
}

update(place, banner, imagepath:File, id:number){
  let formData = new FormData();  
  if(imagepath){
    formData.append('imagepath', imagepath, imagepath.name);
  }
  if(place){
    formData.append('place_id', place);
  }
  if(banner){
    formData.append('banner', banner);
  }
  formData.append('_method', 'PUT');

  return this.http.post(Config.url +'business/'+ this.business + this.pageurl+'/'+id, formData); 
}

softdelete(id:number){
  return this.http.delete(Config.url +'business/'+ this.business + this.pageurl+'/'+ id); 
}

getTrashed(){
  return this.http.get(Config.url +'business/'+ this.business +this.pageurl+'/trashed');
}
restoreDeleted(id:number){
  return this.http.post(Config.url +'business/'+ this.business +this.pageurl+'/trashed/'+id, {headers:this.headers}) 
}

forceDelete(id:number){
  return this.http.delete(Config.url +'business/'+ this.business +this.pageurl+'/trashed/'+id); 
}
getSinglePhotoGallery(slug){
  return this.http.get(Config.url +'businessprofilesgallery/'+ slug)
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
}
