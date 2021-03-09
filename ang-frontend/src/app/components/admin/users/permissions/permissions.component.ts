import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminUserService } from 'src/app/services/admin-user.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

    formActive:boolean = false;
    userPermissions = [];
    user;
    userId: number;
    response = null;
    responseActive = null;

    constructor(private users:AdminUserService) {
        this.users.openPermissionsPopup$.subscribe((user: any) => {
            this.user = user;
            this.userId = user.id;
            this.userPermissions = user.permissions;
            this.openPermissionsPopup();
        });
        this.users.refreshPermissionTable$.subscribe( permissions => {
            this.users.getUser(this.userId).subscribe((user: any) => {
                this.userPermissions = user[0].permissions;
            })
        })
    }

    ngOnInit() {
    }

    openPermissionsPopup(){
        this.formActive = true;
    }

    close(){
        this.formActive = false;
    }

    openEditPermissionsPopup(){
        this.users.openEditPermissionsPopup(this.user);
    }

    removePermission(permission){
        this.users.removePermission(this.userId, [permission]).subscribe(
            data => this.handleResponse(data, permission),
            error => this.handleError(error)
        )
    }

    handleResponse(data, permission){
        var deletedId;
        for (let i = 0; i < this.userPermissions.length; i++) {
            if(this.userPermissions[i].name == permission){
                deletedId = i;
            }
        }
        this.userPermissions.splice(deletedId, 1);
        this.response = data.message;
        this.responseActive = this.userId;
        this.users.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 600);
    }
    
    handleError(error){
        console.log(error);
    }


}
