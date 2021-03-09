import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { Plan } from '../interfaces/plan.inteface';
import { TokenService } from './auth/token.service';
import { BusinessService } from './business.service';
@Injectable({
  providedIn: 'root'
})
export class PlanService {
    private _refreshlist = new Subject<any>();
    private _refreshtrashlist = new Subject<any>();
    private _refreshDeletedList = new Subject<any>();
    private _returnDeleteResponse = new Subject<any>();
    private _refreshForceDeleteList = new Subject<any>();
    private _returnForceDeletedResponse = new Subject<any>();

    private refreshData = new Subject();
    refreshData$ = this.refreshData.asObservable();

  headers = new HttpHeaders({'Content-Type':'application/json'});
  pageurl = 'plans';
  business = this.businessService.returnBusiness();

    constructor(private http: HttpClient,
                private tokenService: TokenService,
                private businessService:BusinessService) { }

    updateBusiness(){
        this.business = this.businessService.returnBusiness();
    }

    get(){
        return this.http.get(Config.url  + this.pageurl)
    }
   
    add(data){
        return this.http.post(Config.url+ this.pageurl, data, {headers:this.headers} ) 
    }

    update(data, id){
        return this.http.put(Config.url + this.pageurl+'/'+id, data, {headers:this.headers}); 
    }

    softdelete(id:number){
        return this.http.delete(Config.url + this.pageurl+'/'+ id); 
    }

    getTrashed(){
        return this.http.get(Config.url + this.pageurl+'/trashed');
    }

    restoreDeleted(id:number){
        return this.http.post(Config.url +this.pageurl+'/trashed/'+id, {headers:this.headers}) 
    }

    forceDelete(id:number){
        return this.http.delete(Config.url +this.pageurl+'/trashed/'+id); 
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

    selectPlan(plan){
        let form = {
            business: this.business,
            plan: plan
        }
        return this.http.post(Config.url + 'business/updateplan', form,{headers:this.headers})
    }

    getBusinessPlans(){ 
        return this.http.get(Config.url + 'business/' + this.business + "/" + this.pageurl + "/getBusinessPlans")
    }

    getSelectedPlan(){
        return this.http.get(Config.url + 'business/' + this.business + "/getSelectedPlan")
    }

    refreshPlans() {
        this.refreshData.next();
    }
}
