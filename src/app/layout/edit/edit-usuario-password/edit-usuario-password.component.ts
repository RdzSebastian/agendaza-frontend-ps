import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, UsuarioEditPassword } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-edit-usuario-password',
  templateUrl: './edit-usuario-password.component.html',
})
export class EditUsuarioPasswordComponent implements OnInit {

  usuarioEditPassword = new UsuarioEditPassword(0, "")

  constructor(private usuarioService : UsuarioService, private router : Router) { }

  ngOnInit(): void {
    this.usuarioEditPassword.id = this.usuarioService.usuarioId
  }

  async editPassword(){
    const item = await this.usuarioService.editPassword(this.usuarioEditPassword)
    this.router.navigateByUrl('/abmUsuario')
  }

  volver(){
    this.router.navigateByUrl('/editUsuarioPerfil')
  }

}
