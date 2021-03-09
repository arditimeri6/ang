import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {
  formActive:boolean = false;
  selectedFile:any = null;
  response:string = null;
  responseActive:boolean = false;
  constructor(private service:PlanService) { }
  
  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }  
  form= {
    title:null,
    content:null,
    price:null,
    active:null,
  };

  error= {
    title:null,
    content:null,
    videoid:null,
    active:null
  };

  ngOnInit() {
  }

  openPupup(){
    this.formActive = true;
  }
  
  onSubmit(){
    this.service.add(this.form).subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    )
  }

  handleData(data){
    this.service.refreshLists();
    this.response = data.message;
    this.close();
    this.responseActive = true;
    setTimeout(() => {
      this.responseActive = false;
    }, 2000);
  }

  handleError(error){
    this.error = error.error.errors

  }

  close(){
    this.formActive = false;
  }
}
