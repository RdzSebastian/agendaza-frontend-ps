import { PipeTransform, Pipe } from '@angular/core'

@Pipe({
  name: 'filterAbm'
})
export class FilterAbm implements PipeTransform {

  transform(any : any[], currentRegistro: number = 0, search: string = ''): any[] {

    if(search.length != 0){
      return any.filter(it => it.contiene(search)).slice(currentRegistro, currentRegistro + 10)
      
    }
    return any.slice(currentRegistro, currentRegistro + 10)
  }

}