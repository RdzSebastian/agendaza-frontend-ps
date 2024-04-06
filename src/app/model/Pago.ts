export type PagoJSON = {
    id : number
    monto : number
    codigo : string
    nombreEvento : string
    medioDePago : string
    fecha : Date
}

export class Pago{

    constructor(public id: number, public monto : number, public codigo : string, 
        public nombreEvento : string, public medioDePago : string, public fecha : Date){}
    
    static fromJson(PagoJSON: PagoJSON): any {
        return new Pago(PagoJSON.id, PagoJSON.monto, PagoJSON.codigo, 
            PagoJSON.nombreEvento, PagoJSON.medioDePago, PagoJSON.fecha)
       }
    
    // Se usa en el filtro de header
    contiene(palabra: string): boolean {
        return (this.monto.toString() || '').includes(palabra.toUpperCase())
        || (this.codigo.toUpperCase() || '').includes(palabra.toUpperCase())
        || (this.nombreEvento.toUpperCase() || '').includes(palabra.toUpperCase())
        || (this.medioDePago.toUpperCase() || '').includes(palabra.toUpperCase())
    }
}

export class CodigoEmpresaId{
    constructor(public codigo : string, public empresaId : number){}
}

export class PagoEmpresaEncargado{
    constructor(public pago : Pago, public empresaId : number, public usuarioId : number){}
}
