import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { ClienteDTO } from 'src/app/models/cliente.model';
import { CuentaDTO } from 'src/app/models/cuenta.model';
import { MovimientoDTO } from 'src/app/models/movimiento.model';
import { CuentaService } from 'src/app/services/cuenta.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MovimientoService } from 'src/app/services/movimiento.service';
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

  constructor(
    private cuentaService: CuentaService,
    private movimientoService: MovimientoService,
    private localStorage: LocalStorageService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    const cliente = this.localStorage.getCliente();

    if (cliente !== null) {
      this.cliente = cliente;
    } else {
      alert(
        'Upps! Parece que no hay un usuario en sesión.'
      );
      this.router.navigate(['auth/login']);
    }

    this.cargarCuentas(this.cliente.id!);
    this.listaMovimientos = [];
    this.cuentaSeleccionada = {};
  }

  cargarCuentas(id: number) {
    this.cuentaService
      .obtenerCuentasByCliente(this.cliente.id!)
      .pipe(
        tap((data) => {
          if (data) {
            this.listaCuentas = data;
          }
        }),
        catchError((error) => {
          if (error && error.error) {
            alert(error.error);
          } else {
            alert(
              'Se produjo un error al cargar las cuentas del cliente. Por favor, inténtelo de nuevo.'
            );
          }
          return of(null);
        })
      )
      .subscribe();
  }

  mostrarMovimientos(cuenta: CuentaDTO) {
    this.listaMovimientos = [];

    this.cuentaSeleccionada = cuenta;
    this.sharedService.setIdCuenta(this.cuentaSeleccionada.id!);

    this.movimientoService
      .obtenerMovimientosByCuenta(this.cuentaSeleccionada.id!)
      .pipe(
        tap((data) => {
          if (data) {
            this.listaMovimientos = data;
          }
        }),
        catchError((error) => {
          if (error && error.error) {
            alert(error.error);
          } else {
            alert(
              'Se produjo un error al cargar movimientos de la cuenta. Por favor, inténtelo de nuevo.'
            );
          }
          return of(null);
        })
      )
      .subscribe();
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

  cerrarSesion() {
    this.localStorage.removerInfo();
    this.router.navigateByUrl('/auth/login');
  }
}
