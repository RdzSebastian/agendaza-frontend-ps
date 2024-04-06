export type ExtraJSON = {
    id : number
    nombre : string
    tipoExtra : string
    empresaId: number
    listaTipoEventoId : Array<number>
    precio : number
}

export class Extra{

    constructor(public id: number, public nombre: string, public tipoExtra : string, public empresaId: number,  public listaTipoEventoId : Array<number>  = [], public precio : number){}
    
    static fromJson(ExtraJSON: ExtraJSON): any {
        return new Extra(ExtraJSON.id, ExtraJSON.nombre, ExtraJSON.tipoExtra, ExtraJSON.empresaId, ExtraJSON.listaTipoEventoId, ExtraJSON.precio)
    }

    // Se usa en el filtro de header
    contiene(palabra: string): boolean {
        return (this.nombre.toUpperCase() || '').includes(palabra.toUpperCase())
    }
}