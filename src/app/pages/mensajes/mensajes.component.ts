import { Component, OnInit } from '@angular/core';
import { WebsocketsService } from '../../services/websockets.service';
import { ActivatedRoute } from '@angular/router';
import { ConsumoApiService } from 'src/app/Servicios/consumo-api.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {
  public idChat:string=''
  public idEmisor:string=''
  public idReceptor:string=''
  constructor(
    public wsService: WebsocketsService,
    private router: ActivatedRoute,
    private consumoApi:ConsumoApiService
    ) { }

  ngOnInit(): void {
    this.idChat= this.router.snapshot.paramMap.get("idChat")
    this.consumoApi.get('chats/'+this.idChat).subscribe((res:any)=>{
      try {
        if(res.STATUS==='SUCCESS'){
            this.idReceptor=res.DATA.id_receptor;
            this.idEmisor=res.DATA.id_emisor;
        }
      } catch (error) {
        console.log(error)
      }
    })
   

  }
  

}
