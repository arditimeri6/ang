import { Component, OnInit, Input } from '@angular/core';
import { AdminUserService } from 'src/app/services/admin-user.service';

@Component({
  selector: 'app-edit-permissions',
  templateUrl: './edit-permissions.component.html',
  styleUrls: ['./edit-permissions.component.scss']
})
export class EditPermissionsComponent implements OnInit {

    allPermissions = [];
    userPermissions = [];
    permissions = [];
    formActive:boolean = false;
    user;
    userId: number;
    response;
    responseActive;

    constructor(private users:AdminUserService) { 
        this.users.getPermissions().subscribe((permissions: [])=> {
            this.allPermissions = permissions;
        })
        this.users.openEditPermissionsPopup$.subscribe((user: any) => {
            this.user = user;
            this.userId = user.id;
            this.permissions = user.permissions;

            if (this.permissions.length > 0) {
                this.permissions.forEach(data => {
                    this.userPermissions.push(data.name);
                });
            }
            this.openEditPermissionsPopup();
        });
    }

    ngOnInit() {
    }

    openEditPermissionsPopup(){
        this.formActive = true;
    }

    close(){
        this.formActive = false;
        this.permissions = [];
        this.userPermissions = [];
    }

    checkPermission(id){
        var checked = document.getElementById(id);
        checked.toggleAttribute('checked');
    }

    onSubmit(){
        this.userPermissions = [];
        var modules = document.getElementsByClassName('form-check-input');
        for (let i = 0; i < modules.length; i++) {
            const element = modules[i];
            if(element.hasAttribute('checked')){
                this.userPermissions.push(element.id);
            }
        }
        // console.log(this.userPermissions);
        
        this.users.editPermissions(this.userId, this.userPermissions).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        )
    }

    handleResponse(data){
        this.response = data.message;
        this.responseActive = this.userId;
        this.users.refreshTable();
        this.users.refreshPermissionTable();
        this.close();
        setTimeout(() => {
            this.responseActive = null;
        }, 600);
    }

    handleError(error){
        console.log(error);
    }

}
