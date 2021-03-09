import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EventType } from 'src/app/interfaces/eventType.interface';
import { AdminEventTypesService } from 'src/app/services/admin-event-types.service';

@Component({
  selector: 'app-archive-event-type',
  templateUrl: './archive-event-type.component.html',
  styleUrls: ['./archive-event-type.component.scss']
})
export class ArchiveEventTypeComponent implements OnInit {

    displayedColumns: string[] = ['id', 'title', 'actions'];
    dataSource: MatTableDataSource<EventType>;
    formRestoreActive = false;
    formDeleteActive = false;
    response = null;
    responseActive = null;
    eventTypeId;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    
    constructor(private eventTypes:AdminEventTypesService) {
        this.eventTypes.getArchivedEventTypes().subscribe((data: EventType[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        this.eventTypes.refreshTableOb.subscribe((data: EventType[]) => {
            this.eventTypes.getArchivedEventTypes().subscribe((data: EventType[]) => {
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
        this.eventTypeId = id;
        this.formRestoreActive = true;
    }

    openDelete(id){
        this.eventTypeId = id;
        this.formDeleteActive = true;
    }

    closeRestore(){
        this.formRestoreActive = false;
    }

    restore(){
        this.eventTypes.restore(this.eventTypeId).subscribe(
            data => this.handleRestoreResponse(data),
            error => this.handleError(error)
        );
    }
    
    handleRestoreResponse(data){
        this.response = data.message;
        this.responseActive = this.eventTypeId;
        this.closeRestore();
        this.eventTypes.refreshTable();
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
        this.eventTypes.delete(this.eventTypeId).subscribe(
            data => this.handleDeleteResponse(data),
            error => this.handleError(error)
        );
    }

    handleDeleteResponse(data){
        this.response = data.message;
        this.responseActive = this.eventTypeId;
        this.closeDelete();
        this.eventTypes.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

}
