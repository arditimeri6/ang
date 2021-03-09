import { Component, OnInit } from '@angular/core';
import { AdminBusinessTypesService } from 'src/app/services/admin-business-types.service';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent implements OnInit {

    formActive = false;
    response = null;
    responseActive = null;
    typeId: number;
    form= {
        title:null
    };
    

    constructor(private types:AdminBusinessTypesService) { 
        this.types.openEditTypePopup$.subscribe((type: any) => {
            this.typeId = type.id;
            this.form.title = type.title;
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

    onSubmit(form){
        this.types.edit(this.typeId, this.form).subscribe(
            data => this.handleResponse(form, data),
            error => this.handleError(error)
        )
    }

    handleResponse(form, data){
        this.response = data.message;
        this.responseActive = this.typeId;
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
