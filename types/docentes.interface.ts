export interface Docente {
  id?: number;
  nombres: string;
  apellidos: string;
  email?: string;
  direccion?: string;
  cedula?: string;
  telefono?: string;
  etnia_id: number;
  cargo_id: number;
  sexo_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}
