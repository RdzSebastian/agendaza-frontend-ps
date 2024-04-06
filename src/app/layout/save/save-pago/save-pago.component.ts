import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pago } from 'src/app/model/Pago';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EventoService } from 'src/app/services/evento.service';
import { PagoService } from 'src/app/services/pago.service';
import { ErrorMensaje, mostrarErrorConMensaje } from 'src/util/errorHandler';

@Component({
  selector: 'app-save-pago',
  templateUrl: './save-pago.component.html',
})
export class SavePagoComponent implements OnInit {

  pago = new Pago(0, 0, "", "", "", new Date(0,0,0,0,0,0))
  codigo : string = ""
  listaMedioDePago : Array<string> = []
  errors = []
  error : ErrorMensaje = new ErrorMensaje(false, '')
  botonBuscarDisabled : boolean = false 

  constructor(private pagoService : PagoService, private eventoService : EventoService, private router : Router) { }

  async ngOnInit(): Promise<void> {
    this.listaMedioDePago = await this.pagoService.getAllMedioDePago()

    if(this.eventoService.eventoCodigo != ""){
      this.codigo = this.eventoService.eventoCodigo
      this.eventoService.eventoCodigo = ""
      this.buscar()
      this.botonBuscarDisabled = true
    }
  }

  async buscar(){

    try {
      this.pago = await this.pagoService.getEventoForPago(this.codigo)
      this.pago.medioDePago = "TRANSFERENCIA"
      this.error.condicional = false
    } catch (error) {
      this.pago = new Pago(0, 0, "", "", "", new Date(0,0,0,0,0,0))
      this.error.condicional = true

      mostrarErrorConMensaje(this, error)
      this.errors.forEach(error => { this.error.mensaje = error })
    }
  }

  async save(){
    const item = await this.pagoService.save(this.pago)
    this.router.navigateByUrl('/abmPago')
  }

  volver(){
    this.router.navigateByUrl('/abmPago')
  }
}
