import { Component, OnInit } from '@angular/core';
import { PhotoGalleryService } from 'src/app/services/photo-gallery.service';
import { PhotoGallery } from 'src/app/interfaces/businessPhotoGallery.interface';
import { PlaceService } from 'src/app/services/place.service';
import { Place } from 'src/app/interfaces/place.inteface';

@Component({
  selector: 'app-photogalleries',
  templateUrl: './photogalleries.component.html',
  styleUrls: ['./photogalleries.component.scss']
})
export class PhotogalleriesComponent implements OnInit {
response:null;
responseActive = false;
photogalleries:PhotoGallery[];
trashedphotogalleries:PhotoGallery[];
listActive = true;
places:Place[];
  constructor(private photoGalleryService:PhotoGalleryService,
              private placeService:PlaceService) {
    this.photoGalleryService.returnRefresList().subscribe(()=>{
      this.getData();
     }
    );
    this.photoGalleryService.returnRefresTrashList().subscribe(resp=>{
      this.getTrashed();
    });
    this.photoGalleryService.returnRefreshDeletedList().subscribe(id =>{
      this.onDeleteEvent(id);
    });
    this.photoGalleryService.returnDeleteResponse().subscribe(data =>{
      this.onDeleteResponse(data);
    });
    this.photoGalleryService.returnRefreshForceDeletedList().subscribe(id =>{
      this.onForceDeleteEvent(id);
    });
    this.photoGalleryService.returnForceDeletedResponse().subscribe(data =>{
      this.onForceDeleteResponse(data);
    })
   }

  ngOnInit() {
    this.getData();
    this.getTrashed();
    this.getPlacesData();
  }

  getPlacesData(){
    this.placeService.get().subscribe(resp=>{
      this.handlePlaceResponse(resp);
    });
  }

  handlePlaceResponse(resp){
    this.places = resp.data;
  }

  getData(){
    this.photoGalleryService.get().subscribe(resp=>{
      this.handleResponse(resp);
    });
  }

  handleResponse(resp){
    this.photogalleries = resp.data;
    console.log(resp);
  }

  getTrashed(){
    this.photoGalleryService.getTrashed().subscribe(resp=>{
      this.handleTrashedResponse(resp);
    });
  }
  handleTrashedResponse(resp){
    this.trashedphotogalleries = resp.data;
  }

  onDeleteEvent(id){
    const position = this.photogalleries.findIndex(
      (photogalleryEl: PhotoGallery) =>{
        return photogalleryEl.id == id;
      }
    );
    this.photogalleries.splice(position, 1);
  }

  onDeleteResponse(data){
    this.response = data;
    this.responseActive = true;
    setTimeout(() => {
      this.responseActive = false;
    }, 1000);
  }

  onForceDeleteEvent(id){
    const position = this.trashedphotogalleries.findIndex(
      (trashedphotogalleryEl: PhotoGallery) =>{
        return trashedphotogalleryEl.id == id;
      }
    );
    this.trashedphotogalleries.splice(position, 1);
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
