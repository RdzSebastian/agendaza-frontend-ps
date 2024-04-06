import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import esLocale from '@fullcalendar/core/locales/es';
import { mostrarErrorConMensaje } from 'src/util/errorHandler';
import { AgendaService } from 'src/app/services/agenda.service';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor(private agendaService : AgendaService, private router : Router, private eventoService : EventoService) { }
  
  eventos: EventInput[] = []

  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      bootstrap5Plugin,
      interactionPlugin
    ],
    dateClick: this.handleDateClick.bind(this),
    themeSystem: 'bootstrap5',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    initialView: 'dayGridMonth',
    locale: 'es',
    locales : [esLocale],
  }

  async ngOnInit() {
    try {
      this.eventos = await this.agendaService.getAllEventosForAgendaByEmpresaId(this.agendaService.getEmpresaId())
      
      this.calendarOptions.events = this.eventos

    } catch (error) {
      mostrarErrorConMensaje(this, error)
    }
  }

  handleDateClick(arg: { dateStr: string; }) {
    this.eventoService.fechaFiltroForAbmEvento = arg.dateStr
    this.router.navigateByUrl("/abmEvento")
  }

}
