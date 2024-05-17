import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
})
export class VerClienteComponent implements OnInit {


  // buscar = ''
  // primeraBusqueda : Boolean = true
  // listaItems : Array<any> = []
  // listaHeader : Array<any> =[]
  // cantidadRegistros : number[] = []
  // cantidadPaginas : number[] = []
  // currentRegistro : number = 0
  // pageNumber : number = 0
  // cantidadEventos : number = 0

  // constructor(private eventoService : EventoService, private router : Router) { }

  async ngOnInit(): Promise<void> {
    console.log("cliente")
  }

  // async inicializarListaItems(){
  //   this.updatePalabraBuscar(this.buscar)
  //   this.paginaCero()
  //   if(this.buscar == ""){
  //     this.listaItems = await this.eventoService.getAllEventoByEmpresaId(this.pageNumber)
  //     this.cantidadEventos = await this.eventoService.cantEventos()
  //   }else{

  //     this.listaItems = await this.eventoService.getAllEventoByFilterName(this.pageNumber,this.buscar)
  //     this.cantidadEventos = await this.eventoService.cantEventosFiltrados(this.buscar)

  //   }
  //   this.cantidadRegistros = new Array<number>(this.cantidadEventos)
  //   this.cantidadPaginas = new Array<number>(Math.trunc(this.cantidadEventos / 10) + 1)

  //   this.updateCantidadPaginas(this.cantidadPaginas)
  // }

  // paginaCero(){
  //   if(this.primeraBusqueda){
  //         this.pageNumber = 0
  //   }
  //   this.primeraBusqueda = false

  // }
  // updateCurrentRegistro(registro: number){
  //   this.currentRegistro = registro
  // }

  // updatePageNumber(page : number){
  //   this.pageNumber = page
  //   this.inicializarListaItems()
  // }

  // updatePalabraBuscar(palabraBuscar: string){
  //   this.buscar = palabraBuscar

  // }
  // updatePrimeraBusqueda(busqueda: Boolean){
  //   this.primeraBusqueda = busqueda

  // }

  // updateCantidadPaginas(cantidadPaginas: number[]){
  //   this.cantidadPaginas = cantidadPaginas
  // }

  // pagos(id : number){
  //   this.router.navigateByUrl('/editEventoPagos')
  // }

  // extras(id : number){
  //   this.router.navigateByUrl('/editEventoExtras')
  // }

  // catering(id : number){
  //   this.router.navigateByUrl('/editEventoCatering')
  // }

  // hora(id : number){
  //   this.router.navigateByUrl('/editEventoHora')
  // }

  // ver(id : number){
  //   this.router.navigateByUrl('/verEvento')
  // }

  // async eliminar(id : number){
  //   (await this.eventoService.delete(id)).subscribe({
  //     complete: () => {
  //       this.inicializarListaItems()
  //     }
  //   })
  // }

}
