import { Component, OnInit } from '@angular/core';
import { AdminBusinessesService } from 'src/app/services/admin-businesses.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-preview-business',
  templateUrl: './preview-business.component.html',
  styleUrls: ['./preview-business.component.scss']
})
export class PreviewBusinessComponent implements OnInit {

    formActive = false;
    response = null;
    responseActive = null;
    id;
    title;
    logo;
    plan;
    business_type;
    slug;
    status;
    paid_at;
    approved_at;
    reason;
    thumbnail;
    activateForm:boolean = true;
    form= {
        reason:null
    };

    constructor(private business:AdminBusinessesService,
                private route: ActivatedRoute) {
        this.getPreviewBusiness();
        
        // this.business.openPreviewPopup$.subscribe((business: any) => {
        //     this.id = business.id;
        //     this.title = business.title;
        //     this.logo = business.logo;
        //     this.plan = business.plan.title;
        //     this.business_type = business.business_type.title;
        //     this.slug = business.slug;
        //     this.status = business.status;
        //     this.paid_at = business.paid_at;
        //     this.approved_at = business.approved_at;
        //     this.reason = business.reason;
        //     this.business.getTextBox(this.id);
        //     this.business.getPhotoGallery(this.id);
        //     this.business.getVideoGallery(this.id);
        //     this.business.getPlaces(this.id);
        //     this.openPopup();
        // });
    }

    ngOnInit(){
    }

    getPreviewBusiness(){
        this.route.params.subscribe((params: Params) =>{
            this.slug = params['slug'];
            this.business.getbusinesswithslug(this.slug).subscribe((business: any) => {
                this.id = business.data.id;
                this.title = business.data.title;
                this.slug = business.data.slug;
                this.thumbnail = business.data.thumbnail;
                this.business.getTextBox(this.id);
                this.business.getPhotoGallery(this.id);
                this.business.getVideoGallery(this.id);
                this.business.getPlaces(this.slug);
            })
        })
    }

    // openPopup(){
    //     this.formActive = true;
    // }

    // close(){
    //     this.formActive = false;
    //     this.activateForm = true;
    // }

    approve(){
        this.business.approveBusiness(this.id).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        )
    }

    handleResponse(data){
        this.response = data.message;
        this.responseActive = this.id;
        // this.close();
        this.activateForm = true;
        this.business.refreshTable();
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }

    dontApprove(){
        this.activateForm = false;
    }

    onSubmit(){
        this.business.dontApproveBusiness(this.id, this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        )
    }
}
