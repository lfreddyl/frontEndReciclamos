
export interface interfaceUsuario {
            _id?: String,
            nombres: String,
            apellidos: String,
            correo:String,
            telefono?:String,
            direccion?: String,
            password: String,
            delete?: Boolean,
            img?:String,
            notificacion_leido?:Boolean,
            mensaje_leido?:Boolean
            
}
export interface interfacePublicacion {
    _id?: String,
    id_usuario:String,
    descripcion: String,
    img:String,
    tipo?: String,
    cantidad?: Number,
    direccion: String,
    fecha:String,
    estado:String,
    residuos?:Array<String>,
    delete?:Boolean,
    usuario?:interfaceUsuario,
    _iduser?:String
}
export interface interfaceResiduo{
    _id?: String,
    descripcion:String,
    tipo: Number,
    
}
export interface interfaceArchivo{
     id: number,
    nombre:string,
    imagen: number,
}
export interface interfaceChat {
    _id?: String,
    id_receptor:String,
    id_emisor:String,
    fecha: String,
    delete?:Boolean

}
export interface interfaceMensaje {
    _id?: String,
    descripcion:String,
    fecha: String,
    id_usuario:String,
    id_chat:String
}
export interface interfacePostulacion {
    _id?: String,
    id_publicacion:String,
    id_usuario: String,
    estado:String
}
export interface interfaceNotificacion {
    _id?: String,
    descripcion:String,
    tipo:String,
    fecha:Date,
    id_usuario?:String,
    id_publicacion?:String,
    leida:boolean
}










