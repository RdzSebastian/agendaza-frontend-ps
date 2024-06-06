import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-abm-data-table-header',
  templateUrl: './abm-data-table-header.component.html',
  styleUrls: ['./abm-data-table-header.component.css']
})
export class AbmDataTableHeaderComponent implements OnInit {

  buscar : string = ''
  currentRegistro : number = 0
  currentPagina : number = 1

  @Input()
  busqueda! : Boolean

  @Input()
  pageNumber : number = 0

  @Input()
  titulo : string = ''

  @Output() 
  outputBuscar = new EventEmitter<string>();

  @Output() 
  outputBusqueda = new EventEmitter<Boolean>();

  @Output() 
  outputCurrentRegistro = new EventEmitter<number>();

  @Output() 
  outputPageNumber= new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {}

  outputPalabraBuscar() {
    this.outputBuscar.emit(this.buscar);
  }

  actualizaBuscar(){
    this.currentPagina = 1
    this.busqueda = true
    this.outputBusqueda.emit(this.busqueda);
    this.outputPalabraBuscar()
    this.outputRegistro()
  }

  outputRegistro() {
    this.outputCurrentRegistro.emit(this.currentRegistro);
    this.outputPageNumber.emit(this.pageNumber);    
  }

}
