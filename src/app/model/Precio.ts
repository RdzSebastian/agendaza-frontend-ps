export type PrecioJSON = {
    id : number
    desde : Date
    hasta : Date
    precio : number
    empresaId : number
    itemId : number
}

export class Precio{

    constructor(public id : number, public desde : Date, public hasta : Date, public precio : number,
        public empresaId : number, public itemId : number){}
    
    static fromJson(precioJSON: PrecioJSON): any {
        return new Precio(precioJSON.id, new Date(precioJSON.desde), new Date(precioJSON.hasta), precioJSON.precio,
            precioJSON.empresaId, precioJSON.itemId)
    }

    static fromForm(precioForm : PrecioForm, empresaId : number, itemId : number){
        // Nuevo Precio
        if(precioForm.id < 0){
            return new Precio(0, new Date(precioForm.year, precioForm.desde, 1,0,0,0), new Date(precioForm.year,precioForm.hasta), precioForm.precio, empresaId, itemId)
        }
        
        //Precio ya cargado en la base de datos
        return new Precio(precioForm.id, new Date(precioForm.year, precioForm.desde), new Date(precioForm.year,precioForm.hasta), precioForm.precio, empresaId, itemId)
    }

    static toForm(precio : Precio){
        return new PrecioForm(precio.id, precio.desde.getFullYear(), precio.desde.getMonth(), 
        precio.hasta.getMonth(), precio.precio)
    }

}

export class PrecioForm{

    constructor(public id : number, public year : number, public desde : number, public hasta : number,
        public precio : number){}

}
