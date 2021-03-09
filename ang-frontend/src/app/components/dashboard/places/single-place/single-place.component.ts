import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlaceService } from 'src/app/services/place.service';
import { Place } from 'src/app/interfaces/place.inteface';

@Component({
  selector: 'app-single-place',
  templateUrl: './single-place.component.html',
  styleUrls: ['./single-place.component.scss']
})
export class SinglePlaceComponent implements OnInit {
  id:number;
  place: Place;
  constructor(private route: ActivatedRoute,
              private service: PlaceService) { }

  ngOnInit() {
    this.getSinglePlace();
  }
  getSinglePlace(){
    this.route.params
    .subscribe(
      (params: Params) =>{
        let id = params['id'];
        this.service.getSingle(id).subscribe(resp=>{
          this.handleResponse(resp);
        })
      }
    );
  }
  handleResponse(resp){
   this.place = resp.data;
  }
}
