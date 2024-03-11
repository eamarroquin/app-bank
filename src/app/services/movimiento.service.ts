import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovimientoDTO } from '../models/movimiento.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MovimientoService {
  private static BASE_URL = environment.API_STREAMING + '/banco/';

  private static GET_MOVIMIENTOS =
    MovimientoService.BASE_URL + 'cuenta/{idCuenta}/movimientos';
  private static POST_MOVIMIENTO =
    MovimientoService.BASE_URL + 'cuenta/{idCuenta}/movimientos';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  obtenerMovimientosByCuenta(idCuenta: number): Observable<MovimientoDTO[]> {
    let url = MovimientoService.GET_MOVIMIENTOS.replace(
      '{idCuenta}',
      idCuenta.toString()
    );

    const token = this.localStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<MovimientoDTO[]>(url, { headers });
  }

  registrarMovimiento(
    idCuenta: number,
    movimiento: MovimientoDTO
  ): Observable<MovimientoDTO> {
    let url = MovimientoService.POST_MOVIMIENTO.replace(
      '{idCuenta}',
      idCuenta.toString()
    );

    const token = this.localStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post(url, movimiento, { headers });
  }
}
