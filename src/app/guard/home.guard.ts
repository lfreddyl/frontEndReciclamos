import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { StorageService } from '../Servicios/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  public isLoggin=false;
  constructor(public storageService: StorageService, public router: Router) {
    this.isLoggin=this.storageService.isLogin()
   }
  canActivate() {
    if (!this.isLoggin) {
      this.router.navigate(['/about']);
      return false
    } 
    return true    
    
  }
}
