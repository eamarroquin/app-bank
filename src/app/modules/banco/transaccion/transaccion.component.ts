import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadDTO } from 'src/app/models/ciudad.model';
import { MovimientoDTO } from 'src/app/models/movimiento.model';
import { TipoMovimientoDTO } from 'src/app/models/tipo-movimiento.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.scss'],
})
export class TransaccionComponent implements OnInit {
  listaTipos: TipoMovimientoDTO[] = [
    { id: 1, descripcion: 'CONSIGNACION' },
    { id: 2, descripcion: 'RETIRO' },
  ];

  listaCiudades: CiudadDTO[] = [
    { id: 1, descripcion: 'BUGA' },
    { id: 2, descripcion: 'CALI' },
  ];

  movimiento: MovimientoDTO = {};

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.sharedService
      .getIdCuenta()
      .subscribe((id) => (this.movimiento.idCuenta = id));

    alert(this.movimiento.idCuenta);
  }

  realizarTransaccion() {
    alert('Crear transacción');
    this.router.navigate(['banco']);
  }
}
