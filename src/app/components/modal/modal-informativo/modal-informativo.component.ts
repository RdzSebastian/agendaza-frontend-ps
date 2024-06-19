import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-informativo',
  templateUrl: './modal-informativo.component.html',
  styleUrls: ['./modal-informativo.component.css']
})
export class ModalInformativoComponent implements OnInit {

  constructor(public router : Router) {}

  @ViewChild('modal') 
  modal!: ElementRef;

  @Output() 
  outputAceptar = new EventEmitter<number>();

  ngOnInit(): void {
  }

  mostrarModal(){
    this.modal.nativeElement.click();
  }

  volverHome() {
    this.router.navigateByUrl('/')
  }

}
