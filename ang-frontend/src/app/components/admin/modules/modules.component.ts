import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AdminModulesService } from 'src/app/services/admin-modules.service';
import { Module } from 'src/app/interfaces/module.interface';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

    displayedColumns: string[] = ['id', 'title', 'actions'];
    dataSource: MatTableDataSource<Module>;
    activateArchive = false;
  
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private modules:AdminModulesService) { 
        this.modules.getModules().subscribe((data: any) => {
            this.dataSource = new MatTableDataSource<Module>(data.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.modules.refreshTableOb.subscribe(data => {
            this.modules.getModules().subscribe((data: any) => {
                this.dataSource.data = data.data;
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

    openArchive(){
        this.activateArchive = true;
    }

    openModules(){
        this.activateArchive = false;
    }

    openAddModule(){
        this.modules.openAddModulePopup();
    }

    openEditPopup(modules){
        this.modules.openEditPopup(modules);
    }

    openDeletePopup(id){
        this.modules.openDeletePopup(id);
    }

}
