import { Component, OnInit } from '@angular/core';
import { EventTypesService } from 'src/app/services/event-types.service';

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrls: ['./event-types.component.scss']
})
export class EventTypesComponent implements OnInit {

    eventTypes;
    constructor(private service: EventTypesService) { 
        this.service.updateBusiness();
        this.service.get().subscribe((resp: any) =>{
            this.eventTypes = resp.data;
        });
        this.service.refreshData$.subscribe((data: any) =>{
            this.service.get().subscribe((resp: any) =>{
                this.eventTypes = resp.data;
            });
        })
    }

    ngOnInit() {
    }

    openAddType(){
        this.service.openAddPopUp();
    }

    removeEventType(id){
        this.service.delete(id).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        )
    }

    handleResponse(data){
        this.service.refreshTable();
    }

    handleError(error){
        console.log(error);
    }

}
