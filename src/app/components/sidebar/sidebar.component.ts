import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private agendaService: AgendaService, private location: Location) { }

  ngOnInit(): void { }

  isSidebarActive: boolean = false;

  isLogin(): boolean {
    return "/login" == this.location.path()
  }

  saveEvento() {
    this.router.navigateByUrl('/saveEvento')
  }

  volverAgendas() {
    this.agendaService.removeEmpresaId()
    this.router.navigateByUrl('/')
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
