import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss'],
})
export class InformesComponent implements OnInit {

  idCuenta: number = 0;

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.sharedService.getIdCuenta().subscribe((id) => this.idCuenta = id);

    if (!this.idCuenta || this.idCuenta == 0) {
      alert(
        'Por favor, selecciona una cuenta antes de realizar consultas.'
      );
      this.router.navigate(['banco']);
    }

  }
}
