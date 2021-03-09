import { Component, OnInit } from '@angular/core';
import { PlaceService } from 'src/app/services/place.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {
  formActive:boolean = false;
  selectedFile:any = null;
  response:string = null;
  responseActive:boolean = false;
  locations:Location;
  constructor(private service:PlaceService,
              private locationService:LocationService) { }
  
  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }  
  form= {
    title:null,
    address:null,
    location_id:null
  };

  error= {
    title:null,
    address:null,
    location_id:null
  };

  ngOnInit() {
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
  openPupup(){
    this.formActive = true;
  }
  
  onSubmit(){
    this.service.add(this.form).subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    )
  }

  handleData(data){
    this.service.refreshLists();
    this.response = data.message;
    this.close();
    this.responseActive = true;
    setTimeout(() => {
      this.responseActive = false;
    }, 2000);
  }

  handleError(error){
    this.error = error.error.errors

  }

  close(){
    this.formActive = false;
  }
}
