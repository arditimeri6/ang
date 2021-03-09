import { Component, OnInit } from '@angular/core';
import { UserBusinessesService } from 'src/app/services/user-businesses.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

    formDeleteActive: boolean = false;
    userId;
    response = null;
    responseActive = null;

    constructor(private users:UserBusinessesService) { 
        this.users.updateBusiness();
        this.users.openDeletePopup$.subscribe(id => {
            this.userId = id;
            this.openDeletePopup();
        });
    }

    ngOnInit() {
    }

    openDeletePopup(){
        this.formDeleteActive = true;
    }

    close(){
        this.formDeleteActive = false;
    }

    delete(id){
        this.users.archive(id).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
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
