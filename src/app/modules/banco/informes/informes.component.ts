import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { InformeDTO } from 'src/app/models/informe.model';
import { MovimientoDTO } from 'src/app/models/movimiento.model';
import { InformeService } from 'src/app/services/informe.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss'],
})
export class InformesComponent implements OnInit {
  idCuenta: number = 0;

  listaMeses: any[] = [
    { id: 1, descripcion: 'Enero' },
    { id: 2, descripcion: 'Febrero' },
    { id: 3, descripcion: 'Marzo' },
    { id: 4, descripcion: 'Abril' },
    { id: 5, descripcion: 'Mayo' },
    { id: 6, descripcion: 'Junio' },
    { id: 7, descripcion: 'Julio' },
    { id: 8, descripcion: 'Agosto' },
    { id: 9, descripcion: 'Septiembre' },
    { id: 10, descripcion: 'Octubre' },
    { id: 11, descripcion: 'Noviembre' },
    { id: 12, descripcion: 'Diciembre' },
  ];

  mes: number = 0;
  year: number = 2024;

  listaExtractos: MovimientoDTO[] = [];

  listaInformeTransacciones: InformeDTO[] = [];

  listaInformeRetiros: InformeDTO[] = [];

  constructor(
    private informeService: InformeService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sharedService.getIdCuenta().subscribe((id) => (this.idCuenta = id));

    if (!this.idCuenta || this.idCuenta == 0) {
      alert('Por favor, selecciona una cuenta antes de realizar consultas.');
      this.router.navigate(['banco']);
    }
  }

  generarExtracto() {
    if (!this.mes || this.mes == 0) {
      alert('Por favor seleccione el mes');
    } else {
      if (!this.year || this.year == 0) {
        this.year = 2024;
      }

      this.informeService
        .obtenerInformeExtractos(this.idCuenta, this.mes, this.year)
        .pipe(
          tap((data) => {
            if (data) {
              this.listaExtractos = data;
            }
          }),
          catchError((error) => {
            if (error && error.error) {
              alert(error.error);
            } else {
              alert(
                'Se produjo un error al obtener extracto. Por favor, inténtelo de nuevo.'
              );
            }
            return of(null);
          })
        )
        .subscribe();
    }
  }

  generarInformeTransacciones() {
    if (!this.mes || this.mes == 0) {
      alert('Por favor seleccione el mes');
    } else {
      if (!this.year || this.year == 0) {
        this.year = 2024;
      }

      this.informeService
        .obtenerInformeTransacciones(this.mes, this.year)
        .pipe(
          tap((data) => {
            if (data) {
              this.listaInformeTransacciones = data;
            }
          }),
          catchError((error) => {
            if (error && error.error) {
              alert(error.error);
            } else {
              alert(
                'Se produjo un error al obtener informe. Por favor, inténtelo de nuevo.'
              );
            }
            return of(null);
          })
        )
        .subscribe();
    }
  }

  generarInformeRetiros() {
    this.informeService
      .obtenerInformeRetiros()
      .pipe(
        tap((data) => {
          if (data) {
            this.listaInformeRetiros = data;
          }
        }),
        catchError((error) => {
          if (error && error.error) {
            alert(error.error);
          } else {
            alert(
              'Se produjo un error al obtener informe. Por favor, inténtelo de nuevo.'
            );
          }
          return of(null);
        })
      )
      .subscribe();
  }
}
