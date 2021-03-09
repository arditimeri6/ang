import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AdminBusinessesService } from 'src/app/services/admin-businesses.service';
import { Business } from 'src/app/interfaces/business.interface';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

    displayedColumns: string[] = ['id', 'logo', 'title', 'plan', 'business_type', 'status', 'paid_at', 'approved_at','actions'];
    dataSource: MatTableDataSource<Business>;
    activateArchive = false;
    response = null;
    responseActive = null;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private businesses:AdminBusinessesService) {
        this.businesses.getBusinesses().subscribe((data: any) => {
            this.dataSource = new MatTableDataSource<Business>(data.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.businesses.refreshTableOb.subscribe(data => {
            this.businesses.getBusinesses().subscribe((data: any) => {
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

    openBusinesses(){
        this.activateArchive = false;
    }

    openEventTypes(business){
        this.businesses.openEventTypePopup(business);
        // window.open(Config.baseurl + "/preview/profile/" +slug , "_blank");
    }

    openEditPopup(business){
        this.businesses.openEditPopup(business);
    }

    openDeletePopup(id){
        this.businesses.openDeletePopup(id);
    }

    onChangeStatus(id, status){
        var form = (status == 1) ? 0: 1;
        this.businesses.changeStatus(id, form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data){
        this.response = data.message;
        this.businesses.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }
}
