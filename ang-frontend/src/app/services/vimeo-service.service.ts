import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/vnd.vimeo.*+json;version=3.4'
  })
};
@Injectable({
  providedIn: 'root'
})
export class VimeoServiceService {

  constructor(private http:HttpClient) { }
  getViemoData(videoid){

    return this.http.get('https://vimeo.com/api/v2/video/'+videoid+'.json', httpOptions);
  }

}
