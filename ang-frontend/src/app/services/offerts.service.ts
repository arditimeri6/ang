import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import { Config } from '../config';
import { TokenService } from './auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class OffertsService {
  id:number = null;
  headers = new Headers({'Content-Type':'application/json'});

  private _refreshofferts = new Subject<any>();
  private _setdeleteditem = new Subject<any>();
  private loadList = new BehaviorSubject(false);
  loadListInit = this.loadList.asObservable();
  
  constructor(private http: Http,
              private tokenService: TokenService) { }

  businessUserId(id:number){
    this.id = id;
      if(this.id != null){
      let trueResponse = true;
      this.loadListMethod(trueResponse);
    }
  }

  loadListMethod(trueresponse: boolean) {
   this.loadList.next(trueresponse)
  }

  addOfferItem(title, content, price){
    // let token = this.tokenService.get(); 
    const body = JSON.stringify({title: title, content:content, price:price});
    return this.http.post(Config.url +'business/'+ this.id +'/offer?token=', body ,{headers:this.headers}).map(
      (response:Response) => {
        return response.json();
      }
    )
   }
 
   getOffertsBusinessUser(){
     return this.http.get(Config.url +'business/'+ this.id +'/offer').map(
       (response:Response)=>{
         return response.json().data;
       }
     )
   }
 
   updatOffer(title, content, price, id){  
    //  let token = this.tokenService.get(); 
     const body = JSON.stringify({title: title, content:content, price:price});
     return this.http.put(Config.url + 'business/'+ this.id +'/offer/'+id+'?token=', body, {headers:this.headers})
     .map(
      (response:Response)=>{
        return response.json().data;
      }
    )
   }
   
   deleteOffer(id){
    //  let token = this.tokenService.get(); 
     return this.http.delete(Config.url + 'business/'+ this.id +'/offer/'+id+'?token=', {headers:this.headers})
   }
   
   returnRefresOfferts(): Observable<any> {
     return this._refreshofferts.asObservable();
  }
 
    refreshVideoGallery():void{
     this._refreshofferts.next();
   }
   setDeletedItem(id:number){
     this._setdeleteditem.next(id);
   }
   returnSetDeletedItem():Observable<any>{
     return this._setdeleteditem.asObservable();
   }
}
