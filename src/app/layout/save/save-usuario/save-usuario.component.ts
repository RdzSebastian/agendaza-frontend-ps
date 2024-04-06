import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-save-usuario',
  templateUrl: './save-usuario.component.html',
})
export class SaveUsuarioComponent implements OnInit {

  usuario = new Usuario(0, "", "", "", "", new Date(0,0,0,0,0,0),"MASCULINO","ADMIN", "", true)
  listaSexo : Array<string> = []
  listaRol : Array<string> = []

  constructor(private usuarioService : UsuarioService, private router : Router) { }

  async ngOnInit(): Promise<void> {
    this.listaRol = await this.usuarioService.getAllRol()
    this.listaSexo = await this.usuarioService.getAllSexo()
  }

  async save(){
    const item = await this.usuarioService.save(this.usuario)
    this.router.navigateByUrl('/abmUsuario')
  }

  volver(){
    this.router.navigateByUrl('/abmUsuario')
  }

}
