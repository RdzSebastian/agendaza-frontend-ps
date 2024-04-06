export type ExtraVariableJSON = {
    id : number
    nombre : string
    cantidad : number
    precio : number
}

export class ExtraVariable{

    constructor(public id: number, public nombre : string, public cantidad : number, public precio : number){}
    
    static fromJson(extraVariableJSON: ExtraVariableJSON): any {
        return new ExtraVariable(extraVariableJSON.id, extraVariableJSON.nombre, extraVariableJSON.cantidad, extraVariableJSON.precio)
       }
}
