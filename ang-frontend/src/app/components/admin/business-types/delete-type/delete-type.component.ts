import { Component, OnInit } from '@angular/core';
import { AdminBusinessTypesService } from 'src/app/services/admin-business-types.service';

@Component({
  selector: 'app-delete-type',
  templateUrl: './delete-type.component.html',
  styleUrls: ['./delete-type.component.scss']
})
export class DeleteTypeComponent implements OnInit {

    formDeleteActive: boolean = false;
    typeId;
    response = null;
    responseActive = null;

    constructor(private types:AdminBusinessTypesService) { 
        this.types.openDeleteTypePopup$.subscribe(id => {
            this.typeId = id;
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
        this.types.archive(id).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data){
        this.response = data.message;
        this.responseActive = this.typeId;
        this.close();
        this.types.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }

}
