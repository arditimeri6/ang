import { Component, OnInit, Input } from '@angular/core';
import { PhotoGalleryService } from 'src/app/services/photo-gallery.service';
import { VideoGallery } from 'src/app/interfaces/businessVideoGallery.interface';
import { PhotoGallery } from 'src/app/interfaces/businessPhotoGallery.interface';

@Component({
  selector: 'app-business-profile-gallery',
  templateUrl: './business-profile-gallery.component.html',
  styleUrls: ['./business-profile-gallery.component.scss']
})
export class BusinessProfileGalleryComponent implements OnInit {
  @Input() slug:string;
  photogalleries:PhotoGallery[];
  constructor(private photoGalleryService:PhotoGalleryService) { }

  ngOnInit() {
    this.getBusinessProfileVideos();
  }
  getBusinessProfileVideos(){
    this.photoGalleryService.getSinglePhotoGallery(this.slug).subscribe(resp=>{
      this.handleResponse(resp);
    })
  }
  handleResponse(resp){
    this.photogalleries = resp.data;
  }
}
