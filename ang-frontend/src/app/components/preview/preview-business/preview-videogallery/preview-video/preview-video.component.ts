import { Component, OnInit, Input } from '@angular/core';
import { VideoGallery } from 'src/app/interfaces/businessVideoGallery.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview-video',
  templateUrl: './preview-video.component.html',
  styleUrls: ['./preview-video.component.scss']
})
export class PreviewVideoComponent implements OnInit {

    @Input() video;
    safeSrc = null;
    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit() {
         if (this.video) {
            this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.video);
        }
    }

}
