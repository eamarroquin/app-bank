export interface MovimientoDTO {

  id?: number;
  idCuenta?: number;
  idTipoMovimiento?: number;
  tipoMovimiento?: string;
  fechaCreacion?: string;
  valor?: number;
  observacion?: string;
  idCiudad?: number;
  descCiudad?: string;

}
