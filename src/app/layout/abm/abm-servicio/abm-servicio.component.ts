import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-abm-servicio',
  templateUrl: './abm-servicio.component.html',
})
export class AbmServicioComponent implements OnInit {


  buscar = ''
  listaItems : Array<any> = []
  cantidadRegistros : number=0
  cantidadPaginas : number[] = []
  currentRegistro : number = 0
  nombreItemModal = ""
  tituloModal = ""
  botonModal = ""

  constructor(private servicioService : ServicioService, private router : Router, private location : Location) { }

  async ngOnInit(): Promise<void> {
    this.inicializarListaItems()
  }

  async inicializarListaItems(){
    this.listaItems = await this.servicioService.getAllServicioByEmpresaId()

    this.cantidadRegistros = this.listaItems.length
    this.cantidadPaginas = new Array<number>(Math.trunc(this.listaItems.length / 11) + 1)
    
    this.tituloModal = "Eliminar Servicio"
    this.nombreItemModal = "servicio"
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

  editar(id : number){
    this.servicioService.servicioId = id
    this.router.navigateByUrl('/save' + this.location.path().substring(4, this.location.path().length + 1))
  }

  async eliminar(id : number){
    (await this.servicioService.delete(id)).subscribe({
      complete: () => {
        this.inicializarListaItems()
      }
    })
  }

}
