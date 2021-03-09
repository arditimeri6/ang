import { Component, OnInit } from '@angular/core';
import { VideoGalleryService } from 'src/app/services/video-gallery.service';

@Component({
  selector: 'app-add-videogallery',
  templateUrl: './add-videogallery.component.html',
  styleUrls: ['./add-videogallery.component.scss']
})
export class AddVideogalleryComponent implements OnInit {
  formActive:boolean = false;
  selectedFile:any = null;
  response:string = null;
  responseActive:boolean = false;
  constructor(private service:VideoGalleryService) { }
  
  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }  
  form= {
    videoid:null
  };

  error= {
    videoid:null
  };

  ngOnInit() {
  }

  openPupup(){
    this.formActive = true;
  }
  
  onSubmit(){
    this.service.add(this.form).subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    )
  }

  handleData(data){
    this.service.refreshLists();
    this.response = data.message;
    this.close();
    this.responseActive = true;
    setTimeout(() => {
      this.responseActive = false;
    }, 2000);
  }

  handleError(error){
    this.error = error.error.errors

  }

  close(){
    this.formActive = false;
  }
}
