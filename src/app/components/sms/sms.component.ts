import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { StorageService } from '../../Servicios/storage.service';
import { ToastrService } from 'ngx-toastr';
import { ConsumoApiService } from '../../Servicios/consumo-api.service';
import {
  interfaceChat,
  interfaceMensaje,
  interfaceUsuario,
} from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss'],
})
export class SmsComponent implements OnInit {
  @ViewChild('closeBtnModal') closeBtn: ElementRef;

  @Input()
  idReceptor: string;
  public idEmisor: string;
  public usuarioLogueado: interfaceUsuario;
  public isError = false;
  public idChatGuardado:string=''
  constructor(
    private storage: StorageService,
    private consumoApi: ConsumoApiService,
    private toastr: ToastrService,
    private chatService: ChatService
  ) {
    this.usuarioLogueado = JSON.parse(this.storage.getStorage());
  }
  public chat: interfaceChat = {
    id_emisor: '',
    id_receptor: '',
    fecha: null,
  };
  public sms: interfaceMensaje = {
    descripcion: '',
    id_usuario: '',
    fecha: null,
    id_chat: '',
  };
  ngOnInit(): void {}

  guardarMensaje(form: NgForm) {
    const date = new Date();
    this.chat.id_emisor = this.usuarioLogueado._id;
    this.idEmisor = String(this.usuarioLogueado._id);
    this.chat.id_receptor = this.idReceptor;
    this.chat.fecha = date.toISOString();
    this.sms.id_usuario = this.usuarioLogueado._id;
    this.sms.fecha = date.toISOString();
    if (form.valid) {
      try {
        this.consumoApi
          .get(
            'chatsByUsers/' + this.usuarioLogueado._id + '/' + this.idReceptor
          )
          .subscribe((res: any) => {
            if (res.STATUS === 'SUCCESS' && res.DATA === null) {
              this.consumoApi
                .post('chats/', this.chat)
                .subscribe((res: any) => {
                  
                  if (res.STATUS === 'SUCCESS') {
                    this.sms.id_chat = res.DATA._id;
                    this.idChatGuardado=res.DATA._id;
                    
                    this.consumoApi
                      .post('mensajes/', this.sms)
                      .subscribe((res: any) => {
                        this.actualizarLeido();
                        this.showSuccess('Tu mensaje ha sido enviado');
                        this.closeModal();
                        this.modificarMensajeLeidoUser(this.idChatGuardado);
                      });
                  } else {
                    this.showError('Ha ocurrido un error inténtalo mas tarde');
                    this.closeModal();
                  }
                });
            } else {
              if (res.STATUS === 'SUCCESS' && res.DATA !== null) {
                this.sms.id_chat = res.DATA._id;
                this.idChatGuardado=res.DATA._id;
                this.consumoApi
                  .post('mensajes/', this.sms)
                  .subscribe((res: any) => {
                    this.actualizarLeido();
                    this.showSuccess('Tu mensaje ha sido enviado');
                    this.closeModal();
                    this.modificarMensajeLeidoUser(this.idChatGuardado);

                  });
              } else {
                this.showError('Ha ocurrido un error inténtalo mas tarde');
                this.closeModal();
              }
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      this.onisError();
    }
  }
  modificarMensajeLeidoUser(idChat){
    this.consumoApi.get('chats/'+idChat).subscribe((res:any)=>{
      
      if(res.DATA.id_emisor===this.usuarioLogueado._id){
          this.modificarUsuario(res.DATA.id_receptor);
      }
      else{
      if(res.DATA.id_receptor===this.usuarioLogueado._id){
         this.modificarUsuario(res.DATA.id_emisor);

        }
      }
    })
  }
  modificarUsuario(value){
    var modificarLeido={
      mensaje_leido:true
    }
    this.consumoApi.put('users/'+value,modificarLeido).subscribe()
  }

  actualizarLeido() {
    var params = {
      leido: false,
    };
    this.consumoApi
      .put('chats/' + this.sms.id_chat, params)
      .subscribe((res: any) => {
        console.log(res);
      });
    this.chatService.sendMessage(
      String(this.sms.descripcion),
      String(this.sms.id_usuario),
      String(this.sms.fecha),
      this.idReceptor,
      this.idEmisor,
      String(this.sms.id_chat)
    );
  }
  closeModal() {
    this.closeBtn.nativeElement.click();
  }
  showSuccess(value) {
    this.toastr.success(value, 'Éxito', {});
  }
  showError(value) {
    this.toastr.warning(value, 'Error', {});
  }
  onisError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
  resetForm(form: NgForm) {
    form.reset();
  }
}
