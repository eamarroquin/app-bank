import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CuentaDTO } from '../models/cuenta.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CuentaService {
  private static BASE_URL = environment.API_STREAMING + '/banco/';

  private static GET_CUENTAS =
    CuentaService.BASE_URL + 'cliente/{idCliente}/cuenta';
  private static POST_CUENTA =
    CuentaService.BASE_URL + 'cliente/{idCliente}/cuenta';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  obtenerCuentasByCliente(idCliente: number): Observable<CuentaDTO[]> {
    let url = CuentaService.GET_CUENTAS.replace(
      '{idCliente}',
      idCliente.toString()
    );

    const token = this.localStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<CuentaDTO[]>(url, { headers });
  }

  registarCuenta(idCliente: number, cuenta: CuentaDTO): Observable<CuentaDTO> {
    let url = CuentaService.POST_CUENTA.replace(
      '{idCliente}',
      idCliente.toString()
    );

    const token = this.localStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post(url, cuenta, { headers });
  }
}
