import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BusinessTypeService } from 'src/app/services/business-type.service';

@Component({
  selector: 'app-add-businesstype',
  templateUrl: './add-businesstype.component.html',
  styleUrls: ['./add-businesstype.component.scss']
})
export class AddBusinesstypeComponent implements OnInit {

  constructor(private businessTypeService:BusinessTypeService) { }

  ngOnInit() {
  }
  onSubmit(form:NgForm){
    this.businessTypeService.addBusinessType(form.value.business).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(data){
    // console.log(data);
    this.businessTypeService.refreshBusinessType();
  }
  handleError(error){
    console.log(error);
  }
}
