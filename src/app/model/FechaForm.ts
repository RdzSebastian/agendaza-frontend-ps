export class FechaForm{

    constructor(public year : number, public mes : number, public dia : number){}

    static fromFormControl(year : number, mes : number, dia: number){
        return new FechaForm(year, mes, dia)
    }
}
