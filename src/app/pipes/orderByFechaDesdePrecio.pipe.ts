import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'orderByFechaDesdePrecio',
  pure: false
})
export class OrderByFechaDesdePrecio implements PipeTransform {

  transform(any: any[]): any[] {
    return any.sort((item, otroItem) => item.desde - otroItem.desde)
  }

}