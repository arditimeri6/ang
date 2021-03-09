import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AdminBusinessesService {

    headers = new HttpHeaders({'Content-Type':'application/json'});

    private refreshTableSource = new Subject();
    refreshTableOb = this.refreshTableSource.asObservable();

    private editPopup = new Subject();
    openEditBusinessPopup$ = this.editPopup.asObservable();

    private deletePopup = new Subject();
    openDeletePopup$ = this.deletePopup.asObservable();

    private previewPopup = new Subject();
    openPreviewPopup$ = this.previewPopup.asObservable();

    private previewTextBox = new Subject();
    getTextBox$ = this.previewTextBox.asObservable();

    private previewPhotoGallery = new Subject();
    getPhotoGallery$ = this.previewPhotoGallery.asObservable();

    private previewVideoGallery = new Subject();
    getVideoGallery$ = this.previewVideoGallery.asObservable();
 
    private previewPlaces = new Subject();
    getPlaces$ = this.previewPlaces.asObservable();

    private openEventTypesPopup = new Subject();
    openEventTypesPopup$ = this.openEventTypesPopup.asObservable();

    private openAddEventTypesPopup = new Subject();
    openAddEventTypesPopup$ = this.openAddEventTypesPopup.asObservable();

    private refreshEventTypesData = new Subject();
    refreshEventTypesData$ = this.refreshEventTypesData.asObservable();

    constructor(private http: HttpClient) { }

    getBusinesses(){
        return this.http.get(Config.url + 'business')
    }

    getArchivedBusinesses(){
        return this.http.get(Config.url + 'business/trashed')
    }

    getBusiness(id){
        return this.http.get(Config.url + 'business/'+id)
    }

    getbusinesswithslug(slug){
        return this.http.get(Config.url +'businessprofiles/'+slug);
      }

    refreshTable() {
        this.refreshTableSource.next();
    }

    openEditPopup(business) {
        this.editPopup.next(business);
    }

    openDeletePopup(id) {
        this.deletePopup.next(id);
    }

    openPreviewPopup(business) {
        this.previewPopup.next(business);
    }

    getTextBox(business) {
        this.previewTextBox.next(business);
    }

    getPhotoGallery(business) {
        this.previewPhotoGallery.next(business);
    }
    
    getVideoGallery(business) {
        this.previewVideoGallery.next(business);
    }
    
    getPlaces(business) {
        this.previewPlaces.next(business);
    }

    openEventTypePopup(business) {
        this.openEventTypesPopup.next(business);
    }

    openAddEventTypePopup(business) {
        this.openAddEventTypesPopup.next(business);
    }

    refreshEventTypeTable() {
        this.refreshEventTypesData.next();
    }

    edit(id, data){
        return this.http.patch(Config.url +'business/'+id, data, {headers:this.headers})
    }

    archive(id){
        return this.http.delete(Config.url +'business/'+ id, {headers:this.headers})
    }

    restore(id){
        return this.http.post(Config.url +'business/trashed/'+ id, {headers:this.headers})
    }

    delete(id){
        return this.http.post(Config.url +'business/delete/'+ id, {headers:this.headers})
    }

    changeStatus(id, status){
        return this.http.post(Config.url +'business/'+ id + '/updateStatus', status, {headers:this.headers})
    }

    getPlans(){
        return this.http.get(Config.url + 'plans/getPlans')
    }

    getTypes(){
        return this.http.get(Config.url + 'businesstype/getTypes')
    }

    approveBusiness(id){
        return this.http.post(Config.url + 'business/'+id+'/approve', id, {headers:this.headers});
    }

    dontApproveBusiness(id, form){
        return this.http.post(Config.url + 'business/'+id+'/dontApprove', form, {headers:this.headers});
    }

    getBusinessTextBox(id){
        return this.http.get(Config.url + 'business/' + id + '/textbox');
    }

    getBusinessPhotoGallery(id){
        return this.http.get(Config.url + 'business/' + id + '/photogallery');
    }

    getBusinessVideoGallery(id){
        return this.http.get(Config.url + 'business/' + id + '/videogallery');
    }
    
    getBusinessPlaces(slug){
        return this.http.get(Config.url +'businessprofilessingleplace/'+ slug)
    }

    getEventTypes(businessId){
        return this.http.get(Config.url +'business/'+ businessId + "/event-types")
    }

    getAllEventTypes(){
        return this.http.get(Config.url +'eventType')
    }

    addEventTypes(businessId, data){
        return this.http.post(Config.url +'business/'+ businessId + "/event-types", data, {headers:this.headers})
    }

    deleteEventType(businessId, id){
        return this.http.delete(Config.url +'business/'+ businessId +  "/event-types/" + id);
    }
    
}
