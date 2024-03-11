import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CiudadDTO } from '../models/ciudad.model';
import { TipoCuentaDTO } from '../models/tipo-cuenta.model';
import { TipoMovimientoDTO } from '../models/tipo-movimiento.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private static BASE_URL = environment.API_STREAMING;

  private static GET_CIUDADES = GeneralService.BASE_URL + '/ciudad';

  private static GET_TIPOS_CUENTA = GeneralService.BASE_URL + '/tipo-de-cuenta';

  private static GET_TIPOS_MOVIMIENTO =
    GeneralService.BASE_URL + '/tipo-de-movimiento';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  obtenerCiudades(): Observable<CiudadDTO[]> {
    const token = this.localStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<CiudadDTO[]>(GeneralService.GET_CIUDADES, { headers });
  }

  obtenerTiposCuenta(): Observable<TipoCuentaDTO[]> {
    const token = this.localStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<TipoCuentaDTO[]>(GeneralService.GET_TIPOS_CUENTA, {
      headers,
    });
  }

  obtenerTiposMovimiento(): Observable<TipoMovimientoDTO[]> {
    const token = this.localStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<TipoMovimientoDTO[]>(
      GeneralService.GET_TIPOS_MOVIMIENTO,
      { headers }
    );
  }
}
