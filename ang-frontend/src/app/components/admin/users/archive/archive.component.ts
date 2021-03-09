import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Users } from 'src/app/interfaces/users.interface';
import { AdminUserService } from 'src/app/services/admin-user.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'email', 'status', 'role', 'actions'];
    dataSource: MatTableDataSource<Users>;
    formRestoreActive = false;
    formDeleteActive = false;
    response = null;
    responseActive = null;
    userId;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private users:AdminUserService) { 
        this.users.getArchivedUsers().subscribe((data: Users[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.users.refreshTableOb.subscribe((data: Users[]) => {
            this.users.getArchivedUsers().subscribe((data: Users[]) => {
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
