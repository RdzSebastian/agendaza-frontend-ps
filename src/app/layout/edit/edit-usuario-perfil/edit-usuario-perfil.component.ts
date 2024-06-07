import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-usuario-perfil',
  templateUrl: './edit-usuario-perfil.component.html',
})
export class EditUsuarioPerfilComponent implements OnInit {

  usuarioId : number = 0
  usuario = new Usuario(0, "", "", "", "", new Date(0,0,0,0,0,0), "","","", true)
  listaSexo : Array<string> = []
  listaRol : Array<string> = []

  constructor(public logInService : LoginService, private usuarioService : UsuarioService, private router : Router) { }

  async ngOnInit(): Promise<void> {

    this.usuarioId = await this.logInService.getUsuarioId()
    this.usuario = await this.usuarioService.getUsuario(this.usuarioId)
    this.usuario.rol = await this.usuarioService.getUsuarioRolByEmpresaId(this.usuarioId)
    this.listaRol = await this.usuarioService.getAllRol()

  }

  async save(){
    const item = await this.usuarioService.save(this.usuario)
    this.router.navigateByUrl("/" + this.usuarioService.perfilVolver)
  }

  volver(){
    this.router.navigateByUrl("/" + this.usuarioService.perfilVolver)
  }

  cambiarContrasenia(){
    this.router.navigateByUrl('/editUsuarioPassword')
  }

}
