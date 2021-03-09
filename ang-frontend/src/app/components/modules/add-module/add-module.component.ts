import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModuleService } from 'src/app/services/module.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {
  responseActive = false;
  response:string = null;
  error = null;
  constructor(private moduleService: ModuleService) { }

  ngOnInit() {
  }
  onSubmit(form:NgForm){
    this.moduleService.addModule(form.value.module).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(data){
    this.moduleService.refreshModules();
    this.response = data.data;
    this.responseActive = true;
    setTimeout(() => {
      this.responseActive = false;
    }, 2000);
   
  }
  
  handleError(error){
    this.error = error.error.errors.title[0];
  }

}
