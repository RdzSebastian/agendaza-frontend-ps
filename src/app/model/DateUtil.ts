export type Mes = {
    id: number
    nombre: string
}

export class DateUtil{
    
    static getAllDaysOfMonth(year : number, mes: number){
        mes = Number(mes) + Number(1)
        const ultimoDiaMes = new Date(year, mes, 0).getDate()
        const listaDia = []

        for (let i = 1; i < ultimoDiaMes + 1; i++) {
          listaDia.push(i)
        }

        return listaDia
    }

    static ListaMes : Array<Mes> = [
        { "id": 0, "nombre": "Enero" },
        { "id": 1, "nombre": "Febero" },
        { "id": 2, "nombre": "Marzo" },
        { "id": 3, "nombre": "Abril" },
        { "id": 4, "nombre": "Mayo" },
        { "id": 5, "nombre": "Junio" },
        { "id": 6, "nombre": "Julio" },
        { "id": 7, "nombre": "Agosto" },
        { "id": 8, "nombre": "Septiembre" },
        { "id": 9, "nombre": "Octubre" },
        { "id": 10, "nombre": "Noviembre" },
        { "id": 11, "nombre": "Diciembre" },
    ]

    static ListaHora : Array<string> = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]

    static ListaMinuto : Array<string> = ["00","30"]
}