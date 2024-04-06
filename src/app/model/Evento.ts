import { Capacidad } from "./Capacidad"
import { Extra } from "./Extra"
import { ExtraVariable } from "./ExtraVariable"
import { Pago } from "./Pago"
import { TipoEventoExtra } from "./TipoEvento"
import { Cliente, UsuarioAbm } from "./Usuario"

export type EventoJSON = {
    id: number
    nombre: string
    capacidad : Capacidad
    codigo : string
    inicio : string
    fin : string
    tipoEventoId : number
    empresaId : number
    extraOtro : number
    descuento : number
    listaExtra : Array<Extra>
    listaExtraVariable : Array<ExtraVariable>
    cateringOtro : number
    cateringOtroDescripcion : string
    listaExtraTipoCatering : Array<Extra>
    listaExtraCateringVariable : Array<ExtraVariable>
    cliente : Cliente
    presupuesto : number
    encargadoId : number
    estado : string
    anotaciones : string
}

export class Evento {
    constructor(public id : number, public nombre : string, public codigo : string, public inicio : string, 
        public fin : string, public tipoEventoId : number, public capacidad : Capacidad, 
        public empresaId : number, public extraOtro : number, public descuento : number,
        public listaExtra : Array<Extra>, public listaExtraVariable : Array<ExtraVariable>, 
        public cateringOtro : number, public cateringOtroDescripcion : string, 
        public listaExtraTipoCatering : Array<Extra>,
        public listaExtraCateringVariable : Array<ExtraVariable>, public cliente : Cliente, 
        public encargadoId : number, public estado : string, public anotaciones : string) {}
    
    
    static fromJson(eventoJSON: EventoJSON): Evento {
        return new Evento(eventoJSON.id, eventoJSON.nombre, eventoJSON.codigo, eventoJSON.inicio, 
            eventoJSON.fin, eventoJSON.tipoEventoId, eventoJSON.capacidad, eventoJSON.empresaId,
            eventoJSON.extraOtro, eventoJSON.descuento, eventoJSON.listaExtra, 
            eventoJSON.listaExtraVariable, eventoJSON.cateringOtro, eventoJSON.cateringOtroDescripcion, 
            eventoJSON.listaExtraTipoCatering, eventoJSON.listaExtraCateringVariable, 
            eventoJSON.cliente, eventoJSON.encargadoId, eventoJSON.estado, eventoJSON.anotaciones)
    }

    static getEventoVoid() : Evento{
        return new Evento(0,"","", "", "", 0, new Capacidad(0,0,0), 0, 
        0,0,[],[], 0,"",[],[], new Cliente(0,"","","CLIENTE","",0),0, "COTIZADO", "")
    }

    // Se usa en el filtro de header
    contiene(palabra: string): boolean {
        return (this.nombre.toUpperCase() || '').includes(palabra.toUpperCase())
        || (this.codigo.toUpperCase() || '').includes(palabra.toUpperCase())
        || (this.inicio || '').includes(palabra.toUpperCase())
    }

}

export class EventoPago{
    constructor(public id : number, public nombre : string, public codigo : string, 
        public precioTotal : number, public listaPagos : Array<Pago>){}
}

export class EventoExtra{
    constructor(public id : number, public nombre : string, public codigo : string,
        public extraOtro : number, public descuento : number,
        public listaExtra : Array<Extra>, public listaExtraVariable : Array<ExtraVariable>,
        public tipoEventoExtra : TipoEventoExtra, public fechaEvento : string){}
}

export class EventoCatering{
    constructor(public id : number, public nombre : string, public codigo : string, 
        public cateringOtro : number, public cateringOtroDescripcion : string,
        public listaExtraTipoCatering : Array<Extra>, public listaExtraCateringVariable : Array<ExtraVariable>,
        public tipoEventoId : number, public fechaEvento : string,
        public capacidad : Capacidad){}
}

export class EventoHora{
    constructor(public id : number, public nombre : string, public codigo : string, 
        public inicio : string, public fin : string){}
}

export class EventoVer{
    constructor(public id : number, public nombre : string, public codigo : string, public inicio : string, 
        public fin : string, public tipoEventoNombre : string, public capacidad : Capacidad, 
        public extraOtro : number, public descuento : number,
        public listaExtra : Array<Extra>, public listaExtraVariable : Array<ExtraVariable>,
        public cateringOtroDescripcion : string, public listaExtraTipoCatering : Array<Extra>,
        public listaExtraCateringVariable : Array<ExtraVariable>,
        public cliente : Cliente, public presupuesto : number, public encargado : UsuarioAbm,
        public estado : string, public empresa : string, public anotaciones : string){}
}

export class EventoBuscarFecha{
    constructor(public empresaId : number, public desde : Date, public hasta : Date){}
}