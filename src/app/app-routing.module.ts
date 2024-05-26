import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { AbmExtraCateringComponent } from './layout/abm/abm-extra-catering/abm-extra-catering.component';
import { AbmClienteComponent } from './layout/abm/abm-cliente/abm-cliente.component';
import { AbmEmpresaComponent } from './layout/abm/abm-empresa/abm-empresa.component';
import { AbmEventoComponent } from './layout/abm/abm-evento/abm-evento.component';
import { AbmExtraEventoComponent } from './layout/abm/abm-extra-evento/abm-extra-evento.component';
import { AbmPagoComponent } from './layout/abm/abm-pago/abm-pago.component';
import { AbmServicioComponent } from './layout/abm/abm-servicio/abm-servicio.component';
import { AbmTipoEventoComponent } from './layout/abm/abm-tipo-evento/abm-tipo-evento.component';
import { AbmUsuarioComponent } from './layout/abm/abm-usuario/abm-usuario.component';
import { AgendaComponent } from './layout/agenda/agenda.component';
import { PanelAdminComponent } from './layout/panel-admin/panel-admin.component';
import { EditEmpresaComponent } from './layout/edit/edit-empresa/edit-empresa.component';
import { EditUsuarioPasswordComponent } from './layout/edit/edit-usuario-password/edit-usuario-password.component';
import { EditUsuarioComponent } from './layout/edit/edit-usuario/edit-usuario.component';
import { LoginComponent } from './layout/login/login.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { SaveEventoComponent } from './layout/save/save-evento/save-evento.component';
import { SaveClienteComponent } from './layout/save/save-cliente/save-cliente.component';
import { SaveEmpresaComponent } from './layout/save/save-empresa/save-empresa.component';
import { SaveExtraEventoComponent } from './layout/save/save-extra-evento/save-extra-evento.component';
import { SavePagoComponent } from './layout/save/save-pago/save-pago.component';
import { SaveServicioComponent } from './layout/save/save-servicio/save-servicio.component';
import { SaveTipoEventoComponent } from './layout/save/save-tipo-evento/save-tipo-evento.component';
import { SaveUsuarioComponent } from './layout/save/save-usuario/save-usuario.component';
import { SeleccionarAgendaComponent } from './layout/seleccionar-agenda/seleccionar-agenda.component';
import { SaveExtraCateringComponent } from './layout/save/save-extra-catering/save-extra-catering.component';
import { PrecioExtraComponent } from './layout/precio/precio-extra/precio-extra.component';
import { PrecioTipoEventoComponent } from './layout/precio/precio-tipo-evento/precio-tipo-evento.component';
import { EditEventoPagosComponent } from './layout/edit/edit-evento/edit-evento-pagos/edit-evento-pagos.component';
import { EditEventoExtrasComponent } from './layout/edit/edit-evento/edit-evento-extras/edit-evento-extras.component';
import { EditEventoCateringComponent } from './layout/edit/edit-evento/edit-evento-catering/edit-evento-catering.component';
import { EditEventoHoraComponent } from './layout/edit/edit-evento/edit-evento-hora/edit-evento-hora.component';
import { VerEventoComponent } from './layout/ver/ver-evento/ver-evento.component';
import { VerClienteComponent } from './layout/ver/ver-cliente/ver-cliente.component';
import { EditEmpleadoCargoComponent } from './layout/edit/edit-cargo-empleado/edit-cargo-empleado.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    // canActivate:[AuthGuard],
    children: [
      { path : '', component: SeleccionarAgendaComponent },
      { path : 'agenda', component: AgendaComponent },
      { path : 'panelAdmin', component: PanelAdminComponent },
      { path : 'abmUsuario', component: AbmUsuarioComponent },
      { path : 'abmEvento', component: AbmEventoComponent },
      { path : 'abmTipoEvento', component: AbmTipoEventoComponent },
      { path : 'abmServicio', component: AbmServicioComponent },
      { path : 'abmExtraEvento', component: AbmExtraEventoComponent },
      { path : 'abmExtraCatering', component: AbmExtraCateringComponent },
      { path : 'abmCliente', component: AbmClienteComponent },
      { path : 'abmPago', component: AbmPagoComponent },
      { path : 'abmEmpresa', component: AbmEmpresaComponent },
      { path : 'saveEvento', component: SaveEventoComponent },
      { path : 'saveUsuario', component: SaveUsuarioComponent },
      { path : 'saveTipoEvento', component: SaveTipoEventoComponent },
      { path : 'saveServicio', component: SaveServicioComponent },
      { path : 'saveExtraEvento', component: SaveExtraEventoComponent },
      { path : 'saveExtraCatering', component: SaveExtraCateringComponent },
      { path : 'saveCliente', component: SaveClienteComponent },
      { path : 'savePago', component: SavePagoComponent },
      { path : 'saveEmpresa', component: SaveEmpresaComponent },
      { path : 'editUsuario', component: EditUsuarioComponent },
      { path : 'editUsuarioPassword', component: EditUsuarioPasswordComponent },
      { path : 'editEmpresa', component: EditEmpresaComponent },
      { path : 'editEmpresa', component: EditEmpresaComponent },
      { path : 'precioTipoEvento', component: PrecioTipoEventoComponent },
      { path : 'precioExtra', component: PrecioExtraComponent },
      { path : 'editEventoPagos', component: EditEventoPagosComponent },
      { path : 'editEventoExtras', component: EditEventoExtrasComponent },
      { path : 'editEventoCatering', component: EditEventoCateringComponent },
      { path : 'editEventoHora', component: EditEventoHoraComponent },
      { path : 'verEvento', component: VerEventoComponent },
      { path : 'verCliente', component: VerClienteComponent },
      { path : 'editCargoEmpleado', component: EditEmpleadoCargoComponent},
      { path: '**', component: NotFoundComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
