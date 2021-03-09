import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, Input } from '@angular/core';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ModuleService } from 'src/app/services/module.service';
import { NgForm } from '@angular/forms';
import {businessTypeModules} from 'src/app/interfaces/businestypemodule.interface';
import { BusinesstypemoduleService } from 'src/app/services/businesstypemodule.service';
import { Plan } from 'src/app/interfaces/plan.inteface';
import { PlanService } from 'src/app/services/plan.service';
import { Module } from 'src/app/interfaces/module.interface';
@Component({
  selector: 'app-single-businesstype',
  templateUrl: './single-businesstype.component.html',
  styleUrls: ['./single-businesstype.component.scss']
})
export class SingleBusinesstypeComponent implements OnInit {
  id:number;
  singleData:any;
  modules:Module[] = [];
  onAdd:businessTypeModules[] = [];
  plans:Plan[];
  onDelete = [];
  checkedValue:any;
  @ViewChildren('allinputs') inputs: QueryList<any>;
  
  constructor(private businessTypeService: BusinessTypeService,
              private moduleService:ModuleService,
              private planService:PlanService,
              private route: ActivatedRoute,
              private businessTypeServiceModule:BusinesstypemoduleService) { }


  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) =>{
        this.id = params['id'];
      }
    );
    // this.getBusinessTypeSingle();
    this.getModules();
  }

  ngAfterViewInit():void {
    this.inputs.changes.subscribe(t => {
      this.ngForRendred();
    })

  }

  ngForRendred(){
      // this.getBusinessTypeModules()
  }
// Get Business Info
  // getBusinessTypeSingle(){
  //   this.businessTypeService.getBusinessTypeSingle(this.id).subscribe(resp=>{
  //     this.singleData = resp;
  //   })
  // }
// Get All Modules
  getModules(){
    this.moduleService.getModules()
    .subscribe(resp=>{
      this.returnBusinessesModule(resp);
    })
  }
  returnBusinessesModule(resp){
    // console.log(resp.data);
    this.modules = resp.data;
  }
  // Get Business Modules
  getBusinessTypeModules(){
    this.businessTypeServiceModule.getBusinessTypeModules(this.id).subscribe(resp=>{
      this.checkedValue = resp;
      this.addCheckedAttribute(resp);
    })
  }
// Get Plans
// getPlans(){
//   this.planService.getPlans().subscribe(resp=>{

//   })
// }
  onSubmit(form:NgForm){
     for(let i = 0; i < this.modules.length; i++){
        var moduleInput = <HTMLInputElement>document.getElementById('module-'+this.modules[i].id);
        if(moduleInput.checked == true && !moduleInput.hasAttribute('checked')){
          this.onAdd.push({
            business_types_id:this.id,
            modules_id: parseInt(moduleInput.value)
          });
          moduleInput.setAttribute("checked", "checked");
        } else if(moduleInput.checked == false && moduleInput.hasAttribute('checked')) {
          let itemid = moduleInput.getAttribute("item-id");
          moduleInput.removeAttribute("checked");
          this.onDelete.push({
            id:itemid,
          });
        }
       
    }
    this.onAdd.forEach(onadd =>{
        this.businessTypeServiceModule.addBusinessTypeModule(onadd.business_types_id, onadd.modules_id).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error),
      );
    });
    this.onAdd = [];

  this.onDelete.forEach(ondelete =>{
    this.businessTypeServiceModule.deleteBusinessTypeModule(ondelete.id).subscribe(
      data => this.handleDeleteResponse(data),
      error => this.handleDeleteError(error),
    );
  });
  this.onDelete = [];
}

  handleResponse(data){
    // console.log(data);
    this.getBusinessTypeModules();
  }

  handleError(error){
    console.log(error);
  }

  handleDeleteResponse(data){
    // console.log(data);
  }

  handleDeleteError(error){
    console.log(error);
  }

  addCheckedAttribute(resp){
      for(let i = 0; i< resp.length; i++){   
        var moduleInputChecked = <HTMLInputElement>document.getElementById('module-'+resp[i].modules_id);
        moduleInputChecked.checked = true;
        moduleInputChecked.setAttribute("checked", "checked");
        moduleInputChecked.setAttribute("item-id", resp[i].id);
      }
  }

}
