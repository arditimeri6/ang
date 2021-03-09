import { Component, OnInit } from '@angular/core';
import { AdminBusinessTypesService } from 'src/app/services/admin-business-types.service';

@Component({
  selector: 'app-add-type-modules',
  templateUrl: './add-type-modules.component.html',
  styleUrls: ['./add-type-modules.component.scss']
})
export class AddTypeModulesComponent implements OnInit {

    allModules = [];
    userModules = [];
    modules = [];
    formActive:boolean = false;
    type;
    typeId: number;
    response;
    responseActive;


    constructor(private types:AdminBusinessTypesService) {
        this.types.getModules().subscribe((modules: any)=> {
            this.allModules = modules.data;
        })

        this.types.openEditModulesPopup$.subscribe((type: any) => {
            this.type = type;
            this.typeId = type.id;

            this.types.getTypeModules(this.typeId).subscribe((modules: any) => {
                this.modules = modules.data;
                if (this.modules.length > 0) {
                    this.modules.forEach(data => {
                        this.userModules.push(data.module_id);
                    });
                }
            })
            this.openAddModulesPopup();
        });
    }

    ngOnInit() {
    }

    openAddModulesPopup(){
        this.formActive = true;
    }

    close(){
        this.formActive = false;
        this.modules = [];
        this.userModules = [];
    }

    checkModule(id){
        var checked = document.getElementById(id);
        checked.toggleAttribute('checked');
    }

    onSubmit(){
        this.userModules = [];
        var modules = document.getElementsByClassName('form-check-input');
        for (let i = 0; i < modules.length; i++) {
            const element = modules[i];
            if(element.hasAttribute('checked')){
                this.userModules.push(element.id);
            }
        }

        this.types.editModules(this.typeId, this.userModules).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        )
    }

    handleResponse(data){
        this.response = data.message;
        this.responseActive = this.typeId;
        this.types.refreshTable();
        this.types.refreshModulesTable();
        this.close();
        setTimeout(() => {
            this.responseActive = null;
        }, 600);
    }

    handleError(error){
        console.log(error);
    }

}
