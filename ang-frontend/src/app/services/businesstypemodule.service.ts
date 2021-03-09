import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Config } from '../config';
import 'rxjs/Rx';
import { Observable, Subject } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class BusinesstypemoduleService {

  constructor(private http: Http) { }

  getBusinessTypeModules(business_types_id:number){
    const body = JSON.stringify({business_types_id: business_types_id});
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(Config.url +'getbusinesstypemodule', body ,{headers:headers})
    .map(
      (response: Response) =>{
        return response.json().data;
      }
    )
  }

  addBusinessTypeModule(business_types_id, modules_id){
    const body = JSON.stringify({business_types_id: business_types_id,modules_id:modules_id });
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(Config.url +'businesstypemodule', body ,{headers:headers})
  }
  
  deleteBusinessTypeModule(id:number){
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.delete(Config.url +'businesstypemodule/'+id, {headers:headers})
  }
}
