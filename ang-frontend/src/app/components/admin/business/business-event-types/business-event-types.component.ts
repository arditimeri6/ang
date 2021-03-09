import { Component, OnInit } from '@angular/core';
import { AdminBusinessesService } from 'src/app/services/admin-businesses.service';

@Component({
  selector: 'app-business-event-types',
  templateUrl: './business-event-types.component.html',
  styleUrls: ['./business-event-types.component.scss']
})
export class BusinessEventTypesComponent implements OnInit {

    formActive:boolean = false;
    businessEventTypes = [];
    eventType;
    eventTypeId: number;
    response = null;
    responseActive = null;

    constructor(private eventTypes:AdminBusinessesService) { 
        this.eventTypes.openEventTypesPopup$.subscribe((eventType: any) => {
            this.eventType = eventType;
            this.eventTypeId = eventType.id;
            this.eventTypes.getEventTypes(this.eventTypeId).subscribe((eventTypes: any) => {
                this.businessEventTypes = eventTypes.data;
                this.openEventTypesPopup();
            })
        });
        this.eventTypes.refreshEventTypesData$.subscribe( eventTypes => {
            this.eventTypes.getEventTypes(this.eventTypeId).subscribe((eventTypes: any) => {
                this.businessEventTypes = eventTypes.data;
            })
        })
    }

    ngOnInit() {
    }

    openEventTypesPopup(){
        this.formActive = true;
    }

    close(){
        this.formActive = false;
    }

    openAddEventTypesPopup(){
        this.eventTypes.openAddEventTypePopup(this.eventType);
    }

    removeEventType(id){
        this.eventTypes.deleteEventType(this.eventTypeId, id).subscribe(
            data => this.handleResponse(data, id),
            error => this.handleError(error)
        )
    }

    handleResponse(data, id){
        this.eventTypes.refreshEventTypeTable()
        this.response = data.message;
        this.responseActive = this.eventTypeId;
        this.eventTypes.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 600);
    }

    handleError(error){
        console.log(error);
    }
}
