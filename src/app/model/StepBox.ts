export type StepBoxJSON = {
    id : number
    titulo : String
}

export class StepBox{

    constructor(public id: number, public titulo: String){}
    
    static fromJson(stepBoxJSON: StepBoxJSON): any {
        return new StepBox(stepBoxJSON.id, stepBoxJSON.titulo)
       }
}
