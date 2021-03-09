import { Component, OnInit, Input } from '@angular/core';
import { TextboxService } from 'src/app/services/textbox.service';

@Component({
  selector: 'app-business-profile-textbox',
  templateUrl: './business-profile-textbox.component.html',
  styleUrls: ['./business-profile-textbox.component.scss']
})
export class BusinessProfileTextboxComponent implements OnInit {
  @Input() slug:string;
  textbox:any;
  constructor(private textboxService: TextboxService) { }

  ngOnInit() {
  this.getTextBox();
  }
  
  getTextBox(){
    this.textboxService.getSingleText(this.slug).subscribe(resp=>{
      this.handleResponse(resp);
    })
  }
  handleResponse(resp){
    this.textbox = resp.data;
    // console.log(this.textbox);
  }
}
