import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserBusiness } from 'src/app/interfaces/userBusiness.interface';
import { AdminUserBusinessesService } from 'src/app/services/admin-user-businesses.service';

@Component({
  selector: 'app-user-businesses',
  templateUrl: './user-businesses.component.html',
  styleUrls: ['./user-businesses.component.scss']
})
export class UserBusinessesComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'email', 'title', 'role', 'actions'];
    dataSource: MatTableDataSource<UserBusiness>;
    activateArchive = false;
  
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private users:AdminUserBusinessesService) {
        this.users.getUsers().subscribe((data: UserBusiness[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.users.refreshTableOb.subscribe((data: UserBusiness[]) => {
            this.users.getUsers().subscribe((data: UserBusiness[]) => {
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
}
