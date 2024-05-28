import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
})
export class EditUsuarioComponent implements OnInit {

  usuario = new Usuario(0, "", "", "", "", new Date(0,0,0,0,0,0), "","","", true)
  listaSexo : Array<string> = []
  listaRol : Array<string> = []

  constructor(private usuarioService : UsuarioService, private router : Router) { }

  async ngOnInit(): Promise<void> {
    this.usuario = await this.usuarioService.getUsuario(this.usuarioService.usuarioId)
    this.usuario.rol = await this.usuarioService.getUsuarioRolByEmpresaId(this.usuarioService.usuarioId)
    
    this.listaRol = await this.usuarioService.getAllRol()
  }

  async save(){
    const item = await this.usuarioService.save(this.usuario)
    this.router.navigateByUrl('/abmUsuario')
  }

}
