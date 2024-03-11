import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteDTO } from 'src/app/models/cliente.model';
import { CuentaDTO } from 'src/app/models/cuenta.model';
import { MovimientoDTO } from 'src/app/models/movimiento.model';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss'],
})
export class CajaComponent implements OnInit {
  cliente: ClienteDTO = {};

  listaCuentas: CuentaDTO[] = [];

  listaMovimientos: MovimientoDTO[] = [];

  cuentaSeleccionada: CuentaDTO = {};

  constructor(private sharedService: SharedService, private router: Router) {}

  // ----------------------------------------------------------------

  ngOnInit() {
    this.generarCuentasDeEjemplo();

    for (let i = 0; i < 2; i++) {
      const movimiento = this.generarMovimiento();
      this.listaMovimientos.push(movimiento);
    }

    this.cliente.id = 12;
  }

  generarCuentasDeEjemplo() {
    for (let i = 1; i <= 1; i++) {
      const cuenta: CuentaDTO = {
        id: i,
        numeroCuenta: '3123232132312321' + i,
        idTipoCuenta: '1',
        tipoCuenta: 'Cuenta Corriente',
        saldo: 1000.0 * i,
        idCliente: 1,
        idCiudad: 1,
        descCiudad: 'Ciudad Ejemplo',
      };

      this.listaCuentas.push(cuenta);
    }
  }

  generarFechaAleatoria(): string {
    const fecha = new Date();
    fecha.setFullYear(fecha.getFullYear() - Math.floor(Math.random() * 5));
    fecha.setMonth(Math.floor(Math.random() * 12));
    fecha.setDate(Math.floor(Math.random() * 28) + 1);
    return fecha.toISOString();
  }

  generarObservacionAleatoria(): string {
    const observaciones = [
      'Compra en línea',
      'Retiro de efectivo',
      'Depósito',
      'Transferencia',
      'Pago de factura',
    ];
    return observaciones[Math.floor(Math.random() * observaciones.length)];
  }

  generarMovimiento(): MovimientoDTO {
    return {
      id: Math.floor(Math.random() * 1000) + 1,
      idCuenta: Math.floor(Math.random() * 100) + 1,
      idTipoMovimiento: Math.floor(Math.random() * 5) + 1,
      tipoMovimiento: Math.random() > 0.5 ? 'Consignación' : 'Retiro',
      fechaCreacion: this.generarFechaAleatoria(),
      valor: Math.random() * 1000,
      observacion: this.generarObservacionAleatoria(),
      idCiudad: Math.floor(Math.random() * 10) + 1,
      descCiudad: `Ciudad ${Math.floor(Math.random() * 5) + 1}`,
    };
  }

  // ----------------------------------------------------------------

  mostrarMovimientos(cuenta: CuentaDTO) {
    this.cuentaSeleccionada = cuenta;
    this.sharedService.setIdCuenta(this.cuentaSeleccionada.id!);
    alert(`Cuenta seleccionada: ${cuenta.numeroCuenta}`);
  }

  redireccionarCrearCuenta() {
    this.sharedService.setIdCliente(this.cliente.id!);
    this.router.navigate(['banco/crear-cuenta']);
  }

  redireccionarCrearTransaccion(event: Event, cuenta: CuentaDTO) {
    event.stopPropagation();
    this.sharedService.setIdCuenta(cuenta.id!);
    this.router.navigate(['banco/transaccion']);
  }

  redireccionarInformes() {
    this.router.navigate(['banco/informes']);
  }
}
