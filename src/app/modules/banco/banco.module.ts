import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CajaComponent } from './caja/caja.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { InformesComponent } from './informes/informes.component';
import { FormsModule } from '@angular/forms';
import { TransaccionComponent } from './transaccion/transaccion.component';

const routes: Routes = [
  { path: '', component: CajaComponent },
  { path: 'crear-cuenta', component: CrearCuentaComponent },
  { path: 'transaccion', component: TransaccionComponent },
  { path: 'informes', component: InformesComponent },
];

@NgModule({
  declarations: [
    CajaComponent,
    CrearCuentaComponent,
    InformesComponent,
    TransaccionComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class BancoModule {}
