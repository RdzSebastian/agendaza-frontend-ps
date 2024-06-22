export class Time{

    constructor(public hour: string, public minute: string){}

    static fromFormControl(hour : string, minute : string){
        return new Time(hour, minute)
    }
}