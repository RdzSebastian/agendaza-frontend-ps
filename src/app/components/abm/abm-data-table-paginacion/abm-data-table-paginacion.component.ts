import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-abm-data-table-paginacion',
  templateUrl: './abm-data-table-paginacion.component.html',
  styleUrls: ['./abm-data-table-paginacion.component.css']
})
export class AbmDataTablePaginacionComponent implements OnInit {


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

  @Output() 
  outputCurrentRegistro = new EventEmitter<number>();

  @Output() 
  outputPageNumber= new EventEmitter<number>();

  constructor(){}
  
  ngOnInit() {}

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
    
    /*
    this.cantidadPaginas = new Array<number>(
      Math.trunc(
        this.listaItems.filter(it => it.contiene(this.buscar)).length / 10) + 1)
    
    this.outputRegistro()
    //this.outputPalabraBuscar()*/
  }
  


  outputRegistro() {
    this.outputCurrentRegistro.emit(this.currentRegistro);
    this.outputPageNumber.emit(this.pageNumber);    
  }

  getLimites(paginaActual: number): [number, number] {
    const fin = Math.max(5,paginaActual)
    const inicio = Math.max(0,fin-5)
    return [inicio, fin];
  }
  
  getInicio(): number {

    var fin = Math.max(5,this.currentPagina)
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