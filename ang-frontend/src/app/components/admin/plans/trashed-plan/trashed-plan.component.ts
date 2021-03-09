import { Component, OnInit, Input } from '@angular/core';
import { Plan } from 'src/app/interfaces/plan.inteface';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-trashed-plan',
  templateUrl: './trashed-plan.component.html',
  styleUrls: ['./trashed-plan.component.scss']
})
export class TrashedPlanComponent implements OnInit {
  @Input() trasheditem:Plan;
    overlayActive = null;
    formDeleteActive = null;
    formRestoreActive = null;
    response = null;
    responseActive = null;
    constructor(private service:PlanService) { }
  
    ngOnInit() {
    }
  
    restorePopup(id){
      this.overlayActive = id;
      this.formRestoreActive = id;
    }
  
    close(){
      this.overlayActive = null;
      this.formDeleteActive = null;
      this.formRestoreActive = null;
    }
    
    deletePopup(id){
      this.overlayActive = id;
      this.formDeleteActive = id;
    }
  
    delete(id){
      this.service.forceDelete(id).subscribe(
        data => this.handleDeleteResponse(data, id)
      )
    }
  
    handleDeleteResponse(data, id){
      this.close();
      this.service.refreshForceDeleteList(data.message, id);
    }
  
    restore(id){
      this.service.restoreDeleted(id).subscribe(
        data => this.handleRestoreResponse(data)
      )
    }
    
    handleRestoreResponse(data){
      this.close();
      this.response = data.message;
      this.responseActive = this.trasheditem.id;
      setTimeout(() => {
        this.responseActive = null;
      }, 1000);
      this.service.refreshLists();
      this.service.refresTrashList();
    }
}
