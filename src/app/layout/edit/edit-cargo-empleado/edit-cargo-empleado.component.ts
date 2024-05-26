import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ROL_ADMIN } from 'src/util/configuration';


@Component({
  selector: 'app-edit-cargo-empleado',
  templateUrl: './edit-cargo-empleado.component.html',
})
export class EditEmpleadoCargoComponent implements OnInit {

  @Input()
  usuarioId : number = 0

  usuario = new Usuario(0, "", "", "", "", new Date(0,0,0,0,0,0), "","","", true)
  listaRol : Array<string> = []

  constructor(private usuarioService : UsuarioService, private router : Router) { }

  async ngOnInit(): Promise<void> {
    this.usuario = await this.usuarioService.getUsuario(this.usuarioService.usuarioId)
    this.usuario.rol = await this.usuarioService.getUsuarioRolByEmpresaId(this.usuarioService.usuarioId)
    this.listaRol = await this.usuarioService.getAllRol()

    console.log(this.usuario)

  }

  usuarioAdmin(){
    return this.usuario.rol == ROL_ADMIN
  }

  async save(){
    const item = await this.usuarioService.save(this.usuario)
    this.router.navigateByUrl('/abmUsuario')
  }

  volver(){
    this.router.navigateByUrl('/abmUsuario')
  }

}
