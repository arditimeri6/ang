import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { Router } from '@angular/router';
import { VideoGalleryService } from 'src/app/services/video-gallery.service';
import { PhotoGalleryService } from 'src/app/services/photo-gallery.service';
import { Business } from 'src/app/interfaces/business.interface';

@Component({
  selector: 'app-user-channels',
  templateUrl: './user-channels.component.html',
  styleUrls: ['./user-channels.component.scss']
})
export class UserChannelsComponent implements OnInit {
channels:Business[];
  constructor(private businessService: BusinessService,
              private videoGalleryService:VideoGalleryService,
              private photoGalleryService:PhotoGalleryService,
              private router:Router) { }

  ngOnInit() {
    this.getBusinesses();
  }
  getBusinesses(){
    this.businessService.get().subscribe(resp=>{
        console.log(resp);
        
     this.handleResponse(resp);
    });
  }
  handleResponse(resp){
    this.channels = resp.data;
    // console.log(this.channels);
  }
  channelActive(id){
    this.businessService.setBusiness(id);
    this.videoGalleryService.updateBusiness(id);
    this.photoGalleryService.updateBusiness(id);
    this.router.navigateByUrl('/dashboard');
  }
}
