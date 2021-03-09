import { Component, OnInit, Input } from '@angular/core';
import { Plan } from 'src/app/interfaces/plan.inteface';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

    @Input() plan:Plan;
    @Input() selectedPlan;

    constructor(private service:PlanService) {
    }

    ngOnInit() {
    }

    selectPlan(id){
        this.service.selectPlan(id).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        )
    }

    handleResponse(data){
        console.log(data);
        this.service.refreshPlans();
        
    }

    handleError(error){
        console.log(error);
    }
}
