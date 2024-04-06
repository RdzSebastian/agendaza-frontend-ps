import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Extra } from 'src/app/model/Extra';
import { GenericItem } from 'src/app/model/GenericItem';
import { ExtraService } from 'src/app/services/extra.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { ErrorMensaje } from 'src/util/errorHandler';

@Component({
  selector: 'app-save-extra-catering',
  templateUrl: './save-extra-catering.component.html',
})
export class SaveExtraCateringComponent implements OnInit {

  extra = new Extra(0, "", "TIPO_CATERING", 0,[],0)
  listaTipoExtra : Array<string> = []
  errors = []
  error : ErrorMensaje = new ErrorMensaje(false, '')
  listaTipoEvento : Array<GenericItem> = []

  constructor(private extraService : ExtraService, private tipoEventoService : TipoEventoService, private router : Router) { }

  async ngOnInit(): Promise<void> {
    this.listaTipoExtra = await this.extraService.getAllCateringTipoExtra()

    if(this.extraService.extraId){
      this.extra = await this.extraService.getExtra(this.extraService.extraId)
      this.extraService.extraId = 0
    }
    this.listaTipoEvento = await this.tipoEventoService.getAllTipoEventoByEmpresaId()
  }

  async save(){
    const item = await this.extraService.save(this.extra)
    this.router.navigateByUrl('/abmExtraCatering')
  }

  volver(){
    this.router.navigateByUrl('/abmExtraCatering')
  }

  onCheckboxChange(event: any){
    if (event.target.checked) {
      this.extra.listaTipoEventoId.push(Number(event.target.value))
    } else {
      _.pull(this.extra.listaTipoEventoId, Number(event.target.value))
    }
  }

  isChecked(id : number){
    if(this.extra.listaTipoEventoId != undefined){
      return this.extra.listaTipoEventoId.find(it => it == id)
    }
    return false
  }
}