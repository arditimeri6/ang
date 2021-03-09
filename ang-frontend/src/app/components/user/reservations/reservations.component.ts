import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { Calendar } from 'src/app/interfaces/calendar.interface';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
calendars:Calendar[];
  constructor(private calendarService:CalendarService) { }

  ngOnInit() {
    this.getUserReservation();
  }
  
  getUserReservation(){
    this.calendarService.getUserReservation().subscribe(resp=>{
      this.handleResponse(resp);
    })
  }
  handleResponse(resp){
    this.calendars = resp.data;
    console.log(this.calendars);
  }
}
