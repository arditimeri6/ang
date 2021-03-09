import { Component, OnInit, Input } from '@angular/core';
import { VideoGallery } from 'src/app/interfaces/businessVideoGallery.interface';
import { VideoGalleryService } from 'src/app/services/video-gallery.service';

@Component({
  selector: 'app-trashed-videogallery',
  templateUrl: './trashed-videogallery.component.html',
  styleUrls: ['./trashed-videogallery.component.scss']
})
export class TrashedVideogalleryComponent implements OnInit {
    @Input() trasheditem:VideoGallery;
    overlayActive = null;
    formDeleteActive = null;
    formRestoreActive = null;
    response = null;
    responseActive = null;
    constructor(private service:VideoGalleryService) { }
  
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
