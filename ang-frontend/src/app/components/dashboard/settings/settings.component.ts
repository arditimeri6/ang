import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { Business } from 'src/app/interfaces/business.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedFile:any = null;
  business:Business;
  constructor(private businessService:BusinessService) { 
   
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }  
  ngOnInit() {
   this.getBusinessActive();
  }
 getBusinessActive(){
  this.businessService.getActive().subscribe(resp=>{
    this.businessActive(resp);
  });
 }
  updateLogo(){
    this.businessService.updateLogo(this.selectedFile).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }
  handleResponse(data){
      console.log(data);
      
    this.business = data.data;
    this.businessService.handleBusinessActiveData(data);
  }
  handleError(error){
     console.log(error);
  }
  
  businessActive(resp){
    this.business = resp.data;
  }
}
