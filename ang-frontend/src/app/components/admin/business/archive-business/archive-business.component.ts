import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Business } from 'src/app/interfaces/business.interface';
import { AdminBusinessesService } from 'src/app/services/admin-businesses.service';

@Component({
  selector: 'app-archive-business',
  templateUrl: './archive-business.component.html',
  styleUrls: ['./archive-business.component.scss']
})
export class ArchiveBusinessComponent implements OnInit {

    displayedColumns: string[] = ['id', 'logo', 'title', 'plan', 'business_type', 'paid_at', 'approved_at','actions'];
    dataSource: MatTableDataSource<Business>;
    formRestoreActive = false;
    formDeleteActive = false;
    response = null;
    responseActive = null;
    moduleId;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private business:AdminBusinessesService) { 
        this.business.getArchivedBusinesses().subscribe((data: Business[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.business.refreshTableOb.subscribe((data: Business[]) => {
            this.business.getArchivedBusinesses().subscribe((data: Business[]) => {
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
        this.business.restore(this.moduleId).subscribe(
            data => this.handleRestoreResponse(data),
            error => this.handleError(error)
        );
    }
    
    handleRestoreResponse(data){
        this.response = data.message;
        this.responseActive = this.moduleId;
        this.closeRestore();
        this.business.refreshTable();
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
        this.business.delete(this.moduleId).subscribe(
            data => this.handleDeleteResponse(data),
            error => this.handleError(error)
        );
    }

    handleDeleteResponse(data){
        this.response = data.message;
        this.responseActive = this.moduleId;
        this.closeDelete();
        this.business.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

}
