export type CapacidadJSON = {
    id : number
    capacidadAdultos : number,
    capacidadNinos: number
}

export class Capacidad{

    constructor(public id: number, public capacidadAdultos: number, public capacidadNinos: number){}
    
    static fromJson(capacidadJSON: CapacidadJSON): any {
        return new Capacidad(capacidadJSON.id, capacidadJSON.capacidadAdultos, capacidadJSON.capacidadNinos)
    }

}