import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessDashboardService } from './business-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessValidPhotoGalleryService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
   return  this.businessDashboardService.returnValidPhotoGalleryRoute();
  }
  constructor(private businessDashboardService: BusinessDashboardService) { }
}

