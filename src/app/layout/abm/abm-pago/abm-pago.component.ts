import { Component, OnInit } from '@angular/core';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-abm-pago',
  templateUrl: './abm-pago.component.html',
})
export class AbmPagoComponent implements OnInit {

  buscar = ''
  listaItems : Array<any> = []
  cantidadRegistros : number=0
  cantidadPaginas : number[] = []
  currentRegistro : number = 0
  pageNumber : number = 0
  primeraBusqueda : Boolean = true

  constructor(private pagoService : PagoService) { }

  async ngOnInit(): Promise<void> {
    this.inicializarListaItems()
  }

  async inicializarListaItems(){

    this.updatePalabraBuscar(this.buscar)
    this.paginaCero()
    
    if(this.buscar == ""){

    this.listaItems = await this.pagoService.getAllPagoByEmpresaId(this.pageNumber)
    this.cantidadRegistros = await this.pagoService.cantPagos()
    }else{
      this.listaItems = await this.pagoService.getAllPagoByFilter(this.pageNumber,this.buscar)
      this.cantidadRegistros = await this.pagoService.cantPagosFiltrados(this.buscar)

    }

    this.cantidadPaginas = new Array<number>(Math.trunc(this.cantidadRegistros / 10) + 1)
    this.updateCantidadPaginas(this.cantidadPaginas)
  }
  paginaCero(){
    if(this.primeraBusqueda){
          this.pageNumber = 0
    }
    this.primeraBusqueda = false

  }

  updatePageNumber(page : number){
    this.pageNumber = page
    this.inicializarListaItems()
  }

  updatePrimeraBusqueda(busqueda: Boolean){
    this.primeraBusqueda = busqueda

  }

  updateCurrentRegistro(registro: number){
    this.currentRegistro = registro
  }

  updatePalabraBuscar(palabraBuscar: string){
    this.buscar = palabraBuscar
  }

  updateCantidadPaginas(cantidadPaginas: number[]){
    this.cantidadPaginas = cantidadPaginas
  }

  async eliminar(id : number){
    (await this.pagoService.delete(id)).subscribe({
      complete: () => {
        this.inicializarListaItems()
      }
    })
  }
}
