import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private idClienteSubjct = new BehaviorSubject<number>(0);

  private idCuentaSubjct = new BehaviorSubject<number>(0);

  constructor() {}

  setIdCliente(valor: number): void {
    this.idClienteSubjct.next(valor);
  }

  getIdCliente(): Observable<number> {
    return this.idClienteSubjct.asObservable();
  }

  setIdCuenta(valor: number): void {
    this.idClienteSubjct.next(valor);
  }

  getIdCuenta(): Observable<number> {
    return this.idClienteSubjct.asObservable();
  }
}
