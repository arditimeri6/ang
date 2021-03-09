import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { VideoGallery } from 'src/app/interfaces/businessVideoGallery.interface';

import  Player  from '@vimeo/player';
import { DomSanitizer } from '@angular/platform-browser';
import { VimeoServiceService } from 'src/app/services/vimeo-service.service';
import { VideoGalleryService } from 'src/app/services/video-gallery.service';


@Component({
  selector: 'app-business-profile-video',
  templateUrl: './business-profile-video.component.html',
  styleUrls: ['./business-profile-video.component.scss']
})
export class BusinessProfileVideoComponent implements OnInit {

@Input() videogallery:VideoGallery;
imageTag:string;
videoUrl:string;

  constructor(
              private _vimeoService: VimeoServiceService,
              private videoGalleryService:VideoGalleryService) {
  
   }

  ngOnInit() {

    if(this.videogallery.videoid.includes('youtube.com')){
      this.handleYoutubeEvent(this.videogallery.videoid);
    } else {
      this.handleVimeoEvent(this.videogallery.videoid);
    }
  }

  handleYoutubeEvent(videoitem){
     let videoid:any;
     videoid = videoitem.substring(videoitem.lastIndexOf('/') + 1);
     
     if(videoid.includes('watch?v=')){
       videoid = videoid.replace('watch?v=', '');
     }
    //  console.log(videoid);
     this.imageTag = 'https://img.youtube.com/vi/'+videoid+'/0.jpg';
     this.videoUrl = 'https://www.youtube.com/embed/'+videoid;    
  }

  handleVimeoEvent(videoitem){
  
    let videoid:any;
    videoid = videoitem.substring(videoitem.lastIndexOf('/') + 1);
    this.imageTag =  'https://via.placeholder.com/400x300';
    this.videoUrl = 'https://player.vimeo.com/video/'+videoid;
  }

  playVideoItem(){
    this.videoGalleryService.getVideoUrl(this.videoUrl);
  }
}
