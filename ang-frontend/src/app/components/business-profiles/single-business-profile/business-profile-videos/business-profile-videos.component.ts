import { Component, OnInit, Input } from '@angular/core';
import { VideoGalleryService } from 'src/app/services/video-gallery.service';
import { VideoGallery } from 'src/app/interfaces/businessVideoGallery.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-business-profile-videos',
  templateUrl: './business-profile-videos.component.html',
  styleUrls: ['./business-profile-videos.component.scss']
})
export class BusinessProfileVideosComponent implements OnInit {
@Input() slug:string;
videogalleries:VideoGallery[];
videoplayer:any;
dangerousUrl:any;
trustedUrl:any;
videoUrl:any;
  constructor(private videoGalleryService:VideoGalleryService,
              private sanitizer: DomSanitizer) {
        this.dangerousUrl = 'javascript:alert("Hi there")';
        this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
        this.videoGalleryService.returnVideoUrl().subscribe(resp=>{
          this.onPlayEvent(resp);
        });
  }

  ngOnInit() {
    this.getBusinessProfileVideos();
  }
  getBusinessProfileVideos(){
    this.videoGalleryService.getSingleProfileVideo(this.slug).subscribe(resp=>{
      this.handleResponse(resp);
    })
  }
  handleResponse(resp){
    this.videogalleries = resp.data;
  }
  onPlayEvent(videourl){
    this.dangerousUrl = videourl; 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousUrl);
  }
}

