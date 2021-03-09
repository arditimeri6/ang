import { Component, OnInit } from '@angular/core';
import { AdminBusinessesService } from 'src/app/services/admin-businesses.service';

@Component({
  selector: 'app-add-business-event-types',
  templateUrl: './add-business-event-types.component.html',
  styleUrls: ['./add-business-event-types.component.scss']
})
export class AddBusinessEventTypesComponent implements OnInit {

    allEventTypes = [];
    businessEventTypes = [];
    businessEventTypesId = [];
    eventTypes = [];
    formActive:boolean = false;
    // eventType;
    eventTypeId: number;
    response;
    responseActive;

    constructor(private service:AdminBusinessesService) { 
        this.service.getAllEventTypes().subscribe((resp: any)=> {
            this.allEventTypes = resp.data;
        })

        this.service.openAddEventTypesPopup$.subscribe( (resp: any)  => {
            console.log(resp);
            
            this.eventTypeId = resp.id;
            this.service.getEventTypes(this.eventTypeId).subscribe((resp: any) => {
                this.businessEventTypes = resp.data;
                for (let i = 0; i < this.businessEventTypes.length; i++) {
                    this.businessEventTypesId.push(this.businessEventTypes[i].event_type_id)
                }
            })
            this.openAddEventTypesPopup();
        });
    }

    ngOnInit() {
    }

    openAddEventTypesPopup(){
        this.formActive = true;
    }

    close(){
        this.formActive = false;
        this.businessEventTypes = [];
        this.businessEventTypesId = [];
    }

    checkEventType(id){
        var checked = document.getElementById(id);
        checked.toggleAttribute('checked');
    }

    onSubmit(){
        this.businessEventTypes = [];
        this.businessEventTypesId = [];
        var eventTypes = document.getElementsByClassName('form-check-input');
        for (let i = 0; i < eventTypes.length; i++) {
            const element = eventTypes[i];
            if(element.hasAttribute('checked')){
                this.businessEventTypes.push(element.id);
            }
        }

        this.service.addEventTypes(this.eventTypeId, this.businessEventTypes).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        )
    }

    handleResponse(data){
        this.service.refreshEventTypeTable()
        this.response = data.message;
        this.close();
        this.service.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 600);
    }

    handleError(error){
        console.log(error);
    }

}
