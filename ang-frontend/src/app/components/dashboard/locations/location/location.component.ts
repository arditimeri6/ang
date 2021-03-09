import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/interfaces/location.interface';
import { LocationService } from 'src/app/services/location.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
@Input() location:Location;
locationTypeTitle:string;
onUpdateActive = null;
response = null;
responseActive = false;
onDeleteActive = null;
onOverlayActive = null;
error = null;
  constructor(private locationService:LocationService) { }

  ngOnInit() {
    this.locationTypeTitle = this.location.title;
  }
  
  onSubmit(form:NgForm){
    this.locationService.updateLocation(form.value.module, this.location.id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(data){
    this.location.title = data.location.title;
    this.closeModule();
    this.response = data.data;
    this.responseActive = true;
    setTimeout(() => {
      this.responseActive = false;
    }, 2000);
  }
handleError(error){
    this.error = error.error.errors.title[0];
}
onUpdatePopup(moduleid){
    this.onUpdateActive = moduleid;
    this.onOverlayActive = moduleid;
}

closeModule(){
  this.onUpdateActive = null;
  this.onDeleteActive = null;
  this.onOverlayActive = null;
}
  
onDeletePopup(id:number){
 this.onDeleteActive = id;
 this.onOverlayActive = id;
}

  onDelete(id:number){
    this.locationService.deleteLocation(id).subscribe(
     data => this.handleDeleteResponse(data),
     error => this.handleDelteError(error)
    );
  }

  
  handleDeleteResponse(data){
    this.closeModule();
    this.locationService.setDeletedItem(this.location.id, data.data);
  }

  handleDelteError(error){
    console.log(error);
  }

}
