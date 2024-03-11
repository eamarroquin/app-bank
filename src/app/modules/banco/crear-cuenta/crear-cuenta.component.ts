import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { CiudadDTO } from 'src/app/models/ciudad.model';
import { CuentaDTO } from 'src/app/models/cuenta.model';
import { TipoCuentaDTO } from 'src/app/models/tipo-cuenta.model';
import { CuentaService } from 'src/app/services/cuenta.service';
import { GeneralService } from 'src/app/services/general.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss'],
})
export class CrearCuentaComponent implements OnInit {
  listaTipos: TipoCuentaDTO[] = [];

  listaCiudades: CiudadDTO[] = [];

  cuenta: CuentaDTO = {};

  constructor(
    private cuentaService: CuentaService,
    private generalService: GeneralService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sharedService
      .getIdCliente()
      .subscribe((id) => (this.cuenta.idCliente = id));

      if (!this.cuenta.idCliente) {
        alert('Upps! Parece que no hay un usuario en sesión.');
        this.router.navigate(['auth/login']);
      }

    this.cargarTipos();
    this.cargarCiudades();
  }

  cargarCiudades() {
    this.generalService
      .obtenerCiudades()
      .pipe(
        tap((data) => {
          if (data) {
            this.listaCiudades = data;
          }
        }),
        catchError((error) => {
          if (error && error.error) {
            alert(error.error);
          } else {
            alert('Se produjo un error al cargar ciudades. Por favor, inténtelo de nuevo.');
          }
          return of(null);
        })
      )
      .subscribe();
  }

  cargarTipos() {
    this.generalService
      .obtenerTiposCuenta()
      .pipe(
        tap((data) => {
          if (data) {
            this.listaTipos = data;
          }
        }),
        catchError((error) => {
          if (error && error.error) {
            alert(error.error);
          } else {
            alert('Se produjo un error al cargar tipos de cuenta. Por favor, inténtelo de nuevo.');
          }
          return of(null);
        })
      )
      .subscribe();
  }

  crearCuenta() {
    this.cuentaService
      .registarCuenta(this.cuenta.idCliente!, this.cuenta)
      .pipe(
        tap((data) => {
          alert('¡Cuenta creada con éxito!. Número de cuenta:' + data.numeroCuenta);
          this.router.navigateByUrl('/banco');
        }),
        catchError((error) => {
          if (error && error.error) {
            alert(error.error);
          } else {
            alert('Se produjo un error al ergistar cuenta. Por favor, inténtelo de nuevo.');
          }
          return of(null);
        })
      )
      .subscribe();
  }
}
