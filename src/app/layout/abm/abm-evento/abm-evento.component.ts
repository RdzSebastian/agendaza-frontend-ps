import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-abm-evento',
  templateUrl: './abm-evento.component.html',
})
export class AbmEventoComponent implements OnInit {


  buscar = ''
  listaItems : Array<any> = []
  listaHeader : Array<any> =[]
  cantidadRegistros : number[] = []
  cantidadPaginas : number[] = []
  currentRegistro : number = 0
  pageNumber : number = 0

  constructor(private eventoService : EventoService, private router : Router) { }

  async ngOnInit(): Promise<void> {
    this.inicializarListaItems()
  }

  async inicializarListaItems(){
    if(this.eventoService.fechaFiltroForAbmEvento == ""){
      this.listaItems = await this.eventoService.getAllEventoByEmpresaId(this.pageNumber)
    }else{
      this.listaItems = await this.eventoService.getAllEventoByEmpresaIdAndFechaFiltro()
    }

    this.cantidadRegistros = new Array<number>(this.listaItems.length)
    this.cantidadPaginas = new Array<number>(Math.trunc(this.listaItems.length / 11) + 1)
  }
  
  updateCurrentRegistro(registro: number){
    this.currentRegistro = registro
  }

  updatePageNumber(page : number){
    this.pageNumber = page
    this.inicializarListaItems()
  }

  updatePalabraBuscar(palabraBuscar: string){
    this.buscar = palabraBuscar
  }

  updateCantidadPaginas(cantidadPaginas: number[]){
    this.cantidadPaginas = cantidadPaginas
  }

  pagos(id : number){
    this.router.navigateByUrl('/editEventoPagos')
  }

  extras(id : number){
    this.router.navigateByUrl('/editEventoExtras')
  }

  catering(id : number){
    this.router.navigateByUrl('/editEventoCatering')
  }

  hora(id : number){
    this.router.navigateByUrl('/editEventoHora')
  }
  
  ver(id : number){
    this.router.navigateByUrl('/verEvento')
  }

  async eliminar(id : number){
    (await this.eventoService.delete(id)).subscribe({
      complete: () => {
        this.inicializarListaItems()
      }
    })
  }

}
