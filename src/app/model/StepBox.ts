export type StepBoxJSON = {
    id : number
    nombre : String
    valid : boolean
}

export class StepBox{

    constructor(public id: number, public nombre: String, public valid: boolean | undefined){}
    
    static fromJson(stepBoxJSON: StepBoxJSON): any {
        return new StepBox(stepBoxJSON.id, stepBoxJSON.nombre, stepBoxJSON.valid)
       }
}
