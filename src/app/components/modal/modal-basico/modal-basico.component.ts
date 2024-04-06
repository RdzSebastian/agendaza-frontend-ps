import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-basico',
  templateUrl: './modal-basico.component.html'
})
export class ModalBasicoComponent implements OnInit {

  @Input()
  modal = false

  @Input()
  titulo = ""
  
  @Input()
  cuerpo = ""
  
  @Input()
  boton = ""

  @Output() 
  outputAceptar = new EventEmitter<number>();

  @Output() 
  outputChangeModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  changeModal(){
    this.modal = !this.modal
    this.outputChangeModal.emit(this.modal)
  }

  aceptar(){
    this.outputAceptar.emit();
    this.changeModal()
  }

}
