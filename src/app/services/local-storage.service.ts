import { Injectable } from '@angular/core';
import { ClienteDTO } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly USER_AUTH: string = 'USER_AUTH';

  almacenarInfo(cliente: ClienteDTO) {
    localStorage.setItem(this.USER_AUTH, JSON.stringify(cliente));
  }

  removerInfo() {
    localStorage.removeItem(this.USER_AUTH);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getToken(): string | null {
    const strCliente = localStorage.getItem(this.USER_AUTH);
    const cliente = strCliente ? JSON.parse(strCliente) : null;
    return cliente ? cliente.authToken : null;
  }

  getIdCliente(): number | null {
    const strCliente = localStorage.getItem(this.USER_AUTH);
    const cliente = strCliente ? JSON.parse(strCliente) : null;
    return cliente ? cliente.id : null;
  }

  getCliente(): ClienteDTO | null {
    const strCliente = localStorage.getItem(this.USER_AUTH);
    return strCliente ? JSON.parse(strCliente) : null;
  }

}
