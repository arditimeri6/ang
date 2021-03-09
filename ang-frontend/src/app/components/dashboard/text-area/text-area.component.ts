import { Component, OnInit } from '@angular/core';
import { TextboxService } from 'src/app/services/textbox.service';
import { TextBox } from 'src/app/interfaces/textbox.interface';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {
textbox:TextBox;
formActive = false;
responseActive = false;
response = null;
form = {
  title:null,
  content:null
}
  constructor(private service:TextboxService) { }

  ngOnInit() { 
    
  this.getTextArea();
  }

  getTextArea(){
    this.service.get().subscribe(resp=>{
      this.handleResponse(resp)
    });
  }

  handleResponse(resp){
    this.textbox = resp.data;
    this.form.title = resp.data.title;
    this.form.content = resp.data.content;
  }

  popupActive(){
    this.formActive = true;
  }
  close(){
    this.formActive = false;
  }
  save(){
      console.log(this.form);
      
    this.service.add(this.form).subscribe(
      data => this.handleSaveResponse(data),
      error => this.handleSaveError(error)
    )
  }
  handleSaveResponse(data){
    this.close();
    this.response = data.message
    this.responseActive = true;
    setTimeout(() => {
      this.responseActive = false;
    }, 1000);
    this.handleResponse(data);
  }
  handleSaveError(error){

    console.log(error);
  }
}
