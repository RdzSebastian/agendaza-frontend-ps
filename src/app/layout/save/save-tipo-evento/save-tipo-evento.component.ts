import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacidad } from 'src/app/model/Capacidad';
import { TipoEvento } from 'src/app/model/TipoEvento';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';

@Component({
  selector: 'app-save-tipo-evento',
  templateUrl: './save-tipo-evento.component.html',
})
export class SaveTipoEventoComponent implements OnInit {

  tipoEvento : TipoEvento = new TipoEvento(0,"","","CORTO",new Capacidad(0,0,0), 0)
  listaDuracion : Array<string> = []

  constructor(private tipoEventoService : TipoEventoService, private router : Router) { }
  
  async ngOnInit() {
    if(this.tipoEventoService.tipoEventoId != 0){
      this.tipoEvento = await this.tipoEventoService.getTipoEvento(this.tipoEventoService.tipoEventoId)
      this.tipoEventoService.tipoEventoId = 0
    }
    this.listaDuracion = await this.tipoEventoService.getAllDuracion()
  }

  async save(){
    const item = await this.tipoEventoService.save(this.tipoEvento)
    this.router.navigateByUrl('/abmTipoEvento')
  }

  volver(){
    this.router.navigateByUrl('/abmTipoEvento')
  }

}
