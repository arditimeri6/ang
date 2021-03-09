import { Component, OnInit } from '@angular/core';
import { AdminModulesService } from 'src/app/services/admin-modules.service';

@Component({
  selector: 'app-delete-module',
  templateUrl: './delete-module.component.html',
  styleUrls: ['./delete-module.component.scss']
})
export class DeleteModuleComponent implements OnInit {

    formDeleteActive: boolean = false;
    moduleId;
    response = null;
    responseActive = null;

    constructor(private modules:AdminModulesService) { 
        this.modules.openDeleteModulePopup$.subscribe(id => {
            this.moduleId = id;
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
        this.modules.archive(id).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data){
        this.response = data.message;
        this.responseActive = this.moduleId;
        this.close();
        this.modules.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }

}
