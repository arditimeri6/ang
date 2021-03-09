import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Users } from 'src/app/interfaces/users.interface';
import { AdminUserService } from 'src/app/services/admin-user.service';
import { lastDayOfDecade } from 'date-fns';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'email', 'status', 'role', 'actions'];
    dataSource: MatTableDataSource<Users>;
    activateArchive = false;
    response = null;
    responseActive = null;
  
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private users:AdminUserService) {
        this.users.getUsers().subscribe((data: Users[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.users.refreshTableOb.subscribe((data: Users[]) => {
            this.users.getUsers().subscribe((data: Users[]) => {
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

    openPopup(user){
        this.users.openPopup(user);
    }

    openDeletePopup(id){
        this.users.openDeletePopup(id);
    }

    openPermissionsPopup(user){
        this.users.openPermissionsPopup(user);
    }

    openArchive(){
        this.activateArchive = true;
    }

    openUsers(){
        this.activateArchive = false;
    }

    onChangeStatus(id, status){
        var form = (status == 1) ? 0: 1;
        this.users.changeStatus(id, form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        )
    }

    handleResponse(data){
        this.response = data.message;
        this.users.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }
}
