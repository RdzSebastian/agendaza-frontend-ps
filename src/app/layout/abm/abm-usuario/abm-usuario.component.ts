import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.css']
})
export class AbmUsuarioComponent implements OnInit {

  buscar = ''
  listaItems : Array<any> = []
  cantidadRegistros : number = 0
  cantidadPaginas : number[] = []
  currentRegistro : number = 0
  pageNumber : number = 0

  constructor(private usuarioService : UsuarioService, private loginService : LoginService, private router : Router, private location : Location) { }
  
  async ngOnInit(): Promise<void> {

    this.listaItems = await this.usuarioService.getAllUsuariosByEmpresaId(this.pageNumber)
    this.cantidadRegistros = await this.usuarioService.cantUsuarios()

    this.cantidadPaginas = new Array<number>(Math.trunc(this.cantidadRegistros / 11) + 1)
    this.updateCantidadPaginas(this.cantidadPaginas)
  }

  updateCurrentRegistro(registro: number){
    this.currentRegistro = registro
  }
  updatePageNumber(page : number){
    this.pageNumber = page
    this.ngOnInit()
  }
  updatePalabraBuscar(palabraBuscar: string){
    this.buscar = palabraBuscar
  }

  updateCantidadPaginas(cantidadPaginas: number[]){
    this.cantidadPaginas = cantidadPaginas
  }

  editar(id : number){
    this.usuarioService.usuarioId = id
    this.router.navigateByUrl('/editUsuario')
  }

  cambiarPassword(id : number){
    this.usuarioService.usuarioId = id
    this.router.navigateByUrl('/editUsuarioPassword')
  }

}
