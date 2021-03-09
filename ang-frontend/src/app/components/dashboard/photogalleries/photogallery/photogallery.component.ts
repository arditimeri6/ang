import { Component, OnInit, Input } from '@angular/core';
import { PhotoGallery } from 'src/app/interfaces/businessPhotoGallery.interface';
import { PhotoGalleryService } from 'src/app/services/photo-gallery.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-photogallery',
  templateUrl: './photogallery.component.html',
  styleUrls: ['./photogallery.component.scss']
})
export class PhotogalleryComponent implements OnInit {
@Input() places;
  @Input() photogallery:PhotoGallery;
  overlayActive = null;
  formDeleteActive = null;
  formUpdateActive = null;
  response = null;
  responseActive = null;
  selectedFile:any;

  
  constructor(private photoGalleryService:PhotoGalleryService) { }

  ngOnInit(){
   
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
    this.photoGalleryService.softdelete(id).subscribe(
      data => this.handleDeleteResponse(data, id)
    )
  }

  handleDeleteResponse(data, id){
    console.log(data);
    this.close();
    this.photoGalleryService.refreshDeleteList(data.message, id);
    this.photoGalleryService.refresTrashList();
  }
  
  onUpdatePopup(id){
    this.overlayActive = id;
    this.formUpdateActive = id;
   }
  
   onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }  
  
   update(form:NgForm, id){
    this.photoGalleryService.update(form.value.place, form.value.banner, this.selectedFile, id).subscribe(
      data => this.handleUpdateData(data),
    )  
   }

   handleUpdateData(data){
    
    this.close();
    this.response = data.message;
    this.responseActive = this.photogallery.id;
    this.photogallery = data.data;
    setTimeout(() => {
      this.responseActive = null;
    }, 1000);
   }
}
