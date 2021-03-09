import { Component, OnInit } from '@angular/core';
import { AdminModulesService } from 'src/app/services/admin-modules.service';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent implements OnInit {

    formActive = false;
    response = null;
    responseActive = null;
    moduleId: number;
    form= {
        title:null
    };

    constructor(private modules:AdminModulesService) { 
        this.modules.openEditModulePopup$.subscribe((modules: any) => {
            this.moduleId = modules.id;
            this.form.title = modules.title;
            this.openPopup();
        });
    }

    ngOnInit() {
    }

    openPopup(){
        this.formActive = true;
    }

    close(){
        this.formActive = false;
    }

    onSubmit(form){
        this.modules.edit(this.moduleId, this.form).subscribe(
            data => this.handleResponse(form, data),
            error => this.handleError(error)
        )
    }

    handleResponse(form, data){
        this.response = data.message;
        this.responseActive = this.moduleId;
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
