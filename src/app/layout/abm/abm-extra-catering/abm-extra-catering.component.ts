import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ExtraService } from 'src/app/services/extra.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-extra-abm-catering',
  templateUrl: './abm-extra-catering.component.html',
})
export class AbmExtraCateringComponent implements OnInit {
  buscar = ''
  listaItems : Array<any> = []
  cantidadRegistros : number=0
  cantidadPaginas : number[] = []
  currentRegistro : number = 0
  nombreItemModal = ""
  tituloModal = ""
  botonModal = ""
  primeraBusqueda : Boolean = true
  pageNumber : number = 0

  constructor(private extraService : ExtraService, private router : Router, private location : Location) { }

  async ngOnInit(): Promise<void> {
    this.inicializarListaItems()
  }

  async inicializarListaItems(){

    this.updatePalabraBuscar(this.buscar)
    this.paginaCero()
    
    if(this.buscar == ""){

    this.listaItems = await this.extraService.getAllExtraCATByEmpresaId(this.pageNumber)
    this.cantidadRegistros = await this.extraService.cantExtrasCAT()

  }else{
    this.listaItems = await this.extraService.getAllExtraCATByFilterName(this.pageNumber,this.buscar)
    this.cantidadRegistros = await this.extraService.cantExtrasCATFiltrados(this.buscar)
  }
    this.cantidadPaginas = new Array<number>(Math.trunc(this.cantidadRegistros / 10) + 1)
    this.updateCantidadPaginas(this.cantidadPaginas)

    this.tituloModal = "Eliminar Extra"
    this.nombreItemModal = "extra"
    this.botonModal = "Eliminar"
  }

  updateCurrentRegistro(registro: number){
    this.currentRegistro = registro
  }

  updatePalabraBuscar(palabraBuscar: string){
    this.buscar = palabraBuscar
  }
  updatePageNumber(page : number){
    this.pageNumber = page
    this.inicializarListaItems()
  }
  updatePrimeraBusqueda(busqueda: Boolean){
    this.primeraBusqueda = busqueda

  }
  paginaCero(){
    if(this.primeraBusqueda){
          this.pageNumber = 0
    }
    this.primeraBusqueda = false

  }
  updateCantidadPaginas(cantidadPaginas: number[]){
    this.cantidadPaginas = cantidadPaginas
  }

  precio(id : number){
    this.extraService.extraId = id
    this.extraService.extraVolver = this.location.path()
    this.router.navigateByUrl('/precioExtra')
  }

  editar(id : number){
    this.extraService.extraId = id
    this.router.navigateByUrl('/save' + this.location.path().substring(4, this.location.path().length + 1))
  }

  async eliminar(id : number){
    (await this.extraService.delete(id)).subscribe({
      complete: () => {
        this.inicializarListaItems()
      }
    })
  }

}