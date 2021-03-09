import { Component, OnInit, Input } from '@angular/core';
import { Plan } from 'src/app/interfaces/plan.inteface';
import { PlanService } from 'src/app/services/plan.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
// @Input() plan:Plan;
// planTypeTitle:string;
// planTypeDescription:string;
// planTypePrice:string;
// planTypeActive:string;
// onUpdateActive = null;
// response = null;
// responseActive = false;
// onDeleteActive = null;
// onOverlayActive = null;
// public error = [];
//   constructor(private planService:PlanService) { }

  ngOnInit() {
    // this.planTypeTitle = this.plan.title;
    // this.planTypeDescription = this.plan.description;
    // this.planTypePrice = this.plan.price;
    // this.planTypeActive = this.plan.active;
  }
//   onSubmit(form:NgForm){
//     console.log(form);
//     this.planService.updatePlan(form.value.title, form.value.description, form.value.price, form.value.active, this.plan.id).subscribe(
//       data => this.handleResponse(data),
//       error => this.handleError(error)
//     )
//   }
//   handleResponse(data){
//     this.plan.title = data.plan.title;
//     this.plan.description = data.plan.description;
//     this.plan.price = data.plan.price;
//     this.plan.active = data.plan.active;
//     this.closeModule();
//     this.response = data.data;
//     this.responseActive = true;
//     setTimeout(() => {
//       this.responseActive = false;
//     }, 2000);
//   }
// handleError(error){
//     this.error = error.error.errors;
// }
// onUpdatePopup(moduleid){
//     this.onUpdateActive = moduleid;
//     this.onOverlayActive = moduleid;
// }

// closeModule(){
//   this.onUpdateActive = null;
//   this.onDeleteActive = null;
//   this.onOverlayActive = null;
// }
  
// onDeletePopup(id:number){
//  this.onDeleteActive = id;
//  this.onOverlayActive = id;
// }

//   onDelete(id:number){
//     this.planService.deletePlan(id).subscribe(
//      data => this.handleDeleteResponse(data),
//      error => this.handleDelteError(error)
//     );
//   }

  
//   handleDeleteResponse(data){
//     this.closeModule();
//     this.planService.setDeletedItem(this.plan.id, data.data);
//   }

//   handleDelteError(error){
//     console.log(error);
//   }
}
