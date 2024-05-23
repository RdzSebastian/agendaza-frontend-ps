import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-abm-cliente',
  templateUrl: './abm-cliente.component.html',
})
export class AbmClienteComponent implements OnInit {

  buscar = ''
  listaItems : Array<any> = []
  listaHeader : Array<any> =[]
  cantidadRegistros : number=0
  cantidadPaginas : number[] = []
  currentRegistro : number = 0

  constructor(private usuarioService : UsuarioService) { }

  async ngOnInit(): Promise<void> {
    this.listaItems = await this.usuarioService.getAllClienteByEmpresaId()

    this.cantidadRegistros = this.listaItems.length
    this.cantidadPaginas = new Array<number>(Math.trunc(this.listaItems.length / 11) + 1)

    this.listaHeader.push("Nombre")
    this.listaHeader.push("Apellido")
    this.listaHeader.push("Usuario")
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
}
