import { Component, OnInit } from '@angular/core';
import { AdminEventTypesService } from 'src/app/services/admin-event-types.service';

@Component({
  selector: 'app-add-event-type',
  templateUrl: './add-event-type.component.html',
  styleUrls: ['./add-event-type.component.scss']
})
export class AddEventTypeComponent implements OnInit {

    formActive: boolean = false;
    response = null;
    responseActive = null;
    form= {
        title:null
    };
    error= {
        title:null
    };

    constructor(private eventTypes: AdminEventTypesService) { 
        this.eventTypes.openAddEventTypePopup$.subscribe(data =>{
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
        this.eventTypes.add(this.form).subscribe(
            data => this.handleResponse(form,data),
            error => this.handleError(error)
        )
    }

    handleResponse(form, data){
        this.response = data.message;
        this.responseActive = data.message;
        this.close();
        form.reset();
        this.eventTypes.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }
}
