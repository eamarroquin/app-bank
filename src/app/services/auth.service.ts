import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClienteDTO } from '../models/cliente.model';
import { LoginBody } from '../models/request/body-login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static BASE_URL = environment.API_STREAMING + "/auth/";

  private static SIGN_IN = AuthService.BASE_URL + 'sign-in';
  private static SIGN_UP = AuthService.BASE_URL + 'sign-up';

  private static USER_AUTH : string = 'USER_AUTH';

  constructor(private http: HttpClient) { }

  login(requestBody: LoginBody): Observable<ClienteDTO> {
    return this.http.post(AuthService.SIGN_IN, requestBody);
  }

  registrarCliente(cliente: ClienteDTO): Observable<ClienteDTO> {
    return this.http.post(AuthService.SIGN_UP, cliente);
  }

}
