import { Component, OnInit } from '@angular/core';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-abm-pago',
  templateUrl: './abm-pago.component.html',
})
export class AbmPagoComponent implements OnInit {

  buscar = ''
  listaItems : Array<any> = []
  cantidadRegistros : number[] = []
  cantidadPaginas : number[] = []
  currentRegistro : number = 0

  constructor(private pagoService : PagoService) { }

  async ngOnInit(): Promise<void> {
    this.inicializarListaItems()
  }

  async inicializarListaItems(){
    this.listaItems = await this.pagoService.getAllPagoByEmpresaId()

    this.cantidadRegistros = new Array<number>(this.listaItems.length)
    this.cantidadPaginas = new Array<number>(Math.trunc(this.listaItems.length / 11) + 1)
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
