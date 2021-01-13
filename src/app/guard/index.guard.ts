import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../Servicios/storage.service';

@Injectable({
  providedIn: 'root',
})
export class IndexGuard implements CanActivate {
  public isLoggin=false;
  ban:boolean=true
  constructor(private storageService: StorageService, public router: Router) {
    this.isLoggin=this.storageService.isLogin()
  }
  canActivate() {
    if (this.isLoggin) {
      this.router.navigate(['/welcome']);
      return false
    } 
      return true
  }
}
