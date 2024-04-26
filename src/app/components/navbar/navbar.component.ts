import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda.service';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private agendaService: AgendaService, private location: Location) { }
  
  ngOnInit(): void {}
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
  }

  perfil() {
    // cuando este colocar aqui.
  }

 
}
