import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { Extra } from 'src/app/model/Extra';

@Component({
  selector: 'app-extra-checkbox',
  templateUrl: './extra-checkbox.component.html'
})
export class ExtraCheckboxComponent implements OnInit {

  @Input()
  i! : number

  @Input()
  extra! : Extra

  @Input()
  listaExtra! : Array<Extra>

  @Output()
  outputExtraPresupuesto = new EventEmitter<number>();

  @Output()
  outputExtraOtro = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if(this.isChecked()){
      this.outputExtraPresupuesto.emit(this.extra.precio)
    }
  }

  onCheckboxChange(event: any){
    if (event.target.checked) {
      this.listaExtra.push(this.extra)
      this.outputExtraPresupuesto.emit(this.extra.precio)
      this.outputExtraOtro.emit()
    } else {
      _.pull(this.listaExtra, this.listaExtra.find(it => { return it.id === this.extra.id }))
      this.outputExtraPresupuesto.emit(- this.extra.precio)
    }
  }

  isChecked(){
    return this.listaExtra.find(it => { return it.id === this.extra.id }) != undefined
  }
}
