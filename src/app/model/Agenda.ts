export type AgendaCardJSON = {
    id : number,
    nombre : String,
    rol : String,
}

export class AgendaCard {
    constructor(public id : number, public nombre : String, public rol : String) {}
    
    
    static fromJson(agendaCardJSON: AgendaCardJSON): AgendaCard {
        return new AgendaCard(agendaCardJSON.id, agendaCardJSON.nombre, agendaCardJSON.rol)
    }

}

export type AgendaEventoJSON = {
    id : number
    title : String
    start : Date
    end : Date
}

export class AgendaEvento {
    constructor(public id : number, public title : String, public start : Date, public end : Date) {}
    
    
    static fromJson(agendaEventoJSON: AgendaEventoJSON): AgendaEvento {
        return new AgendaEvento(agendaEventoJSON.id, agendaEventoJSON.title, agendaEventoJSON.start, agendaEventoJSON.end)
    }

}