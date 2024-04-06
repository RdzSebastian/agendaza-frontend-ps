import { PipeTransform, Pipe } from '@angular/core'

@Pipe({
  name: 'siNo'
})
export class siNo implements PipeTransform {

  transform(value: any): any {
    return value ? 'Si' : 'No';;
  }

}