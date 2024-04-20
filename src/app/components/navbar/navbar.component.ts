import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda.service';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private agendaService: AgendaService, private location: Location) { }

  ngOnInit(): void { }

  isSidebarActive: boolean = false;

  logout() {
    this.loginService.logout()
    this.router.navigateByUrl('/login')
  }

  saveEvento() {
    this.router.navigateByUrl('/saveEvento')
  }

  volverAgendas() {
    this.agendaService.removeEmpresaId()
    this.router.navigateByUrl('/')
  }

  isLogin(): boolean {
    return "/login" == this.location.path()
  }

  isAgenda(): boolean {
    return "/agenda" == this.location.path()
  }

  isInAgenda(): boolean {
    return this.agendaService.getEmpresaId() != ""
  }

  isSaveEvento(): boolean {
    return "/saveEvento" == this.location.path()
  }

  isPanelAdmin(): boolean {
    return "/panelAdmin" == this.location.path()
  }

  isAbm(): boolean {
    return "/abm" == this.location.path().substring(0, 4)
  }

  /*nuevoAbm() {
    this.router.navigateByUrl('/save' + this.location.path().substring(4, this.location.path().length + 1))
  }*/

  volverCalendario() {
    this.router.navigateByUrl('/agenda')
  }

  panelAdmin() {
    this.router.navigateByUrl('/panelAdmin')
  }


  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isSidebarActive) {
      const target = event.target as HTMLElement;
      if (!target.closest('#sidebar') && !target.closest('.btn')) {
        this.isSidebarActive = false;
      }
    }
  }
}
