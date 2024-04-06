import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PrecioForm } from 'src/app/model/Precio';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';

@Component({
  selector: 'app-precio-tipo-evento',
  templateUrl: './precio-tipo-evento.component.html',
})
export class PrecioTipoEventoComponent implements OnInit {

  id : number = 0
  listaPrecio : Array<PrecioForm> = []
  listaPrecioCurrent : Array<PrecioForm> = []
  listaPrecioNext : Array<PrecioForm> = []
  currentYear = new Date().getFullYear()

  constructor(private tipoEventoService : TipoEventoService, private router : Router) { }

  async ngOnInit(): Promise<void> {
      const listaPrecio = await this.tipoEventoService.getAllPrecioConFechaByTipoEventoId(this.tipoEventoService.tipoEventoId)
      
      if(listaPrecio.length != 0){
        this.listaPrecio = listaPrecio
        listaPrecio.forEach(it => it.year == this.currentYear && this.listaPrecioCurrent.push(it))
        listaPrecio.forEach(it => it.year == this.currentYear + 1 && this.listaPrecioNext.push(it))
      }
  }

  volver(){
    this.router.navigateByUrl('/abmTipoEvento')
  }

  async save(){
    const item = await this.tipoEventoService.savePrecio([...this.listaPrecioCurrent, ...this.listaPrecioNext])
    this.router.navigateByUrl('/abmTipoEvento')
  }

  agregarPrecioCurrent(){
    this.id -=1
    this.listaPrecioCurrent.push(new PrecioForm(this.id,this.currentYear,0,0,0))
  }

  agregarPrecioNext(){
    this.id -=1
    this.listaPrecioNext.push(new PrecioForm(this.id,this.currentYear + 1,0,0,0))
  }

  quitarPrecio(id : number){
    this.listaPrecio = [...this.listaPrecioCurrent, ...this.listaPrecioNext]
    this.listaPrecio = this.listaPrecio.filter(precio => precio.id !== id)
    this.listaPrecioCurrent = []
    this.listaPrecioNext = []

    this.listaPrecio.forEach(it => it.year == this.currentYear && this.listaPrecioCurrent.push(it))
    this.listaPrecio.forEach(it => it.year == this.currentYear + 1 && this.listaPrecioNext.push(it))
  }

}
