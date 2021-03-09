import { Component, OnInit } from '@angular/core';
import { AdminModulesService } from 'src/app/services/admin-modules.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {

    formActive: boolean = false;
    response = null;
    responseActive = null;
    form= {
        title:null
    };
    error= {
        title:null
    };

    constructor(private modules: AdminModulesService) { 
        this.modules.openAddModulePopup$.subscribe(data =>{
            this.openAddPopup();
        })
    }

    ngOnInit() {
    }

    openAddPopup(){
        this.formActive = true;
    }

    close(){
        this.formActive = false;
    }

    onSubmit(form){
        this.modules.add(this.form).subscribe(
            data => this.handleResponse(form,data),
            error => this.handleError(error)
        )
    }

    handleResponse(form, data){
        this.response = data.message;
        this.responseActive = data.message;
        this.close();
        form.reset();
        this.modules.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }
}
