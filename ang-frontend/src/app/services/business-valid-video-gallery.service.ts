import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessDashboardService } from './business-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessValidVideoGalleryService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return  this.businessDashboardService.returnValidVideoGalleryRoute();
   }
   constructor(private businessDashboardService: BusinessDashboardService) { }
}