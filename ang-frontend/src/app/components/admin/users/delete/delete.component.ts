import { Component, OnInit } from '@angular/core';
import { AdminUserService } from 'src/app/services/admin-user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
    formDeleteActive: boolean = false;
    userId;
    response = null;
    responseActive = null;
    
    constructor(private users:AdminUserService) {
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
