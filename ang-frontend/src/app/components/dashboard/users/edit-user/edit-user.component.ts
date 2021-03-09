import { Component, OnInit } from '@angular/core';
import { UserBusinessesService } from 'src/app/services/user-businesses.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

    formActive:boolean = false;
    form= {
        role:null
    };
    error= {
        role:null
    };
    userId: number;
    roles: [];
    response = null;
    responseActive = null;

    constructor(private users:UserBusinessesService) { 
        this.users.updateBusiness();
        this.users.getRoles().subscribe((roles: []) => {
            this.roles = roles;
        });
        this.users.openPopup$.subscribe((user: any) => {
            this.userId = user.id;
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
