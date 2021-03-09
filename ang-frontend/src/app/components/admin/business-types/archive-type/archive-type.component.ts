import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BusinessType } from 'src/app/interfaces/businesstype.interface';
import { AdminBusinessTypesService } from 'src/app/services/admin-business-types.service';

@Component({
  selector: 'app-archive-type',
  templateUrl: './archive-type.component.html',
  styleUrls: ['./archive-type.component.scss']
})
export class ArchiveTypeComponent implements OnInit {

    displayedColumns: string[] = ['id', 'title', 'actions'];
    dataSource: MatTableDataSource<BusinessType>;
    formRestoreActive = false;
    formDeleteActive = false;
    response = null;
    responseActive = null;
    typeId;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private types:AdminBusinessTypesService) { 
        this.types.getArchivedTypes().subscribe((data: BusinessType[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.types.refreshTableOb.subscribe((data: BusinessType[]) => {
            this.types.getArchivedTypes().subscribe((data: BusinessType[]) => {
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
        this.typeId = id;
        this.formRestoreActive = true;
    }
    
    openDelete(id){
        this.typeId = id;
        this.formDeleteActive = true;
    }

    closeRestore(){
        this.formRestoreActive = false;
    }

    restore(){
        this.types.restore(this.typeId).subscribe(
            data => this.handleRestoreResponse(data),
            error => this.handleError(error)
        );
    }

    handleRestoreResponse(data){
        this.response = data.message;
        this.responseActive = this.typeId;
        this.closeRestore();
        this.types.refreshTable();
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
        this.types.delete(this.typeId).subscribe(
            data => this.handleDeleteResponse(data),
            error => this.handleError(error)
        );
    }

    handleDeleteResponse(data){
        this.response = data.message;
        this.responseActive = this.typeId;
        this.closeDelete();
        this.types.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

}
