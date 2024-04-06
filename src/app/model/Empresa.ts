export type EmpresaJSON = {
    id : number
    nombre : string,
    tipo: string
}

export class Empresa{

    constructor(public id: number, public nombre: string){}
    
    static fromJson(empresaJSON: EmpresaJSON): any {
        return new Empresa(empresaJSON.id, empresaJSON.nombre)
    }

    // Se usa en el filtro de header
    contiene(palabra: string): boolean {
        return (this.nombre.toUpperCase() || '').includes(palabra.toUpperCase())
    }
}