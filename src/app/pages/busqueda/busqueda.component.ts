import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {
  interfacePublicacion,
  interfaceUsuario,
} from 'src/app/interfaces/interfaces';
import { ConsumoApiService } from '../../Servicios/consumo-api.service';
import * as moment from 'moment';
import {
  faEye,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent implements OnInit {
  public valorBusqueda: string = '';
  public arrayUsuario: Array<interfaceUsuario> = [];
  public arrayPublicaciones: Array<interfacePublicacion> = [];
  faEye=faEye
  faSearch=faSearch
  public arrayVacio=false
  constructor(
    private consumoApi: ConsumoApiService,
    private router: ActivatedRoute,
    private route:Router
    
  ) {}

  ngOnInit(): void {
    //usuariosPorTelefono
    //usuariosPorCorreo

    this.valorBusqueda = this.router.snapshot.paramMap.get('valor');

    try {
      this.consumoApi
        .get('usersByCorreo/' + this.valorBusqueda)
        .subscribe((res: any) => {
          
          if (res.DATA !== null) {
            this.arrayUsuario[0] = res.DATA;
            
           
          } else {
            this.consumoApi
              .get('usersByNombres/' + this.valorBusqueda)
              .subscribe((res: any) => {
                if (res.DATA.length !== 0) {
                  this.arrayUsuario = res.DATA;
                }
                else{
                  this.consumoApi.get('publicacionesByDescripcion/'+this.valorBusqueda).subscribe((res:any)=>{
                    if (res.DATA.length !== 0) {
                      this.arrayPublicaciones = res.DATA;
                    }
                    else{
                      this.arrayVacio=true
                    }
                    
                  })
                }
              });
          }
        });
    } catch (error) {}
  }
  navegarPublicacion(value){
    
    this.route.navigate(['welcome/publicacion/',value])
  }
  convertirFecha(value):string{
    moment.locale('es');   
   
    const date = moment(value);
    
    let dateInFormat = date.format('LLLL');
    
    return dateInFormat
  }
}
