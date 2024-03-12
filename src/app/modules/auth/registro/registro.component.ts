import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { ClienteDTO } from 'src/app/models/cliente.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  nuevoCliente: ClienteDTO = {};

  confirmarPassword: any;

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.localStorage.removerInfo();
  }

  registrar() {
    if (this.nuevoCliente.password === this.confirmarPassword) {
      this.authService
        .registrarCliente(this.nuevoCliente)
        .pipe(
          tap((data) => {
            if (data.authToken) {
              this.localStorage.almacenarInfo(data);
              this.sharedService.setIdCliente(data.id!);
              alert('Cliente creado con éxito!');
              this.router.navigateByUrl('/banco');
            }
            this.nuevoCliente = {};
          }),
          catchError((error) => {
            if (error && error.error) {
              alert(error.error);
            } else {
              alert('Se produjo un error al registrar usuario. Por favor, inténtelo de nuevo.');
            }
            this.nuevoCliente = {};
            return of(null);
          })
        )
        .subscribe();
    } else {
      alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
      this.nuevoCliente.password = undefined;
      this.confirmarPassword = undefined;
    }
  }
}
