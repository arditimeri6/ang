import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/services/module.service';
import { Module } from 'src/app/interfaces/module.interface';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
modules:Module[] = [];
response = null;
responseActive = false;
  constructor(private moduleService:ModuleService) {
    this.moduleService.returnRefreshModule().subscribe(()=>{
      this.getModules();
    })
    this.moduleService.returnSetDeletedItem().subscribe((id:number)=>{
      this.onDelete(id);
    });
    this.moduleService.returDeleteResponse().subscribe((response:string)=>{
      this.onDeleteResponse(response);
    })
   }

  ngOnInit() {
    this.getModules();
  }
  getModules(){
    this.moduleService.getModules()
    .subscribe(resp=>{
      this.handleResponse(resp);
    })
  }
  handleResponse(resp){
    this.modules = resp.data;
  }
  
  onDelete(id){
    const position = this.modules.findIndex(
      (modulesEl: Module) =>{
        return modulesEl.id == id;
      }
    );
    this.modules.splice(position, 1);
  }
  onDeleteResponse(response){
    this.response = response;
    this.responseActive = true;
    setTimeout(() => {
      this.responseActive = false;
    }, 2000);
  }
}
