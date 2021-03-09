import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AdminEventTypesService } from 'src/app/services/admin-event-types.service';
import { EventType } from 'src/app/interfaces/eventType.interface';

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrls: ['./event-types.component.scss']
})
export class EventTypesComponent implements OnInit {

    displayedColumns: string[] = ['id', 'title', 'actions'];
    dataSource: MatTableDataSource<EventType>;
    activateArchive = false;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private eventTypes:AdminEventTypesService) {
        this.eventTypes.getEventTypes().subscribe((data: any) => {
            this.dataSource = new MatTableDataSource<EventType>(data.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.eventTypes.refreshTableOb.subscribe(data => {
            this.eventTypes.getEventTypes().subscribe((data: any) => {
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

    openEventTypes(){
        this.activateArchive = false;
    }

    openAddEventType(){
        this.eventTypes.openAddEventTypePopup();
    }

    openEditPopup(eventType){
        this.eventTypes.openEditPopup(eventType);
    }

    openDeletePopup(id){
        this.eventTypes.openDeletePopup(id);
    }
}
