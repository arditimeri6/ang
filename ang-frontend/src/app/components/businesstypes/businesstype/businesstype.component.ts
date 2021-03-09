import { Component, OnInit, Input } from '@angular/core';
import { BusinessType } from 'src/app/interfaces/businesstype.interface';
import { NgForm } from '@angular/forms';
import { BusinessTypeService } from 'src/app/services/business-type.service';

@Component({
  selector: 'app-businesstype',
  templateUrl: './businesstype.component.html',
  styleUrls: ['./businesstype.component.scss']
})
export class BusinesstypeComponent implements OnInit {
  @Input() businesstype : BusinessType; 
  moduleBusinessTypeTitle:string;
  onUpdateActive:number = null;
  constructor(private businessTypeService: BusinessTypeService) { }

  ngOnInit() {
    this.moduleBusinessTypeTitle = this.businesstype.title;
  }

onUpdatePopup(moduleid){
  this.onUpdateActive = moduleid;
}

closeModule(){
  this.onUpdateActive = null;
}

onSubmit(form:NgForm){
  // this.businessTypeService.updateBusinessType(form.value.module, this.businesstype.id).subscribe(
  //   data => this.handleResponse(data),
  //   error => this.handleError(error)
  // )
}

handleResponse(data){
//   console.log(data);
  this.businesstype.title = this.moduleBusinessTypeTitle;
  this.closeModule();
}

handleError(error){
  console.log(error);
}

onDelete(id:number){
  // this.businessTypeService.deleteBusinessType(id).subscribe(
  //   data => this.handleDeleteResponse(data),
  //   error => this.handleDeleteError(error)
  // )
}


handleDeleteResponse(data){
  // this.businessTypeService.setDeletedItem(this.businesstype.id);
//   console.log(data);
}
handleDeleteError(error){
  console.log(error);
}
}
