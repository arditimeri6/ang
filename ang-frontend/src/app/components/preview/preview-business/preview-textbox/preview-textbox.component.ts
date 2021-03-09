import { Component, OnInit } from '@angular/core';
import { AdminBusinessesService } from 'src/app/services/admin-businesses.service';

@Component({
  selector: 'app-preview-textbox',
  templateUrl: './preview-textbox.component.html',
  styleUrls: ['./preview-textbox.component.scss']
})
export class PreviewTextboxComponent implements OnInit {

    textbox;

    constructor(private business:AdminBusinessesService) {
        this.business.getTextBox$.subscribe((business: any) => {
            this.textbox = null;
            this.business.getBusinessTextBox(business).subscribe( (textbox: any) => {
                this.textbox = textbox.data;
            })
        })
    }

    ngOnInit() { 
    }

}
