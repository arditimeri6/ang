import { Component, OnInit, Input } from '@angular/core';
import { Plan } from 'src/app/interfaces/plan.inteface';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  @Input() item:Plan;
  overlayActive = null;
  formDeleteActive = null;
  formUpdateActive = null;
  response = null;
  responseActive = null;
  selectedFile:any;
  form = {
    title:null,
    description:null,
    price:null,
    active:null
  };
  constructor(private service:PlanService) { }

  
  ngOnInit(){
    this.form.title = this.item.title;
    this.form.description = this.item.description;
    this.form.price = this.item.price;
    this.form.active = this.item.active
  }

  close(){
    this.overlayActive = null;
    this.formDeleteActive = null;
    this.formUpdateActive = null;
  }

  onDeletePopup(id){
   this.overlayActive = id;
   this.formDeleteActive = id;
  }


  delete(id){
    this.service.softdelete(id).subscribe(
      data => this.handleDeleteResponse(data, id)
    )
  }

  handleDeleteResponse(data, id){
    // console.log(data);
    this.close();
    this.service.refreshDeleteList(data.message, id);
    this.service.refresTrashList();
  }
  
  onUpdatePopup(id){
    this.overlayActive = id;
    this.formUpdateActive = id;
   }
  
   onChangeStatus(){
     this.update(this.item.id);
   }
  
   update(id){
    this.service.update(this.form, id).subscribe(
      data => this.handleUpdateData(data),
    )  
   }

   handleUpdateData(data){
    this.close();
    this.response = data.message;
    this.responseActive = this.item.id;
    this.item = data.data;
    setTimeout(() => {
      this.responseActive = null;
    }, 1000);
   }
}
