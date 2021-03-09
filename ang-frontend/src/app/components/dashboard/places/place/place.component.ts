import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/interfaces/place.inteface';
import { PlaceService } from 'src/app/services/place.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {
  @Input() item:Place;
  locations:Location[];
  overlayActive = null;
  formDeleteActive = null;
  formUpdateActive = null;
  response = null;
  responseActive = null;
  selectedFile:any;
  form = {
    title:null,
    address:null,
    location_id:null
  };
  constructor(private service:PlaceService,
              private locationService:LocationService) { }

  
  ngOnInit(){
    this.form.title = this.item.title;
    this.form.address = this.item.address;
    this.form.location_id = this.item.location_id;
    this.getLocation();
  }
  getLocation(){
    this.locationService.getLocations().subscribe(resp=>{
      this.handleResponseLocation(resp);
    });
  }
  handleResponseLocation(resp){
   this.locations = resp.data;
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
