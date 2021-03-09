import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';
import { Plan } from 'src/app/interfaces/plan.inteface';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  response:null;
  responseActive = false;
  items:Plan[];
  trasheditems:Plan[];
  listActive = true;
  isChecked:boolean = false;
    constructor(private service:PlanService) {
      this.service.returnRefresList().subscribe(()=>{
        this.getData();
       });
      this.service.returnRefresTrashList().subscribe(()=>{
        this.getTrashed();
      });
      this.service.returnRefreshDeletedList().subscribe(id =>{
        this.onDeleteEvent(id);
      });
      this.service.returnDeleteResponse().subscribe(data =>{
        this.onDeleteResponse(data);
      });
      this.service.returnRefreshForceDeletedList().subscribe(id =>{
        this.onForceDeleteEvent(id);
      });
      this.service.returnForceDeletedResponse().subscribe(data =>{
        this.onForceDeleteResponse(data);
      });
     }
  
    ngOnInit() {
      this.getData();
      this.getTrashed();
    }
  
    getData(){
      this.service.get().subscribe(resp=>{
        this.handleResponse(resp);
      });
    }
    handleResponse(resp){
      this.items = resp.data;
    //   console.log(this.items);
    }
  
    getTrashed(){
      this.service.getTrashed().subscribe(resp=>{
        this.handleTrashedResponse(resp);
      });
    }
    
    handleTrashedResponse(resp){
      this.trasheditems = resp.data;
    }
  
    onDeleteEvent(id){
      const position = this.items.findIndex(
        (itemsEl: Plan) =>{
          return itemsEl.id == id;
        }
      );
      this.items.splice(position, 1);
    }
  
    onDeleteResponse(data){
      this.response = data;
      this.responseActive = true;
      setTimeout(() => {
        this.responseActive = false;
      }, 1000);
    }
  
    onForceDeleteEvent(id){
      const position = this.trasheditems.findIndex(
        (trasheditemEl: Plan) =>{
          return trasheditemEl.id == id;
        }
      );
      this.trasheditems.splice(position, 1);
    }
  
    onForceDeleteResponse(data){
      this.response = data;
      this.responseActive = true;
      setTimeout(() => {
        this.responseActive = false;
      }, 1000);
    }
    activePublished(){
      this.listActive = true;
  
    } 
    activeTrashed() {
      this.listActive = false;
  
    }
}
