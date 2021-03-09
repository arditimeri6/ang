import { Component, OnInit } from '@angular/core';
import { AdminBusinessTypesService } from 'src/app/services/admin-business-types.service';

@Component({
  selector: 'app-type-plans',
  templateUrl: './type-plans.component.html',
  styleUrls: ['./type-plans.component.scss']
})
export class TypePlansComponent implements OnInit {

    
    formActive:boolean = false;
    plans = [];
    type;
    typeId: number;
    response = null;
    responseActive = null;

    constructor(private types:AdminBusinessTypesService) { 
        this.types.openPlansPopup$.subscribe((type: any) => {
            this.type = type;
            this.typeId = type.id;
            this.types.getTypePlans(this.typeId).subscribe((plans: any) => {
                this.plans = plans.data;
                this.openPlansPopup();
            })
        });
        this.types.refreshPlansTable$.subscribe( plans => {
            this.types.getTypePlans(this.typeId).subscribe((plans: any) => {
                this.plans = plans.data;
            })
        })
    }

    ngOnInit() {
    }

    openPlansPopup(){
        this.formActive = true;
    }

    close(){
        this.formActive = false;
    }

    openEditPlansPopup(){
        this.types.openEditPlansPopup(this.type);
    }

    removePlan(id){
        this.types.removePlan(id).subscribe(
            data => this.handleResponse(data, id),
            error => this.handleError(error)
        )
    }

    handleResponse(data, id){
        this.types.refreshPlansTable();
        this.response = data.message;
        this.responseActive = this.typeId;
        this.types.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 600);
    }

    handleError(error){
        console.log(error);
    }

}
