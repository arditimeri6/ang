import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenService } from './auth/token.service';
import { BusinessService } from './business.service';
import { Config } from '../config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventTypesService {

    headers = new HttpHeaders({'Content-Type':'application/json'});
    pageurl = '/event-types';
    business = this.businessService.returnBusiness();

    private addPopup = new Subject();
    openAddPopUp$ = this.addPopup.asObservable();

    private refreshData = new Subject();
    refreshData$ = this.refreshData.asObservable();

    constructor(private http: HttpClient,
                private tokenService: TokenService,
                private businessService:BusinessService) { }

    updateBusiness(){
        this.business = this.businessService.returnBusiness();
    }
    get(){
        return this.http.get(Config.url +'business/'+ this.business + this.pageurl)
    }

    getEventTypes(){
        return this.http.get(Config.url +'eventType')
    }

    delete(id){
        return this.http.delete(Config.url +'business/'+ this.business + this.pageurl + "/" + id);
    }
    
    add(data){
        return this.http.post(Config.url +'business/'+ this.business + this.pageurl, data, {headers:this.headers})
    }

    openAddPopUp(){
        this.addPopup.next();
    }

    refreshTable() {
        this.refreshData.next();
    }
    
}
