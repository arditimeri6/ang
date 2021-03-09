import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

    plans;
    selectedPlan;

    constructor(private service:PlanService) { 
        this.service.updateBusiness();
        this.service.getBusinessPlans().subscribe((resp: any)=>{
            this.plans = resp.data;
        });

        this.service.getSelectedPlan().subscribe((resp: any)=>{
            this.selectedPlan = resp;
        });

        this.service.refreshData$.subscribe((resp: any)=>{
            this.service.getSelectedPlan().subscribe((resp: any)=>{
                this.selectedPlan = resp;
            });
        })
    }

    ngOnInit() {
    
    }

}
