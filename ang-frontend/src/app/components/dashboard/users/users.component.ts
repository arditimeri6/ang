import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserBusiness } from 'src/app/interfaces/userBusiness.interface';
import { UserBusinessesService } from 'src/app/services/user-businesses.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'email', 'title', 'role', 'actions'];
    dataSource: MatTableDataSource<UserBusiness>;
    activateArchive = false;
  
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private users:UserBusinessesService) { 
        this.users.updateBusiness();
        this.users.getUsers().subscribe((data: any) => {
            this.dataSource = new MatTableDataSource(data.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.users.refreshTableOb.subscribe((data: any) => {
            this.users.getUsers().subscribe((data: any) => {
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

    openPopup(user){
        this.users.openPopup(user);
    }

    openDeletePopup(id){
        this.users.openDeletePopup(id);
    }

    openSendInvitation(){
        this.users.openSendInvitationPopup();
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
