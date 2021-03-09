import { Component, OnInit } from '@angular/core';
import { AdminBusinessTypesService } from 'src/app/services/admin-business-types.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {

    formActive: boolean = false;
    response = null;
    responseActive = null;
    form= {
        title:null
    };
    error= {
        title:null
    };

    constructor(private types: AdminBusinessTypesService) {
        this.types.openAddTypePopup$.subscribe(data =>{
            this.openAddPopup();
        })
    }

    ngOnInit() {
    }

    openAddPopup(){
        this.formActive = true;
    }

    close(){
        this.formActive = false;
    }

    onSubmit(form){
        this.types.add(this.form).subscribe(
            data => this.handleResponse(form,data),
            error => this.handleError(error)
        )
    }

    handleResponse(form, data){
        this.response = data.message;
        this.responseActive = data.message;
        this.close();
        form.reset();
        this.types.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }

}
