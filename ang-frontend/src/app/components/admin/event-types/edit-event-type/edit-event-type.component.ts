import { Component, OnInit } from '@angular/core';
import { AdminEventTypesService } from 'src/app/services/admin-event-types.service';

@Component({
  selector: 'app-edit-event-type',
  templateUrl: './edit-event-type.component.html',
  styleUrls: ['./edit-event-type.component.scss']
})
export class EditEventTypeComponent implements OnInit {

    formActive = false;
    response = null;
    responseActive = null;
    eventTypeId: number;
    form= {
        title:null
    };
    
    constructor(private eventTypes:AdminEventTypesService) { 
        this.eventTypes.openEditEventTypePopup$.subscribe((eventType: any) => {
            this.eventTypeId = eventType.id;
            this.form.title = eventType.title;
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
        this.eventTypes.edit(this.eventTypeId, this.form).subscribe(
            data => this.handleResponse(form, data),
            error => this.handleError(error)
        )
    }

    handleResponse(form, data){
        this.response = data.message;
        this.responseActive = this.eventTypeId;
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
