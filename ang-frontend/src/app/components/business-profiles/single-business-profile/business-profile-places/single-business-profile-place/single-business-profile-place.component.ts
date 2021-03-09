import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { PlaceService } from 'src/app/services/place.service';
import { Place } from 'src/app/interfaces/place.inteface';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-single-business-profile-place',
  templateUrl: './single-business-profile-place.component.html',
  styleUrls: ['./single-business-profile-place.component.scss']
})
export class SingleBusinessProfilePlaceComponent implements OnInit {
place:Place;
modalActive:boolean = false;
placeslug:string = null;
responseActive:boolean = false;
response:string = null;
public error = {
  from:null,
  to:null,
}
public form = {
  from:null,
  to:null,
}

  constructor(private route: ActivatedRoute,
              private placeService:PlaceService,
              private calendarService:CalendarService) { }

  ngOnInit() {
    this.getSingleService();
  }
  getSingleService(){
    this.route.params.subscribe(
      (params: Params) =>{
        let slug = params['slug'];
        this.placeslug = params['place'];
        this.placeService.getSinglePlace(slug,  this.placeslug).subscribe(resp=>{
          this.handleResponse(resp);
        });
      }
    )
  }

     handleResponse(resp){
      this.place = resp.data;
      // console.log(this.place);

     }

     activeRezervationModal(){
      this.modalActive = true;
     }
     close(){
       this.modalActive = false;
     }
     reservationForm(){
       this.calendarService.requestReservation(this.form, this.placeslug).subscribe(
         data => this.handleReservationData(data),
         error => this.handleReservationError(error)
       )
     }

     handleReservationData(data){
      this.response = data.message;
      this.close();
      this.responseActive = true;
      setTimeout(() => {
        this.responseActive = false;
      }, 2000);
     }

     handleReservationError(error){
      this.error = error.error.errors
     }
}
