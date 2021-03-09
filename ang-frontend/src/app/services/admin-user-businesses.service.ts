import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AdminUserBusinessesService {

    headers = new HttpHeaders({'Content-Type':'application/json'});

    private refreshTableSource = new Subject();
    refreshTableOb = this.refreshTableSource.asObservable();

    private popup = new Subject();
    openPopup$ = this.popup.asObservable();

    private deletePopup = new Subject();
    openDeletePopup$ = this.deletePopup.asObservable();

    private permissionsPopup = new Subject();
    openPermissionsPopup$ = this.permissionsPopup.asObservable();

    private editpermissionsPopup = new Subject();
    openEditPermissionsPopup$ = this.editpermissionsPopup.asObservable();

    private refreshPermissionTableSource = new Subject();
    refreshPermissionTable$ = this.refreshPermissionTableSource.asObservable();

    constructor(private http: HttpClient) { }

    getUsers(){
        return this.http.get(Config.url +'userBusinessesWithRolesAndPermissions');
    }

    getArchivedUsers(){
        return this.http.get(Config.url +'businessusers/trashed');
    }

    getRoles(){
        return this.http.get(Config.url +'getRoles');
    }

    getPermissions(){
        return this.http.get(Config.url +'getPermissions');
    }

    openPopup(user) {
        this.popup.next(user);
    }

    openDeletePopup(id){
        this.deletePopup.next(id);
    }

    openPermissionsPopup(user){
        this.permissionsPopup.next(user);
    }

    openEditPermissionsPopup(user){
        this.editpermissionsPopup.next(user);
    }

    edit(id, data){
        return this.http.post(Config.url +'editRoles/'+ id, data, {headers:this.headers})
    }

    refreshTable() {
        this.refreshTableSource.next(); 
    }

    refreshPermissionTable() {
        this.refreshPermissionTableSource.next();
    }

    archive(id){
        return this.http.delete(Config.url +'businessusers/'+ id, {headers:this.headers})
    }

    editPermissions(id, data){
        return this.http.post(Config.url +'editPermissions/'+ id, data, {headers:this.headers})
    }

    removePermission(id, data){
        return this.http.post(Config.url +'removePermission/'+ id, data, {headers:this.headers})
    }

    restore(id){
        return this.http.post(Config.url +'businessusers/trashed/'+ id, {headers:this.headers})
    }

    delete(id){
        return this.http.post(Config.url +'businessusers/delete/'+ id, {headers:this.headers})
    }

    getUser(id){
        return this.http.get(Config.url +'getUserBusinessesWithRolesAndPermissions/'+ id)
    }
}
