import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-abm-tipo-evento',
  templateUrl: './abm-tipo-evento.component.html',
})
export class AbmTipoEventoComponent implements OnInit {

  buscar = ''
  listaItems : Array<any> = []
  cantidadRegistros : number = 0
  cantidadPaginas : number[] = []
  currentRegistro : number = 0
  nombreItemModal = ""
  tituloModal = ""
  botonModal = ""

  constructor(private tipoEventoService : TipoEventoService, private router : Router, private location : Location) { }

  async ngOnInit(): Promise<void> {
    this.inicializarListaItems()
  }

  async inicializarListaItems(){
    this.listaItems = await this.tipoEventoService.getAllTipoEventoByEmpresaId()

    this.cantidadRegistros = this.listaItems.length
    this.cantidadPaginas = new Array<number>(Math.trunc(this.listaItems.length / 11) + 1)
    
    this.tituloModal = "Eliminar Tipo Evento"
    this.nombreItemModal = "tipo evento"
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
    this.tipoEventoService.tipoEventoId = id
    this.router.navigateByUrl('/precio' + this.location.path().substring(4, this.location.path().length + 1))
  }

  editar(id : number){
    this.tipoEventoService.tipoEventoId = id
    this.router.navigateByUrl('/save' + this.location.path().substring(4, this.location.path().length + 1))
  }

  async eliminar(id : number){
    (await this.tipoEventoService.delete(id)).subscribe({
      complete: () => {
        this.inicializarListaItems()
      }
    })
  }

}
