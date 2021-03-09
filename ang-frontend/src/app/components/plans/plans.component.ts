import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/interfaces/plan.inteface';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
plans: Plan[];
response = null;
responseActive = false;
  constructor(private planService:PlanService) { 
    // this.planService.returnRefreshPlan().subscribe(()=>{
    //   this.getPlans();
    // });
    // this.planService.returnSetDeletedItem().subscribe((id:number)=>{
    //   this.onDelete(id);
    // });
    // this.planService.returDeleteResponse().subscribe((response:string)=>{
    //   this.onDeleteResponse(response);
    // })
  }

  ngOnInit() {
    // this.getPlans();
  }
  getPlans(){
    // this.planService.getPlans().subscribe(resp=>{
    //   this.handleResponse(resp);
    // });
  }

  handleResponse(resp){
    this.plans = resp.data;
  }

  onDelete(id){
    const position = this.plans.findIndex(
      (plansEl: Plan) =>{
        return plansEl.id == id;
      }
    );
    this.plans.splice(position, 1);
  }
  
  onDeleteResponse(response){
    this.response = response;
    this.responseActive = true;
    setTimeout(() => {
      this.responseActive = false;
    }, 2000);
  }
}
