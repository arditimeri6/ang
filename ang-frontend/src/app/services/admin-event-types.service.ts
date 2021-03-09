import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AdminEventTypesService {

    headers = new HttpHeaders({'Content-Type':'application/json'});

    private refreshTableSource = new Subject();
    refreshTableOb = this.refreshTableSource.asObservable();

    private addPopup = new Subject();
    openAddEventTypePopup$ = this.addPopup.asObservable();

    private editPopup = new Subject();
    openEditEventTypePopup$ = this.editPopup.asObservable();

    private deletePopup = new Subject();
    openDeleteEventTypePopup$ = this.deletePopup.asObservable();

    constructor(private http: HttpClient) { }

    getEventTypes(){
        return this.http.get(Config.url + 'eventType')
    }

    getArchivedEventTypes(){
        return this.http.get(Config.url + 'eventType/trashed')
    }

    refreshTable() {
        this.refreshTableSource.next();
    }

    openAddEventTypePopup(){
        this.addPopup.next();
    }
    
    openEditPopup(eventType) {
        this.editPopup.next(eventType);
    }

    openDeletePopup(id) {
        this.deletePopup.next(id);
    }

    add(data){
        return this.http.post(Config.url +'eventType', data, {headers:this.headers})
    }

    edit(id, data){
        return this.http.patch(Config.url +'eventType/'+id, data, {headers:this.headers})
    }

    archive(id){
        return this.http.delete(Config.url +'eventType/'+ id, {headers:this.headers})
    }

    restore(id){
        return this.http.post(Config.url +'eventType/trashed/'+ id, {headers:this.headers})
    }

    delete(id){
        return this.http.post(Config.url +'eventType/delete/'+ id, {headers:this.headers})
    }
}
