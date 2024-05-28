import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda.service';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { Empresa } from 'src/app/model/Empresa';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private usuarioService : UsuarioService, private router: Router, private agendaService: AgendaService, private location: Location) { }

  ngOnInit(): void { }
  dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  isLogin(): boolean {
    return "/login" == this.location.path()
  }

  volverCalendario() {
    this.router.navigateByUrl('/agenda')
  }

  logout() {
    this.loginService.logout()
    this.router.navigateByUrl('/login')
    this.dropdownOpen = false
  }

  perfil() {
    this.usuarioService.perfilVolver = this.location.path()
    this.router.navigateByUrl('/editUsuarioPerfil')
    this.dropdownOpen = false
  }
  empresa(){
    this.router.navigateByUrl('/abmEmpresa')
    this.dropdownOpen = false
  }
  //esto hace que se ponga el false el dropdown cuando clickeas fuera
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.dropdownOpen) {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown') && !target.closest('.dropdown-toggle')) {
        this.dropdownOpen = false;
      }
    }
  }
}
