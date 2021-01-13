import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interfacePublicacion, interfaceUsuario } from 'src/app/interfaces/interfaces';
import { ConsumoApiService } from '../../Servicios/consumo-api.service';
import { StorageService } from '../../Servicios/storage.service'
import {
  
  faUsers,
  faSms
} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
})
export class PublicacionComponent implements OnInit {
  faUsers = faUsers;
  faSms = faSms;
  public idPublicacion:string='';
  public publicaciones:any;
  public usuarioLogueado:interfaceUsuario;
  public idUsuarioPublicacion:string='';
  public arrayVacio:boolean=false;
  constructor(
    private consumoApi: ConsumoApiService,
    private router: ActivatedRoute,
    private storage: StorageService,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {
    this.usuarioLogueado=JSON.parse(this.storage.getStorage());
    this.idPublicacion= this.router.snapshot.paramMap.get("id") 
    this.consumoApi.get('publicaciones/'+this.idPublicacion).subscribe((res:any)=>{
      this.publicaciones=res.DATA
      console.log(this.publicaciones)
      
    })

  }
  setIdPublicacion(value){
    this.idUsuarioPublicacion=value
  }
  postular(idUsuario, idPost) {
    var dateobj = new Date(); 
    const postulacion={
      id_usuario:idUsuario,
      id_publicacion:idPost,
      estado:"pendiente",
      fecha:String(dateobj)
    }
    this.consumoApi
      .get('postulacionesByUserByPost/' + idUsuario + '/' + idPost)
      .subscribe((res: any) => {
        if (res.DATA === null&&res.STATUS==='SUCCESS') {
          try {
            this.consumoApi.post('postulaciones',postulacion).subscribe((res:any)=>{
            if(res.STATUS==='SUCCESS'){
              this.showSuccess('Tu postulación se ha registrado')
            }
            else{
            this.showError('Hubo un problema inténtalo mas tarde')
            }
            })
          } catch (error) {
            this.showError('Hubo un problema inténtalo mas tarde')
          }

        
        } else {
          this.showInfo('Usted ya ha postulado a esta publicación')
        }
      });
  }
  showSuccess(value) {
    this.toastr.success(value, 'Éxito', {
    });
  }
  showInfo(value) {
    this.toastr.warning(value, 'Error', {
    });
  }
  showError(value){
    this.toastr.warning(value, 'Error', {
    });
  }
  convertirFecha(value):string{
    moment.locale('es');   
   
    const date = moment(value);
    
    let dateInFormat = date.format('LLLL');
    
    return dateInFormat
  }
}
