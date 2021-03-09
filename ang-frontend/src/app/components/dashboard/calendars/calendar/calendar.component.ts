import { Component, OnInit, Input } from '@angular/core';
import { Calendar } from 'src/app/interfaces/calendar.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() calendar:Calendar;
  from:any;
  to:any;
  constructor() { }

  ngOnInit() {
    this.from = new Date(this.calendar.date_from);
    this.to = new Date(this.calendar.date_to);
    console.log(this.from);
    console.log(this.to);
  }

}
