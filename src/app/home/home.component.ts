import { Component, OnInit } from '@angular/core';
import { interfaceUsuario } from '../interfaces/interfaces';
import { WebsocketsService } from '../services/websockets.service';
import { StorageService } from '../Servicios/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public usuarioLogueado:interfaceUsuario;

  constructor(
    public wsService: WebsocketsService,
    private storage: StorageService,


  ) { }

  ngOnInit(){
    this.usuarioLogueado=JSON.parse(this.storage.getStorage());
    this.registrarSocket()

  }

  registrarSocket() {
    const identificadorBD:string=String(this.usuarioLogueado._id)
    
    this.wsService.loginWS(identificadorBD)
  }
}
