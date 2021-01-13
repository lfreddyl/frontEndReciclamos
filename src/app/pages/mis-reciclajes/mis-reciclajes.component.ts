import { Component, OnInit } from '@angular/core';
import { ConsumoApiService } from '../../Servicios/consumo-api.service';
import { StorageService } from 'src/app/Servicios/storage.service';
import { interfaceUsuario } from 'src/app/interfaces/interfaces';
import {
  faSms,
  faRecycle,
  faEye

} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-reciclajes',
  templateUrl: './mis-reciclajes.component.html',
  styleUrls: ['./mis-reciclajes.component.scss']
})
export class MisReciclajesComponent implements OnInit {
  public misReciclajesArray:Array<any> = [];
  public usuarioLogueado:interfaceUsuario;
  public idUsuarioPublicacion:string='';
  faSms=faSms
  faRecycle=faRecycle
  faEye=faEye

  public arrayVacio=false;

  constructor(
    private consumoApi: ConsumoApiService,
    private storage: StorageService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.usuarioLogueado=JSON.parse(this.storage.getStorage());
    this.consumoApi.get('postulacionesByUserAsignado/'+this.usuarioLogueado._id).subscribe((res: any) => {
      try {
        
        if(res.STATUS==='SUCCESS'){
          this.misReciclajesArray = res.DATA;
          if(res.DATA.length===0){
            this.arrayVacio=true;
          }
        }
        else{
          this.arrayVacio=true;
        }
      } catch (error) {
        console.log(error);
      }
    });
   
  }
  navegarPublicacion(value){
    
    this.router.navigate(['welcome/publicacion/',value])
  }
  setIdPublicacion(value){
    this.idUsuarioPublicacion=value
  }
  convertirFecha(value):string{
    moment.locale('es');   
   
    const date = moment(value);
    
    let dateInFormat = date.format('LLLL');
    
    return dateInFormat
  }

}
