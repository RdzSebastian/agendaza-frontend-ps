import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtraService } from 'src/app/services/extra.service';
import { Location } from '@angular/common';
import { Extra } from 'src/app/model/Extra';

@Component({
  selector: 'app-abm-extra-evento',
  templateUrl: './abm-extra-evento.component.html',
})
export class AbmExtraEventoComponent implements OnInit {

  buscar = ''
  listaItems : Array<Extra> = []
  primeraBusqueda : Boolean = true
  cantidadRegistros : number=0
  cantidadPaginas : number[] = []
  currentRegistro : number = 0
  nombreItemModal = ""
  tituloModal = ""
  botonModal = ""
  pageNumber : number = 0

  constructor(private extraService : ExtraService, private router : Router, private location : Location) { }

  async ngOnInit(): Promise<void> {
    this.inicializarListaItems()
  }

  async inicializarListaItems(){

    this.updatePalabraBuscar(this.buscar)
    this.paginaCero()
    
    if(this.buscar == ""){

    this.listaItems = await this.extraService.getAllExtraByEmpresaId(this.pageNumber)
    this.cantidadRegistros = await this.extraService.cantExtras()

  }else{
    this.listaItems = await this.extraService.getAllExtraByFilterName(this.pageNumber,this.buscar)
    this.cantidadRegistros = await this.extraService.cantExtrasFiltrados(this.buscar)
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
  updatePageNumber(page : number){
    this.pageNumber = page
    this.inicializarListaItems()
  }
  updatePrimeraBusqueda(busqueda: Boolean){
    this.primeraBusqueda = busqueda

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
