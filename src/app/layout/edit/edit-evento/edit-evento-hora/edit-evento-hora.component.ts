import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateUtil } from 'src/app/model/DateUtil';
import { EventoHora } from 'src/app/model/Evento';
import { Time } from 'src/app/model/Time';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-edit-evento-hora',
  templateUrl: './edit-evento-hora.component.html',
})
export class EditEventoHoraComponent implements OnInit {

  evento : EventoHora = new EventoHora(0,"","","","")
  listaHora : Array<string> = DateUtil.ListaHora
  listaMinuto : Array<string> = DateUtil.ListaMinuto
  inicio : Time = new Time("00","00")
  fin : Time = new Time("00","00")
  hastaElOtroDiaCheckbox : boolean = false

  fechaInicio : Date = new Date()
  fechaFin : Date = new Date()

  constructor(private eventoService : EventoService, private router : Router) { }

  async ngOnInit() {
    this.evento = await this.eventoService.getEventoHora()

    this.inicio.hour = this.evento.inicio.split(":")[0].split("T")[1]
    this.inicio.minute = this.evento.inicio.split(":")[1]

    this.fin.hour = this.evento.fin.split(":")[0].split("T")[1]
    this.fin.minute = this.evento.fin.split(":")[1]
    
    this.fechaInicio = new Date(this.evento.inicio)
    this.fechaFin = new Date(this.evento.fin)

    this.hastaElOtroDiaCheckbox = this.fechaInicio.getDate() < this.fechaFin.getDate()

  }

  volver(){
    this.router.navigateByUrl("/abmEvento")
  }

  save(){

    this.evento.inicio =  new Date(this.fechaInicio.getFullYear(), this.fechaInicio.getMonth(), this.fechaInicio.getDate(), (Number(this.inicio.hour) - 3), Number(this.inicio.minute)).toISOString()
    var fechaFinal =  new Date(this.fechaInicio.getFullYear(), this.fechaInicio.getMonth(), this.fechaInicio.getDate(), (Number(this.fin.hour) - 3), Number(this.fin.minute))

    if(this.hastaElOtroDiaCheckbox && this.fechaInicio.getDate() == this.fechaFin.getDate()){
      fechaFinal.setDate(fechaFinal.getDate() + 1)
    }

    this.evento.fin = fechaFinal.toISOString()

    this.eventoService.editEventoHora(this.evento)
    this.router.navigateByUrl("/abmEvento")
  }

}
