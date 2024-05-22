import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanelAdmin as PanelAdmin } from 'src/app/model/Configuracion';
import { Empresa } from 'src/app/model/Empresa';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
})
export class PanelAdminComponent implements OnInit {

  configuracion = new PanelAdmin(0,0,0,0,0,0,0,0,0)
  empresa = new Empresa(0,"")

  constructor(private configuracionService : ConfiguracionService, public empresaService : EmpresaService, private router : Router) { }

  async ngOnInit(): Promise<void> {
    this.empresa = await this.empresaService.getEmpresa()

    this.configuracion = await this.configuracionService.getAllCantidadesForPanelAdminByEmpresaId()
  }

  abmUsuario(){
    this.router.navigateByUrl('/abmUsuario')
  }

  abmEvento() {
     this.router.navigateByUrl('/abmEvento')
  }

  abmExtra() {
    this.router.navigateByUrl('/abmExtraEvento')
  }

  abmCatering() {
    this.router.navigateByUrl('/abmExtraCatering')
  }

  abmServicio() {
    this.router.navigateByUrl('/abmServicio')
  }

  abmEmpresa() {
    this.router.navigateByUrl('/abmEmpresa')
  }

  abmTipoEvento() {
    this.router.navigateByUrl('/abmTipoEvento')
  }

  abmPago() {
    this.router.navigateByUrl('/abmPago')
  }

  abmCliente() {
    this.router.navigateByUrl('/abmCliente')
  }

  volverCalendario(){
    this.router.navigateByUrl('/agenda')
  }
}
