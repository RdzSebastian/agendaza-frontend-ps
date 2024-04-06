import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'orderAbmByIdDesc'
})
export class OrderAbmByIdDesc implements PipeTransform {

  transform(any: any[]): any[] {
    return any.sort((item, otroItem) => item.id - otroItem.id)
  }

}