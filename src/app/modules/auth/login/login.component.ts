import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { LoginBody } from 'src/app/models/request/body-login.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  data: LoginBody = {};

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.localStorage.removerInfo();
  }

  login() {
    this.authService
      .login(this.data)
      .pipe(
        tap((data) => {
          if (data.authToken) {
            this.localStorage.almacenarInfo(data);
            this.sharedService.setIdCliente(data.id!);
            this.router.navigateByUrl('/banco');
          }
          this.data = {};
        }),
        catchError((error) => {
          alert('Error al iniciar sesión: ' + error);
          this.data = {};
          return of(null);
        })
      )
      .subscribe();
  }
}
