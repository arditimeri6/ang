import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  responseActive = false;
  response:string = null;
  error = null;
  constructor(private locationService:LocationService) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.locationService.addLocation(form.value.title).subscribe(
     data => this.handleResponse(data),
     error => this.handleError(error)
    );
  }
  handleResponse(data){
    this.locationService.refreshLocations();
    this.response = data.data;
    this.responseActive = true;
    setTimeout(() => {
      this.responseActive = false;
    }, 2000);
  }
  
  handleError(error){
    this.error = error.error.errors;
  }
}
