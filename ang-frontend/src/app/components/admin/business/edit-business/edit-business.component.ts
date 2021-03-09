import { Component, OnInit } from '@angular/core';
import { AdminBusinessesService } from 'src/app/services/admin-businesses.service';

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.scss']
})
export class EditBusinessComponent implements OnInit {

    formActive = false;
    response = null;
    responseActive = null;
    businessId: number;
    form= {
        title:null,
        plan_id:null,
        business_type_id:null,
    };
    error= {
        title:null,
        plan_id:null,
        business_type_id:null,
    };
    plans: [];
    types: [];

    constructor(private business:AdminBusinessesService) {
        this.business.getPlans().subscribe((plans: [])=> {
            this.plans = plans;
        })
        this.business.getTypes().subscribe((types: [])=> {
            this.types = types;
        })
        this.business.openEditBusinessPopup$.subscribe((business: any) => {
            this.businessId = business.id;
            this.form.title = business.title;
            this.form.plan_id = business.plan.id;
            this.form.business_type_id = business.business_type.id;
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
        this.business.edit(this.businessId, this.form).subscribe(
            data => this.handleResponse(form, data),
            error => this.handleError(error)
        )
    }

    handleResponse(form, data){
        this.response = data.message;
        this.responseActive = this.businessId;
        this.close();
        form.reset();
        this.business.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }

}
