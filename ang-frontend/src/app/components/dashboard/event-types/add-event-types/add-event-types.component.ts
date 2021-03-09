import { Component, OnInit } from '@angular/core';
import { EventTypesService } from 'src/app/services/event-types.service';

@Component({
  selector: 'app-add-event-types',
  templateUrl: './add-event-types.component.html',
  styleUrls: ['./add-event-types.component.scss']
})
export class AddEventTypesComponent implements OnInit {

    allEventTypes = [];
    businessEventTypes = [];
    businessEventTypesId = [];
    eventTypes = [];
    formActive:boolean = false;
    // eventType;
    // eventTypeId: number;
    response;
    responseActive;

    constructor(private service: EventTypesService) { 
        this.service.updateBusiness();
        this.service.getEventTypes().subscribe((resp: any)=> {
            this.allEventTypes = resp.data;
            console.log('allEventTypes', this.allEventTypes);
        })

        this.service.openAddPopUp$.subscribe( resp => {
            this.service.get().subscribe((resp: any) => {
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

        this.service.add(this.businessEventTypes).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        )
    }

    handleResponse(data){
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
