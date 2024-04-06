import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrecioForm } from 'src/app/model/Precio';
import { ExtraService } from 'src/app/services/extra.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-precio-extra',
  templateUrl: './precio-extra.component.html',
})
export class PrecioExtraComponent implements OnInit {

  id : number = 0
  listaPrecio : Array<PrecioForm> = []
  listaPrecioCurrent : Array<PrecioForm> = []
  listaPrecioNext : Array<PrecioForm> = []
  currentYear = new Date().getFullYear()

  constructor(private extraService : ExtraService, private router : Router, private location : Location) { }

  async ngOnInit(): Promise<void> {
      const listaPrecio = await this.extraService.getAllPrecioConFechaByExtraId(this.extraService.extraId)
      
      if(listaPrecio.length != 0){
        this.listaPrecio = listaPrecio
        listaPrecio.forEach(it => it.year == this.currentYear && this.listaPrecioCurrent.push(it))
        listaPrecio.forEach(it => it.year == this.currentYear + 1 && this.listaPrecioNext.push(it))
      }
  }

  volver(){
    this.router.navigateByUrl("/" + this.extraService.extraVolver)
  }

  async save(){
    const item = await this.extraService.savePrecio([...this.listaPrecioCurrent, ...this.listaPrecioNext])
    this.router.navigateByUrl("/" + this.extraService.extraVolver)
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
