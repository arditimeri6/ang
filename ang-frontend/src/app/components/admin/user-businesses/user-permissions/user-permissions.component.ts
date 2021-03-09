import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminUserBusinessesService } from 'src/app/services/admin-user-businesses.service';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss']
})
export class UserPermissionsComponent implements OnInit {

    formActive:boolean = false;
    userPermissions = [];
    user;
    userId: number;
    response = null;
    responseActive = null;

    constructor(private users:AdminUserBusinessesService) {
        this.users.openPermissionsPopup$.subscribe((user: any) => {

            this.user = user;
            this.userId = user.id;
            
            this.userPermissions = user.permissions;
            this.openPermissionsPopup();
        });
        this.users.refreshPermissionTable$.subscribe( permissions => {
            this.users.getUser(this.userId).subscribe((user: any) => {
                // console.log(user);
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
            data => this.handleSecondResponse(data, permission),
            error => this.handleError(error)
        )
    }

    handleSecondResponse(data, permission){
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
        }, 1000);
    }
    
    handleError(error){
        console.log(error);
    }

}
