import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/interfaces/place.inteface';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  response:null;
  responseActive = false;
  items:Place[];
  trasheditems:Place[];
  listActive = true;
  
    constructor(private service:PlaceService) {
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
      console.log(this.items);
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
        (itemsEl: Place) =>{
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
        (trasheditemEl: Place) =>{
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
