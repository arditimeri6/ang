import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/interfaces/place.inteface';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-trashed-place',
  templateUrl: './trashed-place.component.html',
  styleUrls: ['./trashed-place.component.scss']
})
export class TrashedPlaceComponent implements OnInit {
  @Input() trasheditem:Place;
  overlayActive = null;
  formDeleteActive = null;
  formRestoreActive = null;
  response = null;
  responseActive = null;
  constructor(private service:PlaceService) { }

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
