import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Config } from '../config';
import 'rxjs/Rx';
import { TokenService } from './auth/token.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
 id:number = null;
 private loadList = new BehaviorSubject(false);
 loadListInit = this.loadList.asObservable();
//  token = this.tokenService.get();
  constructor(private http: Http,
    private tokenService: TokenService) { }

    businessUserId(id:number){
      this.id = id;
      if(this.id != null){
       let trueResponse = true;
        this.loadListMethod(trueResponse);
      }
    }
    loadListMethod(truresponse: boolean) {
      this.loadList.next(truresponse)
    }

  getPhotoBanner(){
    return this.http.get(Config.url +'business/'+ this.id +'/banner').map(
      (response:Response)=>{
        return response.json().data;
      }
    )
  }

  updateBanner(id:number, imagepath:File){
    let formData = new FormData(); 
    if(imagepath){
      formData.append('imagepath', imagepath, imagepath.name);
    }
    formData.append('_method', 'PUT');
    return this.http.post(Config.url +'business/' + this.id +'/banner/'+ id +'?token=', formData) 
  }

}
