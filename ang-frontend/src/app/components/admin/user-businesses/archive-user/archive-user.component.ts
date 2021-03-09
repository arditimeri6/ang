import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserBusiness } from 'src/app/interfaces/userBusiness.interface';
import { AdminUserBusinessesService } from 'src/app/services/admin-user-businesses.service';

@Component({
  selector: 'app-archive-user',
  templateUrl: './archive-user.component.html',
  styleUrls: ['./archive-user.component.scss']
})
export class ArchiveUserComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'email', 'title', 'role', 'actions'];
    dataSource: MatTableDataSource<UserBusiness>;
    formRestoreActive = false;
    formDeleteActive = false;
    response = null;
    responseActive = null;
    userId;
      
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private users:AdminUserBusinessesService) { 
        this.users.getArchivedUsers().subscribe((data: UserBusiness[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.users.refreshTableOb.subscribe((data: UserBusiness[]) => {
            this.users.getArchivedUsers().subscribe((data: UserBusiness[]) => {
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
        this.userId = id;
        this.formRestoreActive = true;
    }
    openDelete(id){
        this.userId = id;
        this.formDeleteActive = true;
    }

    closeRestore(){
        this.formRestoreActive = false;
    }

    restore(){
        this.users.restore(this.userId).subscribe(
            data => this.handleRestoreResponse(data),
            error => this.handleError(error)
        );
    }

    handleRestoreResponse(data){
        this.response = data.message;
        this.responseActive = this.userId;
        this.closeRestore();
        this.users.refreshTable();
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
        this.users.delete(this.userId).subscribe(
            data => this.handleDeleteResponse(data),
            error => this.handleError(error)
        );
    }

    handleDeleteResponse(data){
        this.response = data.message;
        this.responseActive = this.userId;
        this.closeDelete();
        this.users.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }
}
