import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenService } from './auth/token.service';
import { BusinessService } from './business.service';
import { Config } from '../config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBusinessesService {

    headers = new HttpHeaders({'Content-Type':'application/json'});
    pageurl = '/businessusers';
    business = this.businessService.returnBusiness();

    constructor(private http: HttpClient,
        private tokenService: TokenService,
        private businessService:BusinessService) { }

    updateBusiness(){
        this.business = this.businessService.returnBusiness();
    }

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

    private sendInvitationPopup = new Subject();
    openSendInvitationPopup$ = this.sendInvitationPopup.asObservable();

    private refreshPermissionTableSource = new Subject();
    refreshPermissionTable$ = this.refreshPermissionTableSource.asObservable();


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

    openSendInvitationPopup(){
        this.sendInvitationPopup.next();
    }

    refreshTable() {
        this.refreshTableSource.next(); 
    }

    refreshPermissionTable() {
        this.refreshPermissionTableSource.next();
    }

    getUsers(){
        return this.http.get(Config.url +'business/'+ this.business + this.pageurl + "/getBusinessUsers")
    }

    getArchivedUsers(){
        return this.http.get(Config.url +'business/'+ this.business + this.pageurl + "/getBusinessUsersTrashed");
    }

    sendInvitation(data){
        return this.http.post(Config.url +'business/'+ this.business + "/invitations", data, {headers:this.headers});
    }

    archive(id){
        return this.http.delete(Config.url +'businessusers/'+ id, {headers:this.headers})
    }

    restore(id){
        return this.http.post(Config.url +'businessusers/trashed/'+ id, {headers:this.headers})
    }

    delete(id){
        return this.http.post(Config.url +'businessusers/delete/'+ id, {headers:this.headers})
    }

    edit(id, data){
        return this.http.post(Config.url +'editRoles/'+ id, data, {headers:this.headers})
    }

    getRoles(){
        return this.http.get(Config.url +'getRoles');
    }

    getPermissions(){
        return this.http.get(Config.url +'getPermissions');
    }

    removePermission(id, data){
        return this.http.post(Config.url +'removePermission/'+ id, data, {headers:this.headers})
    }

    getUser(id){
        return this.http.get(Config.url +'getUserBusinessesWithRolesAndPermissions/'+ id)
    }

    editPermissions(id, data){
        return this.http.post(Config.url +'editPermissions/'+ id, data, {headers:this.headers})
    }
}
