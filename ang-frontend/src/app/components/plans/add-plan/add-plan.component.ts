import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {
  // responseActive = false;
  // response:string = null;
  // public error = [];
  // constructor(private planService:PlanService) { }

  ngOnInit() {
  }
  // onSubmit(form:NgForm){
  //   this.planService.addPlan(form.value.title, form.value.description, form.value.price, form.value.active).subscribe(
  //    data => this.handleResponse(data),
  //    error => this.handleError(error)
  //   );
  // }
  // handleResponse(data){
  //   this.planService.refreshPlan();
  //   this.response = data.data;
  //   this.responseActive = true;
  //   setTimeout(() => {
  //     this.responseActive = false;
  //   }, 2000);
  // }
  // handleError(error){
  //   this.error = error.error.errors;
  //   console.log(this.error)
  // }
}
