import { Component, OnInit, Input } from '@angular/core';
import { VideoGallery } from 'src/app/interfaces/businessVideoGallery.interface';
import { VideoGalleryService } from 'src/app/services/video-gallery.service';

@Component({
  selector: 'app-videogallery',
  templateUrl: './videogallery.component.html',
  styleUrls: ['./videogallery.component.scss']
})
export class VideogalleryComponent implements OnInit {
  @Input() item:VideoGallery;
  overlayActive = null;
  formDeleteActive = null;
  formUpdateActive = null;
  response = null;
  responseActive = null;
  selectedFile:any;
  form = {
    title:null,
    content:null,
    videoid:null
  };
  constructor(private service:VideoGalleryService) { }

  
  ngOnInit(){
    this.form.title = this.item.title;
    this.form.content = this.item.content;
    this.form.videoid = this.item.videoid;
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
    console.log(data);
    this.close();
    this.service.refreshDeleteList(data.message, id);
    this.service.refresTrashList();
  }
  
  onUpdatePopup(id){
    this.overlayActive = id;
    this.formUpdateActive = id;
   }
  
   onFileSelected(event){
    this.selectedFile = event.target.files[0];
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
