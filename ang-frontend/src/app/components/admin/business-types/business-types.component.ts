import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BusinessType } from 'src/app/interfaces/businesstype.interface';
import { AdminBusinessTypesService } from 'src/app/services/admin-business-types.service';

@Component({
  selector: 'app-business-types',
  templateUrl: './business-types.component.html',
  styleUrls: ['./business-types.component.scss']
})
export class BusinessTypesComponent implements OnInit {

    displayedColumns: string[] = ['id', 'title', 'actions'];
    dataSource: MatTableDataSource<BusinessType>;
    activateArchive = false;
  
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private types:AdminBusinessTypesService) {
        this.types.getTypes().subscribe((data: any) => {
            this.dataSource = new MatTableDataSource<BusinessType>(data.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.types.refreshTableOb.subscribe(data => {
            this.types.getTypes().subscribe((data: any) => {
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

    openTypes(){
        this.activateArchive = false;
    }

    openAddType(){
        this.types.openAddTypePopup();
    }

    openEditPopup(type){
        this.types.openEditPopup(type);
    }

    openDeletePopup(id){
        this.types.openDeletePopup(id);
    }

    openModulesPopup(modules){
        this.types.openModulesPopup(modules);
    }

    openPlansPopup(plans){
        this.types.openPlansPopup(plans);
    }
}
