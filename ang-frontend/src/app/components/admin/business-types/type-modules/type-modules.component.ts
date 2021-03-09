import { Component, OnInit } from '@angular/core';
import { AdminBusinessTypesService } from 'src/app/services/admin-business-types.service';

@Component({
  selector: 'app-type-modules',
  templateUrl: './type-modules.component.html',
  styleUrls: ['./type-modules.component.scss']
})
export class TypeModulesComponent implements OnInit {

    formActive:boolean = false;
    userModules = [];
    type;
    typeId: number;
    response = null;
    responseActive = null;

    constructor(private types:AdminBusinessTypesService) {
        this.types.openModulesPopup$.subscribe((type: any) => {
            this.type = type;
            this.typeId = type.id;
            this.types.getTypeModules(this.typeId).subscribe((modules: any) => {
                this.userModules = modules.data;
                this.openModulesPopup();
            })
        });
        this.types.refreshModulesTable$.subscribe( modules => {
            this.types.getTypeModules(this.typeId).subscribe((modules: any) => {
                this.userModules = modules.data;
                
            })
        })
    }

    ngOnInit() {
    }

    openModulesPopup(){
        this.formActive = true;
    }

    close(){
        this.formActive = false;
    }

    openEditModulesPopup(){
        this.types.openEditModulesPopup(this.type);
    }

    removeModule(id){
        this.types.removeModule(id).subscribe(
            data => this.handleResponse(data, id),
            error => this.handleError(error)
        )
    }

    handleResponse(data, id){
        this.types.refreshModulesTable();
        this.response = data.message;
        this.responseActive = this.typeId;
        this.types.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 600);
    }

    handleError(error){
        console.log(error);
    }

}
