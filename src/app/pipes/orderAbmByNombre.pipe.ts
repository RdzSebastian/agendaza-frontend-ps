import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'orderAbmByNombre'
})
export class OrderAbmByNombre implements PipeTransform {

  transform(any: any[]): any[] {
    return any.sort((item, otroItem) => item.nombre.toLowerCase() !== otroItem.nombre.toLowerCase() ? item.nombre.toLowerCase() < otroItem.nombre.toLowerCase() ? -1 : 1 : 0)
  }

}