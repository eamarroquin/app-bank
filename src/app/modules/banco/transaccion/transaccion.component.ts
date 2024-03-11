import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { CiudadDTO } from 'src/app/models/ciudad.model';
import { MovimientoDTO } from 'src/app/models/movimiento.model';
import { TipoMovimientoDTO } from 'src/app/models/tipo-movimiento.model';
import { GeneralService } from 'src/app/services/general.service';
import { MovimientoService } from 'src/app/services/movimiento.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.scss'],
})
export class TransaccionComponent implements OnInit {

  listaTipos: TipoMovimientoDTO[] = [];

  listaCiudades: CiudadDTO[] = [];

  movimiento: MovimientoDTO = {};

  constructor(
    private movimientoService: MovimientoService,
    private generalService: GeneralService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sharedService
      .getIdCuenta()
      .subscribe((id) => (this.movimiento.idCuenta = id));

    if (!this.movimiento.idCuenta) {
      alert(
        'Por favor, selecciona una cuenta antes de realizar una transacción.'
      );
      this.router.navigate(['banco']);
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
      .obtenerTiposMovimiento()
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
            alert('Se produjo un error al cargar tipos de movimiento. Por favor, inténtelo de nuevo.');
          }
          return of(null);
        })
      )
      .subscribe();
  }

  realizarTransaccion() {
    this.movimientoService
      .registrarMovimiento(this.movimiento.idCuenta!, this.movimiento)
      .pipe(
        tap((data) => {
          alert('¡Transacción registrada correctamente!');
          this.router.navigateByUrl('/banco');
        }),
        catchError((error) => {
          if (error && error.error) {
            alert(error.error);
          } else {
            alert('Se produjo un error al realizar transacción. Por favor, inténtelo de nuevo.');
          }
          return of(null);
        })
      )
      .subscribe();
  }
}
