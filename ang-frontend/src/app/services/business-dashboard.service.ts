import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Config } from '../config';
import 'rxjs/Rx';
import { Subject, Observable } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class BusinessDashboardService {

  constructor(private http: Http) { }

  isValidVideoGalleryRoute:boolean = false;
  isValidPhotoGalleryRoute:boolean = false;
  private _validVideoGallery = new Subject<boolean>();
  private _validPhotoGallery = new Subject<boolean>();
  
  getBusinessModules(business_id:number){
    const body = JSON.stringify({business_id: business_id});
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(Config.url +'returnbusinessuser', body ,{headers:headers}).map(
      (response: Response) =>{
        return response.json();
      }
    )
  }

 // Video Gallery Validation
  validVideoGallery(valid:boolean){
    this._validVideoGallery.next(valid);
    this.isValidVideoGalleryRoute = valid;
  }

 returnValidVideoGallery(): Observable<boolean> {
    return this._validVideoGallery.asObservable();
 }
 returnValidVideoGalleryRoute(){
   return this.isValidVideoGalleryRoute;
 }


 // Photo Gallery Validation
 validPhotoGallery(valid:boolean){
   this._validPhotoGallery.next(valid);
   this.isValidPhotoGalleryRoute = valid;
 }
 
 returnValidPhotoGallery(): Observable<boolean> {
  return this._validPhotoGallery.asObservable();
 }

 returnValidPhotoGalleryRoute(){
  return this.isValidPhotoGalleryRoute;
}

}
