import { Component, OnInit, Input } from '@angular/core';
import { PhotoGallery } from 'src/app/interfaces/businessPhotoGallery.interface';
import { PhotoGalleryService } from 'src/app/services/photo-gallery.service';

@Component({
  selector: 'app-trashed-photogallery',
  templateUrl: './trashed-photogallery.component.html',
  styleUrls: ['./trashed-photogallery.component.scss']
})
export class TrashedPhotogalleryComponent implements OnInit {
@Input() trashedphotogallery:PhotoGallery;
overlayActive = null;
formDeleteActive = null;
formRestoreActive = null;
response = null;
responseActive = null;
  constructor(private photogalleryService:PhotoGalleryService) { }

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
    this.photogalleryService.forceDelete(id).subscribe(
      data => this.handleDeleteResponse(data, id)
    )
  }

  handleDeleteResponse(data, id){
    this.close();
    this.photogalleryService.refreshForceDeleteList(data.message, id);
  }

  restore(id){
    this.photogalleryService.restoreDeleted(id).subscribe(
      data => this.handleRestoreResponse(data)
    )
  }
  
  handleRestoreResponse(data){
    this.close();
    this.response = data.message;
    this.responseActive = this.trashedphotogallery.id;
    setTimeout(() => {
      this.responseActive = null;
    }, 1000);
    this.photogalleryService.refreshLists();
    this.photogalleryService.refresTrashList();
  }
}
