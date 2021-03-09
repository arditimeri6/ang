import { Component, OnInit, Input } from '@angular/core';
import { Calendar } from 'src/app/interfaces/calendar.interface';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
@Input() calendar:Calendar;
  constructor() { }

  ngOnInit() {
    console.log(this.calendar);
  }

}
