import { Injectable } from '@angular/core';
import { Config } from '../config';
import 'rxjs/Rx';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Module } from '../interfaces/module.interface';
@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  headers = new HttpHeaders({'Content-Type':'application/json'});
  
  private _refreshmodules = new Subject<any>();
  private _setdeleteditem = new Subject<any>();
  private _setDeleteResponse =  new Subject<any>();
  
  constructor(private http: HttpClient) { }

  getModules():Observable<Module[]>{
    return this.http.get<Module[]>(Config.url +'module')
  }

  addModule(title:string){
    const body = JSON.stringify({title: title});
    return this.http.post(Config.url +'module', body ,{headers:this.headers})
  }

  updateModule(title:string, id:number){
    const body = JSON.stringify({title: title});
    return this.http.put(Config.url +'module/'+id, body ,{headers:this.headers})
  }
  
  deleteModule(id:number){
    return this.http.delete(Config.url +'module/'+id, {headers:this.headers})
  }
  
  returnSetDeletedItem():Observable<any>{
    return this._setdeleteditem.asObservable();
  }
  setDeletedItem(id:number, response){
    this._setdeleteditem.next(id);
    this._setDeleteResponse.next(response);
  }

  returnRefreshModule(): Observable<any> {
    return this._refreshmodules.asObservable();
 }
 returDeleteResponse(): Observable<any> {
  return this._setDeleteResponse.asObservable();
 }
  refreshModules():void{
    this._refreshmodules.next();
  }

}
