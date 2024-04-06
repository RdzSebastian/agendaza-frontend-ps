import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { ExtraVariable } from 'src/app/model/ExtraVariable';

@Component({
  selector: 'app-extra-variable-checkbox',
  templateUrl: './extra-variable-checkbox.component.html'
})
export class ExtraVariableCheckboxComponent implements OnInit {

  @Input()
  i! : number

  @Input()
  extra! : ExtraVariable

  @Input()
  listaExtra! : Array<ExtraVariable>

  precioExtraPasado : number = 0

  @Output()
  outputExtraPresupuesto = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
    if(this.extra.cantidad == null && !this.isChecked()){
      this.extra.cantidad = 0
    }else{
      this.extra.cantidad = this.listaExtra.find(it => { return it.id === this.extra.id })?.cantidad!!
      this.onChangeCantidad()
    }
  }

  onCheckboxChange(event: any){
    if (event.target.checked) {
      this.listaExtra.push(this.extra)
    } else {
      this.onNotCheckbox()
      _.pull(this.listaExtra, this.listaExtra.find(it => { return it.id === this.extra.id }))
    }
  }

  onChangeCantidad(){
    if(this.precioExtraPasado != 0){
      this.onChangeCantidadCheckbox()
    }
    this.outputExtraPresupuesto.emit(this.extra.precio * this.extra.cantidad)
    this.precioExtraPasado = this.extra.precio * this.extra.cantidad
  }

  onNotCheckbox(){
    this.outputExtraPresupuesto.emit(-this.extra.precio * this.extra.cantidad)
    this.precioExtraPasado = 0
    this.extra.cantidad = 0
  }

  onChangeCantidadCheckbox(){
    this.outputExtraPresupuesto.emit(-this.precioExtraPasado)
  }

  isChecked(){
    return this.listaExtra.find(it => { return it.id === this.extra.id }) != undefined
  }
}
