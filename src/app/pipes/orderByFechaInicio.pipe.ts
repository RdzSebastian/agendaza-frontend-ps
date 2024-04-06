import { Pipe, PipeTransform } from '@angular/core'
import { Evento } from '../model/Evento'

@Pipe({
  name: 'orderByFechaInicio',
  pure: false
})
export class OrderByFechaInicio implements PipeTransform {

  transform(any: any[]): any[] {
    return any.sort((item, otroItem) => new Date(otroItem.inicio.split("T")[0]).getTime() - new Date(item.inicio.split("T")[0]).getTime())
  }

}