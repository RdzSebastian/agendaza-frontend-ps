import { Component, OnInit } from '@angular/core';
import { Capacidad } from 'src/app/model/Capacidad';
import { EventoVer } from 'src/app/model/Evento';
import { Cliente, UsuarioAbm} from 'src/app/model/Usuario';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
})
export class VerClienteComponent implements OnInit {

  evento : EventoVer = new EventoVer(0,"", "","","", "",new Capacidad(0,0,0),0,
  0,[],[],"",[],[], new Cliente(0,"","","","",0),0, new UsuarioAbm(0,"",""),"","", "")

  cliente = ""
  eventos: Array<any> = []
  cantidadEventos = 0

  constructor(private eventoService : EventoService, private agendaService : AgendaService, private usuarioService: UsuarioService , private router : Router) { }


  async ngOnInit() {
    this.evento = await this.eventoService.getEventoVer()
    this.eventos = await this.usuarioService.getEventosByUsuarioAndEmpresa(this.evento.cliente.id)
    this.cantidadEventos = await this.usuarioService.getCantEventosByUsuarioAndEmpresa(this.evento.cliente.id)

    this.cliente = this.evento.cliente.nombre + " " + this.evento.cliente.apellido
  }

  volver(eventoId: number){
    this.eventoService.eventoId = eventoId
    this.router.navigateByUrl("/verEvento")
  }

  masDe10Eventos(): Boolean {
    return this.cantidadEventos > 10
  }

}
