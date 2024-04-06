export type GenericItemJSON = {
    id : number
    nombre : string,
}

export class GenericItem{

    constructor(public id: number, public nombre: string){}
    
    static fromJson(genericItemJSON: GenericItemJSON): any {
        return new GenericItem(genericItemJSON.id, genericItemJSON.nombre)
    }

    // Se usa en el filtro de header
    contiene(palabra: string): boolean {
        return (this.nombre.toUpperCase() || '').includes(palabra.toUpperCase())
    }
}

export type GenericItemEmpresaTipoEventoJSON = {
    id : number
    nombre : string
    empresaId : number
    listaTipoEventoId : Array<number>
}

export class GenericItemEmpresaTipoEvento{

    constructor(public id : number, public nombre: string, public empresaId: number, public listaTipoEventoId : Array<number>  = []){}
    
    static fromJson(genericItemEmpresaTipoEventoJSON: GenericItemEmpresaTipoEventoJSON): any {
        return new GenericItemEmpresaTipoEvento(genericItemEmpresaTipoEventoJSON.id, genericItemEmpresaTipoEventoJSON.nombre, 
            genericItemEmpresaTipoEventoJSON.empresaId, genericItemEmpresaTipoEventoJSON.listaTipoEventoId)
       }
}