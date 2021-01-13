import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interfacePublicacion, interfaceUsuario } from 'src/app/interfaces/interfaces';
import {ConsumoApiService} from '../../Servicios/consumo-api.service'
import { StorageService } from '../../Servicios/storage.service'
import { ToastrService } from 'ngx-toastr';

import {
  faTrash,
  faEye,
  faNewspaper,
  faUserCheck,
  faUserTimes
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-mis-postulaciones',
  templateUrl: './mis-postulaciones.component.html',
  styleUrls: ['./mis-postulaciones.component.scss']
})
export class MisPostulacionesComponent implements OnInit {
  @ViewChild('closeBtnModalEliminar') closeBtnEliminar: ElementRef; 
  public usuarioLogueado:interfaceUsuario;
  public usuarioPublicacion:interfaceUsuario=null
  public postulacionesArray:Array<any>=[];
  public idPostulacion:String=''
  faTrash=faTrash
  faNews=faNewspaper
  faEye=faEye
  faUserCheck=faUserCheck
  faUserTimes=faUserTimes
  public arrayVacio=false;

  constructor(
              private consumoApi:ConsumoApiService,
              private storage: StorageService,
              private toastr: ToastrService,
              private router:Router

  ) { }

  ngOnInit(): void {
    this.usuarioLogueado=JSON.parse(this.storage.getStorage());
    try {
      this.consumoApi.get('postulacionesByUser/'+this.usuarioLogueado._id).subscribe((res:any)=>{
        this.postulacionesArray=res.DATA
        if(res.DATA.length===0){
          
          this.arrayVacio=true;
        }
        else{
          for (let index = 0; index < this.postulacionesArray.length; index++) {
            this.consumoApi.get('publicaciones/'+this.postulacionesArray[index].id_publicacion).subscribe((res:any)=>{
              this.postulacionesArray[index].usuario=res.DATA
              
            })
          }
         
          
        }
      })
    } catch (error) {
      this.arrayVacio=true
    }
    

  }
  setId(value){
    this.idPostulacion=value
  }
  consultarNombres(value):String{
    this.consumoApi.get('users/'+value).subscribe((res:any)=>{
     this.usuarioPublicacion=res.DATA
    console.log(this.usuarioPublicacion)  
    })
    return this.usuarioPublicacion.nombres

  }
  eliminarPostulacion(){
    this.consumoApi.delete('postulaciones/'+this.idPostulacion).subscribe((res:any)=>{
      
      if(res.STATUS==='SUCCESS'){
        this.showSuccess('La publicación se ha eliminado')
        this.closeModalEliminar()
        this.reloadPage()
      }
      
    })
  }
  navegarPublicacion(value){
    
    this.router.navigate(['welcome/publicacion/',value])
  }
  closeModalEliminar(){
    this.closeBtnEliminar.nativeElement.click(); 
  }
  showSuccess(value) {
    this.toastr.success(value, 'Éxito', {
      
    });
  }
  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }
  convertirFecha(value):string{
    moment.locale('es');   
   
    const date = moment(value);
    
    let dateInFormat = date.format('LLLL');
    
    return dateInFormat
  }

}
