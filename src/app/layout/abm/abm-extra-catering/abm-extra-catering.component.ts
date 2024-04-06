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
  cantidadRegistros : number[] = []
  cantidadPaginas : number[] = []
  currentRegistro : number = 0
  nombreItemModal = ""
  tituloModal = ""
  botonModal = ""

  constructor(private extraService : ExtraService, private router : Router, private location : Location) { }

  async ngOnInit(): Promise<void> {
    this.inicializarListaItems()
  }

  async inicializarListaItems(){
    this.listaItems = await this.extraService.getAllExtraCateringByEmpresaId()

    this.cantidadRegistros = new Array<number>(this.listaItems.length)
    this.cantidadPaginas = new Array<number>(Math.trunc(this.listaItems.length / 11) + 1)
    
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