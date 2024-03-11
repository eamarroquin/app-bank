import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadDTO } from 'src/app/models/ciudad.model';
import { CuentaDTO } from 'src/app/models/cuenta.model';
import { TipoCuentaDTO } from 'src/app/models/tipo-cuenta.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss'],
})
export class CrearCuentaComponent implements OnInit {
  listaTipos: TipoCuentaDTO[] = [
    { id: 1, descripcion: 'CUENTA DE AHORRO' },
    { id: 2, descripcion: 'CUENTA CORRIENTE' },
  ];

  listaCiudades: CiudadDTO[] = [
    { id: 1, descripcion: 'BUGA' },
    { id: 2, descripcion: 'CALI' },
  ];

  cuenta: CuentaDTO = {};

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.sharedService
      .getIdCliente()
      .subscribe((id) => (this.cuenta.idCliente = id));

    alert(this.cuenta.idCliente);
  }

  crearCuenta() {
    alert('Crear cuenta');
    this.router.navigate(['banco']);
  }
}
