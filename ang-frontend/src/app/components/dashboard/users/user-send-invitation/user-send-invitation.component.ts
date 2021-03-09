import { Component, OnInit } from '@angular/core';
import { UserBusinessesService } from 'src/app/services/user-businesses.service';

@Component({
  selector: 'app-user-send-invitation',
  templateUrl: './user-send-invitation.component.html',
  styleUrls: ['./user-send-invitation.component.scss']
})
export class UserSendInvitationComponent implements OnInit {

    formActive:boolean = false;
    form= {
        email:null,
        email2:null,
        email3:null,
        email4:null,
        email5:null,
    };
    error= {
        email:null,
        email2:null,
        email3:null,
        email4:null,
        email5:null,
    };
    response = null;
    responseActive = null;

    constructor(private users:UserBusinessesService) { 
        this.users.updateBusiness();
        this.users.openSendInvitationPopup$.subscribe((user: any) => {
            this.openPopup();
        });
    }

    ngOnInit() {
    }

    openPopup(){
        this.formActive = true;
    }

    close(form){
        this.formActive = false;
        form.reset();
    }

    onSubmit(form){
        this.users.sendInvitation(this.form).subscribe(
            data => this.handleResponse(data, form),
            error => this.handleError(error)
        )
    }

    handleResponse(data, form){
        this.response = data.message;
        this.close(form);
        setTimeout(() => {
            this.responseActive = null;
        }, 1000);
    }

    handleError(error){
        console.log(error);
    }
}
