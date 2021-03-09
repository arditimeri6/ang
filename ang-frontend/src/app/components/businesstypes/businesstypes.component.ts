import { Component, OnInit } from '@angular/core';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import { BusinessType } from 'src/app/interfaces/businesstype.interface';

@Component({
  selector: 'app-businesstypes',
  templateUrl: './businesstypes.component.html',
  styleUrls: ['./businesstypes.component.scss']
})
export class BusinesstypesComponent implements OnInit {
businesstypes: BusinessType[] = [];
  constructor(private businessTypeServices: BusinessTypeService) { 
    // this.businessTypeServices.returnRefreshBusinessType().subscribe(()=>{
    //   this.getBusinessTypes();
    // });
    // this.businessTypeServices.returnSetDeletedItem().subscribe((id:number)=>{
    //   this.onDelete(id);
    // })
  }

  ngOnInit() {
    // this.getBusinessTypes();
  }
  getBusinessTypes(){
    this.businessTypeServices.getBusinessType()
    .subscribe((businesstypes: BusinessType[])=> this.businesstypes = businesstypes)
  }
  onDelete(id){
    const position = this.businesstypes.findIndex(
      (businesstypesEl: BusinessType) =>{
        return businesstypesEl.id == id;
      }
    );
    this.businesstypes.splice(position, 1);
  }
}
