import { Component, OnInit, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PhotoGalleryService } from 'src/app/services/photo-gallery.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { PlaceService } from 'src/app/services/place.service';
import { Place } from 'src/app/interfaces/place.inteface';

@Component({
  selector: 'app-add-photogallery',
  templateUrl: './add-photogallery.component.html',
  styleUrls: ['./add-photogallery.component.scss']
})
export class AddPhotogalleryComponent implements OnInit {
  @Input() places;
  formActive:boolean = false;
  selectedFile:File = null;
  response:string = null;
  files: any = [];
  responseActive:boolean = false;
  selectInputActive = null;

  scale = 1;
  constructor(private photoGalleryService:PhotoGalleryService,
              private placeService:PlaceService,
              private imageCompress: NgxImageCompressService) { }
  
imgResultAfterCompress:string;
uploadFile(event: any, type) {
    this.formActive = true;
    var fileName : any;
    var filtetype: any;
    var orientation = -1;
    if(type === 'drag'){
      var file = event[0];
    } else {
      var file = event.target.files[0];
    }
    console.log(file);
    fileName = file['name'];
    filtetype = file['type'];
    var ratio = 70;
    var quality = 70;
    if (file) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageCompress.compressFile(event.target.result, orientation, ratio, quality).then(
          result => {
            this.imgResultAfterCompress = result;
            const imageName = fileName;
            const imageBlob = this.dataURItoBlob(result.split(',')[1]);
            const imageFile = new File([imageBlob], imageName, { type: filtetype });
            this.selectedFile = imageFile;
            console.log(this.selectedFile);
          }
        );
      }
      reader.readAsDataURL(file);
    }
}

dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
}
  error= {
    title:null,
    content:null,
    imagepath:null
  }

  ngOnInit() {
    console.log(this.places);
  }

  
  openPupup(){
    this.formActive = true;
  }
  
  onSubmit(form:NgForm){
    this.photoGalleryService.add(form.value.place, form.value.banner, this.selectedFile).subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    )
  }

  handleData(data){
    this.photoGalleryService.refreshLists();
    this.response = data.message;
    this.closePopup();
    this.responseActive = true;
    setTimeout(() => {
      this.responseActive = false;
    }, 2000);
  }

  handleError(error){
    console.log(error);
    this.error = error.error.errors

  }

  closePopup(){
    this.formActive = false;
  }
}
