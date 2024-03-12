import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InformeDTO } from '../models/informe.model';
import { MovimientoDTO } from '../models/movimiento.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class InformeService {
  private static BASE_URL = environment.API_BANK + '/banco/informes/';

  private static GET_EXTRACTOS =
    InformeService.BASE_URL + 'extracto/cuenta/{idCuenta}';

  private static GET_TRANSACCIONES_CLIENTE =
    InformeService.BASE_URL + 'transacciones-por-cliente';

  private static GET_RETIROS =
    InformeService.BASE_URL + 'transacciones-retiros';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  obtenerInformeExtractos(
    idCuenta: number,
    mes: number,
    year: number
  ): Observable<MovimientoDTO[]> {
    let url = InformeService.GET_EXTRACTOS.replace(
      '{idCuenta}',
      idCuenta.toString()
    );

    let params = new HttpParams();
    params = params.set('mes', mes);
    params = params.set('year', year);

    const token = this.localStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<MovimientoDTO[]>(url, { params, headers });
  }

  obtenerInformeTransacciones(
    mes: number,
    year: number
  ): Observable<InformeDTO[]> {
    let params = new HttpParams();
    params = params.set('mes', mes);
    params = params.set('year', year);

    const token = this.localStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<InformeDTO[]>(
      InformeService.GET_TRANSACCIONES_CLIENTE,
      { params, headers }
    );
  }

  obtenerInformeRetiros(): Observable<InformeDTO[]> {
    const token = this.localStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<InformeDTO[]>(InformeService.GET_RETIROS, { headers });
  }
}
