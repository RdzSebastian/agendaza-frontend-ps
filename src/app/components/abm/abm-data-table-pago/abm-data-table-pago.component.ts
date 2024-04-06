import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-abm-data-table-pago',
  templateUrl: './abm-data-table-pago.component.html'
})
export class AbmDataTablePagoComponent implements OnInit {

  @Input()
  listaItems : Array<any> = []

  @Input()
  currentRegistro : number = 0

  @Input()
  buscar = ''

  @Output() 
  outputEliminar = new EventEmitter<number>();

  modal = false
  idEliminar = 0
  cuerpoModal = ""
  tituloModal = ""
  botonModal = ""

  constructor() { }

  ngOnInit(): void {
  }

  modalParaEliminar(id : number, nombre : string){
    this.idEliminar = id
    this.tituloModal = "Eliminar Pago"
    this.cuerpoModal = "Quiere eliminar el pago del evento: " + nombre
    this.botonModal = "Eliminar"
    this.setModal(!this.modal)
  }

  setModal(modal : boolean){
    this.modal = modal
  }

  eliminar(id : number){
    this.outputEliminar.emit(this.idEliminar);
  }

}
