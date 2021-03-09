import { Component, OnInit, Input } from '@angular/core';
import { Users } from 'src/app/interfaces/users.interface';
import { AdminUserService } from 'src/app/services/admin-user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

    formActive:boolean = false;
    form= {
        name:null,
        email:null,
        role:null,
    };
    error= {
        name:null,
        email:null,
        role:null
    };
    user: Users[];
    userId: number;
    roles: [];
    response = null;
    responseActive = null;

    constructor(private users:AdminUserService) {
        this.users.getRoles().subscribe((roles: [])=> {
            this.roles = roles;
        })
        this.users.openPopup$.subscribe((user: any) => {
            this.userId = user.id;
            this.form.name = user.name;
            this.form.email = user.email;
            this.form.role = user.roles[0].name;
            this.openPopup();
        });
    }

    ngOnInit() {
    }

    openPopup(){
        this.formActive = true;
    }

    close(){
        this.formActive = false;
    }

    onSubmit(){
        this.users.edit(this.userId, this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        )
    }

    handleResponse(data){
        this.response = data.message;
        this.responseActive = this.userId;
        this.close();
        this.users.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }

}
