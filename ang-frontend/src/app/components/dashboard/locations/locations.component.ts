import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/interfaces/location.interface';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
locations:Location[];
response = null;
responseActive = false;

  constructor(private locationService:LocationService) { 
    this.locationService.returnRefresLocations().subscribe(()=>{
      this.getLocations();
    });
    this.locationService.returnSetDeletedItem().subscribe((id:number)=>{
      this.onDelete(id);
    });
    this.locationService.returDeleteResponse().subscribe((response:string)=>{
      this.onDeleteResponse(response);
    })
  }

  ngOnInit() {
   this.getLocations();
  }

  getLocations(){
    this.locationService.getLocations().subscribe(resp=>{
      this.handleResponse(resp);
    });
  }

  handleResponse(resp)
  {
    this.locations = resp.data;
  }
  onDelete(id){
    const position = this.locations.findIndex(
      (locationsEl: Location) =>{
        return locationsEl.id == id;
      }
    );
    this.locations.splice(position, 1);
  }
  
  onDeleteResponse(response){
    this.response = response;
    this.responseActive = true;
    setTimeout(() => {
      this.responseActive = false;
    }, 2000);
  }
}

