import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { interfacePostulacion, interfacePublicacion, interfaceUsuario } from 'src/app/interfaces/interfaces';
import {ConsumoApiService} from '../../Servicios/consumo-api.service'
import {StorageService} from '../../Servicios/storage.service'
@Component({
  selector: 'app-perfil-ecologico',
  templateUrl: './perfil-ecologico.component.html',
  styleUrls: ['./perfil-ecologico.component.scss']
})
export class PerfilEcologicoComponent implements OnInit {

  
  public usuarioPerfil:interfaceUsuario={
    img:'',
    nombres:'',
    apellidos:'',
    correo:'',
    password:''
  };
  public idUsuario:string=''
  public publicacionesArray:Array<interfacePublicacion>=[]
  public tamanoPublicaciones:number
  public publicacionesAsignadas:number=0
  public publicacionesPendientes:number=0

  public postulacionesArray:Array<interfacePostulacion>=[]
  public postulacionesAsignadas:number=0
  public postulacionesPendientes:number=0
  public tamanoPostulaciones:number
  

  public pieChartLabels: Label[] = [ ['Asignadas'],['Publicaciones'],['Pendientes']];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgb(1, 72, 225,0.9)', 'rgba(0,255,0,0.3)','rgb(240, 42, 20,0.6)'],
    },
  ];
  public pieChartLabels2: Label[] = [ ['Asignadas'],['Pendientes']];
  public pieChartData2: number[] = [];
  public pieChartColors2 = [
    {
      backgroundColor: ['rgb(1, 72, 225,0.9)','rgb(240, 42, 20,0.6)'],
    },
  ];
  constructor(
    private consumoApi:ConsumoApiService,
    private storage:StorageService,
    private router:ActivatedRoute
  ) { 
    this.idUsuario= this.router.snapshot.paramMap.get("idUsuario") 
    this.consumoApi.get('users/'+this.idUsuario).subscribe((res:any)=>{
      this.usuarioPerfil=res.DATA
    })
  }

  ngOnInit(): void {
    
    this.consumoApi.get('publicacionesByUser/'+this.idUsuario).subscribe((res:any)=>{
      this.publicacionesArray=res.DATA
    this.tamanoPublicaciones=this.publicacionesArray.length
    this.pieChartData[1]=this.tamanoPublicaciones
    
    for (let index = 0; index < this.tamanoPublicaciones; index++) {
        if (this.publicacionesArray[index].estado==='asignado'){
            this.publicacionesAsignadas=this.publicacionesAsignadas+1
        } 
    }
    this.pieChartData[0]=this.publicacionesAsignadas
    this.publicacionesPendientes=this.tamanoPublicaciones-this.publicacionesAsignadas
    this.pieChartData[2]=this.publicacionesPendientes

    this.consumoApi.get('postulacionesByUser/'+this.idUsuario).subscribe((res:any)=>{
    this.postulacionesArray=res.DATA
    this.tamanoPostulaciones=this.postulacionesArray.length
      for (let index = 0; index < this.tamanoPostulaciones; index++) {
        if (this.postulacionesArray[index].estado==='asignado'){
            this.postulacionesAsignadas=this.postulacionesAsignadas+1
        } 
    }
    this.postulacionesPendientes=this.tamanoPostulaciones-this.postulacionesAsignadas
    this.pieChartData2[0]=this.postulacionesAsignadas
    this.pieChartData2[1]=this.postulacionesPendientes

  })
    })
  }

}
