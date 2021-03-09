import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

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
        return this.http.get(Config.url +'usersWithRolesAndPermissions');
    }

    getArchivedUsers(){
        return this.http.get(Config.url +'user/trashed');
    }

    getUser(id){
        return this.http.get(Config.url +'getUserWithRolesAndPermissions/'+ id)
    }

    getRoles(){
        return this.http.get(Config.url +'getRoles');
    }

    getPermissions(){
        return this.http.get(Config.url +'getPermissions');
    }

    edit(id, data){
        return this.http.patch(Config.url +'user/'+ id, data, {headers:this.headers})
    }

    archive(id){
        return this.http.post(Config.url +'user/'+ id, {headers:this.headers})
    }

    restore(id){
        return this.http.post(Config.url +'user/trashed/'+ id, {headers:this.headers})
    }

    delete(id){
        return this.http.delete(Config.url +'user/trashed/'+ id, {headers:this.headers})
    }

    editPermissions(id, data){
        return this.http.post(Config.url +'editUserPermissions/'+ id, data, {headers:this.headers})
    }

    removePermission(id, data){
        return this.http.post(Config.url +'removeUserPermission/'+ id, data, {headers:this.headers})
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

    refreshTable() {
        this.refreshTableSource.next();
    }

    refreshPermissionTable() {
        this.refreshPermissionTableSource.next();
    }

    changeStatus(id, status){
        return this.http.post(Config.url +'user/'+ id + '/updateStatus', status, {headers:this.headers})
    }
}
