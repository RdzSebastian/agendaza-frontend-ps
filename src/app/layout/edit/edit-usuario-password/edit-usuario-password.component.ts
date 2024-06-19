import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, UsuarioEditPassword } from 'src/app/model/Usuario';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-edit-usuario-password',
  templateUrl: './edit-usuario-password.component.html',
})
export class EditUsuarioPasswordComponent implements OnInit {

  usuarioEditPassword = new UsuarioEditPassword(0, "")
  showNewPassword = false
  showRepeatPassword= false

  constructor(private usuarioService : UsuarioService, private router : Router, private loginService : LoginService) { }

  ngOnInit(): void {
  }

  async editPassword(){
    this.usuarioEditPassword.id  = await this.loginService.getUsuarioId()
    const item = await this.usuarioService.editPassword(this.usuarioEditPassword)
    this.router.navigateByUrl('/abmUsuario')
  }

  volver(){
    this.router.navigateByUrl('/editUsuarioPerfil')
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword
  }
  toggleRepeatPasswordVisibility() {
    this.showRepeatPassword = !this.showRepeatPassword
  }
}
