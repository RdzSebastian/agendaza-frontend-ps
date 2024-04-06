import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-abm-empresa',
  templateUrl: './abm-empresa.component.html',
})
export class AbmEmpresaComponent implements OnInit {

  buscar = ''
  listaItems : Array<any> = []
  cantidadRegistros : number[] = []
  cantidadPaginas : number[] = []
  currentRegistro : number = 0

  constructor(private empresaService : EmpresaService, private router : Router) { }

  async ngOnInit(): Promise<void> {
    this.inicializarListaItems()
  }
  
  async inicializarListaItems(){

    this.listaItems = await this.empresaService.getAllEmpresaByUsuarioId()

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

  editar(id : number){
      this.empresaService.empresaId = id
      this.router.navigateByUrl('/editEmpresa')
  }

  async eliminar(id : number){
    (await this.empresaService.delete(id)).subscribe({
      complete: () => {
        this.inicializarListaItems()
      }
    })
  }

}
