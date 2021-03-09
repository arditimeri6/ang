import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModuleService } from 'src/app/services/module.service';
import { Module } from 'src/app/interfaces/module.interface';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  moduleTypeTitle:string;
  @Input() module : Module;
  onUpdateActive = null;
  response = null;
  responseActive = false;
  onDeleteActive = null;
  onOverlayActive = null;
  error = null; 
  constructor(private moduleService:ModuleService) { }

  ngOnInit() {
    this.moduleTypeTitle = this.module.title;
  }

  onSubmit(form:NgForm){
    this.moduleService.updateModule(form.value.module, this.module.id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  } 

  handleResponse(data){
    this.module.title = data.module.title;
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
    this.moduleService.deleteModule(id).subscribe(
      data => this.handleDeleteResponse(data),
      error => this.handleDeleteError(error)
    )
  }

  
  handleDeleteResponse(data){
    this.closeModule();
    this.moduleService.setDeletedItem(this.module.id, data.data);
  }

  handleDeleteError(error){
    console.log(error);
  }
}
