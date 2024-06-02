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
  classes : String = ""

  @Input()
  pageNumber : number = 0

  @Input()
  listaItems : Array<any> = []
  
  @Input()
  cantidadPaginas : number[] = []

  @Input()
  cantidadRegistros : number = 0

  @Input()
  cantidadEventos : number = 0

  @Input()
  busqueda! : Boolean 

  @Output() 
  outputCurrentRegistro = new EventEmitter<number>();

  @Output() 
  outputPageNumber= new EventEmitter<number>();

  @Output() 
  outputBuscar = new EventEmitter<string>();

  @Output() 
  outputBusqueda = new EventEmitter<Boolean>();

  constructor(){}
  
  ngOnInit() {

  }

  siguiente(){
      if(this.pageNumber < this.cantidadRegistros/10 -1){
       this.pageNumber += 1       
      this.currentPagina += 1
      }
      this.outputRegistro()
    
  }

  atras(){
      if(this.pageNumber > 0){
        this.pageNumber -= 1
        this.currentPagina -= 1
      }
      this.outputRegistro()
    
  }

  irPagina(pagina : number){
    this.pageNumber = pagina -1
    this.currentPagina = pagina
    this.outputRegistro()
  }

  actualizarCantidadPaginas(){
    this.currentPagina = 1
    this.currentRegistro = 0
    
    this.cantidadPaginas = new Array<number>(
      Math.trunc(
        this.listaItems.filter(it => it.contiene(this.buscar)).length / 10) + 1)
    
    this.outputRegistro()
    this.outputPalabraBuscar()
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


  outputPalabraBuscar() {
    this.outputBuscar.emit(this.buscar);
    
  }

  getLimites(paginaActual: number): [number, number] {
    const fin = Math.max(5,paginaActual)
    const inicio = Math.max(0,fin-5)
    return [inicio, fin];
  }

  getInicio(): number {

    var fin = 5
    var inicio = fin - 4


    if(5 <= this.currentPagina && this.cantidadPaginas.length - 1 > this.currentPagina){
      inicio = fin - 2
    }

    if(this.cantidadPaginas.length == this.currentPagina){
      inicio = fin - 4
    }

    if(this.cantidadPaginas.length - 2 <= this.currentPagina){
      inicio = this.cantidadPaginas.length - 5
    }
    
    return inicio
  }

  getFinal(){
    return Math.max(5,this.currentPagina +1)
  }

}
