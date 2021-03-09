import { Component, OnInit } from '@angular/core';
import { VideoGallery } from 'src/app/interfaces/businessVideoGallery.interface';
import { VideoGalleryService } from 'src/app/services/video-gallery.service';

@Component({
  selector: 'app-videogalleries',
  templateUrl: './videogalleries.component.html',
  styleUrls: ['./videogalleries.component.scss']
})
export class VideogalleriesComponent implements OnInit {
  response:null;
  responseActive = false;
  items:VideoGallery[];
  trasheditems:VideoGallery[];
  listActive = true;
  
    constructor(private service:VideoGalleryService) {
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
        (itemsEl: VideoGallery) =>{
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
        (trasheditemEl: VideoGallery) =>{
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
