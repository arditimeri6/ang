import { Component, OnInit } from '@angular/core';
import { AdminBusinessesService } from 'src/app/services/admin-businesses.service';

@Component({
  selector: 'app-delete-business',
  templateUrl: './delete-business.component.html',
  styleUrls: ['./delete-business.component.scss']
})
export class DeleteBusinessComponent implements OnInit {

  formDeleteActive: boolean = false;
  businessId;
  response = null;
  responseActive = null;

  constructor(private business:AdminBusinessesService) { 
      this.business.openDeletePopup$.subscribe(id => {
          this.businessId = id;
          this.openDeletePopup();
      });
  }

  ngOnInit() {
  }

  openDeletePopup(){
      this.formDeleteActive = true;
  }

  close(){
      this.formDeleteActive = false;
  }

  delete(id){
      this.business.archive(id).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
      );
  }

  handleResponse(data){
      this.response = data.message;
      this.responseActive = this.businessId;
      this.close();
      this.business.refreshTable();
      setTimeout(() => {
          this.responseActive = null;
      }, 1000);
  }

  handleError(error){
      console.log(error);
  }

}
