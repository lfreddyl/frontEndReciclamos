import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor() { }


  store(value: any) {
    sessionStorage.setItem('usuario', JSON.stringify(value));
    
  }

  getStorage():string{
    var userLogin=''
    userLogin=sessionStorage.getItem('usuario');
    return(userLogin)
  }
  isLogin():boolean {
    var login=null;
    login=sessionStorage.getItem('usuario');
    
    if(login!==null){
      return true
    }
    else return false
  }
  removeStorage(){
    sessionStorage.removeItem('usuario');

  }



}
