import { Component, OnInit } from '@angular/core';
import { AdminBusinessTypesService } from 'src/app/services/admin-business-types.service';

@Component({
  selector: 'app-add-type-plans',
  templateUrl: './add-type-plans.component.html',
  styleUrls: ['./add-type-plans.component.scss']
})
export class AddTypePlansComponent implements OnInit {

    allPlans = [];
    userPlans = [];
    plans = [];
    formActive:boolean = false;
    type;
    typeId: number;
    response;
    responseActive;

    constructor(private types:AdminBusinessTypesService) { 
        this.types.getPlans().subscribe((plans: any)=> {
            this.allPlans = plans.data;
        })

        this.types.openEditPlansPopup$.subscribe((type: any) => {
            this.type = type;
            this.typeId = type.id;

            this.types.getTypePlans(this.typeId).subscribe((plans: any) => {
                this.plans = plans.data;
                if (this.plans.length > 0) {
                    this.plans.forEach(data => {
                        this.userPlans.push(data.plan_id);
                    });
                }
            })
            this.openAddPlansPopup();
        });
    }

    ngOnInit() {
    }

    openAddPlansPopup(){
        this.formActive = true;
    }

    close(){
        this.formActive = false;
        this.plans = [];
        this.userPlans = [];
    }

    checkPlan(id){
        var checked = document.getElementById(id);
        checked.toggleAttribute('checked');
    }

    onSubmit(){
        this.userPlans = [];
        var plans = document.getElementsByClassName('form-check-input');
        for (let i = 0; i < plans.length; i++) {
            const element = plans[i];
            if(element.hasAttribute('checked')){
                this.userPlans.push(element.id);
            }
        }
        this.types.editPlans(this.typeId, this.userPlans).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        )
    }

    handleResponse(data){
        this.response = data.message;
        this.responseActive = this.typeId;
        this.types.refreshTable();
        this.types.refreshPlansTable();
        this.close();
        setTimeout(() => {
            this.responseActive = null;
        }, 600);
    }

    handleError(error){
        console.log(error);
    }

}
