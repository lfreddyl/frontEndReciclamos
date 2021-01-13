import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  usuariosActivosObs: Observable<any>;


  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
    //this.chatService.emitirUsuariosActivos();

    //this.usuariosActivosObs = this.chatService.getUsuariosActivos();


  }

}
