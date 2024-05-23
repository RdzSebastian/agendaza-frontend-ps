import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-abm-data-table',
  templateUrl: './abm-data-table.component.html'
})
export class AbmDataTableComponent implements OnInit {
  
  @Input()
  listaItems : Array<any> = []

  @Input()
  currentRegistro : number = 0

  @Input()
  buscar = ''

  @Input()
  mostrarPrecio : boolean = true
  
  @Input()
  mostrarEliminar : boolean = true
  
  @Input()
  pageNumber : number = 0

  @Output() 
  outputPrecio = new EventEmitter<number>();

  @Output() 
  outputEditar = new EventEmitter<number>();

  @Output() 
  outputEliminar = new EventEmitter<number>();

  modal = false

  idEliminar = 0

  cuerpoModal = ""

  @Input()
  tituloModal = ""

  @Input()
  botonModal = ""

  @Input()
  nombreItemModal = ""

  constructor() { }

  ngOnInit(): void {

  }

  modalParaEliminar(id : number, nombre : string){
    this.idEliminar = id
    this.cuerpoModal = "Quiere eliminar el " + this.nombreItemModal + ": " + nombre
    this.setModal(!this.modal)
  }

  setModal(modal : boolean){
    this.modal = modal
  }

  precio(id : number){
    this.outputPrecio.emit(id);
  }

  editar(id : number){
    this.outputEditar.emit(id);
  }

  eliminar(){
    this.outputEliminar.emit(this.idEliminar);
  }

}
