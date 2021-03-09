import { Component, OnInit } from '@angular/core';
import { AdminEventTypesService } from 'src/app/services/admin-event-types.service';

@Component({
  selector: 'app-delete-event-type',
  templateUrl: './delete-event-type.component.html',
  styleUrls: ['./delete-event-type.component.scss']
})
export class DeleteEventTypeComponent implements OnInit {

    formDeleteActive: boolean = false;
    eventTypeId;
    response = null;
    responseActive = null;
        
    constructor(private eventTypes:AdminEventTypesService) { 
        this.eventTypes.openDeleteEventTypePopup$.subscribe(id => {
            this.eventTypeId = id;
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
        this.eventTypes.archive(id).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data){
        this.response = data.message;
        this.responseActive = this.eventTypeId;
        this.close();
        this.eventTypes.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }
}
