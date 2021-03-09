import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AdminModulesService } from 'src/app/services/admin-modules.service';
import { Module } from 'src/app/interfaces/module.interface';

@Component({
  selector: 'app-archive-module',
  templateUrl: './archive-module.component.html',
  styleUrls: ['./archive-module.component.scss']
})
export class ArchiveModuleComponent implements OnInit {

    displayedColumns: string[] = ['id', 'title', 'actions'];
    dataSource: MatTableDataSource<Module>;
    formRestoreActive = false;
    formDeleteActive = false;
    response = null;
    responseActive = null;
    moduleId;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private modules:AdminModulesService) { 
        this.modules.getArchivedModules().subscribe((data: Module[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.modules.refreshTableOb.subscribe((data: Module[]) => {
            this.modules.getArchivedModules().subscribe((data: Module[]) => {
                this.dataSource.data = data;
            })
        })
    }

    ngOnInit() {
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openRestore(id){
        this.moduleId = id;
        this.formRestoreActive = true;
    }

    openDelete(id){
        this.moduleId = id;
        this.formDeleteActive = true;
    }

    closeRestore(){
        this.formRestoreActive = false;
    }

    restore(){
        this.modules.restore(this.moduleId).subscribe(
            data => this.handleRestoreResponse(data),
            error => this.handleError(error)
        );
    }
    
    handleRestoreResponse(data){
        this.response = data.message;
        this.responseActive = this.moduleId;
        this.closeRestore();
        this.modules.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }

    closeDelete(){
        this.formDeleteActive = false;
    }
    delete(){
        this.modules.delete(this.moduleId).subscribe(
            data => this.handleDeleteResponse(data),
            error => this.handleError(error)
        );
    }

    handleDeleteResponse(data){
        this.response = data.message;
        this.responseActive = this.moduleId;
        this.closeDelete();
        this.modules.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

}
