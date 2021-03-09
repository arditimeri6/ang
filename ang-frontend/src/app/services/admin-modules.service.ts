import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AdminModulesService {

    headers = new HttpHeaders({'Content-Type':'application/json'});

    private refreshTableSource = new Subject();
    refreshTableOb = this.refreshTableSource.asObservable();

    private addPopup = new Subject();
    openAddModulePopup$ = this.addPopup.asObservable();

    private editPopup = new Subject();
    openEditModulePopup$ = this.editPopup.asObservable();

    private deletePopup = new Subject();
    openDeleteModulePopup$ = this.deletePopup.asObservable();

    constructor(private http: HttpClient) { }

    getModules(){
        return this.http.get(Config.url + 'module')
    }

    getArchivedModules(){
        return this.http.get(Config.url + 'module/trashed')
    }

    refreshTable() {
        this.refreshTableSource.next();
    }

    openAddModulePopup(){
        this.addPopup.next();
    }
    
    openEditPopup(module) {
        this.editPopup.next(module);
    }

    openDeletePopup(id) {
        this.deletePopup.next(id);
    }

    add(data){
        return this.http.post(Config.url +'module', data, {headers:this.headers})
    }

    edit(id, data){
        return this.http.patch(Config.url +'module/'+id, data, {headers:this.headers})
    }

    archive(id){
        return this.http.delete(Config.url +'module/'+ id, {headers:this.headers})
    }

    restore(id){
        return this.http.post(Config.url +'module/trashed/'+ id, {headers:this.headers})
    }

    delete(id){
        return this.http.post(Config.url +'module/delete/'+ id, {headers:this.headers})
    }
}
