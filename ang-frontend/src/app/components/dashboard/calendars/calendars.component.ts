import { Component, OnInit, Input, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { Calendar } from 'src/app/interfaces/calendar.interface';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, DateFormatterParams, CalendarDateFormatter, DAYS_OF_WEEK } from 'angular-calendar';
import { NgForm } from '@angular/forms';
import { CustomDateFormatter } from './custom-date-formatter.provider';


@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarsComponent implements OnInit {
  @Input() place:number;
  calendars:Calendar[];
  overlayActive = false;
  thisAction = true;
  roomsFilter = new Date();
  event:any;
  oldevent:any;
  mounthInputActive = false;
  segmentHeight = 15;
  timenow =new Date();
  timedistance: number = 0;
  private form = {
    date_from: new Date(),
    date_to: new Date(),
    status:null
};

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    processing: {
      primary: '#FFEDDD',
      secondary: '#FFEDDD'
    },
    approved: {
      primary: '#d7f1e1',
      secondary: '#d7f1e1'
    }
  };  

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  CalendarView = CalendarView;
  locale: string = 'sq';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  viewDate = new Date('2/4/2020');

  externalEvents: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;
  constructor(private calendarSerivce:CalendarService) { }
  ngOnInit() {    
    this.getCalendar();
    this.calendarTimer();
  }
    calendarTimer(){
      const distance = <HTMLElement>document.querySelector('.cal-current-time-marker');
      if(distance){

        setInterval(() => {    
        this.timenow = new Date();     
        document.getElementById('timer').style.top = distance.style.top;
      }, 1000);
      }
    }
  getCalendar(){
    this.calendarSerivce.get(this.place).subscribe(resp=>{
      this.handleResponse(resp);
    });
  }

  handleResponse(resp:any){
    // console.log(resp.data);
    this.calendars = resp.data;
    for (let i = 0; i < this.calendars.length; i++) {
      const start =  new Date(this.calendars[i].date_from);
      const end = new Date(this.calendars[i].date_to);
      const starttime = start.toLocaleTimeString('it-IT',{ hour: '2-digit', minute: '2-digit' });
      const endtime = end.toLocaleTimeString('it-IT',{ hour: '2-digit', minute: '2-digit'});
      var diff = (end.getTime() - start.getTime());
      var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
      var diffHrs = Math.floor((diff % 86400000) / 3600000); 
    

      if(this.calendars[i].status !== 'pending'){
        this.events.push(
          {
            id: this.calendars[i].id,
            start: start,
            end:  end,
            title: this.handleTitleResponse(this.calendars[i]),
            color: this.statusResponse(this.calendars[i].status),
            allDay:false,
            cssClass:this.classStatuResponse(this.calendars[i].status, diffMins, diffHrs),
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: this.draggableStatusResponse(this.calendars[i].status)
          });
      } else {
        this.externalEvents.push(
          {
            id: this.calendars[i].id,
            start: start,
            end:  end,
            title: this.handleTitleResponse(this.calendars[i]),
            color: this.statusResponse(this.calendars[i].status),
            allDay:false,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: this.draggableStatusResponse(this.calendars[i].status)
          });
      }
    }
    this.refresh.next();

  }
  handleTitleResponse(calendar){
    if(!calendar.event){
      return 'Appointment';
    } else {
      const title = calendar.event.event +' '+ calendar.event.name;
      return title;
    }
  }
  statusResponse(status){
    if(status == 'approved'){
      return this.colors.approved;
    } else if(status == 'processing'){
      return this.colors.processing;
    } else {
      return this.colors.resized;
    }
  }

  draggableStatusResponse(status){
    if(status == 'approved'){
      return false;
    } else {
      return true;
    }
  }
  classStatuResponse(status,diffMins, diffHrs){
    if(diffHrs < 1){
      if(diffMins <= 30){
        if(status == 'approved'){
          return 'approved-item small-wrapper-item'
        } else if(status == 'processing'){
          return 'processing-item small-wrapper-item'
        } else {
          return 'cancel-item small-wrapper-item'
        }
      } else if(   diffMins > 30 && diffMins <= 45){
        if(status == 'approved'){
          return 'approved-item medium-wrapper-item'
        } else if(status == 'processing'){
          return 'processing-item medium-wrapper-item'
        } else {
          return 'cancel-item medium-wrapper-item'
        }
      } else{
        if(status == 'approved'){
          return 'approved-item large-wrapper-item'
        } else if(status == 'processing'){
          return 'processing-item large-wrapper-item'
        } else {
          return 'cancel-item large-wrapper-item'
        }
      }
    } else {
      if(status == 'approved'){
        return 'approved-item'
      } else if(status == 'processing'){
        return 'processing-item'
      } else {
        return 'cancel-item'
      }
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
 
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

 

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
   
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
    console.log('closeOpenMonthViewDay')
    this.calendarTimer();
  }
  close(){
    this.mounthInputActive = false;
    this.overlayActive = false;
  }


  eventDropped({
    event,
    newStart,
    newEnd,
    allDay
  }: CalendarEventTimesChangedEvent): void {
    const externalIndex = this.externalEvents.indexOf(event);
    if (typeof allDay !== 'undefined') {
      event.allDay = allDay;
    }
    if (externalIndex > -1) {
      this.externalEvents.splice(externalIndex, 1);
      this.events.push(event);
    }
      event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    if (this.view === 'month') {
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }
  
    this.events = [...this.events];
    if(this.view !== 'month'){
    this.form.date_from =  new Date(event.start);
    this.form.date_to =  new Date(event.end);
    this.form.status = 'processing';
    this.calendarSerivce.update(this.form, this.place, event.id).subscribe(
      data => this.handleUpdateData(data, event),
      error => this.handleUpdateErrorData(error),
    )
   } else {
      this.mounthInputActive = true;
      this.overlayActive = true;
      this.event = event;
   }
  }

  onSubmitDateMonth(form:NgForm){
    const event = this.event;
    const eventStart =  (event.start.getMonth() + 1) +' '+ event.start.getDate() +' '+ event.start.getFullYear() +' '+ form.value.start;
    const eventEnd =  (event.end.getMonth() + 1) +' '+ event.end.getDate() +' '+ event.end.getFullYear() +' '+ form.value.end;
    const newStart = new Date(eventStart);
    const newEnd = new Date(eventEnd);
    this.form.date_from =  newStart;
    this.form.date_to =  newEnd;
    this.form.status = 'processing';
    this.calendarSerivce.update(this.form, this.place, event.id).subscribe(
      data => this.handleUpdateData(data, event),
      error => this.handleUpdateErrorData(error),
    )
  }
  handleUpdateData(data, event){
    const start =  new Date(data.calendar.date_from);
    const end = new Date(data.calendar.date_to);
    let diff = (end.getTime() - start.getTime());
    var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
    var diffHrs = Math.floor((diff % 86400000) / 3600000); 
    const starttime = start.toLocaleTimeString('it-IT',{ hour: '2-digit', minute: '2-digit' });
    const endtime = end.toLocaleTimeString('it-IT',{ hour: '2-digit', minute: '2-digit'});
    event.title = this.handleTitleResponse(data.calendar);
    event.color = this.statusResponse(data.calendar.status);
    event.class = this.classStatuResponse(event.status, diffMins, diffHrs)
    if(this.mounthInputActive == true){
        this.close();
    }
  }

  handleUpdateErrorData(error){
    console.log(error)
  }
  externalDrop(event: CalendarEvent) {
    if (this.externalEvents.indexOf(event) === -1) {
      this.events = this.events.filter(iEvent => iEvent !== event);
      this.externalEvents.push(event);
    }
  }
  externalInsideDrop(event: CalendarEvent) {
    if (this.events.indexOf(event) === -1) {
      this.events = this.events.filter(iEvent => iEvent !== event);
      this.events.push(event);
    }
  }
  dragEnd(event: CalendarEvent){
  
  }

  dragStarted(event: CalendarEvent){
    this.oldevent = this.events.filter(events => events.id === event.id);
    console.log(this.oldevent);
  }
  onCancelEvent(){
    this.events = [];
    this.externalEvents = [];
    this.getCalendar();
    this.close();
  }
  allowDrop($event){
    console.log(event);
  }
}
