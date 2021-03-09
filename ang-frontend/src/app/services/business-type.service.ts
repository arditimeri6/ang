import { Injectable } from '@angular/core';

import { Config } from '../config';
import 'rxjs/Rx';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {

    headers = new HttpHeaders({'Content-Type':'application/json'});
    private _refreshbusinesstypes = new Subject<any>();
    private _setdeleteditem = new Subject<any>();

  constructor(private http: HttpClient) { }

  getBusinessType(){
    return this.http.get(Config.url + 'businesstype')
  }
//   getBusinessTypeSingle(id:number){
//     return this.http.get(Config.url +'businesstype/'+id).map(
//       (response: Response) =>{
//         return response.json().data;
//       }
//     )
//   }
  addBusinessType(title:string){
    const body = JSON.stringify({title: title});
    return this.http.post(Config.url +'businesstype', body ,{headers:this.headers})
  }

//   updateBusinessType(title:string, id:number){
//     const body = JSON.stringify({title: title});
//     const headers = new Headers({'Content-Type':'application/json'});
//     return this.http.put(Config.url +'businesstype/'+ id, body ,{headers:headers})
//   }
  
//   deleteBusinessType( id:number){
//     const headers = new Headers({'Content-Type':'application/json'});
//     return this.http.delete(Config.url +'businesstype/'+ id, {headers:headers})
//   }
  
//   returnSetDeletedItem():Observable<any>{
//     return this._setdeleteditem.asObservable();
//   }

//   setDeletedItem(id:number){
//     this._setdeleteditem.next(id);
//   }

//   returnRefreshBusinessType(): Observable<any> {
//     return this._refreshbusinesstypes.asObservable();
//   }

 refreshBusinessType():void{
    this._refreshbusinesstypes.next();
  }
}
