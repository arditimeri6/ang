import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Config } from '../config';
@Injectable({
providedIn: 'root'
    
})
export class AdminBusinessTypesService {
    headers = new HttpHeaders({'Content-Type':'application/json'});
    
    private refreshTableSource = new Subject();
    refreshTableOb = this.refreshTableSource.asObservable();

    private addPopup = new Subject();
    openAddTypePopup$ = this.addPopup.asObservable();

    private editPopup = new Subject();
    openEditTypePopup$ = this.editPopup.asObservable();

    private deletePopup = new Subject();
    openDeleteTypePopup$ = this.deletePopup.asObservable();

    private modulesPopup = new Subject();
    openModulesPopup$ = this.modulesPopup.asObservable();

    private editmodulesPopup = new Subject();
    openEditModulesPopup$ = this.editmodulesPopup.asObservable();

    private refreshModuleTableSource = new Subject();
    refreshModulesTable$ = this.refreshModuleTableSource.asObservable();

    private plansPopup = new Subject();
    openPlansPopup$ = this.plansPopup.asObservable();

    private editplansPopup = new Subject();
    openEditPlansPopup$ = this.editplansPopup.asObservable();

    private refreshPlanTableSource = new Subject();
    refreshPlansTable$ = this.refreshPlanTableSource.asObservable();

    constructor(private http: HttpClient) { }
    
    getTypes(){
        return this.http.get(Config.url + 'businesstype')
    }
    
    getType(id){
        return this.http.get(Config.url + 'businesstype'+id)
    }

    getArchivedTypes(){
        return this.http.get(Config.url + 'businesstype/trashed')
    }

    refreshTable() {
        this.refreshTableSource.next();
    }

    refreshModulesTable() {
        this.refreshModuleTableSource.next();
    }
    
    refreshPlansTable() {
        this.refreshPlanTableSource.next();
    }

    openAddTypePopup(){
        this.addPopup.next();
    }

    openEditPopup(type){
        this.editPopup.next(type);
    }

    openDeletePopup(id){
        this.deletePopup.next(id);
    }

    openModulesPopup(type){
        this.modulesPopup.next(type);
    }

    openEditModulesPopup(type){
        this.editmodulesPopup.next(type);
    }

    openPlansPopup(type){
        this.plansPopup.next(type);
    }

    openEditPlansPopup(type){
        this.editplansPopup.next(type);
    }

    add(data){
        return this.http.post(Config.url +'businesstype', data, {headers:this.headers})
    }

    edit(id, data){
        return this.http.patch(Config.url +'businesstype/'+id, data, {headers:this.headers})
    }

    archive(id){
        return this.http.delete(Config.url +'businesstype/'+ id, {headers:this.headers})
    }

    restore(id){
        return this.http.post(Config.url +'businesstype/trashed/'+ id, {headers:this.headers})
    }

    delete(id){
        return this.http.post(Config.url +'businesstype/delete/'+ id, {headers:this.headers})
    }

    removeModule(id){
        return this.http.delete(Config.url +'businesstypemodule/'+ id)
    }

    getTypeModules(id){
        return this.http.get(Config.url +'getbusinesstypemodule/'+ id, {headers:this.headers})
    }

    getModules(){   
        return this.http.get(Config.url + 'module')
    }

    editModules(id, data){
        return this.http.put(Config.url +'businesstypemodule/'+ id, data, {headers:this.headers})
    }

    removePlan(id){
        return this.http.delete(Config.url +'businesstypeplan/'+ id)
    }

    getTypePlans(id){
        return this.http.get(Config.url +'getbusinesstypeplan/'+ id, {headers:this.headers})
    }

    getPlans(){   
        return this.http.get(Config.url + 'plans')
    }

    editPlans(id, data){
        return this.http.put(Config.url +'businesstypeplan/'+ id, data, {headers:this.headers})
    }
}
